# Configuration des liens de checkout

Ce dossier contient les fichiers de configuration pour les liens de checkout de la plateforme.

## Fichier `checkout-links.ts`

Ce fichier contient les liens vers les pages de paiement externes pour les différentes options d'achat :
- Achats de tokens à la carte
- Abonnements aux différents plans

### Structure du fichier

Le fichier est organisé en deux parties principales :

1. **Tokens à la carte** : Configuration des liens pour l'achat de tokens par tranches de 10, de 10 à 500 tokens.
2. **Abonnements** : Configuration des liens pour les différents plans d'abonnement et périodes de facturation.

### Comment modifier les liens

Pour mettre à jour les liens de checkout, modifiez simplement les valeurs dans les objets `tokenCheckoutLinks` et `subscriptionCheckoutLinks`.

#### Exemple pour les tokens à la carte

```typescript
export const tokenCheckoutLinks: TokenCheckoutLinks = {
  10: "https://checkout.stripe.com/c/pay/cs_live_token_10",
  20: "https://checkout.stripe.com/c/pay/cs_live_token_20",
  // ...
};
```

#### Exemple pour les abonnements

```typescript
export const subscriptionCheckoutLinks: SubscriptionCheckoutLinks = {
  "Starter": {
    "monthly": "https://checkout.stripe.com/c/pay/cs_live_starter_monthly",
    // ...
  },
  // ...
};
```

### Fonctions utilitaires

Le fichier fournit également deux fonctions utilitaires :

1. `getTokenCheckoutLink(tokenAmount)` : Obtient le lien de checkout pour un achat de tokens à la carte.
2. `getSubscriptionCheckoutLink(plan, period)` : Obtient le lien de checkout pour un abonnement.

## Intégration avec Stripe

Pour intégrer avec Stripe, suivez ces étapes :

1. Créez les produits et les prix dans votre tableau de bord Stripe
2. Créez des liens de paiement pour chaque combinaison de produit/prix
3. Copiez les liens générés dans le fichier `checkout-links.ts`

### Paramètres supplémentaires

Vous pouvez ajouter des paramètres supplémentaires aux liens Stripe pour personnaliser l'expérience de paiement :

- `client_reference_id` : Identifiant de référence client
- `customer_email` : Email pré-rempli
- `locale` : Langue de l'interface de paiement

Exemple :
```
https://checkout.stripe.com/c/pay/cs_live_token_10?locale=fr&customer_email={{email}}
```

## Mise à jour des liens

Les liens doivent être mis à jour manuellement lorsque :
- Vous modifiez les prix dans Stripe
- Vous ajoutez de nouvelles options d'achat
- Vous passez de l'environnement de test à l'environnement de production

## Environnements

Pour gérer différents environnements (développement, production), vous pouvez créer des fichiers distincts :
- `checkout-links.dev.ts`
- `checkout-links.prod.ts`

Et importer le fichier approprié en fonction de l'environnement. 