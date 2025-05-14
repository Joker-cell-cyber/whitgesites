'use client';

import { useState } from 'react';
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";

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
  const protectedEmail = obfuscateText("support@adpulse-ai.com");
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
    <div className="min-h-screen bg-white py-16 sm:py-24">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-5 z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-orange-50 opacity-80 z-0"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* En-tête */}
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 border border-orange-300 rounded-full backdrop-blur-sm bg-white/80 text-orange-700 text-sm font-medium mb-4">
              <span className="mr-2 inline-block w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              Nous contacter
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-500 drop-shadow-lg mb-4">
              Besoin d'aide ?
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Notre équipe est à votre disposition pour répondre à toutes vos questions et vous accompagner dans l'utilisation de notre plateforme.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Informations de contact */}
            <div className="md:col-span-1 space-y-6">
              <div className="bg-white rounded-xl p-6 border border-orange-200 shadow-sm">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Nos coordonnées</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                      <svg className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700">Email</h3>
                      <p 
                        className="text-gray-600 mt-1 select-none" 
                        onCopy={(e) => {
                          e.preventDefault();
                          navigator.clipboard.writeText("contact@example.com");
                        }}
                      >
                        {protectedEmail}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                      <svg className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700">Téléphone</h3>
                      <p 
                        className="text-gray-600 mt-1 select-none"
                        onCopy={(e) => {
                          e.preventDefault();
                          navigator.clipboard.writeText("0000000000");
                        }}
                      >
                        {protectedPhone}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                      <svg className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700">Horaires</h3>
                      <p 
                        className="text-gray-600 mt-1 select-none"
                        onCopy={(e) => {
                          e.preventDefault();
                          navigator.clipboard.writeText("Horaires non disponibles");
                        }}
                      >
                        {protectedHours}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 border border-orange-200 shadow-sm">
                <h2 className="text-xl font-bold text-gray-800 mb-4">FAQ</h2>
                <p className="text-gray-600 mb-4">Consultez notre FAQ pour trouver rapidement des réponses à vos questions.</p>
                <Button 
                  className="w-full bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-500 hover:to-yellow-500"
                  onClick={() => window.location.href = '/#faq'}
                >
                  Voir la FAQ
                </Button>
              </div>
            </div>
            
            {/* Formulaire de contact */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-xl p-6 border border-orange-200 shadow-sm">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Envoyez-nous un message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Nom complet
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-white border-orange-200 rounded-lg p-3 text-gray-700"
                        placeholder="Votre nom"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-white border-orange-200 rounded-lg p-3 text-gray-700"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Sujet
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full bg-white border-orange-200 rounded-lg p-3 text-gray-700"
                      placeholder="Sujet de votre message"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full bg-white border-orange-200 rounded-lg p-3 text-gray-700 min-h-32"
                      placeholder="Votre message..."
                    />
                  </div>
                  
                  {submitError && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                      {submitError}
                    </div>
                  )}
                  
                  {submitSuccess && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                      Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.
                    </div>
                  )}
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-500 hover:to-yellow-500"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                  </Button>
                </form>
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