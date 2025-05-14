'use client';

import { useState } from 'react';
import { useAuth } from '@/app/context/auth-context';
import { useStats } from '@/app/context/stats-context';
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { CheckboxGroup } from "@/app/components/ui/checkbox-group";
import { LabeledSlider } from "@/app/components/ui/labeled-slider";
import { ExportDialog } from "@/app/components/ui/export-dialog";
import { PreviewTabs } from "@/app/components/ui/preview-tabs";

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
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Générateur de Description Produit AIDA</h1>
        <p className="text-gray-400">Créez des descriptions de produits persuasives avec la méthode AIDA (Attention, Intérêt, Désir, Action)</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      <div className="bg-black/40 backdrop-blur-xl rounded-xl p-6 border border-purple-500/20">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Informations Produit de Base */}
          <div className="p-4 bg-purple-900/10 rounded-lg border border-purple-500/20">
            <h3 className="text-white font-medium mb-4">1️⃣ Informations Produit de Base</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nom exact du produit <span className="text-red-400">*</span>
                </label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Ex: Chaussures de Running Éco-responsables X-Trail 2025"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Catégorie <span className="text-red-400">*</span>
                  </label>
                  <Input
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    placeholder="Ex: Sport > Running"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Sous-catégorie
                  </label>
                  <Input
                    value={form.subcategory}
                    onChange={(e) => setForm({ ...form, subcategory: e.target.value })}
                    placeholder="Ex: Femme"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Public cible (psychographie) <span className="text-red-400">*</span>
                </label>
                <Textarea
                  value={form.targetAudience}
                  onChange={(e) => setForm({ ...form, targetAudience: e.target.value })}
                  placeholder="Ex: Écolos urbains, Sportifs intensifs, Early adopters..."
                  className="min-h-[80px]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  USP (Unique Selling Proposition) <span className="text-red-400">*</span>
                </label>
                <Input
                  value={form.usp}
                  onChange={(e) => setForm({ ...form, usp: e.target.value })}
                  placeholder="Ex: Seule chaussure running fabriquée à 100% à partir de déchets océaniques recyclés"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Une phrase choc qui résume l'avantage unique de votre produit</p>
              </div>
            </div>
          </div>

          {/* Section 2: Éléments SEO & Conversion */}
          <div className="p-4 bg-blue-900/10 rounded-lg border border-blue-500/20">
            <h3 className="text-white font-medium mb-4">2️⃣ Éléments SEO & Conversion</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Mot-clé principal
                </label>
                <Input
                  value={form.mainKeyword}
                  onChange={(e) => setForm({ ...form, mainKeyword: e.target.value })}
                  placeholder="Ex: chaussures running écologiques"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Variations sémantiques (LSI) - 3 à 5 séparées par des virgules
                </label>
                <Input
                  value={form.semanticVariations}
                  onChange={(e) => setForm({ ...form, semanticVariations: e.target.value })}
                  placeholder="Ex: course à pied durable, baskets recyclées performance"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Intention d'achat
                </label>
                <select
                  value={form.purchaseIntent}
                  onChange={(e) => setForm({ ...form, purchaseIntent: e.target.value })}
                  className="w-full rounded-md border-blue-500/20 bg-black/40 text-white"
                >
                  {purchaseIntentOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Douleurs clients à résoudre
                </label>
                <Textarea
                  value={form.customerPains}
                  onChange={(e) => setForm({ ...form, customerPains: e.target.value })}
                  placeholder="Ex: semelles qui s'usent en 3 mois, manque de respirabilité"
                  className="min-h-[80px]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Émotions à déclencher
                </label>
                <CheckboxGroup
                  options={emotionsOptions}
                  values={form.emotions}
                  onChange={(id, checked) => handleCheckboxChange('emotions', id, checked)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  CTA (Call to Action)
                </label>
                <select
                  value={form.cta}
                  onChange={(e) => setForm({ ...form, cta: e.target.value })}
                  className="w-full rounded-md border-blue-500/20 bg-black/40 text-white"
                >
                  {ctaOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Spécifications Techniques & Conformité */}
          <div className="p-4 bg-green-900/10 rounded-lg border border-green-500/20">
            <h3 className="text-white font-medium mb-4">3️⃣ Spécifications Techniques & Conformité</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Matériaux/Composition
                </label>
                <Input
                  value={form.materials}
                  onChange={(e) => setForm({ ...form, materials: e.target.value })}
                  placeholder="Ex: 55% plastique recyclé, 45% coton bio"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Certifications
                </label>
                <CheckboxGroup
                  options={certificationsOptions}
                  values={form.certifications}
                  onChange={(id, checked) => handleCheckboxChange('certifications', id, checked)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Avantages uniques (3 max, séparés par des virgules)
                </label>
                <Textarea
                  value={form.uniqueAdvantages}
                  onChange={(e) => setForm({ ...form, uniqueAdvantages: e.target.value })}
                  placeholder="Ex: Semelle anti-dérapante jusqu'à 40° d'inclinaison"
                  className="min-h-[80px]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Éco-score
                </label>
                <LabeledSlider
                  min={1}
                  max={5}
                  step={1}
                  value={form.ecoScore}
                  onChange={(value) => setForm({ ...form, ecoScore: value })}
                  leftLabel="Faible impact"
                  rightLabel="Neutre en carbone"
                  formatValue={(val) => `${val}/5`}
                />
              </div>
            </div>
          </div>

          {/* Section 4: Ton & Style */}
          <div className="p-4 bg-amber-900/10 rounded-lg border border-amber-500/20">
            <h3 className="text-white font-medium mb-4">4️⃣ Ton & Style</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Ton souhaité
                </label>
                <select
                  value={form.tone}
                  onChange={(e) => setForm({ ...form, tone: e.target.value })}
                  className="w-full rounded-md border-amber-500/20 bg-black/40 text-white"
                >
                  {toneOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Éléments stylistiques
                </label>
                <CheckboxGroup
                  options={styleElementsOptions}
                  values={form.styleElements}
                  onChange={(id, checked) => handleCheckboxChange('styleElements', id, checked)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Mots interdits
                </label>
                <Input
                  value={form.forbiddenWords}
                  onChange={(e) => setForm({ ...form, forbiddenWords: e.target.value })}
                  placeholder="Ex: pas de 'haute qualité' générique"
                />
              </div>
            </div>
          </div>

          {/* Section 5: Options Avancées */}
          <div className="p-4 bg-indigo-900/10 rounded-lg border border-indigo-500/20">
            <h3 className="text-white font-medium mb-4">5️⃣ Options Avancées (SEO 2025)</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Longueur cible
                </label>
                <LabeledSlider
                  min={80}
                  max={300}
                  step={10}
                  value={form.wordCount}
                  onChange={(value) => setForm({ ...form, wordCount: value })}
                  leftLabel="80 mots (percutant)"
                  rightLabel="300 mots (détaillé + SEO)"
                  centerLabel="200 mots"
                  formatValue={(val) => `${val} mots`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Liens internes (1-2 URLs pertinentes)
                </label>
                <Input
                  value={form.internalLinks}
                  onChange={(e) => setForm({ ...form, internalLinks: e.target.value })}
                  placeholder="Ex: /guide-choix-running-ecologique"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Langue
                </label>
                <select
                  value={form.language}
                  onChange={(e) => setForm({ ...form, language: e.target.value })}
                  className="w-full rounded-md border-indigo-500/20 bg-black/40 text-white"
                >
                  {languageOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-purple-500/20">
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Génération en cours...
                </>
              ) : (
                'Générer la description AIDA'
              )}
            </Button>
          </div>
        </form>
      </div>

      {generatedContent && (
        <div className="mt-8 bg-black/40 backdrop-blur-xl rounded-xl p-6 border border-purple-500/20">
          <h2 className="text-xl font-bold text-white mb-4">Description AIDA générée</h2>
          
          <PreviewTabs markdown={generatedContent} />
          
          <div className="mt-6 flex gap-4">
            <Button 
              className="bg-gradient-to-r from-green-600 to-emerald-600"
              onClick={() => navigator.clipboard.writeText(generatedContent)}
            >
              Copier
            </Button>
            <Button 
              variant="outline"
              onClick={() => setGeneratedContent(null)}
            >
              Modifier
            </Button>
            <Button 
              variant="outline" 
              className="ml-auto"
              onClick={() => setIsExportDialogOpen(true)}
            >
              Exporter
            </Button>
          </div>
          
          {/* Dialogue d'exportation */}
          <ExportDialog
            content={generatedContent}
            productName={form.name}
            isOpen={isExportDialogOpen}
            onClose={() => setIsExportDialogOpen(false)}
          />
        </div>
      )}
    </div>
  );
} 