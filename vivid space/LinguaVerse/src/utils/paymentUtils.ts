/**
 * Utilitaires de paiement factices pour simuler un processus de paiement
 * Ces fonctions ne font rien de réel mais retournent des promesses pour
 * simuler le comportement d'une API de paiement.
 */

// Types pour les informations de paiement
export type PaymentInfo = {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
};

export type CustomerInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  country: string;
};

export type OrderInfo = {
  packageName: string;
  packageType: string;
  price: number;
  totalPrice: number;
};

/**
 * Simule une vérification de carte bancaire
 * @param paymentInfo Informations de la carte bancaire
 * @returns Une promesse qui se résout après un délai aléatoire
 */
export const validatePaymentInfo = (paymentInfo: PaymentInfo): Promise<boolean> => {
  // Simulation d'une vérification bancaire
  return new Promise((resolve) => {
    // Délai aléatoire entre 500ms et 1500ms
    const delay = Math.random() * 1000 + 500;
    setTimeout(() => {
      // Considérer toute carte valide pour la simulation
      resolve(true);
    }, delay);
  });
};

/**
 * Simule un processus de paiement complet
 * @param paymentInfo Informations de la carte bancaire
 * @param customerInfo Informations du client
 * @param orderInfo Informations de la commande
 * @returns Une promesse qui se résout avec un ID de transaction
 */
export const processPayment = (
  paymentInfo: PaymentInfo,
  customerInfo: CustomerInfo,
  orderInfo: OrderInfo
): Promise<{ success: boolean; transactionId: string }> => {
  return new Promise((resolve) => {
    // Délai entre 1s et 2s pour simuler un traitement
    const delay = Math.random() * 1000 + 1000;
    setTimeout(() => {
      // Générer un ID de transaction factice
      const transactionId = `TR-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
      
      // Pour la simulation, toujours retourner un succès
      resolve({
        success: true,
        transactionId
      });
    }, delay);
  });
};

/**
 * Génère un reçu de paiement factice
 * @param customerInfo Informations du client
 * @param orderInfo Informations de la commande
 * @param transactionId ID de la transaction
 * @returns Une promesse qui se résout avec un lien vers un reçu (factice)
 */
export const generateReceiptLink = (
  customerInfo: CustomerInfo,
  orderInfo: OrderInfo,
  transactionId: string
): Promise<string> => {
  return new Promise((resolve) => {
    // Délai court pour simuler la génération
    setTimeout(() => {
      // Dans un système réel, ceci pourrait être un lien vers un PDF généré
      resolve(`/api/receipts/${transactionId}`);
    }, 300);
  });
}; 