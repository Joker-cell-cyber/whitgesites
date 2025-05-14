'use client';

import { getArticles as getArticlesFromAuth } from './auth-service';
import { Article } from './types';

// Catégories disponibles
export const categories = [
  'Marketing',
  'SEO',
  'Technologie',
  'Business',
  'Lifestyle',
  'Finance',
  'Santé',
  'Éducation'
];

// Tags disponibles
export const tags = [
  'Débutant',
  'Avancé',
  'Guide',
  'Tutoriel',
  'Astuces',
  'Tendances',
  'Outils',
  'Stratégie',
  'Analyse',
  'Optimisation',
  'Conversion',
  'Trafic',
  'Référencement',
  'Contenu',
  'Social Media'
];

// Articles de démonstration pour l'utilisateur test
const demoArticles: Article[] = [
  {
    id: 'article-1',
    title: 'Comment optimiser votre site pour le référencement en 2025',
    content: `# Comment optimiser votre site pour le référencement en 2025

## Introduction

Le référencement naturel (SEO) est en constante évolution. Avec les mises à jour des algorithmes de Google et l'émergence de nouvelles technologies, il est crucial de rester à jour avec les meilleures pratiques. Dans cet article, nous allons explorer les stratégies d'optimisation SEO les plus efficaces pour 2025.

## L'importance de l'intention de recherche

En 2025, comprendre l'intention de recherche est plus important que jamais. Google utilise désormais des modèles d'IA avancés pour comprendre le contexte et l'intention derrière les requêtes des utilisateurs. Pour réussir en SEO, vous devez:

- Analyser les requêtes pour lesquelles vous souhaitez vous positionner
- Comprendre ce que les utilisateurs recherchent réellement
- Créer du contenu qui répond précisément à ces intentions

## L'optimisation pour la recherche vocale

Avec la popularité croissante des assistants vocaux comme Alexa, Siri et Google Assistant, l'optimisation pour la recherche vocale est devenue essentielle. Les recherches vocales sont généralement:

- Plus longues que les recherches textuelles
- Formulées sous forme de questions
- Conversationnelles et naturelles

Pour optimiser votre site pour la recherche vocale:

1. Utilisez des mots-clés à longue traîne sous forme de questions
2. Créez des sections FAQ qui répondent aux questions courantes
3. Optimisez pour les featured snippets (position zéro)

## L'expérience utilisateur comme facteur de classement

Google accorde une importance croissante à l'expérience utilisateur. Les Core Web Vitals sont désormais des facteurs de classement essentiels:

- Largest Contentful Paint (LCP): mesure la vitesse de chargement
- First Input Delay (FID): mesure l'interactivité
- Cumulative Layout Shift (CLS): mesure la stabilité visuelle

Pour améliorer ces métriques:

- Optimisez les images et utilisez des formats modernes comme WebP
- Minimisez le JavaScript et le CSS
- Utilisez la mise en cache du navigateur
- Implémentez le lazy loading pour les images et les vidéos

## Le contenu E-A-T (Expertise, Autorité, Fiabilité)

Google continue de mettre l'accent sur la qualité du contenu, en particulier pour les sujets YMYL (Your Money Your Life). Pour démontrer l'E-A-T:

- Faites appel à des experts dans votre domaine
- Citez des sources fiables et actualisées
- Mettez à jour régulièrement votre contenu
- Incluez des informations sur les auteurs et leurs qualifications

## Conclusion

Le SEO en 2025 est plus complexe mais aussi plus axé sur la qualité et l'expérience utilisateur. En vous concentrant sur l'intention de recherche, l'optimisation pour la recherche vocale, l'expérience utilisateur et la création de contenu E-A-T, vous pourrez améliorer significativement le classement de votre site dans les résultats de recherche.

N'oubliez pas que le SEO est un marathon, pas un sprint. La constance et l'adaptation aux nouvelles tendances sont les clés du succès à long terme.`,
    excerpt: 'Découvrez les stratégies d\'optimisation SEO les plus efficaces pour 2025, de l\'intention de recherche à l\'expérience utilisateur en passant par la recherche vocale.',
    status: 'published',
    createdAt: new Date('2025-01-15T10:30:00Z'),
    updatedAt: new Date('2025-01-16T14:45:00Z'),
    publishedAt: new Date('2025-01-16T15:00:00Z'),
    author: 'Utilisateur Test',
    category: 'SEO',
    tags: ['Stratégie', 'Optimisation', 'Référencement', 'Guide'],
    seoScore: 92,
    readingTime: 8,
    wordCount: 1850,
    tokensUsed: 1200,
    imageUrl: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=1000',
    slug: 'comment-optimiser-votre-site-pour-le-referencement-en-2025'
  },
  {
    id: 'article-2',
    title: 'Les 7 tendances du marketing digital à surveiller en 2025',
    content: `# Les 7 tendances du marketing digital à surveiller en 2025

## Introduction

Le paysage du marketing digital évolue rapidement, avec de nouvelles technologies et stratégies qui émergent constamment. Pour rester compétitif, il est essentiel de se tenir au courant des dernières tendances. Voici les 7 tendances du marketing digital qui domineront en 2025.

## 1. Marketing basé sur l'IA

L'intelligence artificielle transforme le marketing digital de plusieurs façons:

- Personnalisation avancée basée sur le comportement des utilisateurs
- Chatbots et assistants virtuels plus sophistiqués
- Analyse prédictive pour anticiper les besoins des clients
- Création de contenu assistée par l'IA

Les marques qui adoptent l'IA peuvent offrir des expériences plus personnalisées et efficaces, tout en réduisant les coûts opérationnels.

## 2. Marketing conversationnel

Le marketing conversationnel continue de gagner en importance:

- Messagerie instantanée et chatbots sur les sites web
- Marketing par WhatsApp et autres applications de messagerie
- Expériences d'achat conversationnelles
- Support client en temps réel

Cette approche plus humaine et interactive permet de créer des relations plus fortes avec les clients.

## 3. Réalité augmentée et virtuelle

La réalité augmentée (RA) et la réalité virtuelle (RV) offrent de nouvelles façons d'engager les consommateurs:

- Essayage virtuel de produits
- Visites immersives de propriétés ou de destinations
- Expériences de marque interactives
- Formation et démonstrations de produits en RA/RV

Ces technologies réduisent les frictions dans le parcours d'achat et offrent des expériences mémorables.

## 4. Marketing de contenu vidéo court

Les formats vidéo courts continuent de dominer:

- TikTok, Instagram Reels et YouTube Shorts
- Contenus authentiques et spontanés
- Tutoriels et démonstrations rapides
- Storytelling visuel concis

Les marques doivent maîtriser l'art de communiquer efficacement en quelques secondes.

## 5. Commerce social

Le commerce social fusionne les médias sociaux et le e-commerce:

- Achats intégrés sur Instagram, Facebook, TikTok et Pinterest
- Live shopping et démonstrations en direct
- UGC (contenu généré par les utilisateurs) comme outil de vente
- Communautés de marque engagées

Cette tendance raccourcit considérablement le parcours d'achat des consommateurs.

## 6. Marketing sans cookies

Avec la disparition progressive des cookies tiers:

- Stratégies de collecte de données first-party
- Marketing basé sur le consentement
- Solutions d'identité alternatives
- Personnalisation contextuelle plutôt que comportementale

Les marques doivent repenser leur approche de la personnalisation et du ciblage.

## 7. Durabilité et marketing éthique

Les consommateurs sont de plus en plus sensibles aux questions éthiques:

- Communication transparente sur l'impact environnemental
- Initiatives de durabilité authentiques
- Valeurs de marque alignées sur les préoccupations sociales
- Marketing inclusif et diversifié

Les marques qui adoptent des pratiques éthiques gagnent la confiance et la fidélité des consommateurs.

## Conclusion

Pour réussir en marketing digital en 2025, les entreprises doivent rester agiles et ouvertes à l'innovation. L'adoption de ces tendances ne doit pas se faire au détriment des fondamentaux du marketing: comprendre votre audience, offrir de la valeur et mesurer vos résultats reste essentiel.

En intégrant ces tendances dans une stratégie marketing cohérente et centrée sur le client, vous pourrez non seulement suivre l'évolution du paysage digital, mais aussi vous démarquer de la concurrence.`,
    excerpt: 'Découvrez les 7 tendances qui façonneront le paysage du marketing digital en 2025, de l\'IA au commerce social en passant par la réalité augmentée.',
    status: 'published',
    createdAt: new Date('2025-02-03T09:15:00Z'),
    updatedAt: new Date('2025-02-04T11:30:00Z'),
    publishedAt: new Date('2025-02-04T13:00:00Z'),
    author: 'Utilisateur Test',
    category: 'Marketing',
    tags: ['Tendances', 'Stratégie', 'Digital', 'IA'],
    seoScore: 88,
    readingTime: 7,
    wordCount: 1650,
    tokensUsed: 1050,
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000',
    slug: 'les-7-tendances-du-marketing-digital-a-surveiller-en-2025'
  },
  {
    id: 'article-3',
    title: 'Comment créer une stratégie de contenu efficace pour votre entreprise',
    content: `# Comment créer une stratégie de contenu efficace pour votre entreprise

## Introduction

Une stratégie de contenu bien conçue est essentielle pour attirer, engager et convertir votre audience cible. Dans cet article, nous allons vous guider à travers les étapes nécessaires pour créer une stratégie de contenu efficace qui soutient vos objectifs commerciaux.

## Définir vos objectifs

Avant de commencer à créer du contenu, vous devez définir clairement vos objectifs:

- Augmenter la notoriété de la marque
- Générer des leads qualifiés
- Éduquer votre marché
- Fidéliser les clients existants
- Établir votre autorité dans votre secteur

Vos objectifs doivent être SMART: Spécifiques, Mesurables, Atteignables, Réalistes et Temporellement définis.

## Connaître votre audience

Une stratégie de contenu efficace commence par une compréhension approfondie de votre audience:

1. Créez des personas d'acheteurs détaillés
2. Identifiez leurs défis, besoins et questions
3. Analysez leur parcours d'achat
4. Déterminez où ils recherchent de l'information
5. Comprenez leur langage et leurs préférences de contenu

Plus vous connaissez votre audience, plus votre contenu sera pertinent et engageant.

## Réaliser un audit de contenu

Si vous avez déjà du contenu, effectuez un audit pour:

- Identifier ce qui fonctionne bien
- Repérer les lacunes dans votre contenu actuel
- Trouver les opportunités d'amélioration
- Éliminer ou mettre à jour le contenu obsolète
- Analyser les performances par rapport à vos concurrents

Cet audit vous donnera une base solide pour planifier votre future stratégie.

## Choisir les bons formats et canaux

Différents types de contenu servent différents objectifs:

- Blog posts pour le référencement et l'éducation
- Vidéos pour les démonstrations et l'engagement
- Infographies pour simplifier des concepts complexes
- Podcasts pour des discussions approfondies
- Études de cas pour prouver votre valeur
- Webinaires pour la génération de leads

Choisissez les formats qui correspondent aux préférences de votre audience et aux ressources dont vous disposez.

## Créer un calendrier éditorial

Un calendrier éditorial vous aide à:

- Maintenir une publication régulière
- Coordonner les efforts de votre équipe
- Aligner le contenu sur les événements saisonniers ou sectoriels
- Équilibrer les différents types de contenu
- Suivre les progrès vers vos objectifs

Votre calendrier doit être flexible pour s'adapter aux changements de priorités ou aux opportunités émergentes.

## Optimiser pour le SEO

Le référencement naturel reste crucial pour la visibilité de votre contenu:

- Recherchez des mots-clés pertinents avec un volume de recherche adéquat
- Optimisez les titres, méta-descriptions et URL
- Structurez votre contenu avec des sous-titres appropriés
- Incluez des liens internes et externes de qualité
- Optimisez les images avec des balises alt et une compression appropriée

L'objectif est de créer du contenu pour les humains d'abord, tout en le rendant facilement découvrable par les moteurs de recherche.

## Promouvoir votre contenu

La création n'est que la moitié du travail:

- Partagez sur les réseaux sociaux appropriés
- Envoyez à votre liste d'email
- Contactez les influenceurs de votre secteur
- Republiez sur des plateformes comme Medium ou LinkedIn
- Envisagez la promotion payante pour le contenu à forte valeur

Un plan de promotion solide maximise le retour sur investissement de votre contenu.

## Mesurer et ajuster

Utilisez des métriques pertinentes pour évaluer l'efficacité de votre contenu:

- Trafic et engagement (vues, temps passé, taux de rebond)
- Partages sociaux et backlinks
- Génération de leads et conversions
- Classement des mots-clés
- Feedback qualitatif des clients

Analysez régulièrement ces données pour affiner votre stratégie et améliorer vos résultats.

## Conclusion

Une stratégie de contenu efficace n'est pas statique. Elle évolue avec votre entreprise, votre marché et les comportements de votre audience. En suivant ces étapes et en restant flexible, vous pouvez créer une stratégie de contenu qui génère des résultats durables pour votre entreprise.

N'oubliez pas que la cohérence et la qualité sont essentielles. Il vaut mieux publier moins de contenu mais de meilleure qualité, que de sacrifier la pertinence et la valeur pour la quantité.`,
    excerpt: 'Apprenez à développer une stratégie de contenu qui génère des résultats concrets pour votre entreprise, de la définition des objectifs à la mesure des performances.',
    status: 'published',
    createdAt: new Date('2025-02-20T14:20:00Z'),
    updatedAt: new Date('2025-02-21T16:45:00Z'),
    publishedAt: new Date('2025-02-22T09:00:00Z'),
    author: 'Utilisateur Test',
    category: 'Marketing',
    tags: ['Contenu', 'Stratégie', 'SEO', 'Guide'],
    seoScore: 95,
    readingTime: 9,
    wordCount: 2100,
    tokensUsed: 1350,
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1000',
    slug: 'comment-creer-une-strategie-de-contenu-efficace-pour-votre-entreprise'
  }
];

// Fonction pour récupérer tous les articles
export async function getArticles(): Promise<Article[]> {
  try {
    return await getArticlesFromAuth();
  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error);
    return [];
  }
}

// Fonction pour récupérer un article par son ID
export async function getArticleById(id: string): Promise<Article | null> {
  // Pour l'utilisateur de test, rechercher dans les articles de démonstration
  if (id === 'test-user-id') {
    const article = demoArticles.find(a => a.id === id);
    return article || null;
  }
  
  // Pour les autres utilisateurs, retourner null
  return null;
}

// Fonction pour créer un nouvel article
export async function createArticle(articleData: Partial<Article>): Promise<Article> {
  // Générer un ID unique
  const id = `article-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  
  // Créer un nouvel article avec des valeurs par défaut
  const newArticle: Article = {
    id,
    title: articleData.title || 'Nouvel article',
    content: articleData.content || '',
    excerpt: articleData.excerpt || '',
    status: articleData.status || 'draft',
    createdAt: new Date(),
    updatedAt: new Date(),
    publishedAt: articleData.status === 'published' ? new Date() : undefined,
    author: 'Utilisateur Test',
    category: articleData.category || 'Marketing',
    tags: articleData.tags || [],
    seoScore: articleData.seoScore || 0,
    readingTime: articleData.readingTime || 0,
    wordCount: articleData.wordCount || 0,
    tokensUsed: articleData.tokensUsed || 0,
    imageUrl: articleData.imageUrl,
    slug: articleData.slug || id
  };
  
  return newArticle;
}

// Fonction pour mettre à jour un article
export async function updateArticle(id: string, articleData: Partial<Article>): Promise<Article> {
  // Récupérer l'article existant
  const existingArticle = await getArticleById(id);
  if (!existingArticle) {
    throw new Error('Article non trouvé');
  }
  
  // Mettre à jour l'article
  const updatedArticle: Article = {
    ...existingArticle,
    ...articleData,
    updatedAt: new Date(),
    publishedAt: articleData.status === 'published' && !existingArticle.publishedAt ? new Date() : existingArticle.publishedAt
  };
  
  return updatedArticle;
}

// Fonction pour supprimer un article
export async function deleteArticle(id: string): Promise<boolean> {
  // Vérifier si l'article existe
  const existingArticle = await getArticleById(id);
  if (!existingArticle) {
    throw new Error('Article non trouvé');
  }
  
  // Simuler la suppression
  return true;
}

// Fonction pour générer un article avec l'IA
export async function generateArticle(prompt: string, options: {
  length: 'short' | 'medium' | 'long';
  tone: 'formal' | 'casual' | 'professional';
  keywords: string[];
  category: string;
}): Promise<{
  article: Partial<Article>;
  tokensUsed: number;
}> {
  // Calculer le nombre de tokens utilisés en fonction de la longueur
  let tokensUsed = 0;
  let wordCount = 0;
  let readingTime = 0;
  
  switch (options.length) {
    case 'short':
      tokensUsed = Math.floor(Math.random() * 300) + 500;
      wordCount = Math.floor(Math.random() * 300) + 700;
      readingTime = Math.floor(wordCount / 200);
      break;
    case 'medium':
      tokensUsed = Math.floor(Math.random() * 500) + 1000;
      wordCount = Math.floor(Math.random() * 500) + 1500;
      readingTime = Math.floor(wordCount / 200);
      break;
    case 'long':
      tokensUsed = Math.floor(Math.random() * 800) + 1800;
      wordCount = Math.floor(Math.random() * 1000) + 2500;
      readingTime = Math.floor(wordCount / 200);
      break;
  }
  
  // Générer un titre basé sur le prompt
  const title = `Comment ${prompt.toLowerCase()}`;
  
  // Générer un extrait
  const excerpt = `Découvrez les meilleures pratiques pour ${prompt.toLowerCase()} dans cet article complet qui vous guidera étape par étape.`;
  
  // Générer un contenu simulé
  const content = `# ${title}

## Introduction

${excerpt}

## Pourquoi c'est important

${options.keywords.join(', ')} sont des éléments essentiels pour réussir dans ce domaine.

## Les étapes à suivre

1. Première étape
2. Deuxième étape
3. Troisième étape

## Conclusion

En suivant ces conseils, vous pourrez ${prompt.toLowerCase()} efficacement.`;
  
  // Créer l'article généré
  const generatedArticle: Partial<Article> = {
    title,
    content,
    excerpt,
    status: 'draft',
    category: options.category,
    tags: options.keywords,
    seoScore: Math.floor(Math.random() * 20) + 80,
    readingTime,
    wordCount,
    tokensUsed,
    slug: title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-')
  };
  
  return {
    article: generatedArticle,
    tokensUsed
  };
}

// Fonction pour analyser le SEO d'un article
export async function analyzeSEO(articleId: string): Promise<{
  score: number;
  suggestions: Array<{
    type: 'title' | 'content' | 'keywords' | 'structure';
    suggestion: string;
    impact: 'high' | 'medium' | 'low';
  }>;
  keywords: Array<{
    keyword: string;
    density: number;
    competition: number;
  }>;
}> {
  // Récupérer l'article
  const article = await getArticleById(articleId);
  if (!article) {
    throw new Error('Article non trouvé');
  }
  
  // Générer un score SEO
  const score = Math.floor(Math.random() * 20) + 80;
  
  // Générer des suggestions d'amélioration
  const suggestions = [
    {
      type: 'title' as const,
      suggestion: 'Ajoutez un mot-clé principal au début de votre titre pour améliorer le référencement.',
      impact: 'high' as const
    },
    {
      type: 'content' as const,
      suggestion: 'Augmentez la densité de mots-clés dans le premier paragraphe de votre contenu.',
      impact: 'medium' as const
    },
    {
      type: 'keywords' as const,
      suggestion: 'Utilisez plus de variations de vos mots-clés principaux tout au long du texte.',
      impact: 'medium' as const
    },
    {
      type: 'structure' as const,
      suggestion: 'Ajoutez plus de sous-titres (H2, H3) pour améliorer la structure de votre contenu.',
      impact: 'low' as const
    }
  ];
  
  // Générer des mots-clés détectés
  const keywords = (article.tags || []).map(tag => ({
    keyword: tag,
    density: Math.random() * 2 + 0.5,
    competition: Math.random() * 100
  }));
  
  return {
    score,
    suggestions,
    keywords
  };
}

// Fonction pour optimiser un article avec l'IA
export async function optimizeArticle(articleId: string): Promise<{
  optimizedArticle: Article;
  improvements: string[];
  tokensUsed: number;
}> {
  // Récupérer l'article
  const article = await getArticleById(articleId);
  if (!article) {
    throw new Error('Article non trouvé');
  }
  
  // Calculer le nombre de tokens utilisés
  const tokensUsed = Math.floor(Math.random() * 300) + 200;
  
  // Simuler des améliorations
  const improvements = [
    'Titre optimisé pour inclure le mot-clé principal',
    'Densité de mots-clés améliorée dans le contenu',
    'Structure des sous-titres optimisée pour le référencement',
    'Méta-description améliorée pour augmenter le CTR',
    'Ajout de liens internes pertinents'
  ];
  
  // Créer une version optimisée de l'article
  const optimizedArticle: Article = {
    ...article,
    title: article.title.includes('[Optimisé]') ? article.title : `[Optimisé] ${article.title}`,
    seoScore: Math.min((article.seoScore || 0) + Math.floor(Math.random() * 10) + 5, 100),
    updatedAt: new Date()
  };
  
  return {
    optimizedArticle,
    improvements,
    tokensUsed
  };
}

/**
 * Récupère les articles récents générés par l'utilisateur
 * @returns Liste des articles récents
 */
export async function getRecentArticles() {
  try {
    // Simuler une attente réseau
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Pour cette démonstration, nous retournons des données factices
    // Dans une vraie application, on récupérerait ces données depuis une API
    return [
      {
        id: '1',
        title: 'Les tendances e-commerce en 2023',
        excerpt: 'Découvrez les tendances qui transforment le paysage du commerce électronique cette année...',
        tokens: 320,
        date: new Date(Date.now() - 24 * 60 * 60 * 1000)
      },
      {
        id: '2',
        title: 'Comment optimiser votre stratégie SEO',
        excerpt: 'Les meilleures pratiques pour améliorer votre référencement et gagner en visibilité...',
        tokens: 280,
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      },
      {
        id: '3',
        title: 'Guide du marketing d\'influence',
        excerpt: 'Tout ce que vous devez savoir pour lancer une campagne de marketing d\'influence efficace...',
        tokens: 350,
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      }
    ];
  } catch (error) {
    console.error('Erreur lors de la récupération des articles récents:', error);
    return [];
  }
}

/**
 * Récupère les descriptions de produits récentes générées par l'utilisateur
 * @returns Liste des descriptions de produits récentes
 */
export async function getRecentProductDescriptions() {
  try {
    // Simuler une attente réseau
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Pour cette démonstration, nous retournons des données factices
    return [
      {
        id: '1',
        productName: 'Montre connectée SmartFit Pro',
        excerpt: 'Montre connectée avec suivi d\'activité avancé, notifications et autonomie de 10 jours...',
        tokens: 210,
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        id: '2',
        productName: 'Enceinte Bluetooth SoundWave',
        excerpt: 'Enceinte portable étanche avec son stéréo et basses profondes...',
        tokens: 180,
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
      }
    ];
  } catch (error) {
    console.error('Erreur lors de la récupération des descriptions récentes:', error);
    return [];
  }
} 