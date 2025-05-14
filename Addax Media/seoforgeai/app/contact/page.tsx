'use client';

import { useState } from 'react';
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Mail, Phone, Clock, ArrowRight, MapPin, Send } from 'lucide-react';

// Fonction pour insérer des caractères invisibles entre les caractères d'un texte
const obfuscateText = (text: string) => {
  return text.split('').join('\u200B'); // Insertion de caractères de largeur zéro
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [activeTab, setActiveTab] = useState<'form' | 'map'>('form');

  // Informations de contact protégées
  const protectedEmail = obfuscateText("support@seoforgeai.com");
  const protectedPhone = obfuscateText("(803) 886-0993");
  const protectedHours = obfuscateText("Lun-Ven: 9h-18h");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: 'ea8fbdd7-da72-4110-8c71-21022247c62d', // Clé API Web3Forms de test
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          from_name: 'Formulaire de contact du site'
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
        
        // Réinitialiser le statut après 5 secondes
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      } else {
        setSubmitError('Une erreur est survenue. Veuillez réessayer.');
      }
    } catch (error) {
      setSubmitError('Une erreur est survenue. Veuillez réessayer.');
      console.error('Erreur lors de l\'envoi du formulaire:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Bannière supérieure */}
      <div className="bg-gradient-to-r from-[#F97316] to-[#FB923C] text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/noise.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">Contactez-nous</h1>
            <p className="text-xl opacity-90">Notre équipe est à votre écoute pour répondre à toutes vos questions</p>
          </div>
        </div>
        
        {/* Vague décorative */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path 
              fill="#ffffff" 
              fillOpacity="1" 
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            ></path>
          </svg>
        </div>
      </div>
      
      {/* Section principale */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Informations de contact */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-[#FFF7ED] rounded-2xl p-6 transition-all duration-300 hover:shadow-lg">
              <div className="p-3 inline-flex items-center justify-center bg-[#F97316]/10 rounded-xl mb-4">
                <Mail className="h-6 w-6 text-[#F97316]" />
              </div>
              <h3 className="text-xl font-semibold text-[#7C2D12] mb-2">Email</h3>
              <p className="text-[#7C2D12]/80 select-none">{protectedEmail}</p>
              <div className="mt-4">
                <a href="mailto:support@example.com" className="inline-flex items-center text-[#F97316] hover:underline">
                  Nous écrire <ArrowRight className="h-4 w-4 ml-1" />
                </a>
              </div>
            </div>
            
            <div className="bg-[#FFF7ED] rounded-2xl p-6 transition-all duration-300 hover:shadow-lg">
              <div className="p-3 inline-flex items-center justify-center bg-[#F97316]/10 rounded-xl mb-4">
                <Phone className="h-6 w-6 text-[#F97316]" />
              </div>
              <h3 className="text-xl font-semibold text-[#7C2D12] mb-2">Téléphone</h3>
              <p className="text-[#7C2D12]/80 select-none">{protectedPhone}</p>
              <div className="mt-4">
                <a href="tel:+0000000000" className="inline-flex items-center text-[#F97316] hover:underline">
                  Nous appeler <ArrowRight className="h-4 w-4 ml-1" />
                </a>
              </div>
            </div>
            
            <div className="bg-[#FFF7ED] rounded-2xl p-6 transition-all duration-300 hover:shadow-lg">
              <div className="p-3 inline-flex items-center justify-center bg-[#F97316]/10 rounded-xl mb-4">
                <MapPin className="h-6 w-6 text-[#F97316]" />
              </div>
              <h3 className="text-xl font-semibold text-[#7C2D12] mb-2">Adresse</h3>
              <p className="text-[#7C2D12]/80">Addax Media Ltd<br />Flat 5, 9 Langley Road<br />Watford, England, WD17 4PS</p>
              <p className="text-[#7C2D12]/80 mt-2">Company Number: 16314045</p>
              <div className="mt-4">
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-[#F97316] hover:underline">
                  Voir sur la carte <ArrowRight className="h-4 w-4 ml-1" />
                </a>
              </div>
            </div>
          </div>
          
          {/* Onglets */}
          <div className="border-b border-gray-200 mb-8">
            <div className="flex space-x-8">
              <button 
                onClick={() => setActiveTab('form')}
                className={`pb-4 text-lg font-medium border-b-2 transition-colors ${
                  activeTab === 'form' 
                    ? 'border-[#F97316] text-[#7C2D12]' 
                    : 'border-transparent text-[#7C2D12]/60 hover:text-[#7C2D12]'
                }`}
              >
                Formulaire de contact
              </button>
              <button 
                onClick={() => setActiveTab('map')}
                className={`pb-4 text-lg font-medium border-b-2 transition-colors ${
                  activeTab === 'map' 
                    ? 'border-[#F97316] text-[#7C2D12]' 
                    : 'border-transparent text-[#7C2D12]/60 hover:text-[#7C2D12]'
                }`}
              >
                Plan d'accès
              </button>
            </div>
          </div>
          
          {/* Contenu des onglets */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            {activeTab === 'form' ? (
              <div>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-[#7C2D12] mb-2">Envoyez-nous un message</h2>
                  <p className="text-[#7C2D12]/80">Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-[#7C2D12] mb-2">
                        Nom complet
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-white border-[#F97316]/20 focus:border-[#F97316] focus:ring-[#F97316] rounded-lg p-3 text-[#7C2D12]"
                        placeholder="Votre nom"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-[#7C2D12] mb-2">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-white border-[#F97316]/20 focus:border-[#F97316] focus:ring-[#F97316] rounded-lg p-3 text-[#7C2D12]"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-[#7C2D12] mb-2">
                      Sujet
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full bg-white border border-[#F97316]/20 focus:border-[#F97316] focus:ring-[#F97316] rounded-lg p-3 text-[#7C2D12]"
                    >
                      <option value="">Sélectionnez un sujet</option>
                      <option value="question">Question générale</option>
                      <option value="support">Support technique</option>
                      <option value="billing">Facturation</option>
                      <option value="partnership">Partenariat</option>
                      <option value="other">Autre</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-[#7C2D12] mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full bg-white border border-[#F97316]/20 focus:border-[#F97316] focus:ring-[#F97316] rounded-lg p-3 text-[#7C2D12] h-40"
                      placeholder="Détaillez votre demande ici..."
                    />
                  </div>
                  
                  <div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3 bg-[#F97316] hover:bg-[#F97316]/90 text-white rounded-lg flex items-center"
                    >
                      {isSubmitting ? 'Envoi en cours...' : <>Envoyer le message <Send className="ml-2 h-4 w-4" /></>}
                    </Button>
                  </div>
                  
                  {submitSuccess && (
                    <div className="p-4 bg-green-50 border border-green-500/30 rounded-lg">
                      <p className="text-green-600 text-center">
                        Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
                      </p>
                    </div>
                  )}
                  
                  {submitError && (
                    <div className="p-4 bg-red-50 border border-red-500/30 rounded-lg">
                      <p className="text-red-600 text-center">
                        {submitError}
                      </p>
                    </div>
                  )}
                </form>
              </div>
            ) : (
              <div>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-[#7C2D12] mb-2">Où nous trouver</h2>
                  <p className="text-[#7C2D12]/80">Voici notre emplacement et nos horaires d'ouverture.</p>
                </div>
                
                <div className="aspect-w-16 aspect-h-9 mb-8 overflow-hidden rounded-lg border border-[#F97316]/20">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.142047033355!2d2.295233!3d48.87380599999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fc4f8f3049b%3A0xcbb47407434935db!2sChamps-%C3%89lys%C3%A9es!5e0!3m2!1sfr!2sfr!4v1647348311026!5m2!1sfr!2sfr" 
                    className="w-full h-96" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy"
                  ></iframe>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-[#FFF7ED] rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-[#7C2D12] mb-4 flex items-center">
                      <Clock className="h-5 w-5 text-[#F97316] mr-2" /> Horaires d'ouverture
                    </h3>
                    <ul className="space-y-3 text-[#7C2D12]/80">
                      <li className="flex justify-between">
                        <span>Lundi - Vendredi</span>
                        <span className="font-medium">9:00 - 18:00</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Samedi</span>
                        <span className="font-medium">10:00 - 16:00</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Dimanche</span>
                        <span className="font-medium">Fermé</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-[#FFF7ED] rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-[#7C2D12] mb-4 flex items-center">
                      <MapPin className="h-5 w-5 text-[#F97316] mr-2" /> Adresse complète
                    </h3>
                    <address className="not-italic text-[#7C2D12]/80">
                      <p>Addax Media Ltd</p>
                      <p>Flat 5, 9 Langley Road</p>
                      <p>Watford, England, WD17 4PS</p>
                      <p className="mt-2">Company Number: 16314045</p>
                    </address>
                    <div className="mt-4 flex space-x-4">
                      <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-sm text-[#F97316] hover:underline">Google Maps</a>
                      <a href="https://waze.com" target="_blank" rel="noopener noreferrer" className="text-sm text-[#F97316] hover:underline">Waze</a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* FAQ Court */}
          <div className="mt-16">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-[#7C2D12]">Questions fréquentes</h2>
              <p className="text-[#7C2D12]/80 mt-2">Consultez notre FAQ ou contactez-nous pour plus d'informations</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#FFF7ED] rounded-lg p-6">
                <h3 className="text-lg font-semibold text-[#7C2D12] mb-2">Comment puis-je m'abonner à vos services ?</h3>
                <p className="text-[#7C2D12]/80">Vous pouvez vous abonner en vous rendant sur notre page de tarification et en choisissant le plan qui vous convient le mieux.</p>
              </div>
              
              <div className="bg-[#FFF7ED] rounded-lg p-6">
                <h3 className="text-lg font-semibold text-[#7C2D12] mb-2">Combien de temps prend la génération d'articles ?</h3>
                <p className="text-[#7C2D12]/80">La génération d'articles prend généralement moins d'une minute, selon la complexité et la longueur demandées.</p>
              </div>
              
              <div className="bg-[#FFF7ED] rounded-lg p-6">
                <h3 className="text-lg font-semibold text-[#7C2D12] mb-2">Puis-je annuler mon abonnement à tout moment ?</h3>
                <p className="text-[#7C2D12]/80">Oui, vous pouvez annuler votre abonnement à tout moment depuis votre espace client, sans frais supplémentaires.</p>
              </div>
              
              <div className="bg-[#FFF7ED] rounded-lg p-6">
                <h3 className="text-lg font-semibold text-[#7C2D12] mb-2">Proposez-vous des solutions pour les entreprises ?</h3>
                <p className="text-[#7C2D12]/80">Oui, nous proposons des plans spéciaux pour les entreprises avec des fonctionnalités adaptées et un accompagnement personnalisé.</p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Button 
                className="bg-white border border-[#F97316] text-[#F97316] hover:bg-[#FFF7ED] px-6 py-3 rounded-lg"
                onClick={() => window.location.href = '/#faq'}
              >
                Voir toutes les FAQ
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Style pour empêcher la sélection du texte */}
      <style jsx global>{`
        .select-none {
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -khtml-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
      `}</style>
    </div>
  );
} 