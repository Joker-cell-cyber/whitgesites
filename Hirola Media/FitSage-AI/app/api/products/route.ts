import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

/**
 * API qui retourne les données des produits depuis le fichier CSV
 */
export async function GET() {
  try {
    // Chemin vers le fichier CSV dans le dossier public
    const csvPath = path.join(process.cwd(), 'public', 'new_temp_cleaned_offres_fitsageai_34.csv');
    console.log('API Products: Lecture du fichier CSV:', csvPath);
    
    // Vérifier si le fichier existe
    try {
      await fs.access(csvPath);
      console.log('API Products: Le fichier CSV existe');
    } catch (err) {
      console.error('API Products: Le fichier CSV n\'existe pas:', err);
      return NextResponse.json(
        { error: 'Fichier CSV non trouvé' },
        { status: 404 }
      );
    }
    
    // Lire le contenu du fichier
    const csvContent = await fs.readFile(csvPath, 'utf-8');
    console.log('API Products: Taille du contenu CSV:', csvContent.length, 'caractères');
    
    // Parser le CSV en objets JSON
    const lines = csvContent.split('\n');
    console.log('API Products: Nombre de lignes dans le CSV:', lines.length);
    
    const headers = lines[0].split(',');
    console.log('API Products: En-têtes détectés:', headers);
    
    const products = lines.slice(1)
      .filter(line => line.trim() !== '')  // Exclure les lignes vides
      .map(line => {
        const values = line.split(',');
        return headers.reduce((obj, header, index) => {
          obj[header.trim()] = values[index]?.trim() || '';
          return obj;
        }, {} as Record<string, string>);
      });

    console.log('API Products: Nombre de produits chargés:', products.length);
    
    if (products.length > 0) {
      console.log('API Products: Exemple de premier produit:', products[0]);
      
      // Compter les types de produits 
      const subscriptionProducts = products.filter(p => 
        p.product_name && 
        (p.product_name.includes('SUBSCRIPTION') || p.product_name.includes('ABONNEMENT'))
      );
      const tokenProducts = products.filter(p => 
        p.product_name && 
        p.product_name.includes('TOKEN PACK')
      );
      
      console.log('API Products: Statistiques des produits:');
      console.log('- Produits d\'abonnement:', subscriptionProducts.length);
      console.log('- Produits de tokens:', tokenProducts.length);
      
      // Vérifier des plans spécifiques
      const litePlans = products.filter(p => p.subscription_plan && p.subscription_plan.toLowerCase() === 'lite');
      const basicPlans = products.filter(p => p.subscription_plan && p.subscription_plan.toLowerCase() === 'basic');
      const advancedPlans = products.filter(p => p.subscription_plan && p.subscription_plan.toLowerCase() === 'advanced');
      const proPlans = products.filter(p => p.subscription_plan && p.subscription_plan.toLowerCase() === 'pro');
      const payAsYouGoPlans = products.filter(p => p.subscription_plan && p.subscription_plan === 'à la carte');
      
      console.log('API Products: Distribution des plans:');
      console.log('- Lite:', litePlans.length);
      console.log('- Basic:', basicPlans.length);
      console.log('- Advanced:', advancedPlans.length);
      console.log('- Pro:', proPlans.length);
      console.log('- À la carte:', payAsYouGoPlans.length);
    }

    // Retourner les produits au format JSON
    return NextResponse.json({ products });
  } catch (error) {
    console.error('Erreur lors de la lecture du CSV:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la lecture des produits' },
      { status: 500 }
    );
  }
} 