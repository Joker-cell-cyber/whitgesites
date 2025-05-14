import { NextResponse } from 'next/server';
import { addTokensToAccount } from '@/app/lib/server-state';

/**
 * Route POST qui simule l'achat de tokens supplémentaires
 */
export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Valider les données requises
    if (!data.memberId) {
      return NextResponse.json(
        { error: 'Identifiant utilisateur requis' },
        { status: 400 }
      );
    }
    
    if (!data.amount || typeof data.amount !== 'number' || data.amount <= 0) {
      return NextResponse.json(
        { error: 'Montant de tokens invalide' },
        { status: 400 }
      );
    }
    
    // Valider le package de tokens
    const packageDetails = getTokenPackageDetails(data.packageId);
    if (!packageDetails && data.packageId) {
      return NextResponse.json(
        { error: 'Package de tokens invalide' },
        { status: 400 }
      );
    }
    
    // Si un package valide est fourni, utiliser son montant
    const tokenAmount = packageDetails ? packageDetails.tokens : data.amount;
    const price = packageDetails ? packageDetails.price : calculatePrice(data.amount);
    
    // Simuler un délai de traitement bancaire (100-300ms)
    await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200));
    
    // Simuler une transaction de paiement
    const paymentResult = simulatePaymentTransaction(data.paymentMethod, price);
    
    if (!paymentResult.success) {
      return NextResponse.json(
        { error: paymentResult.message },
        { status: 402 }
      );
    }
    
    // Ajouter les tokens au compte
    const purchaseDescription = packageDetails 
      ? `Achat package ${packageDetails.name}`
      : `Achat de tokens personnalisé`;
    
    const result = await addTokensToAccount(data.memberId, tokenAmount, purchaseDescription);
    
    // Générer une facture
    const invoice = generateInvoice(data.memberId, tokenAmount, price, data.paymentMethod);
    
    return NextResponse.json({
      success: true,
      transaction: {
        id: paymentResult.transactionId,
        date: new Date(),
        status: 'completed',
        tokens: tokenAmount,
        price,
        paymentMethod: data.paymentMethod
      },
      newBalance: result.stats.tokenBalance,
      invoice
    });
  } catch (error) {
    console.error('Erreur lors de l\'achat de tokens:', error);
    return NextResponse.json(
      { error: 'Erreur serveur lors du traitement de l\'achat' },
      { status: 500 }
    );
  }
}

/**
 * Définition des packages de tokens disponibles
 */
const TOKEN_PACKAGES = [
  { id: 'basic', name: 'Basic', tokens: 500, price: 5.99, discount: 0 },
  { id: 'standard', name: 'Standard', tokens: 1000, price: 10.99, discount: 8 },
  { id: 'premium', name: 'Premium', tokens: 5000, price: 49.99, discount: 16 },
  { id: 'enterprise', name: 'Enterprise', tokens: 10000, price: 89.99, discount: 25 }
];

/**
 * Récupère les détails d'un package de tokens
 * @param packageId ID du package
 * @returns Détails du package ou undefined si non trouvé
 */
function getTokenPackageDetails(packageId: string) {
  return TOKEN_PACKAGES.find(p => p.id === packageId);
}

/**
 * Calcule le prix pour un montant personnalisé de tokens
 * @param amount Montant de tokens
 * @returns Prix calculé
 */
function calculatePrice(amount: number) {
  // Prix de base: 1 centime par token
  const basePrice = amount * 0.01;
  
  // Appliquer des remises par palier
  let discount = 0;
  if (amount >= 10000) discount = 0.25;
  else if (amount >= 5000) discount = 0.16;
  else if (amount >= 1000) discount = 0.08;
  
  // Calculer le prix final avec remise
  const finalPrice = basePrice * (1 - discount);
  
  // Arrondir à 2 décimales
  return Math.round(finalPrice * 100) / 100;
}

/**
 * Simule une transaction de paiement
 * @param paymentMethod Méthode de paiement
 * @param amount Montant à payer
 * @returns Résultat de la transaction
 */
function simulatePaymentTransaction(paymentMethod: string, amount: number) {
  // Générer un identifiant de transaction
  const transactionId = 'TRX' + Date.now().toString(36).toUpperCase() + 
                        Math.random().toString(36).substring(2, 8).toUpperCase();
  
  // Simuler des erreurs aléatoires (1% de chance)
  if (Math.random() < 0.01) {
    return {
      success: false,
      message: 'Transaction refusée par l\'émetteur de la carte',
      transactionId
    };
  }
  
  // Simuler des vérifications spécifiques au mode de paiement
  switch (paymentMethod) {
    case 'card':
      // Simuler une vérification 3D Secure
      break;
    case 'paypal':
      // Simuler une redirection PayPal
      break;
    case 'bank_transfer':
      // Simuler un délai plus long
      break;
    default:
      // Méthode par défaut
  }
  
  return {
    success: true,
    message: 'Transaction approuvée',
    transactionId
  };
}

/**
 * Génère une facture pour l'achat
 * @param memberId ID du membre
 * @param tokens Nombre de tokens achetés
 * @param price Prix payé
 * @param paymentMethod Méthode de paiement
 * @returns Informations de la facture
 */
function generateInvoice(memberId: string, tokens: number, price: number, paymentMethod: string) {
  const today = new Date();
  const invoiceNumber = 'INV-' + today.getFullYear() + 
                      (today.getMonth() + 1).toString().padStart(2, '0') +
                      today.getDate().toString().padStart(2, '0') + '-' +
                      Math.random().toString(36).substring(2, 7).toUpperCase();
  
  return {
    invoiceNumber,
    issueDate: today,
    customer: {
      id: memberId,
      name: 'Compte Test',
      address: '123 Rue de Test, 75000 Paris, France'
    },
    items: [
      {
        description: `Achat de ${tokens} tokens`,
        quantity: 1,
        unitPrice: price,
        totalPrice: price
      }
    ],
    subtotal: price,
    tax: calculateTax(price),
    total: price * 1.2, // TVA 20%
    paymentMethod,
    paymentStatus: 'Paid',
    notes: 'Merci pour votre achat!'
  };
}

/**
 * Calcule la TVA (20%)
 * @param amount Montant HT
 * @returns Montant de TVA
 */
function calculateTax(amount: number) {
  return Math.round(amount * 0.2 * 100) / 100;
} 