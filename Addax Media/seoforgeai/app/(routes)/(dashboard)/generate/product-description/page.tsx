'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/auth-context';
import { useStats } from '@/app/context/stats-context';
import { getUserProfile } from '@/app/lib/auth-service';
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { CheckboxGroup } from "@/app/components/ui/checkbox-group";
import { LabeledSlider } from "@/app/components/ui/labeled-slider";
import { ExportDialog } from "@/app/components/ui/export-dialog";
import { PreviewTabs } from "@/app/components/ui/preview-tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";

// Styles spécifiques à la page de génération pour éviter les conflits CSS
const pageStyles = `
  .product-description-page input, 
  .product-description-page textarea, 
  .product-description-page select, 
  .product-description-page option,
  .product-description-page [class*="select-"] {
    color: black !important;
  }
  
  .product-description-page select option {
    background-color: white !important;
    color: black !important;
  }
`;

interface ProductForm {
  // Section 1: Informations Produit de Base
  name: string;
  category: string;
  subcategory: string;
  targetAudience: string;
  usp: string;
  
  // Section 2: Éléments SEO & Conversion
  mainKeyword: string;
  semanticVariations: string;
  purchaseIntent: string;
  customerPains: string;
  emotions: Record<string, boolean>;
  cta: string;
  
  // Section 3: Spécifications Techniques & Conformité
  materials: string;
  certifications: Record<string, boolean>;
  uniqueAdvantages: string;
  ecoScore: number;
  
  // Section 4: Ton & Style
  tone: string;
  styleElements: Record<string, boolean>;
  forbiddenWords: string;
  
  // Section 5: Options Avancées
  wordCount: number;
  internalLinks: string;
  
  // Autres paramètres
  language: string;
}

export default function ProductDescriptionPage() {
  const { user } = useAuth();
  const { refreshStats, forceFullRefresh } = useStats();
  const [form, setForm] = useState<ProductForm>({
    // Section 1: Informations Produit de Base
    name: '',
    category: '',
    subcategory: '',
    targetAudience: '',
    usp: '',
    
    // Section 2: Éléments SEO & Conversion
    mainKeyword: '',
    semanticVariations: '',
    purchaseIntent: 'info',
    customerPains: '',
    emotions: {
      trust: false,
      urgency: false,
      exclusivity: false,
      ethicalPride: false,
      security: false,
      belonging: false
    },
    cta: 'buy',
    
    // Section 3: Spécifications Techniques & Conformité
    materials: '',
    certifications: {
      bio: false,
      vegan: false,
      iso14001: false,
      fairTrade: false,
      recyclable: false
    },
    uniqueAdvantages: '',
    ecoScore: 3,
    
    // Section 4: Ton & Style
    tone: 'expert',
    styleElements: {
      metaphors: false,
      customerStory: false,
      avoidTechnicalJargon: false
    },
    forbiddenWords: '',
    
    // Section 5: Options Avancées
    wordCount: 200,
    internalLinks: '',
    
    // Autres paramètres
    language: 'fr'
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);

  // Gérer les changements dans les cases à cocher
  const handleCheckboxChange = (section: string, id: string, checked: boolean) => {
    setForm({
      ...form,
      [section]: {
        ...form[section as keyof typeof form] as Record<string, boolean>,
        [id]: checked
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setError(null);

    try {
      // Préparer les données pour l'API OpenAI
      const promptData = {
        name: form.name,
        category: form.category,
        subcategory: form.subcategory,
        targetAudience: form.targetAudience,
        usp: form.usp,
        mainKeyword: form.mainKeyword,
        semanticVariations: form.semanticVariations,
        purchaseIntent: form.purchaseIntent,
        customerPains: form.customerPains,
        emotions: Object.entries(form.emotions)
          .filter(([_, value]) => value)
          .map(([key]) => emotionsOptions.find(o => o.id === key)?.label || key),
        cta: form.cta,
        materials: form.materials,
        certifications: Object.entries(form.certifications)
          .filter(([_, value]) => value)
          .map(([key]) => certificationsOptions.find(o => o.id === key)?.label || key),
        uniqueAdvantages: form.uniqueAdvantages,
        ecoScore: form.ecoScore,
        tone: form.tone,
        styleElements: Object.entries(form.styleElements)
          .filter(([_, value]) => value)
          .map(([key]) => styleElementsOptions.find(o => o.id === key)?.label || key),
        forbiddenWords: form.forbiddenWords,
        wordCount: form.wordCount,
        internalLinks: form.internalLinks,
        language: form.language,
        memberId: user?.memberId
      };

      // Appeler l'API pour générer la description
      const response = await fetch('/api/generate-product-description', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(promptData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la génération de la description');
      }

      const data = await response.json();
      setGeneratedContent(data.content);
      
      // Rafraîchir les statistiques après une génération réussie (forcer le rafraîchissement)
      console.log('Forçage du rafraîchissement des statistiques après génération de description de produit');
      await forceFullRefresh();
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsGenerating(false);
    }
  };

  // Options pour les dropdowns et checkboxes
  const purchaseIntentOptions = [
    { value: 'info', label: 'Informations techniques' },
    { value: 'convince', label: 'Convaincre rapidement' },
    { value: 'final', label: 'Dernière étape avant achat' }
  ];

  const emotionsOptions = [
    { id: 'trust', label: 'Confiance' },
    { id: 'urgency', label: 'Urgence' },
    { id: 'exclusivity', label: 'Exclusivité' },
    { id: 'ethicalPride', label: 'Fierté éthique' },
    { id: 'security', label: 'Sécurité' },
    { id: 'belonging', label: 'Appartenance' }
  ];

  const ctaOptions = [
    { value: 'buy', label: 'Acheter maintenant' },
    { value: 'revolution', label: 'Rejoindre la révolution' },
    { value: 'limited', label: 'Édition limitée' },
    { value: 'discover', label: 'Découvrir' }
  ];

  const certificationsOptions = [
    { id: 'bio', label: 'Bio' },
    { id: 'vegan', label: 'Vegan' },
    { id: 'iso14001', label: 'Norme ISO 14001' },
    { id: 'fairTrade', label: 'Commerce équitable' },
    { id: 'recyclable', label: 'Recyclable' }
  ];

  const toneOptions = [
    { value: 'expert', label: 'Expert technique' },
    { value: 'inspiring', label: 'Inspirant' },
    { value: 'luxury', label: 'Minimaliste luxe' },
    { value: 'friendly', label: 'Amical' },
    { value: 'formal', label: 'Formel' }
  ];

  const styleElementsOptions = [
    { id: 'metaphors', label: 'Métaphores originales' },
    { id: 'customerStory', label: 'Storytelling client' },
    { id: 'avoidTechnicalJargon', label: 'Éviter le jargon technique' }
  ];

  const languageOptions = [
    { value: 'fr', label: 'Français' },
    { value: 'en', label: 'Anglais' },
    { value: 'es', label: 'Espagnol' },
    { value: 'de', label: 'Allemand' },
    { value: 'it', label: 'Italien' },
    { value: 'pt', label: 'Portugais' },
    { value: 'nl', label: 'Néerlandais' },
    { value: 'ru', label: 'Russe' },
    { value: 'zh', label: 'Chinois' },
    { value: 'ja', label: 'Japonais' },
    { value: 'ar', label: 'Arabe' },
    { value: 'hi', label: 'Hindi' },
    { value: 'pl', label: 'Polonais' },
    { value: 'sv', label: 'Suédois' },
    { value: 'tr', label: 'Turc' },
    { value: 'ko', label: 'Coréen' },
    { value: 'da', label: 'Danois' },
    { value: 'fi', label: 'Finnois' },
    { value: 'no', label: 'Norvégien' },
    { value: 'cs', label: 'Tchèque' },
    { value: 'hu', label: 'Hongrois' },
    { value: 'ro', label: 'Roumain' },
    { value: 'el', label: 'Grec' },
    { value: 'th', label: 'Thaï' },
    { value: 'vi', label: 'Vietnamien' }
  ];

  return (
    <div className="product-description-page space-y-6">
      <style jsx global>{pageStyles}</style>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Générer une description de produit</h1>
          <p className="text-slate-600">Créez une description optimisée pour le SEO et la conversion</p>
        </div>
      </div>

      {generatedContent ? (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-slate-800">Votre description générée</h2>
            <div className="flex space-x-3">
              <Button 
                onClick={() => setIsExportDialogOpen(true)}
                className="bg-white border border-slate-200 text-slate-800 hover:bg-slate-50"
              >
                Exporter
              </Button>
              <Button 
                onClick={() => setGeneratedContent(null)}
                className="bg-white border border-slate-200 text-slate-800 hover:bg-slate-50"
              >
                Nouvelle description
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <PreviewTabs htmlContent={generatedContent} />
          </div>

          <ExportDialog 
            isOpen={isExportDialogOpen} 
            onClose={() => setIsExportDialogOpen(false)} 
            htmlContent={generatedContent}
            textContent={generatedContent.replace(/<[^>]*>/g, '')}
            title={form.name}
          />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Informations Produit de Base */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Informations Produit de Base</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nom du produit *</label>
                <Input 
                  value={form.name} 
                  onChange={(e) => setForm({...form, name: e.target.value})}
                  placeholder="ex: Montre connectée SmartFit Pro" 
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Catégorie de produit *</label>
                <Input 
                  value={form.category} 
                  onChange={(e) => setForm({...form, category: e.target.value})}
                  placeholder="ex: Électronique, Mode, Maison..." 
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Sous-catégorie</label>
                <Input 
                  value={form.subcategory} 
                  onChange={(e) => setForm({...form, subcategory: e.target.value})}
                  placeholder="ex: Montres connectées, Accessoires..." 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Public cible</label>
                <Input 
                  value={form.targetAudience} 
                  onChange={(e) => setForm({...form, targetAudience: e.target.value})}
                  placeholder="ex: Sportifs, Parents, Professionnels..." 
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Argument de vente unique (USP) *</label>
                <Textarea 
                  value={form.usp} 
                  onChange={(e) => setForm({...form, usp: e.target.value})}
                  placeholder="ex: La seule montre connectée avec 10 jours d'autonomie et suivi de 20 sports" 
                  required
                />
              </div>
            </div>
          </div>

          {/* Section 2: Éléments SEO & Conversion */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Éléments SEO & Conversion</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Mot-clé principal *</label>
                <Input 
                  value={form.mainKeyword} 
                  onChange={(e) => setForm({...form, mainKeyword: e.target.value})}
                  placeholder="ex: montre connectée sport" 
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Variations sémantiques</label>
                <Input 
                  value={form.semanticVariations} 
                  onChange={(e) => setForm({...form, semanticVariations: e.target.value})}
                  placeholder="ex: smartwatch, tracker d'activité, montre fitness" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Intention d'achat</label>
                <Select
                  value={form.purchaseIntent}
                  onValueChange={(value) => setForm({...form, purchaseIntent: value})}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sélectionnez l'intention d'achat" />
                  </SelectTrigger>
                  <SelectContent>
                    {purchaseIntentOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Type de CTA</label>
                <Select
                  value={form.cta}
                  onValueChange={(value) => setForm({...form, cta: value})}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sélectionnez le type de CTA" />
                  </SelectTrigger>
                  <SelectContent>
                    {ctaOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Douleurs client</label>
                <Textarea 
                  value={form.customerPains} 
                  onChange={(e) => setForm({...form, customerPains: e.target.value})}
                  placeholder="ex: Batterie qui se décharge vite, Précision de suivi médiocre, Design peu élégant" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Émotions à susciter</label>
                <CheckboxGroup 
                  options={emotionsOptions}
                  values={Object.entries(form.emotions)
                    .filter(([_, value]) => value)
                    .map(([key]) => key)
                  }
                  onChange={(id, checked) => handleCheckboxChange('emotions', id, checked)}
                />
              </div>
            </div>
          </div>

          {/* Section 3: Spécifications Techniques & Conformité */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Spécifications Techniques & Conformité</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Matériaux</label>
                <Input 
                  value={form.materials} 
                  onChange={(e) => setForm({...form, materials: e.target.value})}
                  placeholder="ex: Acier inoxydable, Silicone hypoallergénique, Verre Gorilla Glass" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Certifications</label>
                <CheckboxGroup 
                  options={certificationsOptions}
                  values={Object.entries(form.certifications)
                    .filter(([_, value]) => value)
                    .map(([key]) => key)
                  }
                  onChange={(id, checked) => handleCheckboxChange('certifications', id, checked)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Avantages uniques</label>
                <Textarea 
                  value={form.uniqueAdvantages} 
                  onChange={(e) => setForm({...form, uniqueAdvantages: e.target.value})}
                  placeholder="ex: Résistant à l'eau jusqu'à 50m, Compatible avec iOS et Android, Garantie 2 ans" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Score Éco-responsabilité (1-5)</label>
                <LabeledSlider 
                  min={1} 
                  max={5} 
                  step={1}
                  value={form.ecoScore}
                  onChange={(value) => setForm({...form, ecoScore: value})}
                  labels={[
                    { value: 1, label: 'Standard' },
                    { value: 3, label: 'Éco-conçu' },
                    { value: 5, label: 'Durable' }
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Section 4: Ton & Style */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Ton & Style</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Ton de la description</label>
                <Select
                  value={form.tone}
                  onValueChange={(value) => setForm({...form, tone: value})}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sélectionnez le ton" />
                  </SelectTrigger>
                  <SelectContent>
                    {toneOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Éléments de style</label>
                <CheckboxGroup 
                  options={styleElementsOptions}
                  values={Object.entries(form.styleElements)
                    .filter(([_, value]) => value)
                    .map(([key]) => key)
                  }
                  onChange={(id, checked) => handleCheckboxChange('styleElements', id, checked)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Mots à éviter</label>
                <Textarea 
                  value={form.forbiddenWords} 
                  onChange={(e) => setForm({...form, forbiddenWords: e.target.value})}
                  placeholder="ex: cheap, basique, comme les autres, ordinaire" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Langue</label>
                <Select
                  value={form.language}
                  onValueChange={(value) => setForm({...form, language: value})}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sélectionnez la langue" />
                  </SelectTrigger>
                  <SelectContent>
                    {languageOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Section 5: Options Avancées */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Options Avancées</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nombre de mots souhaité</label>
                <LabeledSlider 
                  min={100} 
                  max={500} 
                  step={50}
                  value={form.wordCount}
                  onChange={(value) => setForm({...form, wordCount: value})}
                  labels={[
                    { value: 100, label: 'Court' },
                    { value: 300, label: 'Moyen' },
                    { value: 500, label: 'Long' }
                  ]}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Liens internes suggérés</label>
                <Textarea 
                  value={form.internalLinks} 
                  onChange={(e) => setForm({...form, internalLinks: e.target.value})}
                  placeholder="ex: https://votre-site.com/categorie/accessoires, https://votre-site.com/guide/montres" 
                />
              </div>
            </div>
          </div>

          {/* Pied de formulaire */}
          <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4 items-center bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex-1">
              {error && (
                <div className="mb-2 text-red-500">{error}</div>
              )}
              <p className="text-slate-600 text-sm flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Cette génération utilisera environ <span className="font-medium text-amber-600 mx-1">1 token</span> de votre solde.
              </p>
            </div>
            <Button 
              type="submit" 
              disabled={isGenerating || !form.name || !form.mainKeyword || !form.usp}
              className="min-w-[200px] bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Génération en cours...
                </>
              ) : (
                'Générer la description'
              )}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
} 