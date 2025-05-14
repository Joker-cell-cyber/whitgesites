'use client';

import { useState } from 'react';
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Mail, Phone, Clock, Sparkles } from 'lucide-react';

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
  const protectedEmail = obfuscateText("support@content-forge-ai.com");
  const protectedPhone = obfuscateText("(971) 315-8948");
  const protectedHours = obfuscateText("Lun-Ven: 9h-18h");

  // Animation particules
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    size: Math.random() * 6 + 2,
    posX: Math.random() * 100,
    posY: Math.random() * 100,
    opacity: Math.random() * 0.4 + 0.1,
    rotation: Math.random() * 360,
    animationDuration: Math.random() * 15 + 10
  }));

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
    <div className="min-h-screen py-16 sm:py-24 bg-gradient-to-b from-ocrf-anthracite-900 to-ocrf-brown-900 relative overflow-hidden">
      {/* Particules décoratives */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle, index) => (
          <div 
            key={index}
            className="absolute"
            style={{
              top: `${particle.posY}%`,
              left: `${particle.posX}%`,
              opacity: particle.opacity,
              animation: `float ${particle.animationDuration}s ease-in-out infinite alternate`
            }}
          >
            <div 
              className="w-full h-full bg-ocrf-gold-300" 
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                transform: `rotate(${particle.rotation}deg)`,
              }}
            />
          </div>
        ))}
      </div>
      
      {/* Effet de lumière radiale */}
      <div className="absolute inset-0 bg-gradient-radial from-ocrf-gold-500/5 to-transparent" style={{ mixBlendMode: 'overlay' }}></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* En-tête */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium bg-ocrf-copper-500/10 text-ocrf-copper-500 mb-4">
              <span className="mr-2 inline-block w-2 h-2 rounded-full bg-ocrf-copper-400 animate-pulse"></span>
              <span>Nous contacter</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-ocrf-gold-300 to-ocrf-copper-500 mb-4">
              Besoin d'aide ?
            </h1>
            
            <p className="text-lg text-ocrf-brown-100 max-w-2xl mx-auto">
              Notre équipe est à votre disposition pour répondre à toutes vos questions et vous accompagner dans l'utilisation de notre plateforme.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Informations de contact */}
            <div className="md:col-span-1 space-y-6">
              <div className="bg-ocrf-anthracite-800/40 backdrop-blur-xl rounded-xl p-6 border border-ocrf-gold-500/20 shadow-lg shadow-black/30">
                <h2 className="text-xl font-bold text-ocrf-gold-300 mb-4">Nos coordonnées</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-ocrf-gold-500/20 to-ocrf-copper-500/20 flex items-center justify-center mr-3 border border-ocrf-gold-500/10">
                      <Mail className="h-5 w-5 text-ocrf-copper-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-ocrf-gold-300">Email</h3>
                      <p 
                        className="text-ocrf-brown-200 mt-1 select-none" 
                        onCopy={(e) => {
                          e.preventDefault();
                          navigator.clipboard.writeText("support@content-forge-ai.com");
                        }}
                      >
                        {protectedEmail}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-ocrf-gold-500/20 to-ocrf-copper-500/20 flex items-center justify-center mr-3 border border-ocrf-gold-500/10">
                      <Phone className="h-5 w-5 text-ocrf-gold-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-ocrf-gold-300">Téléphone</h3>
                      <p 
                        className="text-ocrf-brown-200 mt-1 select-none"
                        onCopy={(e) => {
                          e.preventDefault();
                          navigator.clipboard.writeText("(971) 315-8948");
                        }}
                      >
                        {protectedPhone}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-ocrf-gold-500/20 to-ocrf-copper-500/20 flex items-center justify-center mr-3 border border-ocrf-gold-500/10">
                      <Clock className="h-5 w-5 text-ocrf-copper-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-ocrf-gold-300">Horaires</h3>
                      <p 
                        className="text-ocrf-brown-200 mt-1 select-none"
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
              
              <div className="bg-ocrf-anthracite-800/40 backdrop-blur-xl rounded-xl p-6 border border-ocrf-gold-500/20 shadow-lg shadow-black/30">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ocrf-gold-400 to-ocrf-copper-500 flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-ocrf-anthracite-900" />
                  </div>
                  <h2 className="text-xl font-bold text-ocrf-gold-300">FAQ</h2>
                </div>
                <p className="text-ocrf-brown-200 mb-4">Consultez notre FAQ pour trouver rapidement des réponses à vos questions.</p>
                <Button 
                  className="w-full bg-gradient-to-r from-ocrf-copper-500 to-ocrf-gold-500 hover:from-ocrf-copper-600 hover:to-ocrf-gold-600 text-ocrf-anthracite-900 font-medium"
                  onClick={() => window.location.href = '/#faq'}
                >
                  Voir la FAQ
                </Button>
              </div>
            </div>
            
            {/* Formulaire de contact */}
            <div className="md:col-span-2">
              <div className="bg-ocrf-anthracite-800/40 backdrop-blur-xl rounded-xl p-6 md:p-8 border border-ocrf-gold-500/20 shadow-lg shadow-black/30">
                <h2 className="text-xl font-bold text-ocrf-gold-300 mb-6">Envoyez-nous un message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-ocrf-gold-200 mb-2">
                        Nom complet
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-ocrf-anthracite-900/60 border border-ocrf-gold-500/30 rounded-lg p-3 text-ocrf-brown-100 focus:border-ocrf-copper-500 focus:ring focus:ring-ocrf-copper-500/20"
                        placeholder="Votre nom"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-ocrf-gold-200 mb-2">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-ocrf-anthracite-900/60 border border-ocrf-gold-500/30 rounded-lg p-3 text-ocrf-brown-100 focus:border-ocrf-copper-500 focus:ring focus:ring-ocrf-copper-500/20"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-ocrf-gold-200 mb-2">
                      Sujet
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full bg-ocrf-anthracite-900/60 border border-ocrf-gold-500/30 rounded-lg p-3 text-ocrf-brown-100 focus:border-ocrf-copper-500 focus:ring focus:ring-ocrf-copper-500/20"
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
                    <label htmlFor="message" className="block text-sm font-medium text-ocrf-gold-200 mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full bg-ocrf-anthracite-900/60 border border-ocrf-gold-500/30 rounded-lg p-3 text-ocrf-brown-100 focus:border-ocrf-copper-500 focus:ring focus:ring-ocrf-copper-500/20 h-32"
                      placeholder="Détaillez votre demande ici..."
                    />
                  </div>
                  
                  <div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-ocrf-copper-500 to-ocrf-gold-500 hover:from-ocrf-copper-600 hover:to-ocrf-gold-600 text-ocrf-anthracite-900 font-medium py-3 shadow-lg shadow-ocrf-copper-500/20"
                    >
                      {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                    </Button>
                  </div>
                  
                  {submitSuccess && (
                    <div className="p-4 bg-ocrf-gold-500/10 border border-ocrf-gold-500/30 rounded-lg">
                      <p className="text-ocrf-gold-300 text-center">
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
      
      {/* Animations CSS */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
          100% { transform: translateY(10px) rotate(-5deg); }
        }
        
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