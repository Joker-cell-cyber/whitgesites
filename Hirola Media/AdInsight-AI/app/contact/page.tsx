'use client';

import { useState } from 'react';
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Mail, Phone, Clock, Zap, Send, CheckCircle2, AlertCircle } from 'lucide-react';

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

  // Informations de contact protégées
  const protectedEmail = obfuscateText("support@adinisghtai.com");
  const protectedPhone = obfuscateText("(971) 315-8948");
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
          access_key: 'ea8fbdd7-da72-4110-8c71-21022247c62d',
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
    <div className="min-h-screen bg-adfi-slate-50">
      {/* Bannière supérieure avec dégradé */}
      <div className="h-64 bg-gradient-to-r from-adfi-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10"></div>
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-yellow-300 blur-3xl opacity-20"></div>
          <div className="absolute -bottom-60 -left-20 w-96 h-96 rounded-full bg-purple-600 blur-3xl opacity-20"></div>
        </div>
        <div className="container mx-auto px-6 h-full flex flex-col justify-center items-center relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold text-white text-center drop-shadow-lg">
            Besoin d'aide ? Nous sommes là
          </h1>
          <p className="text-xl text-white/80 text-center mt-4 max-w-2xl">
            Notre équipe est à votre disposition pour vous accompagner dans votre expérience
          </p>
        </div>
      </div>
      
      {/* Carte flottante principale */}
      <div className="container mx-auto px-4 relative -mt-20 mb-16">
        <div className="bg-white rounded-3xl shadow-xl border border-adfi-slate-100 overflow-hidden">
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Informations de contact */}
              <div className="lg:col-span-1 space-y-8">
                <div>
                  <h2 className="text-xl font-semibold text-adfi-slate-900 mb-6">Nos coordonnées</h2>
                  
                  <div className="space-y-6">
                    <div className="flex">
                      <div className="w-12 h-12 rounded-full bg-adfi-blue-50 flex items-center justify-center mr-4 flex-shrink-0">
                        <Mail className="h-5 w-5 text-adfi-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-adfi-slate-900">Email</h3>
                        <p 
                          className="text-adfi-slate-600 mt-1 select-none cursor-pointer" 
                          onCopy={(e) => {
                            e.preventDefault();
                            navigator.clipboard.writeText("support@adinisghtai.com");
                          }}
                          onClick={() => {
                            navigator.clipboard.writeText("support@adinisghtai.com");
                            alert("Email copié dans le presse-papiers");
                          }}
                        >
                          {protectedEmail}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="w-12 h-12 rounded-full bg-adfi-blue-50 flex items-center justify-center mr-4 flex-shrink-0">
                        <Phone className="h-5 w-5 text-adfi-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-adfi-slate-900">Téléphone</h3>
                        <p 
                          className="text-adfi-slate-600 mt-1 select-none cursor-pointer"
                          onCopy={(e) => {
                            e.preventDefault();
                            navigator.clipboard.writeText("(971) 315-8948");
                          }}
                          onClick={() => {
                            navigator.clipboard.writeText("(971) 315-8948");
                            alert("Numéro copié dans le presse-papiers");
                          }}
                        >
                          {protectedPhone}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="w-12 h-12 rounded-full bg-adfi-blue-50 flex items-center justify-center mr-4 flex-shrink-0">
                        <Clock className="h-5 w-5 text-adfi-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-adfi-slate-900">Horaires</h3>
                        <p className="text-adfi-slate-600 mt-1 select-none">
                          {protectedHours}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Carte d'information */}
                <div className="bg-adfi-blue-50 rounded-2xl p-6">
                  <div className="flex items-center mb-4">
                    <Zap className="h-6 w-6 text-adfi-blue-600 mr-3" />
                    <h3 className="text-lg font-semibold text-adfi-slate-900">Réponse rapide</h3>
                  </div>
                  <p className="text-adfi-slate-700 mb-4">
                    Notre équipe s'engage à répondre à toutes les demandes dans un délai de 24h ouvrées.
                  </p>
                  <div className="text-sm text-adfi-slate-600 bg-white/60 rounded-xl p-4">
                    <p className="italic">
                      "Contactez-nous pour toute question relative à votre compte, vos abonnements ou l'utilisation de la plateforme."
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Formulaire de contact */}
              <div className="lg:col-span-2">
                <h2 className="text-xl font-semibold text-adfi-slate-900 mb-6">Envoyez-nous un message</h2>
                
                {submitSuccess ? (
                  <div className="bg-green-50 border border-green-100 rounded-2xl p-8 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-green-800 mb-2">Message envoyé avec succès !</h3>
                    <p className="text-green-700 mb-6">
                      Nous vous répondrons dans les plus brefs délais. Merci de votre patience.
                    </p>
                    <Button 
                      className="bg-white text-green-700 border border-green-200 hover:bg-green-50"
                      onClick={() => setSubmitSuccess(false)}
                    >
                      Envoyer un nouveau message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-adfi-slate-700">
                          Nom complet
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full border-adfi-slate-300 rounded-xl p-4 text-adfi-slate-900"
                          placeholder="Votre nom"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-adfi-slate-700">
                          Email
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full border-adfi-slate-300 rounded-xl p-4 text-adfi-slate-900"
                          placeholder="votre@email.com"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="subject" className="block text-sm font-medium text-adfi-slate-700">
                        Sujet
                      </label>
                      <div className="relative">
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full border border-adfi-slate-300 rounded-xl p-4 text-adfi-slate-900 bg-white appearance-none pr-10"
                        >
                          <option value="">Sélectionnez un sujet</option>
                          <option value="question">Question générale</option>
                          <option value="support">Support technique</option>
                          <option value="billing">Facturation</option>
                          <option value="partnership">Partenariat</option>
                          <option value="other">Autre</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <svg className="h-5 w-5 text-adfi-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="message" className="block text-sm font-medium text-adfi-slate-700">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full border-adfi-slate-300 rounded-xl p-4 text-adfi-slate-900 h-48"
                        placeholder="Détaillez votre demande ici..."
                      />
                    </div>
                    
                    {submitError && (
                      <div className="flex items-center p-4 bg-red-50 border border-red-200 rounded-xl">
                        <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
                        <p className="text-red-700">{submitError}</p>
                      </div>
                    )}
                    
                    <div>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-6 text-base font-semibold bg-adfi-blue-600 hover:bg-adfi-blue-700 text-white rounded-xl relative overflow-hidden group"
                      >
                        <span className="relative z-10 flex items-center justify-center">
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Envoi en cours...
                            </>
                          ) : (
                            <>
                              <Send className="mr-2 h-5 w-5" />
                              Envoyer le message
                            </>
                          )}
                        </span>
                        <span className="absolute inset-0 bg-gradient-to-r from-adfi-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      </Button>
                    </div>
                  </form>
                )}
              </div>
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