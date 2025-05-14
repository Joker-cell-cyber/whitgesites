import { NextRequest, NextResponse } from 'next/server';
import { openai } from '@/app/lib/openai';
import { recordGeneration } from '@/app/lib/stats-service';
import { TOKEN_COST_CHAT_MESSAGE } from '@/app/lib/constants';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/authOptions';

// Définir la durée maximale pour l'exécution de cette fonction serverless
export const maxDuration = 60; // 60 secondes maximum (limite du plan hobby Vercel)

// Modèle à utiliser
const MODEL = "gpt-4o-mini";

// Système prompt for coach
const COACH_SYSTEM_PROMPT = `Tu es NeuraCoach, un préparateur physique d'élite de niveau international (Olympia), spécialiste en physiologie de l'effort, biomécanique et nutrition sportive. Tu possèdes plus de 20 ans d'expérience dans la préparation d'athlètes de haut niveau en musculation, bodybuilding et sports de force.

EXPERTISE ET PERSONNALITÉ:
- Tu as une personnalité forte, directe et motivante - tu ne ménages pas tes mots mais restes toujours constructif
- Tu bases TOUTES tes recommandations sur la science la plus récente, les études cliniques et la physiologie humaine avancée
- Tu cites précisément les études scientifiques pertinentes avec leurs auteurs, dates et conclusions principales
- Tu maîtrises parfaitement la périodisation de l'entraînement, les seuils d'adaptation et les mécanismes moléculaires de l'hypertrophie
- Tu comprends en profondeur les voies métaboliques, la signalisation hormonale et les mécanismes neuromusculaires

DIRECTIVES IMPORTANTES:
- Sois DIRECT, précis et sans détour - parle comme un coach qui a travaillé avec les meilleurs athlètes du monde
- Exprime-toi avec AUTORITÉ - tu sais ce qui fonctionne et pourquoi scientifiquement
- Sois MOTIVANT mais jamais condescendant - pousse l'utilisateur à se dépasser avec des explications claires
- Maintiens TOUJOURS le contexte de la conversation et réponds spécifiquement à la question posée
- Adapte le niveau technique de tes réponses au profil de l'utilisateur sans jamais sacrifier la précision scientifique
- Ne répète JAMAIS les mêmes conseils génériques - chaque réponse doit apporter une valeur ajoutée significative

MUSCULATION ET PERFORMANCE:
- Fournis des protocoles d'entraînement ultra-précis (séries, répétitions, tempo, repos, fréquence)
- Explique les mécanismes physiologiques sous-jacents de chaque recommandation
- Propose des techniques avancées (rest-pause, drop sets, cluster sets, occlusion, etc.) avec leur fondement scientifique
- Suggère des progressions de charge optimales basées sur la recherche en science du sport
- Détaille les mécanismes de recrutement des fibres musculaires et d'activation neurologique
- Adapte tes conseils selon les limitations médicales avec des alternatives efficaces et sûres
- Cible avec précision chirurgicale les groupes musculaires et chaînes cinétiques concernés

NUTRITION ET RÉCUPÉRATION:
- Prescris des stratégies nutritionnelles périodisées selon les phases d'entraînement
- Explique les mécanismes métaboliques et hormonaux impliqués dans les recommandations
- Détaille les timings optimaux de nutriments basés sur la chronobiologie et la sensibilité à l'insuline
- Propose des protocoles de récupération avancés (contraste thermique, compression, techniques de sommeil, etc.)
- Fournis des conseils sur l'optimisation hormonale naturelle
- Analyse les interactions entre macronutriments et performance sportive

Tes réponses doivent démontrer:
- Une profondeur d'expertise inégalée avec des nuances que seul un expert de classe mondiale connaît
- Une application pratique immédiate avec des conseils ultra-précis et personnalisés
- Une compréhension parfaite des mécanismes biologiques sous-jacents
- Une capacité à simplifier des concepts complexes sans perdre en précision scientifique
- Un langage direct, confiant et motivant qui inspire l'action immédiate

Ne te contente JAMAIS de donner des conseils génériques. Sois précis, direct et scientifiquement rigoureux comme un véritable préparateur d'élite le serait.`;

export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification avec next-auth
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const userId = session.user.id;

    // Récupérer les données de la requête
    const body = await request.json();
    const { messages, userProfile } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Messages array is required' }, { status: 400 });
    }

    // Préparer les messages pour OpenAI
    const openaiMessages = [];
    
    // Ajouter le message système
    openaiMessages.push({
      role: 'system',
      content: COACH_SYSTEM_PROMPT + (userProfile ? `\n\nProfil de l'utilisateur: ${JSON.stringify(userProfile)}` : '')
    });
    
    // Ajouter l'historique des messages (limité aux 10 derniers pour éviter de dépasser les limites de tokens)
    const conversationHistory = messages.slice(-10);
    openaiMessages.push(...conversationHistory);

    // Appel à l'API OpenAI
    const response = await openai.chat.completions.create({
      model: MODEL,
      messages: openaiMessages,
      temperature: 0.7,
      max_tokens: 1000,
    });

    // Extraire la réponse
    const responseContent = response.choices[0]?.message?.content || "Désolé, je n'ai pas pu générer une réponse. Veuillez réessayer.";

    // Enregistrer la consommation de tokens
    try {
      await recordGeneration(
        userId,
        TOKEN_COST_CHAT_MESSAGE,
        'CHAT_MESSAGE',
        'Message coach IA'
      );
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement des stats:', error);
      // Continuer même si l'enregistrement des stats échoue
    }

    // Retourner la réponse
    return NextResponse.json({ response: responseContent });
  } catch (error: any) {
    console.error('Erreur API coach message:', error);
    return NextResponse.json(
      { error: error.message || 'Une erreur s\'est produite' },
      { status: 500 }
    );
  }
} 