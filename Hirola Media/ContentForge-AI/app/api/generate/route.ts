import { NextRequest, NextResponse } from 'next/server';
import { generateBlogArticle } from '@/app/lib/openai';
import { getUserProfile } from '@/app/lib/auth-service';
import { recordGeneration } from '@/app/lib/server-state';
import { fetchGenerationStats, updateStatsAfterGeneration, invalidateStatsCache } from '@/app/lib/stats-service';
import { generateArticle } from '@/app/lib/ai-service';

export async function POST(request: NextRequest) {
  try {
    console.log('API /generate: Début de la requête');
    
    // Mesurer le temps de début
    const startTime = Date.now();
    
    // Récupérer les données de la requête
    const data = await request.json();
    console.log('API /generate: Données reçues', data);
    
    // Valider les données requises - accepter soit topic soit mainKeyword
    const topic = data.topic || data.mainKeyword;
    if (!topic) {
      console.log('API /generate: Sujet manquant');
      return NextResponse.json(
        { error: 'Le sujet est requis' },
        { status: 400 }
      );
    }

    // Vérifier que l'utilisateur est connecté
    if (!data.memberId) {
      console.log('API /generate: Utilisateur non connecté');
      return NextResponse.json(
        { error: 'Vous devez être connecté pour générer un article' },
        { status: 401 }
      );
    }

    // Vérifier le solde de tokens de l'utilisateur
    const userProfile = await getUserProfile(data.memberId);
    const tokenCost = Math.ceil(data.wordCount / 500); // 1 token pour 500 mots
    
    if (userProfile.tokenBalance < tokenCost) {
      console.log(`API /generate: Solde insuffisant (${userProfile.tokenBalance} tokens, besoin de ${tokenCost})`);
      return NextResponse.json(
        { error: 'Solde de tokens insuffisant. Veuillez acheter plus de tokens.' },
        { status: 402 }
      );
    }

    // Préparer les paramètres pour OpenAI
    const params = {
      title: topic,
      keywords: data.keywords ? data.keywords.split(',').map((k: string) => k.trim()) : 
               data.semanticVariations ? data.semanticVariations.split(',').map((k: string) => k.trim()) : [],
      category: data.category || 'Non catégorisé',
      tone: data.tone || 'professional',
      wordCount: data.wordCount || 600,
      outputFormat: data.outputFormat || 'markdown', // markdown, html, ou text
      language: data.language || 'fr' // Langue sélectionnée par l'utilisateur
    };
    
    console.log('API /generate: Paramètres préparés pour OpenAI', params);

    // Générer l'article avec OpenAI
    console.log('API /generate: Début de la génération avec OpenAI');
    const content = await generateBlogArticle(params);
    console.log('API /generate: Génération terminée');

    // Calculer le temps écoulé
    const generationTime = Date.now() - startTime;
    console.log(`API /generate: Temps de génération: ${generationTime}ms`);

    // Extraire le titre et l'extrait du contenu généré
    const titleMatch = content.match(/# (.*?)(\n|$)/);
    const title = titleMatch ? titleMatch[1].trim() : topic;
    
    // Extraire le premier paragraphe comme extrait
    const paragraphs = content.split('\n\n');
    let excerpt = '';
    for (const paragraph of paragraphs) {
      if (paragraph.trim() && !paragraph.startsWith('#')) {
        excerpt = paragraph.trim();
        break;
      }
    }
    
    if (!excerpt && paragraphs.length > 1) {
      excerpt = paragraphs[1].trim();
    }
    
    // Calculer le nombre de mots
    const wordCount = content.split(/\s+/).length;
    
    // Vérifier si le nombre de mots généré correspond à celui demandé
    const requestedWordCount = data.wordCount || 600;
    const wordCountDifference = Math.abs(wordCount - requestedWordCount);
    const wordCountPercentage = Math.round((wordCount / requestedWordCount) * 100);
    
    // Message d'information sur le nombre de mots
    let wordCountInfo = '';
    let wordCountStatus = 'success'; // 'success', 'warning', 'error'
    
    if (wordCountDifference <= requestedWordCount * 0.05) {
      // Moins de 5% d'écart - Succès
      wordCountStatus = 'success';
      if (wordCount < requestedWordCount) {
        wordCountInfo = `Article généré avec ${wordCount} mots (${wordCountPercentage}% du nombre demandé).`;
      } else {
        wordCountInfo = `Article généré avec ${wordCount} mots.`;
      }
    } else if (wordCount < requestedWordCount) {
      if (wordCountDifference <= requestedWordCount * 0.1) {
        // Entre 5% et 10% d'écart en moins - Avertissement
        wordCountStatus = 'warning';
        wordCountInfo = `Article légèrement plus court que demandé: ${wordCount} mots (${wordCountPercentage}% du nombre demandé).`;
      } else {
        // Plus de 10% d'écart en moins - Erreur
        wordCountStatus = 'error';
        wordCountInfo = `Article significativement plus court que demandé: ${wordCount} mots (${wordCountPercentage}% du nombre demandé).`;
      }
    } else {
      // Article plus long que demandé - Toujours un succès
      wordCountStatus = 'success';
      wordCountInfo = `Article généré avec ${wordCount} mots.`;
    }
    
    // Extraire la structure de l'article (titres et sous-titres)
    const structure = [];
    const lines = content.split('\n');
    for (const line of lines) {
      if (line.startsWith('# ')) {
        structure.push({ level: 1, title: line.substring(2).trim() });
      } else if (line.startsWith('## ')) {
        structure.push({ level: 2, title: line.substring(3).trim() });
      } else if (line.startsWith('### ')) {
        structure.push({ level: 3, title: line.substring(4).trim() });
      }
    }
    
    // Calculer le temps de lecture (environ 200 mots par minute)
    const readingTime = Math.ceil(wordCount / 200);
    
    // Calculer le nombre de tokens utilisés (1 token pour 500 mots)
    const tokensUsed = Math.ceil(wordCount / 500);
    
    // Générer un slug à partir du titre
    const slug = title.toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
    
    // Convertir le contenu en différents formats
    let htmlContent = '';
    let textContent = '';
    
    // Convertir Markdown en HTML
    if (params.outputFormat === 'markdown' || params.outputFormat === 'html') {
      htmlContent = convertMarkdownToHtml(content);
    }
    
    // Convertir Markdown en texte brut
    if (params.outputFormat === 'markdown' || params.outputFormat === 'text') {
      textContent = convertMarkdownToText(content);
    }
    
    // Mettre à jour les statistiques de génération
    console.log(`API /generate: Mise à jour des statistiques de génération`);
    console.log(`API /generate: Début updateStatsAfterGeneration pour ${data.memberId}, coût: ${tokenCost}`);
    
    await updateStatsAfterGeneration(data.memberId, tokenCost, false);
    
    // Attendre un court délai pour s'assurer que les changements sont propagés
    console.log('API /generate: Attente pour propager les modifications d\'état...');
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Récupérer les statistiques mises à jour
    console.log(`API /generate: Récupération des statistiques mises à jour pour ${data.memberId}`);
    const updatedStats = await fetchGenerationStats(data.memberId);
    console.log(`API /generate: Statistiques mises à jour, nouveau solde: ${updatedStats.tokenBalance}`);
    
    // Retourner les statistiques mises à jour
    const response = NextResponse.json({
      success: true,
      content,
      htmlContent,
      textContent,
      title,
      excerpt,
      wordCount,
      requestedWordCount,
      wordCountInfo,
      wordCountStatus,
      generationTime,
      tokenCost,
      newTokenBalance: updatedStats.tokenBalance,
      generationStats: {
        wordCount,
        requestedWordCount,
        wordCountPercentage,
        generationTime
      },
      article: {
        title,
        content,
        htmlContent,
        textContent,
        excerpt,
        status: 'draft',
        category: data.category || 'Non catégorisé',
        tags: params.keywords,
        readingTime,
        wordCount,
        tokensUsed,
        slug,
        structure,
        outputFormat: params.outputFormat
      }
    });
    
    return response;
  } catch (error) {
    console.error('API /generate: Erreur lors de la génération de l\'article:', error);
    
    // Créer un contenu minimal en cas d'erreur
    const title = "Erreur de génération";
    const content = "# Erreur de génération\n\nDésolé, une erreur est survenue lors de la génération de l'article. Veuillez réessayer.";
    const excerpt = "Une erreur est survenue lors de la génération de l'article.";
    
    // Retourner un contenu minimal au lieu d'une erreur
    return NextResponse.json({
      content,
      htmlContent: "<h1>Erreur de génération</h1><p>Désolé, une erreur est survenue lors de la génération de l'article. Veuillez réessayer.</p>",
      textContent: "Erreur de génération\n\nDésolé, une erreur est survenue lors de la génération de l'article. Veuillez réessayer.",
      title,
      excerpt,
      tokensUsed: 0,
      generationTime: 0,
      wordCount: 20,
      requestedWordCount: 600,
      wordCountPercentage: 0,
      wordCountInfo: '',
      wordCountStatus: 'error',
      structure: [],
      article: {
        title,
        content,
        htmlContent: "<h1>Erreur de génération</h1><p>Désolé, une erreur est survenue lors de la génération de l'article. Veuillez réessayer.</p>",
        textContent: "Erreur de génération\n\nDésolé, une erreur est survenue lors de la génération de l'article. Veuillez réessayer.",
        excerpt,
        status: 'draft',
        category: 'Non catégorisé',
        tags: [],
        readingTime: 1,
        wordCount: 20,
        tokensUsed: 0,
        slug: 'erreur-generation',
        structure: [],
        outputFormat: 'markdown'
      }
    });
  }
}

// Fonction pour convertir le Markdown en HTML optimisé SEO
function convertMarkdownToHtml(markdown: string): string {
  let html = '';
  const lines = markdown.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line.startsWith('# ')) {
      // H1 - Titre principal
      const title = line.substring(2).trim();
      html += `<h1 class="article-title">${title}</h1>\n`;
    } else if (line.startsWith('## ')) {
      // H2 - Sous-titre
      const subtitle = line.substring(3).trim();
      html += `<h2 class="article-subtitle">${subtitle}</h2>\n`;
    } else if (line.startsWith('### ')) {
      // H3 - Sous-sous-titre
      const subsubtitle = line.substring(4).trim();
      html += `<h3 class="article-subsubtitle">${subsubtitle}</h3>\n`;
    } else if (line.startsWith('- ')) {
      // Liste à puces
      let j = i;
      html += '<ul class="article-list">\n';
      
      while (j < lines.length && lines[j].trim().startsWith('- ')) {
        const item = lines[j].substring(2).trim();
        html += `  <li>${item}</li>\n`;
        j++;
      }
      
      html += '</ul>\n';
      i = j - 1;
    } else if (line.match(/^\d+\. /)) {
      // Liste numérotée
      let j = i;
      html += '<ol class="article-ordered-list">\n';
      
      while (j < lines.length && lines[j].trim().match(/^\d+\. /)) {
        const item = lines[j].replace(/^\d+\. /, '').trim();
        html += `  <li>${item}</li>\n`;
        j++;
      }
      
      html += '</ol>\n';
      i = j - 1;
    } else if (line.startsWith('> ')) {
      // Citation
      let j = i;
      let quote = '';
      
      while (j < lines.length && lines[j].trim().startsWith('> ')) {
        quote += lines[j].substring(2).trim() + ' ';
        j++;
      }
      
      html += `<blockquote class="article-quote">${quote.trim()}</blockquote>\n`;
      i = j - 1;
    } else if (line.startsWith('```')) {
      // Bloc de code
      let j = i + 1;
      let code = '';
      
      while (j < lines.length && !lines[j].trim().startsWith('```')) {
        code += lines[j] + '\n';
        j++;
      }
      
      html += `<pre class="article-code"><code>${code}</code></pre>\n`;
      i = j;
    } else if (line === '') {
      // Ligne vide
      html += '\n';
    } else {
      // Paragraphe normal
      // Traiter les formatages inline (gras, italique, liens)
      let paragraph = line;
      
      // Gras
      paragraph = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      
      // Italique
      paragraph = paragraph.replace(/\*(.*?)\*/g, '<em>$1</em>');
      
      // Liens
      paragraph = paragraph.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="article-link">$1</a>');
      
      html += `<p class="article-paragraph">${paragraph}</p>\n`;
    }
  }
  
  // Envelopper dans une div avec des classes pour le style
  return `<article class="blog-article">\n${html}</article>`;
}

// Fonction pour convertir le Markdown en texte brut
function convertMarkdownToText(markdown: string): string {
  let text = markdown;
  
  // Supprimer les titres markdown
  text = text.replace(/^# (.*?)$/gm, '$1\n\n');
  text = text.replace(/^## (.*?)$/gm, '$1\n\n');
  text = text.replace(/^### (.*?)$/gm, '$1\n\n');
  
  // Supprimer les formatages
  text = text.replace(/\*\*(.*?)\*\*/g, '$1');
  text = text.replace(/\*(.*?)\*/g, '$1');
  
  // Convertir les liens
  text = text.replace(/\[(.*?)\]\((.*?)\)/g, '$1 ($2)');
  
  // Nettoyer les listes
  text = text.replace(/^- (.*?)$/gm, '• $1');
  text = text.replace(/^\d+\. (.*?)$/gm, '$1');
  
  // Nettoyer les citations
  text = text.replace(/^> (.*?)$/gm, '"$1"');
  
  // Supprimer les blocs de code
  text = text.replace(/```[\s\S]*?```/g, '');
  
  // Nettoyer les espaces multiples
  text = text.replace(/\n{3,}/g, '\n\n');
  
  return text.trim();
} 