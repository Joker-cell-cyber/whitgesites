import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { fallbackProductData, ProductData, PLAN_NAME_MAPPING, CSV_FILENAME, logProductData } from '@/lib/checkout-products';

// Types et interfaces
interface ProductEntry {
  campaign_product_id: string;
  product_name: string;
  subscription_plan: string;
}

/**
 * API route pour retourner les données de produits
 * Cette route est appelée par le client pour obtenir les données de produits
 */
export async function GET() {
  try {
    console.log('API /products: Tentative de chargement des données depuis le CSV');
    console.log('Dossier courant:', process.cwd());
    console.log('Nom du fichier CSV:', CSV_FILENAME);
    
    // Copier les données de fallback pour ne pas les modifier directement
    const data: ProductData = JSON.parse(JSON.stringify(fallbackProductData));
    
    // Débug spécifique pour le plan Business
    console.log('Vérification du mapping du plan Business:');
    console.log('Plan business dans PLAN_NAME_MAPPING:', PLAN_NAME_MAPPING['business']);
    console.log('Plan business (lowercase) dans PLAN_NAME_MAPPING:', PLAN_NAME_MAPPING['business']);
    
    try {
      // Chemin vers le fichier CSV spécifique au projet
      const csvPath = path.join(process.cwd(), 'public', CSV_FILENAME);
      console.log('Chemin complet du CSV:', csvPath);
      
      // Vérifier l'existence du fichier
      try {
        await fs.access(csvPath);
        console.log('Le fichier CSV existe et est accessible');
      } catch (accessError) {
        console.error('Erreur d\'accès au fichier CSV:', accessError);
        throw new Error(`Le fichier CSV n'est pas accessible: ${csvPath}`);
      }
      
      // Lire le contenu du fichier CSV
      const fileContent = await fs.readFile(csvPath, 'utf8');
      console.log('Contenu du CSV chargé, taille:', fileContent.length, 'caractères');
      
      // Parser le contenu CSV
      const records = parse(fileContent, {
        columns: true,
        skip_empty_lines: true
      }) as ProductEntry[];
      
      console.log(`${records.length} enregistrements trouvés dans le CSV`);
      
      // Traiter les enregistrements pour les ajouter aux données produits
      for (const record of records) {
        const productId = parseInt(record.campaign_product_id, 10);
        const productName = record.product_name.trim();
        const planName = record.subscription_plan?.trim() || '';
        
        // Ignorer les enregistrements avec des IDs invalides
        if (isNaN(productId) || productId <= 0) {
          console.warn(`ID produit invalide: ${record.campaign_product_id} pour ${productName}`);
          continue;
        }
        
        console.log(`Traitement de l'enregistrement: ${productName}, Plan: ${planName}, ID: ${productId}`);
        
        // Déterminer le type de produit et le plan
        if (productName.toLowerCase().includes('token') || productName.toLowerCase().includes('jeton')) {
          // C'est un produit de type token/jeton
          const tokenMatch = productName.match(/(\d+)\s*(token|jeton)/i);
          if (tokenMatch) {
            const tokenAmount = parseInt(tokenMatch[1], 10);
            
            if (planName && planName !== '') {
              // C'est un token pack pour un plan spécifique
              let matchedPlan = null;
              
              // Trouver le plan correspondant
              for (const [englishName, normalizedName] of Object.entries(PLAN_NAME_MAPPING)) {
                if (planName.toLowerCase() === englishName.toLowerCase()) {
                  matchedPlan = normalizedName;
                  break;
                }
              }
              
              // Si aucune correspondance trouvée, utiliser directement le nom du plan
              if (!matchedPlan) {
                matchedPlan = planName;
              }
              
              // Vérifier que le plan existe dans les données
              if (!data.subscriptionTokenProducts[matchedPlan]) {
                data.subscriptionTokenProducts[matchedPlan] = {};
              }
              
              // Ajouter l'ID du produit pour cette quantité de tokens
              data.subscriptionTokenProducts[matchedPlan][tokenAmount] = productId;
              console.log(`Ajout de tokens pour ${matchedPlan}: ${tokenAmount} tokens -> ID ${productId}`);
            } else {
              // C'est un token pack standard (à la carte)
              data.tokenProducts[tokenAmount] = productId;
              console.log(`Ajout de tokens à la carte: ${tokenAmount} tokens -> ID ${productId}`);
            }
          }
        } else {
          // C'est un produit d'abonnement
          
          // Déterminer le plan
          let matchedPlan = null;
          
          if (productName.toLowerCase().includes('lite')) {
            matchedPlan = 'lite';
          } else if (productName.toLowerCase().includes('basic')) {
            matchedPlan = 'basic';
          } else if (productName.toLowerCase().includes('advanced')) {
            matchedPlan = 'advanced';
          } else if (productName.toLowerCase().includes('pro')) {
            matchedPlan = 'pro';
          }
          
          if (matchedPlan) {
            // Déterminer la période de facturation
            let billingPeriod = null;
            
            if (productName.toLowerCase().includes('annual') || 
                productName.toLowerCase().includes('annualy') || 
                productName.toLowerCase().includes('yearly')) {
              billingPeriod = 'annual';
            } else if (productName.toLowerCase().includes('quarter')) {
              billingPeriod = 'quarterly';
            } else if (productName.toLowerCase().includes('month')) {
              billingPeriod = 'monthly';
            } else if (productName.toLowerCase().includes('bi-weekly') || 
                      productName.toLowerCase().includes('biweekly')) {
              billingPeriod = 'biweekly';
            }
            
            if (billingPeriod) {
              // Vérifier que le plan existe dans les données
              if (!data.subscriptionProducts[matchedPlan]) {
                data.subscriptionProducts[matchedPlan] = {};
              }
              
              // Ajouter l'ID du produit pour cette période
              data.subscriptionProducts[matchedPlan][billingPeriod] = productId;
              console.log(`Ajout d'abonnement pour ${matchedPlan}, période ${billingPeriod} -> ID ${productId}`);
            }
          }
        }
      }
      
      // Afficher les données produits après le traitement
      console.log('Données produits après traitement du CSV:');
      logProductData(data);
      
    } catch (csvError) {
      console.error('Erreur lors du chargement du CSV:', csvError);
      console.warn('Utilisation des données de fallback');
    }
    
    // Ajouter des entrées avec les noms anglais pour la compatibilité
    const subscriptionProductsWithEnglishNames: Record<string, any> = {};
    
    // Copier les entrées existantes
    Object.entries(data.subscriptionProducts).forEach(([planName, periods]) => {
      subscriptionProductsWithEnglishNames[planName] = periods;
    });
    
    // Ajouter les entrées avec noms anglais
    Object.entries(PLAN_NAME_MAPPING).forEach(([englishName, frenchName]) => {
      if (data.subscriptionProducts[frenchName]) {
        subscriptionProductsWithEnglishNames[englishName] = data.subscriptionProducts[frenchName];
      }
    });
    
    // Remplacer l'objet original
    data.subscriptionProducts = subscriptionProductsWithEnglishNames;

    // Faire la même chose pour les tokens supplémentaires par plan
    const subscriptionTokenProductsWithEnglishNames: Record<string, any> = {};
    
    // Copier les entrées existantes
    Object.entries(data.subscriptionTokenProducts).forEach(([planName, tokens]) => {
      subscriptionTokenProductsWithEnglishNames[planName] = tokens;
    });
    
    // Ajouter les entrées avec noms anglais
    Object.entries(PLAN_NAME_MAPPING).forEach(([englishName, frenchName]) => {
      if (data.subscriptionTokenProducts[frenchName]) {
        subscriptionTokenProductsWithEnglishNames[englishName] = data.subscriptionTokenProducts[frenchName];
      }
    });
    
    // Remplacer l'objet original
    data.subscriptionTokenProducts = subscriptionTokenProductsWithEnglishNames;

    console.log('API /products: Données de produits renvoyées avec succès');
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('API /products: Erreur lors de la récupération des données de produits:', error);
    return NextResponse.json(
      { error: 'Erreur serveur lors de la récupération des données de produits' },
      { status: 500 }
    );
  }
} 