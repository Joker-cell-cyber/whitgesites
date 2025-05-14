'use client';

import { useState, Suspense } from 'react';
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Loader2, Mail, Phone, Clock } from "lucide-react";
import { useLegal } from "@/app/context/legal-context";

// Fonction pour insérer des caractères invisibles entre les caractères d'un texte
const obfuscateText = (text: string) => {
  return text.split('').join('\u200B'); // Insertion de caractères de largeur zéro
};

export default function ContactPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 text-pink-500 animate-spin" />
          <p className="text-gray-400">Chargement du formulaire de contact...</p>
        </div>
      </div>
    }>
      <ContactContent />
    </Suspense>
  );
}

function ContactContent() {
  const { openLegalModal } = useLegal();
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
  const protectedEmail = obfuscateText("support@seduc-ia.com");
  const protectedPhone = obfuscateText("(850) 783-4170");
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
          from_name: 'Formulaire de contact SeducIA'
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
    <div className="min-h-screen py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* En-tête */}
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 border border-pink-500/30 rounded-full backdrop-blur-sm bg-black/10 text-pink-300 text-sm font-medium mb-4">
              <span className="mr-2 inline-block w-2 h-2 rounded-full bg-pink-400 animate-pulse"></span>
              Nous contacter
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Besoin d'aide ?
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Notre équipe est à votre disposition pour répondre à toutes vos questions et vous accompagner dans votre expérience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Informations de contact */}
            <div className="md:col-span-1 space-y-6">
              <div className="bg-black/40 backdrop-blur-xl rounded-xl p-6 border border-pink-500/20">
                <h2 className="text-xl font-bold text-white mb-4">Nos coordonnées</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-pink-500/10 flex items-center justify-center mr-3">
                      <Mail className="h-5 w-5 text-pink-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-300">Email</h3>
                      <p 
                        className="text-gray-400 mt-1 select-none" 
                        onCopy={(e) => {
                          e.preventDefault();
                          navigator.clipboard.writeText("support@seduc-ia.com");
                        }}
                      >
                        {protectedEmail}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-pink-500/10 flex items-center justify-center mr-3">
                      <Phone className="h-5 w-5 text-pink-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-300">Téléphone</h3>
                      <p 
                        className="text-gray-400 mt-1 select-none"
                        onCopy={(e) => {
                          e.preventDefault();
                          navigator.clipboard.writeText("(850) 783-4170");
                        }}
                      >
                        {protectedPhone}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-pink-500/10 flex items-center justify-center mr-3">
                      <Clock className="h-5 w-5 text-pink-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-300">Horaires</h3>
                      <p 
                        className="text-gray-400 mt-1 select-none"
                        onCopy={(e) => {
                          e.preventDefault();
                          navigator.clipboard.writeText("Lun-Ven: 9h-18h");
                        }}
                      >
                        {protectedHours}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-black/40 backdrop-blur-xl rounded-xl p-6 border border-pink-500/20">
                <h2 className="text-xl font-bold text-white mb-4">Informations légales</h2>
                <div className="space-y-2">
                  <button 
                    onClick={() => openLegalModal('terms')}
                    className="w-full text-left px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors"
                  >
                    Conditions d'utilisation
                  </button>
                  <button 
                    onClick={() => openLegalModal('privacy')}
                    className="w-full text-left px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors"
                  >
                    Politique de confidentialité
                  </button>
                  <button 
                    onClick={() => openLegalModal('legal')}
                    className="w-full text-left px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors"
                  >
                    Mentions légales
                  </button>
                  <button 
                    onClick={() => openLegalModal('refund')}
                    className="w-full text-left px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors"
                  >
                    Politique de remboursement
                  </button>
                </div>
              </div>
            </div>
            
            {/* Formulaire de contact */}
            <div className="md:col-span-2">
              <div className="bg-black/40 backdrop-blur-xl rounded-xl p-6 border border-pink-500/20">
                <h2 className="text-xl font-bold text-white mb-6">Envoyez-nous un message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Nom complet
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-black/60 border border-pink-500/30 rounded-lg p-3 text-white"
                        placeholder="Votre nom"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-black/60 border border-pink-500/30 rounded-lg p-3 text-white"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                      Sujet
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full bg-black/60 border border-pink-500/30 rounded-lg p-3 text-white"
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
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full bg-black/60 border border-pink-500/30 rounded-lg p-3 text-white h-32"
                      placeholder="Détaillez votre demande ici..."
                    />
                  </div>
                  
                  <div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 py-3"
                    >
                      {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                    </Button>
                  </div>
                  
                  {submitSuccess && (
                    <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                      <p className="text-green-400 text-center">
                        Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
                      </p>
                    </div>
                  )}
                  
                  {submitError && (
                    <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                      <p className="text-red-400 text-center">
                        {submitError}
                      </p>
                    </div>
                  )}
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