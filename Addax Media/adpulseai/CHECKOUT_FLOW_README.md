# Création du lien de checkout dynamique dans AdPulseAI

Ce document explique en détail comment le lien de paiement (checkout) est construit dynamiquement dans l'application AdPulseAI, en partant de la sélection d'un plan jusqu'à la redirection vers la plateforme de paiement CheckoutChamp.

## Fichiers impliqués dans le processus

Le processus de création du lien de checkout implique plusieurs fichiers qui travaillent ensemble :

1. **app/components/layout/pricing.tsx** - Composant d'affichage des plans et point de départ
2. **app/pre-checkout/page.tsx** - Page intermédiaire qui gère les détails de la commande
3. **lib/product-utils.ts** - Classe utilitaire qui gère les données de produits
4. **app/api/products/route.ts** - API qui fournit les données de produits
5. **public/new_temp_cleaned_offres_adpulsai_28.csv** - Fichier CSV contenant les IDs des produits pour CheckoutChamp

## Format de l'URL de Checkout pour CheckoutChamp

CheckoutChamp nécessite un format spécifique pour les URLs de checkout, composé uniquement du paramètre `products` :

```
https://checkout.mysite.com/checkout?products=campaignProductId:quantity
```

Pour plusieurs produits, on les sépare par des points-virgules :

```
https://checkout.mysite.com/checkout?products=campaignProductId1:1;campaignProductId2:1
```

Où `campaignProductId` est l'identifiant unique du produit dans CheckoutChamp (et non l'ID interne). Ces IDs sont stockés dans notre fichier CSV (`campaign_product_id`).

### Gestion des tokens supplémentaires

Pour les tokens supplémentaires, il faut ajouter un deuxième produit dans le paramètre `products`. 
Par exemple, si un utilisateur choisit un abonnement LITE mensuel (ID: 14182) et ajoute 100 tokens supplémentaires (ID: 37426), l'URL sera :

```
https://checkout.mysite.com/checkout?products=14182:1;37426:1
```

Les tokens supplémentaires sont un produit distinct, pas un paramètre additionnel.

### Gestion des informations utilisateur

Les informations utilisateur (nom, prénom, email, etc.) ne sont pas incluses dans l'URL de checkout. 
Elles sont stockées temporairement dans le localStorage du navigateur et seront récupérées plus tard si nécessaire :

```typescript
// Stockage des informations utilisateur
localStorage.setItem('checkout_firstName', firstName);
localStorage.setItem('checkout_lastName', lastName);
localStorage.setItem('checkout_email', email);
localStorage.setItem('checkout_newsletter', acceptedNewsletter ? '1' : '0');
```

Cette approche permet :
1. De garder l'URL de checkout propre et courte
2. D'éviter d'exposer des informations personnelles dans l'URL
3. De se conformer au format exact attendu par CheckoutChamp

## Flux complet de création du lien

### 1. Sélection du plan (pricing.tsx)

Lorsque l'utilisateur sélectionne un plan sur la page de pricing, un lien est généré vers la page pre-checkout :

```typescript
// Dans pricing.tsx
<Link 
  href={plan.id === 'pay-as-you-go' 
    ? `/pre-checkout?plan=${plan.id}&period=one-time&tokens=${selectedTokens}` 
    : `/pre-checkout?plan=${plan.id}&period=${
        billingCycle === 'biweekly' ? 'bi-weekly' : 
        billingCycle === 'yearly' ? 'annualy' : 
        billingCycle
      }`}
  className="..."
>
  {plan.id === 'pay-as-you-go' ? 'Acheter des tokens' : 'Souscrire maintenant'}
</Link>
```

Ce lien contient les paramètres essentiels :
- `plan` : ID du plan sélectionné (lite, basic, advanced, pro, pay-as-you-go)
- `period` : Période de facturation (monthly, quarterly, bi-weekly, annualy, one-time)
- `tokens` : Nombre de tokens (uniquement pour pay-as-you-go)

### 2. Traitement dans la page pre-checkout

#### Récupération des paramètres et préparation des données

```typescript
// Dans pre-checkout/page.tsx
const planParam = searchParams.get('plan');
const periodParam = searchParams.get('period');
const tokens = searchParams.get('tokens');

// ...initialisation et récupération des détails du produit
```

#### Construction de l'URL lors de la soumission du formulaire

Pour assurer que les tokens supplémentaires soient correctement inclus, l'URL de checkout est construite seulement lors de la soumission du formulaire :

```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  
  // Vérifications des conditions
  if (!acceptedTerms || !acceptedAgeVerification) {
    alert('Veuillez accepter les conditions requises pour continuer');
    return;
  }

  if (!productManager || !productDetails) {
    alert('Erreur lors de la préparation de la commande');
    return;
  }
  
  try {
    // Construire l'URL de checkout selon le format CheckoutChamp
    const products: {
      subscriptionId?: string;
      tokenPackId?: string;
    } = {};
    
    // 1. Ajouter l'abonnement principal
    if (period !== 'one-time') {
      products.subscriptionId = productDetails.id;
    } else {
      products.tokenPackId = productDetails.id;
    }
    
    // 2. Ajouter le pack de tokens supplémentaires si nécessaire
    if (additionalTokens > 0 && period !== 'one-time') {
      // Récupérer l'ID du produit pour les tokens supplémentaires
      const tokenPackId = productManager.getTokenPackId(plan || '', additionalTokens);
      if (tokenPackId) {
        products.tokenPackId = tokenPackId;
      }
    }
    
    // 3. Construire l'URL avec uniquement le paramètre products
    const checkoutUrl = productManager.buildCheckoutUrl(products);
    
    // 4. Stocker les informations utilisateur dans le localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('checkout_firstName', firstName);
      localStorage.setItem('checkout_lastName', lastName);
      localStorage.setItem('checkout_email', email);
      localStorage.setItem('checkout_newsletter', acceptedNewsletter ? '1' : '0');
    }
    
    // 5. Redirection directement vers l'URL de checkout
    window.location.href = checkoutUrl;
  } catch (error) {
    console.error('Erreur lors de la construction de l\'URL de checkout:', error);
    alert('Une erreur est survenue lors de la préparation de la commande');
  }
};
```

Cette approche garantit que les tokens supplémentaires sont ajoutés comme un produit distinct dans l'URL, et que seul le paramètre `products` est inclus dans l'URL finale.

### 3. Recherche des IDs de produits depuis le CSV (product-utils.ts)

#### Recherche d'un ID d'abonnement

```typescript
public getSubscriptionId(plan: string, period: string): string | undefined {
  // Normaliser la période
  const normalizedPeriod = this.normalizePeriod(period);
  const planUpper = plan.toUpperCase();
  
  // Rechercher dans les produits chargés depuis l'API (données du CSV)
  const productExact = this.products.find(p => {
    // Vérifier la correspondance du plan
    const planMatch = p.subscription_plan.toUpperCase() === planUpper;
    
    // Vérifier la correspondance de la période dans le nom du produit
    let nameMatch = false;
    if (p.product_name.toUpperCase().includes(normalizedPeriod.toUpperCase())) {
      nameMatch = true;
    }
    
    return planMatch && nameMatch;
  });
  
  // Retourner le campaign_product_id qui sera utilisé dans l'URL de checkout
  return productExact?.campaign_product_id;
}
```

#### Recherche d'un ID de token pack

```typescript
public getTokenPackId(plan: string, tokenCount: number): string | undefined {
  // Pour pay-as-you-go, utiliser "à la carte" comme valeur de recherche
  const subscriptionPlan = plan.toLowerCase() === 'pay-as-you-go' ? 'à la carte' : plan;
  
  const product = this.products.find(p => {
    // Vérifier la correspondance du plan
    const planMatch = p.subscription_plan.toUpperCase() === subscriptionPlan.toUpperCase();
    
    // Vérifier la correspondance du nombre de tokens
    const tokenMatch = p.product_name.includes(`${tokenCount} TOKEN PACK`);
    
    return planMatch && tokenMatch;
  });
  
  // Retourner le campaign_product_id qui sera utilisé dans l'URL de checkout
  return product?.campaign_product_id;
}
```

### 4. Construction de l'URL de checkout au format CheckoutChamp

```typescript
public buildCheckoutUrl(products: CheckoutProducts): string {
  const baseUrl = process.env.NEXT_PUBLIC_CHECKOUT_URL || 'https://checkout.mysite.com/checkout';
  
  // Construire le paramètre 'products' selon la syntaxe de CheckoutChamp: campaignProductId:quantity
  const productParams: string[] = [];
  
  // Ajouter l'abonnement s'il existe (avec quantité 1)
  if (products.subscriptionId) {
    productParams.push(`${products.subscriptionId}:1`);
  }
  
  // Ajouter le pack de tokens s'il existe (avec quantité 1)
  if (products.tokenPackId) {
    productParams.push(`${products.tokenPackId}:1`);
  }
  
  // Construire l'URL manuellement pour éviter l'encodage automatique des caractères spéciaux
  // qui transformerait : en %3A et ; en %3B
  if (productParams.length > 0) {
    return `${baseUrl}?products=${productParams.join(';')}`;
  } else {
    return baseUrl;
  }
}
```

Cette méthode génère des URLs dans le format exact requis par CheckoutChamp : `?products=campaignProductId:quantity`, sans encodage URL des caractères spéciaux comme `:` et `;`. Ceci est important car CheckoutChamp attend ces caractères tels quels, et non dans leur forme encodée (`%3A` et `%3B`).

⚠️ **Point important** : La construction manuelle de l'URL (sans utiliser `URLSearchParams`) est nécessaire pour éviter l'encodage automatique des caractères spéciaux, qui rendrait l'URL incompatible avec CheckoutChamp.

## Exemple concret d'URL générée

Pour un abonnement BASIC mensuel :
```
https://checkout.mysite.com/checkout?products=14183:1
```

Pour un pack de 50 tokens à la carte :
```
https://checkout.mysite.com/checkout?products=37371:1
```

Pour un abonnement LITE mensuel avec 100 tokens supplémentaires :
```
https://checkout.mysite.com/checkout?products=14182:1;37426:1
```

## Points techniques importants

### 1. Importance du CSV et des campaign_product_id

Le fichier CSV `new_temp_cleaned_offres_adpulsai_28.csv` contient les identifiants uniques (`campaign_product_id`) requis par CheckoutChamp pour identifier correctement les produits. Ces identifiants ne sont pas générés par notre application mais doivent correspondre exactement aux IDs dans le système CheckoutChamp.

Exemple d'entrées du CSV :
```
campaign_product_id,product_name,subscription_plan
14183,BASIC - MONTHLY SUBSCRIPTION,BASIC
37371,50 TOKEN PACK,à la carte
```

### 2. Normalisation des périodes

La normalisation des périodes reste critique pour faire correspondre les valeurs de l'interface utilisateur avec celles du CSV :

```typescript
private normalizePeriod(period: string): string {
  if (!period) return '';
  
  const periodLower = period.toLowerCase();
  
  if (periodLower === 'bi-weekly' || periodLower === 'biweekly') {
    return 'bi-weekly'; // Format pour le CSV
  }
  
  if (periodLower === 'yearly' || periodLower === 'annualy') {
    return 'annualy'; // Format pour le CSV
  }
  
  return periodLower;
}
```

### 3. Gestion du cas spécial "Pay-as-you-go"

La gestion des achats à la carte nécessite une logique spécifique pour rechercher les produits avec `subscription_plan` "à la carte" dans le CSV :

```typescript
// Pour le plan pay-as-you-go, utiliser "à la carte" comme valeur de subscription_plan
const subscriptionPlan = plan.toLowerCase() === 'pay-as-you-go' ? 'à la carte' : plan;
```

### 4. Construction de l'URL au moment de la soumission

Les tokens supplémentaires sont maintenant correctement intégrés dans l'URL de checkout en construisant l'URL complète uniquement au moment de la soumission du formulaire, après que l'utilisateur a choisi la quantité de tokens supplémentaires.

### 5. Séparation des informations utilisateur

Les informations utilisateur sont stockées dans le localStorage plutôt que dans l'URL, ce qui permet :
- De respecter le format exact de l'URL requis par CheckoutChamp
- De maintenir les URLs propres et concises
- De protéger les informations personnelles des utilisateurs

### 6. Annotations de type pour les objets de prix

Pour éviter les erreurs lors du build TypeScript, il est important d'annoter correctement les types des objets contenant les tarifs et les tokens :

```typescript
// Types explicites pour éviter les erreurs d'indexation avec des clés dynamiques
const basePrices: Record<string, Record<string, number>> = {
  'lite': { monthly: 19.90, biweekly: 11.94, quarterly: 53.73, yearly: 191.04 },
  'basic': { monthly: 34.90, biweekly: 20.94, quarterly: 94.23, yearly: 335.04 },
  // ...
};

const includedTokens: Record<string, Record<string, number>> = {
  'lite': { monthly: 45, biweekly: 27, quarterly: 121, yearly: 432 },
  // ...
};

const additionalTokenPrices: Record<string, number> = {
  'lite': 0.75,
  'basic': 0.60,
  // ...
};
```

Ces annotations permettent d'utiliser des clés dynamiques (`plan.toLowerCase()`) sans générer d'erreurs TypeScript pendant le build.

## Résumé du processus

1. L'utilisateur sélectionne un plan et une période dans `pricing.tsx`
2. Il est redirigé vers `pre-checkout/page.tsx` avec les paramètres dans l'URL
3. La page pre-checkout charge les données du CSV via l'API et affiche les détails du produit
4. L'utilisateur peut sélectionner des tokens supplémentaires si nécessaire
5. Lors de la soumission du formulaire, le système recherche les `campaign_product_id` pour le plan principal et les tokens supplémentaires
6. L'URL de checkout est construite au format CheckoutChamp `?products=campaignProductId1:1;campaignProductId2:1`
7. Les informations utilisateur sont stockées dans le localStorage du navigateur
8. L'utilisateur est redirigé vers la plateforme de paiement CheckoutChamp avec une URL épurée

Ce processus assure l'intégration correcte avec CheckoutChamp tout en offrant une expérience de checkout fluide aux utilisateurs. 