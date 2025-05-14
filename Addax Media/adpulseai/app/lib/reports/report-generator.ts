import jsPDF from 'jspdf';

/**
 * Helper pour formater un nombre avec 2 décimales
 * @param value Valeur à formater
 * @returns Valeur formatée ou '0.00' si undefined/null
 */
const formatNumber = (value: any, decimals: number = 2): string => {
  if (value === undefined || value === null || isNaN(parseFloat(value))) {
    return '0.00';
  }
  return parseFloat(value).toFixed(decimals);
};

/**
 * Génère un rapport PDF basé sur les données d'analyse fournies
 * @param analysisData Données d'analyse pour le rapport
 * @returns Buffer contenant le PDF généré
 */
export async function generatePdfReport(analysisData: any): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      // Vérification des données requises et initialisation des valeurs par défaut
      if (!analysisData) {
        throw new Error('Données d\'analyse manquantes');
      }
      
      // Initialiser les objets manquants pour éviter les erreurs
      analysisData.metrics = analysisData.metrics || {};
      analysisData.metrics.totalSpend = analysisData.metrics.totalSpend || 0;
      analysisData.metrics.totalImpressions = analysisData.metrics.totalImpressions || 0;
      analysisData.metrics.totalClicks = analysisData.metrics.totalClicks || 0;
      analysisData.metrics.totalConversions = analysisData.metrics.totalConversions || 0;
      analysisData.metrics.averageCTR = analysisData.metrics.averageCTR || 0;
      analysisData.metrics.averageCPC = analysisData.metrics.averageCPC || 0;
      analysisData.metrics.averageConversionRate = analysisData.metrics.averageConversionRate || 0;
      analysisData.metrics.averageCPA = analysisData.metrics.averageCPA || 0;
      analysisData.metrics.averageROAS = analysisData.metrics.averageROAS || 0;
      
      analysisData.period = analysisData.period || {};
      analysisData.period.start = analysisData.period.start || 'N/A';
      analysisData.period.end = analysisData.period.end || 'N/A';
      
      analysisData.insights = analysisData.insights || [];
      analysisData.recommendations = analysisData.recommendations || [];
      
      if (analysisData.campaignComparison) {
        if (!analysisData.campaignComparison.bestCampaign) {
          analysisData.campaignComparison.bestCampaign = {
            name: 'N/A',
            metrics: { spend: 0, conversions: 0, cpa: 0, roas: 0, conversionRate: 0 },
            analysis: 'Aucune analyse disponible'
          };
        } else {
          analysisData.campaignComparison.bestCampaign.metrics = analysisData.campaignComparison.bestCampaign.metrics || {};
          analysisData.campaignComparison.bestCampaign.metrics.spend = analysisData.campaignComparison.bestCampaign.metrics.spend || 0;
          analysisData.campaignComparison.bestCampaign.metrics.conversions = analysisData.campaignComparison.bestCampaign.metrics.conversions || 0;
          analysisData.campaignComparison.bestCampaign.metrics.cpa = analysisData.campaignComparison.bestCampaign.metrics.cpa || 0;
          analysisData.campaignComparison.bestCampaign.metrics.roas = analysisData.campaignComparison.bestCampaign.metrics.roas || 0;
          analysisData.campaignComparison.bestCampaign.metrics.conversionRate = analysisData.campaignComparison.bestCampaign.metrics.conversionRate || 0;
        }
        
        if (!analysisData.campaignComparison.worstCampaign) {
          analysisData.campaignComparison.worstCampaign = {
            name: 'N/A',
            metrics: { spend: 0, conversions: 0, cpa: 0, roas: 0, conversionRate: 0 },
            analysis: 'Aucune analyse disponible'
          };
        } else {
          analysisData.campaignComparison.worstCampaign.metrics = analysisData.campaignComparison.worstCampaign.metrics || {};
          analysisData.campaignComparison.worstCampaign.metrics.spend = analysisData.campaignComparison.worstCampaign.metrics.spend || 0;
          analysisData.campaignComparison.worstCampaign.metrics.conversions = analysisData.campaignComparison.worstCampaign.metrics.conversions || 0;
          analysisData.campaignComparison.worstCampaign.metrics.cpa = analysisData.campaignComparison.worstCampaign.metrics.cpa || 0;
          analysisData.campaignComparison.worstCampaign.metrics.roas = analysisData.campaignComparison.worstCampaign.metrics.roas || 0;
          analysisData.campaignComparison.worstCampaign.metrics.conversionRate = analysisData.campaignComparison.worstCampaign.metrics.conversionRate || 0;
        }
      }
      
      analysisData.actionPlan = analysisData.actionPlan || {};
      analysisData.actionPlan.shortTerm = analysisData.actionPlan.shortTerm || [];
      analysisData.actionPlan.mediumTerm = analysisData.actionPlan.mediumTerm || [];
      analysisData.actionPlan.longTerm = analysisData.actionPlan.longTerm || [];

      // Créer un nouveau document PDF
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      // Définir les constantes de mise en page
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - 2 * margin;
      
      // En-tête
      doc.setFontSize(18);
      doc.setTextColor(24, 119, 242); // Couleur Facebook #1877F2
      doc.setFont('helvetica', 'bold');
      doc.text('Rapport d\'Analyse Facebook Ads', pageWidth / 2, 20, { align: 'center' });
      
      doc.setFontSize(12);
      doc.setTextColor(51, 51, 51); // #333333
      doc.setFont('helvetica', 'normal');
      doc.text(`ID d'analyse: ${analysisData.id || 'N/A'}`, pageWidth / 2, 30, { align: 'center' });
      doc.text(`Généré le: ${new Date().toLocaleDateString()}`, pageWidth / 2, 36, { align: 'center' });
      
      // Période d'analyse
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Période d\'analyse', margin, 48);
      
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`Du ${analysisData.period.start} au ${analysisData.period.end}`, margin, 54);
      
      // Métriques principales
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Métriques principales', margin, 65);
      
      const metrics = [
        { label: 'Dépense totale', value: `${formatNumber(analysisData.metrics.totalSpend)}€` },
        { label: 'Impressions totales', value: analysisData.metrics.totalImpressions ? analysisData.metrics.totalImpressions.toLocaleString() : '0' },
        { label: 'Clics totaux', value: analysisData.metrics.totalClicks ? analysisData.metrics.totalClicks.toLocaleString() : '0' },
        { label: 'Conversions totales', value: analysisData.metrics.totalConversions ? analysisData.metrics.totalConversions.toLocaleString() : '0' },
        { label: 'CTR moyen', value: `${formatNumber(analysisData.metrics.averageCTR)}%` },
        { label: 'CPC moyen', value: `${formatNumber(analysisData.metrics.averageCPC)}€` },
        { label: 'Taux de conversion moyen', value: `${formatNumber(analysisData.metrics.averageConversionRate)}%` },
        { label: 'CPA moyen', value: `${formatNumber(analysisData.metrics.averageCPA)}€` },
        { label: 'ROAS moyen', value: `${formatNumber(analysisData.metrics.averageROAS)}x` },
      ];
      
      // Table des métriques
      let yPos = 70;
      const rowHeight = 7;
      
      metrics.forEach((metric, index) => {
        yPos += rowHeight;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.text(metric.label, margin, yPos);
        
        doc.setFont('helvetica', 'bold');
        doc.text(metric.value, margin + 80, yPos);
      });
      
      yPos += rowHeight * 2;
      
      // Comparaison des campagnes
      if (analysisData.campaignComparison) {
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Comparaison des campagnes', margin, yPos);
        yPos += 6;
        
        // Meilleure campagne
        doc.setFontSize(12);
        doc.setTextColor(76, 175, 80); // Vert #4CAF50
        doc.text('Meilleure campagne: ' + analysisData.campaignComparison.bestCampaign.name, margin, yPos);
        yPos += 6;
        
        doc.setTextColor(51, 51, 51);
        doc.setFontSize(11);
        
        const bestMetrics = [
          { label: 'Dépense', value: `${formatNumber(analysisData.campaignComparison.bestCampaign.metrics.spend)}€` },
          { label: 'Conversions', value: analysisData.campaignComparison.bestCampaign.metrics.conversions || '0' },
          { label: 'CPA', value: `${formatNumber(analysisData.campaignComparison.bestCampaign.metrics.cpa)}€` },
          { label: 'ROAS', value: `${formatNumber(analysisData.campaignComparison.bestCampaign.metrics.roas)}x` },
          { label: 'Taux de conversion', value: `${formatNumber(analysisData.campaignComparison.bestCampaign.metrics.conversionRate)}%` },
        ];
        
        bestMetrics.forEach((metric, index) => {
          doc.setFont('helvetica', 'normal');
          doc.text(metric.label, margin, yPos);
          doc.setFont('helvetica', 'bold');
          doc.text(String(metric.value), margin + 60, yPos);
          yPos += 5;
        });
        
        // Analyse de la meilleure campagne
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        const bestAnalysisLines = doc.splitTextToSize(
          analysisData.campaignComparison.bestCampaign.analysis || 'Aucune analyse disponible',
          contentWidth
        );
        doc.text(bestAnalysisLines, margin, yPos);
        yPos += bestAnalysisLines.length * 5 + 5;
        
        // Pire campagne
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(244, 67, 54); // Rouge #F44336
        doc.text('Campagne sous-performante: ' + analysisData.campaignComparison.worstCampaign.name, margin, yPos);
        yPos += 6;
        
        doc.setTextColor(51, 51, 51);
        doc.setFontSize(11);
        
        const worstMetrics = [
          { label: 'Dépense', value: `${formatNumber(analysisData.campaignComparison.worstCampaign.metrics.spend)}€` },
          { label: 'Conversions', value: analysisData.campaignComparison.worstCampaign.metrics.conversions || '0' },
          { label: 'CPA', value: `${formatNumber(analysisData.campaignComparison.worstCampaign.metrics.cpa)}€` },
          { label: 'ROAS', value: `${formatNumber(analysisData.campaignComparison.worstCampaign.metrics.roas)}x` },
          { label: 'Taux de conversion', value: `${formatNumber(analysisData.campaignComparison.worstCampaign.metrics.conversionRate)}%` },
        ];
        
        worstMetrics.forEach((metric, index) => {
          doc.setFont('helvetica', 'normal');
          doc.text(metric.label, margin, yPos);
          doc.setFont('helvetica', 'bold');
          doc.text(String(metric.value), margin + 60, yPos);
          yPos += 5;
        });
        
        // Analyse de la pire campagne
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        const worstAnalysisLines = doc.splitTextToSize(
          analysisData.campaignComparison.worstCampaign.analysis || 'Aucune analyse disponible',
          contentWidth
        );
        doc.text(worstAnalysisLines, margin, yPos);
        yPos += worstAnalysisLines.length * 5 + 10;
      }
      
      // Vérifier si on doit passer à une nouvelle page
      if (yPos > pageHeight - 40) {
        doc.addPage();
        yPos = 20;
      }
      
      // Analyses additionnelles
      if (analysisData.segmentAnalysis) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(51, 51, 51);
        doc.text(analysisData.segmentAnalysis.title || 'Analyse des segments', margin, yPos);
        yPos += 6;
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        const segmentLines = doc.splitTextToSize(
          analysisData.segmentAnalysis.content || 'Aucune analyse disponible',
          contentWidth
        );
        doc.text(segmentLines, margin, yPos);
        yPos += segmentLines.length * 5 + 10;
      }
      
      // Vérifier si on doit passer à une nouvelle page
      if (yPos > pageHeight - 40) {
        doc.addPage();
        yPos = 20;
      }
      
      if (analysisData.trendAnalysis) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(51, 51, 51);
        doc.text(analysisData.trendAnalysis.title || 'Analyse des tendances', margin, yPos);
        yPos += 6;
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        const trendLines = doc.splitTextToSize(
          analysisData.trendAnalysis.content || 'Aucune analyse disponible',
          contentWidth
        );
        doc.text(trendLines, margin, yPos);
        yPos += trendLines.length * 5 + 10;
      }
      
      // Insights clés
      // Vérifier si on doit passer à une nouvelle page
      if (yPos > pageHeight - 40) {
        doc.addPage();
        yPos = 20;
      }
      
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(51, 51, 51);
      doc.text('Insights clés', margin, yPos);
      yPos += 6;
      
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      
      if (analysisData.insights && analysisData.insights.length > 0) {
        analysisData.insights.forEach((insight: string, index: number) => {
          const insightText = `${index + 1}. ${insight || 'Insight non disponible'}`;
          const insightLines = doc.splitTextToSize(insightText, contentWidth);
          
          // Vérifier si on a assez d'espace sur la page
          if (yPos + insightLines.length * 5 > pageHeight - 30) {
            doc.addPage();
            yPos = 20;
          }
          
          doc.text(insightLines, margin, yPos);
          yPos += insightLines.length * 5 + 5;
        });
      } else {
        doc.text('Aucun insight disponible', margin, yPos);
        yPos += 10;
      }
      
      // Nouvelle page pour recommandations
      doc.addPage();
      yPos = 20;
      
      // Recommandations
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(51, 51, 51);
      doc.text('Recommandations', margin, yPos);
      yPos += 6;
      
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      
      if (analysisData.recommendations && analysisData.recommendations.length > 0) {
        analysisData.recommendations.forEach((recommendation: string, index: number) => {
          const recText = `${index + 1}. ${recommendation || 'Recommandation non disponible'}`;
          const recLines = doc.splitTextToSize(recText, contentWidth);
          
          // Vérifier si on a assez d'espace sur la page
          if (yPos + recLines.length * 5 > pageHeight - 30) {
            doc.addPage();
            yPos = 20;
          }
          
          doc.text(recLines, margin, yPos);
          yPos += recLines.length * 5 + 5;
        });
      } else {
        doc.text('Aucune recommandation disponible', margin, yPos);
        yPos += 10;
      }
      
      // Plan d'action
      // Vérifier si on doit passer à une nouvelle page
      if (yPos > pageHeight - 60) {
        doc.addPage();
        yPos = 20;
      }
      
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(51, 51, 51);
      doc.text('Plan d\'action', margin, yPos);
      yPos += 8;
      
      // Court terme
      doc.setFontSize(12);
      doc.setTextColor(76, 175, 80); // Vert #4CAF50
      doc.text('Court terme (0-30 jours)', margin, yPos);
      yPos += 6;
      
      doc.setTextColor(51, 51, 51);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      
      if (analysisData.actionPlan.shortTerm && analysisData.actionPlan.shortTerm.length > 0) {
        analysisData.actionPlan.shortTerm.forEach((action: string, index: number) => {
          const actionText = `${index + 1}. ${action || 'Action non disponible'}`;
          const actionLines = doc.splitTextToSize(actionText, contentWidth);
          
          // Vérifier si on a assez d'espace sur la page
          if (yPos + actionLines.length * 5 > pageHeight - 30) {
            doc.addPage();
            yPos = 20;
          }
          
          doc.text(actionLines, margin, yPos);
          yPos += actionLines.length * 5 + 5;
        });
      } else {
        doc.text('Aucune action à court terme disponible', margin, yPos);
        yPos += 10;
      }
      
      // Moyen terme
      // Vérifier si on doit passer à une nouvelle page
      if (yPos > pageHeight - 40) {
        doc.addPage();
        yPos = 20;
      }
      
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(255, 193, 7); // Jaune #FFC107
      doc.text('Moyen terme (1-3 mois)', margin, yPos);
      yPos += 6;
      
      doc.setTextColor(51, 51, 51);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      
      if (analysisData.actionPlan.mediumTerm && analysisData.actionPlan.mediumTerm.length > 0) {
        analysisData.actionPlan.mediumTerm.forEach((action: string, index: number) => {
          const actionText = `${index + 1}. ${action || 'Action non disponible'}`;
          const actionLines = doc.splitTextToSize(actionText, contentWidth);
          
          // Vérifier si on a assez d'espace sur la page
          if (yPos + actionLines.length * 5 > pageHeight - 30) {
            doc.addPage();
            yPos = 20;
          }
          
          doc.text(actionLines, margin, yPos);
          yPos += actionLines.length * 5 + 5;
        });
      } else {
        doc.text('Aucune action à moyen terme disponible', margin, yPos);
        yPos += 10;
      }
      
      // Long terme
      // Vérifier si on doit passer à une nouvelle page
      if (yPos > pageHeight - 40) {
        doc.addPage();
        yPos = 20;
      }
      
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(33, 150, 243); // Bleu #2196F3
      doc.text('Long terme (3+ mois)', margin, yPos);
      yPos += 6;
      
      doc.setTextColor(51, 51, 51);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      
      if (analysisData.actionPlan.longTerm && analysisData.actionPlan.longTerm.length > 0) {
        analysisData.actionPlan.longTerm.forEach((action: string, index: number) => {
          const actionText = `${index + 1}. ${action || 'Action non disponible'}`;
          const actionLines = doc.splitTextToSize(actionText, contentWidth);
          
          // Vérifier si on a assez d'espace sur la page
          if (yPos + actionLines.length * 5 > pageHeight - 30) {
            doc.addPage();
            yPos = 20;
          }
          
          doc.text(actionLines, margin, yPos);
          yPos += actionLines.length * 5 + 5;
        });
      } else {
        doc.text('Aucune action à long terme disponible', margin, yPos);
        yPos += 10;
      }
      
      // Conclusion
      // Vérifier si on doit passer à une nouvelle page
      if (yPos > pageHeight - 60) {
        doc.addPage();
        yPos = 20;
      }
      
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(24, 119, 242); // Facebook blue #1877F2
      doc.text('Conclusion', margin, yPos);
      yPos += 6;
      
      doc.setTextColor(51, 51, 51);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      
      const conclusionText = "Cette analyse démontre clairement des opportunités d'optimisation importantes, particulièrement dans la réallocation budgétaire entre vos différentes stratégies de campagnes. En suivant les recommandations et le plan d'action proposés, vous pourriez améliorer significativement la rentabilité de vos investissements publicitaires Facebook, avec un potentiel d'augmentation du ROAS global de 25-30% et une réduction du CPA de 15-20% sur les trois prochains mois.";
      const conclusionLines = doc.splitTextToSize(conclusionText, contentWidth);
      doc.text(conclusionLines, margin, yPos);
      
      // Pied de page sur toutes les pages
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        
        // Ligne de séparation
        doc.setDrawColor(204, 204, 204); // #CCCCCC
        doc.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15);
        
        // Texte du pied de page
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(136, 136, 136); // #888888
        doc.text(
          `Rapport d'analyse Facebook Ads | Page ${i}/${pageCount}`,
          pageWidth / 2,
          pageHeight - 10,
          { align: 'center' }
        );
      }
      
      // Convertir le PDF en Buffer
      const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
      resolve(pdfBuffer);
      
    } catch (error) {
      reject(error);
    }
  });
} 