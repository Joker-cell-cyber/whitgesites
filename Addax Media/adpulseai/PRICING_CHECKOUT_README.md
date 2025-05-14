# Système de Pricing et Checkout - Documentation Technique

Ce document explique en détail le système de pricing et checkout implémenté dans AdPulseAI, avec toutes les informations nécessaires pour dupliquer ce système dans d'autres projets.

## Table des matières

1. [Architecture globale](#architecture-globale)
2. [Structure des données](#structure-des-données)
3. [Composants principaux](#composants-principaux)
4. [Flux de données](#flux-de-données)
5. [Mappings des prix et plans](#mappings-des-prix-et-plans)
6. [Gestion des tokens](#gestion-des-tokens)
7. [Instructions d'implémentation](#instructions-dimplémentation)

## Architecture globale

Le système se compose de trois parties principales :
- **Section Pricing** (`app/components/layout/pricing.tsx`) : Affiche les différents plans et options
- **Gestion des produits** (`lib/product-utils.ts`) : Classe qui gère les données de produits et prix
- **Page Pre-checkout** (`app/pre-checkout/page.tsx`) : Affiche le récapitulatif et le formulaire avant redirection vers le paiement

Les données des produits sont stockées dans un fichier CSV (`public/new_temp_cleaned_offres_adpulsai_28.csv`) qui est consommé par l'API (`app/api/products/route.ts`).

## Structure des données

### Fichier CSV

Le fichier CSV contient les colonnes suivantes :
- `campaign_product_id` : Identifiant unique du produit utilisé pour le checkout
- `product_name` : Nom du produit (ex: "LITE - MONTHLY SUBSCRIPTION")
- `subscription_plan` : Type de plan pour les token packs (ex: "basic", "advanced", "à la carte")

Format des données :
- Plans d'abonnement : `[PLAN] - [PERIOD] SUBSCRIPTION` (ex: "LITE - MONTHLY SUBSCRIPTION")
- Packs de tokens : `[NUMBER] TOKEN PACK` (ex: "10 TOKEN PACK")

### Objet ProductDetails

Interface dans `lib/product-utils.ts` :

```typescript
export interface ProductDetails {
  id: string;               // ID du produit pour le checkout
  name: string;             // Nom du produit
  price: number;            // Prix de base
  nextBillingDate: string;  // Date de prochaine facturation
  includedTokens: number;   // Nombre de tokens inclus
  additionalTokenPrice: number; // Prix par token supplémentaire
}
```

## Composants principaux

### 1. Pricing.tsx

**Emplacement** : `app/components/layout/pricing.tsx`

**Fonction** : Affiche les plans disponibles et leurs options.

**Principales caractéristiques** :
- Définit les plans (Lite, Basic, Advanced, Pro, Pay-as-you-go)
- Gère la sélection de période (mensuelle, trimestrielle, bi-hebdomadaire, annuelle)
- Pour "Pay-as-you-go", affiche un sélecteur de quantité de tokens
- Génère une URL vers la page pre-checkout avec les paramètres appropriés

**Structure de données des plans** :
```typescript
const plans = [
  {
    id: 'lite',
    name: 'Lite',
    mostPopular: false,
    gradientFrom: 'from-orange-400',
    gradientTo: 'to-orange-500',
    // etc.
  },
  // autres plans...
];
```

**Mapping période URL → affichage** :
- `monthly` → "Mensuel"
- `quarterly` → "Trimestriel"
- `bi-weekly` → "Bi-hebdomadaire"
- `annualy` → "Annuel"

### 2. ProductManager (product-utils.ts)

**Emplacement** : `lib/product-utils.ts`

**Fonction** : Gère la logique de recherche de produits et de calcul des prix.

**Principales méthodes** :
- `initialize()` : Charge les produits depuis l'API
- `getSubscriptionId(plan, period)` : Retourne l'ID pour un abonnement
- `getTokenPackId(plan, tokenCount)` : Retourne l'ID pour un pack de tokens
- `getProductDetails(plan, period)` : Retourne tous les détails d'un produit
- `calculateNextBillingDate(period)` : Calcule la prochaine date de facturation
- `buildCheckoutUrl(products)` : Construit l'URL de redirection vers le système de paiement

**Normalisation des périodes** :
```typescript
private normalizePeriod(period: string): string {
  if (periodLower === 'bi-weekly' || periodLower === 'biweekly') {
    return 'bi-weekly'; // Pour la recherche CSV
  }
  if (periodLower === 'yearly' || periodLower === 'annualy') {
    return 'annualy'; // Pour la recherche CSV
  }
  return periodLower;
}
```

### 3. Pre-checkout Page

**Emplacement** : `app/pre-checkout/page.tsx`

**Fonction** : Affiche un récapitulatif de commande et le formulaire avant paiement.

**Principales caractéristiques** :
- Récupère les paramètres de l'URL (`plan`, `period`, `tokens`)
- Gère différemment les achats one-time et les abonnements
- Permet l'ajout de tokens supplémentaires pour les abonnements
- Calcule le prix total dynamiquement
- Affiche les conditions spécifiques selon le type d'achat
- Collecte les informations utilisateur avant le paiement

## Flux de données

1. **De Pricing à Pre-checkout** :
   - URL générée : `/pre-checkout?plan=${plan.id}&period=${period}&tokens=${tokens}`
   - Paramètres transmis :
     - `plan` : ID du plan (lite, basic, advanced, pro, pay-as-you-go)
     - `period` : Période (monthly, quarterly, bi-weekly, annualy, one-time)
     - `tokens` : Nombre de tokens (uniquement pour pay-as-you-go)

2. **De Pre-checkout à API** :
   - Appel à `ProductManager.initialize()` qui charge les données depuis `/api/products`
   - Recherche des produits correspondants aux paramètres

3. **De Pre-checkout à Checkout** :
   - URL générée : `https://checkout.mysite.com/checkout?products=campaignProductId:quantity`
   - Pour plusieurs produits : `https://checkout.mysite.com/checkout?products=campaignProductId1:1;campaignProductId2:1`
   - Caractéristiques importantes :
     - Format spécifique à CheckoutChamp
     - Aucun encodage URL des caractères spéciaux
     - Informations utilisateur stockées dans le localStorage

## Mappings des prix et plans

### Plans et périodes

| Plan ID        | Période      | Nom affiché dans pre-checkout                 |
|----------------|--------------|-----------------------------------------------|
| lite           | monthly      | LITE - MONTHLY SUBSCRIPTION                   |
| lite           | quarterly    | LITE - QUARTERLY SUBSCRIPTION                 |
| lite           | bi-weekly    | LITE - BI-WEEKLY SUBSCRIPTION                 |
| lite           | annualy      | LITE - ANNUALY SUBSCRIPTION                   |
| basic          | monthly      | BASIC - MONTHLY SUBSCRIPTION                  |
| ...            | ...          | ...                                           |
| pay-as-you-go  | one-time     | X TOKEN PACK (où X est le nombre de tokens)   |

### Prix de base par plan et période

```typescript
const basePrices = {
  'lite': { monthly: 19.90, biweekly: 11.94, quarterly: 53.73, yearly: 191.04 },
  'basic': { monthly: 34.90, biweekly: 20.94, quarterly: 94.23, yearly: 335.04 },
  'advanced': { monthly: 49.90, biweekly: 29.94, quarterly: 134.73, yearly: 479.04 },
  'pro': { monthly: 69.90, biweekly: 41.94, quarterly: 188.73, yearly: 671.04 }
};
```

### Tokens inclus par plan et période

```typescript
const includedTokens = {
  'lite': { monthly: 45, biweekly: 27, quarterly: 121, yearly: 432 },
  'basic': { monthly: 100, biweekly: 60, quarterly: 270, yearly: 960 },
  'advanced': { monthly: 180, biweekly: 108, quarterly: 486, yearly: 1728 },
  'pro': { monthly: 300, biweekly: 180, quarterly: 810, yearly: 2880 }
};
```

### Prix des tokens supplémentaires par plan

```typescript
const additionalTokenPrices = {
  'lite': 0.75,
  'basic': 0.60,
  'advanced': 0.45,
  'pro': 0.35,
  'pay-as-you-go': 0.90  // Pour les achats à la carte
};
```

## Gestion des tokens

### Tokens dans les abonnements

1. **Tokens inclus** : Chaque plan inclut un nombre de tokens dépendant du plan et de la période.
2. **Tokens supplémentaires** : Dans la page pre-checkout, l'utilisateur peut ajouter des tokens supplémentaires.
3. **Prix des tokens supplémentaires** : Le prix par token varie selon le plan choisi.

### Tokens à la carte (Pay-as-you-go)

1. **Sélection de la quantité** : Dans la section pricing, l'utilisateur choisit une quantité de tokens.
2. **Prix unitaire fixe** : 0.90€ par token pour les achats à la carte.
3. **Pas de récurrence** : Affichage adapté dans pre-checkout (pas de prochaine facturation).

## Instructions d'implémentation

Pour dupliquer ce système dans un autre projet :

1. **Structure de données** :
   - Créer un fichier CSV similaire à `new_temp_cleaned_offres_adpulsai_28.csv`
   - Respecter le format des noms de produits pour permettre la recherche

2. **API** :
   - Implémenter un endpoint similaire à `app/api/products/route.ts` pour charger les données

3. **Classe ProductManager** :
   - Copier et adapter `lib/product-utils.ts` avec les prix et tokens spécifiques
   - Ajuster les méthodes de normalisation si nécessaire

4. **Composant Pricing** :
   - Adapter `app/components/layout/pricing.tsx` avec les plans spécifiques
   - Conserver la logique de construction d'URL vers pre-checkout

5. **Page Pre-checkout** :
   - Adapter `app/pre-checkout/page.tsx` en conservant la logique de traitement des paramètres
   - Adapter l'affichage selon les besoins

6. **Checkout final** :
   - Adapter la méthode `buildCheckoutUrl` pour pointer vers votre propre système de paiement

### Points d'attention

1. **Normalisation des périodes** : La différence entre formats d'affichage, de stockage et d'URL doit être gérée soigneusement.
2. **Cas spécial Pay-as-you-go** : Traiter différemment les achats one-time et les abonnements.
3. **Cohérence des prix** : Assurer que les prix affichés dans la section pricing correspondent à ceux dans pre-checkout.
4. **Prévenir les erreurs** : Ajouter des logs et validations pour identifier rapidement les problèmes.
5. **Construction manuelle de l'URL** : Éviter l'utilisation de `URLSearchParams` pour le paramètre `products` car elle encode automatiquement les caractères spéciaux (`:` et `;`), rendant l'URL incompatible avec CheckoutChamp.
6. **Gestion des données utilisateur** : Stocker les informations utilisateur dans le localStorage plutôt que dans l'URL pour maintenir un format d'URL propre et conforme aux exigences de CheckoutChamp.

## Fichiers clés

| Fichier | Fonction |
|---------|----------|
| `app/components/layout/pricing.tsx` | Composant d'affichage des plans et options |
| `lib/product-utils.ts` | Classe de gestion des produits et prix |
| `app/pre-checkout/page.tsx` | Page de récapitulatif avant paiement |
| `app/api/products/route.ts` | API pour charger les données de produits |
| `public/new_temp_cleaned_offres_adpulsai_28.csv` | Données des produits |

## Structure technique détaillée

### API Products

**Fichier** : `app/api/products/route.ts`

```typescript
export async function GET() {
  try {
    const csvPath = path.join(process.cwd(), 'public', 'new_temp_cleaned_offres_adpulsai_28.csv');
    const csvContent = await fs.readFile(csvPath, 'utf-8');
    
    // Parse le CSV
    const lines = csvContent.split('\n');
    const headers = lines[0].split(',');
    
    const products = lines.slice(1).map(line => {
      const values = line.split(',');
      return headers.reduce((obj, header, index) => {
        obj[header.trim()] = values[index]?.trim();
        return obj;
      }, {} as Record<string, string>);
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error('Erreur lors de la lecture du CSV:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la lecture des produits' },
      { status: 500 }
    );
  }
}
```

Cette API lit le fichier CSV, parse les données et les renvoie au format JSON.

### Normalisation des périodes

La gestion des périodes est particulièrement complexe en raison des différents formats utilisés :

1. **Format dans l'URL** : `bi-weekly`, `yearly`
2. **Format dans le CSV** : `BI-WEEKLY`, `ANNUALY`
3. **Format dans les objets de prix** : `biweekly`, `yearly`

La normalisation se fait en deux étapes :
- `normalizePeriod` pour la recherche dans le CSV
- Normalisation spécifique pour l'accès aux objets de prix

```typescript
// Pour la recherche CSV
if (periodLower === 'bi-weekly' || periodLower === 'biweekly') {
  return 'bi-weekly';
}

// Pour l'accès aux prix
if (periodKey === 'bi-weekly' || periodKey === 'biweekly') {
  periodKey = 'biweekly';
}
```

### Construction de l'URL de checkout

```typescript
public buildCheckoutUrl(products: CheckoutProducts): string {
  const baseUrl = process.env.NEXT_PUBLIC_CHECKOUT_URL || 'https://checkout.mysite.com/checkout';
  
  // Construire le paramètre 'products' selon la syntaxe de CheckoutChamp: campaignProductId:quantity
  const productParams: string[] = [];
  
  if (products.subscriptionId) {
    productParams.push(`${products.subscriptionId}:1`);
  }
  if (products.tokenPackId) {
    productParams.push(`${products.tokenPackId}:1`);
  }

  // Construire l'URL manuellement pour éviter l'encodage automatique des caractères spéciaux
  if (productParams.length > 0) {
    return `${baseUrl}?products=${productParams.join(';')}`;
  } else {
    return baseUrl;
  }
}
```

Les paramètres utilisateur sont stockés dans le localStorage plutôt que dans l'URL:
```typescript
// Stocker dans le localStorage au lieu de l'URL
localStorage.setItem('checkout_firstName', firstName);
localStorage.setItem('checkout_lastName', lastName);
localStorage.setItem('checkout_email', email);
localStorage.setItem('checkout_newsletter', acceptedNewsletter ? '1' : '0');
```

## Format du lien de checkout pour CheckoutChamp

Pour se conformer au format attendu par CheckoutChamp, le lien de checkout suit cette structure:

```
https://checkout.mysite.com/checkout?products=campaignProductId:quantity
```

Pour plusieurs produits (par exemple un abonnement avec tokens supplémentaires):

```
https://checkout.mysite.com/checkout?products=campaignProductId1:1;campaignProductId2:1
```

Les points importants:
- Les caractères spéciaux (`:` et `;`) ne sont pas encodés en URL
- Seul le paramètre `products` est inclus dans l'URL
- Les informations utilisateur sont stockées dans le localStorage

## Diagramme de flux complet

```
┌─────────────────┐    ┌────────────────────┐    ┌───────────────────┐    ┌────────────────┐
│  pricing.tsx    │    │  pre-checkout/page │    │  product-utils.ts │    │  stripe/autre  │
│  (Composant)    │    │  (Page NextJS)     │    │  (Classe utilitaire) │    │  (Service externe) │
└────────┬────────┘    └─────────┬──────────┘    └─────────┬─────────┘    └────────┬───────┘
         │                       │                         │                       │
         │ Sélection plan        │                         │                       │
         │ & période             │                         │                       │
         │                       │                         │                       │
         ▼                       │                         │                       │
┌─────────────────┐             │                         │                       │
│  Construction   │             │                         │                       │
│  URL avec       │             │                         │                       │
│  paramètres     │             │                         │                       │
└────────┬────────┘             │                         │                       │
         │                       │                         │                       │
         │ URL: ?plan=X&period=Y │                         │                       │
         └──────────────────────►│                         │                       │
                                 │                         │                       │
                                 │ Chargement initial      │                       │
                                 ├────────────────────────►│                       │
                                 │                         │                       │
                                 │                         │ GET /api/products     │
                                 │                         │ ───────────────────►  │
                                 │                         │                       │
                                 │                         │ ◄─────────────────── │
                                 │                         │ JSON response         │
                                 │                         │                       │
                                 │ Recherche produit       │                       │
                                 ├────────────────────────►│                       │
                                 │                         │                       │
                                 │ ◄────────────────────── │                       │
                                 │ ProductDetails          │                       │
                                 │                         │                       │
                                 │ Construction URL        │                       │
                                 │ checkout                │                       │
                                 ├────────────────────────►│                       │
                                 │                         │                       │
                                 │ ◄────────────────────── │                       │
                                 │ URL checkout            │                       │
                                 │                         │                       │
                                 │ Soumission formulaire   │                       │
                                 │ ───────────────────────────────────────────────►│
                                 │                         │                       │
                                 │                         │                       │ Traitement
                                 │                         │                       │ paiement
                                 │                         │                       │
                                 │                         │                       ▼
                                 │                         │            ┌───────────────────┐
                                 │                         │            │  Confirmation     │
                                 │                         │            │  & redirection    │
                                 │                         │            └───────────────────┘
```

## Calcul des prix

### Exemple de calcul pour un abonnement

1. **Prix de base** : Déterminé par le plan et la période
   ```typescript
   const planPrice = basePrices[plan.toLowerCase()][periodKey] || 0;
   // Ex: basic + monthly = 34.90€
   ```

2. **Prix des tokens supplémentaires** :
   ```typescript
   const additionalTokensPrice = additionalTokens * productDetails.additionalTokenPrice;
   // Ex: 20 tokens * 0.60€ = 12.00€
   ```

3. **Prix total** :
   ```typescript
   const totalPrice = basePrice + additionalTokensPrice;
   // Ex: 34.90€ + 12.00€ = 46.90€
   ```

### Exemple de calcul pour un achat à la carte

1. **Prix unitaire fixe** : 0.90€ par token
2. **Prix total** : Nombre de tokens × Prix unitaire
   ```typescript
   const totalPrice = tokenCount * tokenPrice;
   // Ex: 50 tokens * 0.90€ = 45.00€
   ```

## Transformation des noms d'affichage

| Format technique | Format d'affichage (FR) | Format d'affichage (EN) |
|------------------|-------------------------|-------------------------|
| monthly          | mensuelle               | monthly                 |
| quarterly        | trimestrielle           | quarterly               |
| bi-weekly        | bi-hebdomadaire         | bi-weekly               |
| annualy          | annuelle                | yearly                  |
| one-time         | paiement unique         | one-time                |

Cette transformation est gérée par la fonction `translatePeriod` dans `pre-checkout/page.tsx`.

## Vérifications et validations

Le système inclut plusieurs vérifications pour éviter les erreurs :

1. **Paramètres manquants** :
   ```typescript
   if (!planParam || !periodParam) {
     throw new Error('Plan et période requis');
   }
   ```

2. **Tokens requis pour achat unique** :
   ```typescript
   if (isOneTime && !tokens) {
     throw new Error('Nombre de tokens requis pour un achat unique');
   }
   ```

3. **Produit non trouvé** :
   ```typescript
   if (!subscriptionId) {
     throw new Error(`Produit non trouvé pour le plan ${planParam} et la période ${periodParam}`);
   }
   ```

4. **Conditions d'utilisation** :
   ```typescript
   if (!acceptedTerms || !acceptedAgeVerification) {
     alert('Veuillez accepter les conditions requises pour continuer');
     return;
   }
   ```

5. **Types TypeScript explicites** :
   ```typescript
   // Éviter les erreurs d'indexation avec des types explicites
   const basePrices: Record<string, Record<string, number>> = {
     'lite': { monthly: 19.90, biweekly: 11.94, quarterly: 53.73, yearly: 191.04 },
     // ...
   };
   ```
   Cette annotation est nécessaire pour manipuler en toute sécurité les objets de prix avec des clés dynamiques (`plan.toLowerCase()`).

## Adaptations possibles

### Changement de système de paiement

Si vous souhaitez utiliser un autre système de paiement que CheckoutChamp, modifiez la méthode `buildCheckoutUrl` selon le format attendu par votre système :

```typescript
public buildCheckoutUrl(products: CheckoutProducts): string {
  const baseUrl = process.env.NEXT_PUBLIC_CHECKOUT_URL || 'https://votresysteme.com/checkout';
  
  // Adaptez selon le format de votre système de paiement
  const params = new URLSearchParams();
  
  // Exemple pour un système qui utilise des paramètres product_id et quantity
  if (products.subscriptionId) {
    params.append('product_id', products.subscriptionId);
    params.append('quantity', '1');
  }
  
  return `${baseUrl}?${params.toString()}`;
}
```

### Ajout de nouveaux plans ou périodes

1. **Ajoutez les données dans le CSV**
2. **Ajoutez les prix dans les objets** :
   ```typescript
   const basePrices = {
     'nouveau-plan': { monthly: 59.90, biweekly: 35.94, ... },
     ...
   };
   ```
3. **Ajoutez la période dans la normalisation si nécessaire**

### Inclusion des données utilisateur dans l'URL

Si votre système de paiement nécessite que les informations utilisateur soient dans l'URL, modifiez la méthode handleSubmit :

```typescript
const url = new URL(checkoutUrl);
url.searchParams.append('firstName', firstName);
url.searchParams.append('lastName', lastName);
url.searchParams.append('email', email);
// etc.
window.location.href = url.toString();
```

### Support d'autres formats d'URL de checkout

Le format actuel (`products=id:quantity;id:quantity`) est spécifique à CheckoutChamp. Si vous avez besoin d'un autre format :

```typescript
// Pour un format comme ?items[0][id]=123&items[0][qty]=1&items[1][id]=456&items[1][qty]=1
const params = new URLSearchParams();
if (products.subscriptionId) {
  params.append('items[0][id]', products.subscriptionId);
  params.append('items[0][qty]', '1');
}
if (products.tokenPackId) {
  params.append('items[1][id]', products.tokenPackId);
  params.append('items[1][qty]', '1');
}
return `${baseUrl}?${params.toString()}`;
```

---

Cette documentation est destinée à permettre la duplication exacte du système de pricing et checkout dans d'autres projets. Pour toute question ou clarification supplémentaire, contactez l'équipe technique d'AdPulseAI. 