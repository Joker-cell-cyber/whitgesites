# Système de Génération de Plans Nutritionnels

Ce système permet aux utilisateurs de générer des plans nutritionnels personnalisés basés sur leurs objectifs, préférences et données biométriques.

## Fonctionnalités

- Formulaire complet pour la saisie des données utilisateur
- Génération de plans nutritionnels personnalisés avec IA
- Stockage et gestion des plans générés
- Visualisation détaillée des plans avec macronutriments et repas
- Téléchargement des plans au format texte
- Filtrage des plans par objectif

## Architecture

### Frontend

- **Page principale**: `/app/(routes)/(dashboard)/nutrition/page.tsx`
  - Interface pour générer, visualiser et gérer les plans nutritionnels

- **Composant de liste**: `/app/components/account/user-nutrition-plans.tsx`
  - Affiche les plans nutritionnels enregistrés de l'utilisateur
  - Gère la suppression et le téléchargement des plans

### Backend

- **Service de nutrition**: `/app/lib/nutrition-service.ts`
  - Contient la logique de génération des plans nutritionnels avec OpenAI
  - Calcule les métriques métaboliques
  - Génère les distributions de macronutriments et les recommandations alimentaires

- **Routes API**:
  - `/app/api/nutrition/route.ts`: Génère et enregistre un plan nutritionnel
  - `/app/api/nutrition/user/route.ts`: Récupère tous les plans de l'utilisateur
  - `/app/api/nutrition/[id]/route.ts`: Récupère ou supprime un plan spécifique

### Base de données

- Table `nutrition_plans` dans Supabase avec les champs suivants:
  - `id`: Identifiant unique du plan
  - `user_id`: Identifiant de l'utilisateur
  - `title`: Titre du plan
  - `goal`: Objectif principal du plan
  - `calories`: Nombre de calories quotidiennes
  - `data`: Données complètes du plan au format JSON
  - `created_at` et `updated_at`: Horodatages

## Modèles de données

Les principaux types sont définis dans `/app/lib/types/coach/nutrition.ts`:

- `UserNutritionProfile`: Profil nutritionnel de l'utilisateur
- `MacronutrientDistribution`: Distribution des macronutriments
- `MealTiming`: Timing et structure des repas
- `FoodItem`: Aliments recommandés
- `NutritionPlanDay`: Plan alimentaire journalier
- `NutritionProgram`: Programme nutritionnel complet

## Installation du système

1. Créer la table `nutrition_plans` avec le script SQL fourni
2. S'assurer que la clé API OpenAI est configurée dans les variables d'environnement
3. Vérifier que la connexion à Supabase est correctement configurée

## Futures améliorations possibles

- Ajout d'un éditeur pour modifier les plans générés
- Calendrier nutritionnel hebdomadaire
- Intégration avec un suivi de progression
- Liste de courses générée à partir des plans
- Exportation des plans au format PDF avec une mise en page professionnelle 