'use client';

import { useState } from 'react';
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

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
  const protectedEmail = obfuscateText("support@contentgenie-ai.com");
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
    <section className="py-16 sm:py-24 bg-gradient-to-br from-[#EBF6FA] to-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 onc-water-pattern opacity-20"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1A7BA4] to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1A7BA4] to-transparent"></div>
      
      {/* Éléments décoratifs */}
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-[#BBE5EF]/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-[#D3E9DD]/30 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 sm:px-6 py-2 border border-[#1A7BA4]/30 rounded-full bg-[#BBE5EF]/20 text-[#14304D] text-sm font-medium mb-4"
          >
            <span className="mr-2 inline-block w-2 h-2 rounded-full bg-[#1A7BA4]"></span>
            Nous contacter
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#14304D] onc-heading mb-4"
          >
            Besoin <span className="onc-heading-underline">d'aide</span> ou d'informations ?
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-[#14304D]/80 max-w-2xl mx-auto"
          >
            Notre équipe est à votre disposition pour répondre à toutes vos questions sur notre outil de génération de contenu SEO.
          </motion.p>
          
          {/* Ligne décorative */}
          <div className="w-24 h-1 bg-gradient-to-r from-[#1A7BA4] to-[#26A69A] mx-auto mt-6 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Informations de contact */}
          <div className="md:col-span-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-[#1A7BA4]/20 shadow-lg"
            >
              <h2 className="text-xl font-bold text-[#14304D] mb-6">Nos coordonnées</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#BBE5EF]/50 flex items-center justify-center mr-3">
                    <Mail className="h-5 w-5 text-[#1A7BA4]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#14304D]">Email</h3>
                    <p 
                      className="text-[#14304D]/70 mt-1 select-none" 
                      onCopy={(e) => {
                        e.preventDefault();
                        navigator.clipboard.writeText("support@contentgenie-ai.com");
                      }}
                    >
                      {protectedEmail}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#BBE5EF]/50 flex items-center justify-center mr-3">
                    <Phone className="h-5 w-5 text-[#1A7BA4]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#14304D]">Téléphone</h3>
                    <p 
                      className="text-[#14304D]/70 mt-1 select-none"
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
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#BBE5EF]/50 flex items-center justify-center mr-3">
                    <Clock className="h-5 w-5 text-[#1A7BA4]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#14304D]">Horaires</h3>
                    <p 
                      className="text-[#14304D]/70 mt-1 select-none"
                      onCopy={(e) => {
                        e.preventDefault();
                        navigator.clipboard.writeText("Horaires non disponibles");
                      }}
                    >
                      {protectedHours}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#BBE5EF]/50 flex items-center justify-center mr-3">
                    <MapPin className="h-5 w-5 text-[#1A7BA4]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#14304D]">Adresse</h3>
                    <p className="text-[#14304D]/70 mt-1">
                      Suite 10, 12 Durie Street<br />
                      Leven, Fife<br />
                      United Kingdom, KY8 4HE
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-[#1A7BA4]/20 shadow-lg"
            >
              <h2 className="text-xl font-bold text-[#14304D] mb-4">FAQ</h2>
              <p className="text-[#14304D]/70 mb-4">Consultez notre FAQ pour trouver rapidement des réponses à vos questions.</p>
              <Button 
                className="w-full bg-gradient-to-r from-[#1A7BA4] to-[#26A69A] text-white hover:shadow-lg"
                onClick={() => window.location.href = '/#faq'}
              >
                Voir la FAQ
              </Button>
            </motion.div>
          </div>
          
          {/* Formulaire de contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="md:col-span-2"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-[#1A7BA4]/20 shadow-lg">
              <h2 className="text-xl font-bold text-[#14304D] mb-6">Envoyez-nous un message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#14304D] mb-2">
                      Nom complet
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/70 border border-[#1A7BA4]/30 rounded-lg p-3 text-[#14304D]"
                      placeholder="Votre nom"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#14304D] mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/70 border border-[#1A7BA4]/30 rounded-lg p-3 text-[#14304D]"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-[#14304D] mb-2">
                    Sujet
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/70 border border-[#1A7BA4]/30 rounded-lg p-3 text-[#14304D]"
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
                  <label htmlFor="message" className="block text-sm font-medium text-[#14304D] mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/70 border border-[#1A7BA4]/30 rounded-lg p-3 text-[#14304D] h-32"
                    placeholder="Détaillez votre demande ici..."
                  />
                </div>
                
                <div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#14304D] to-[#1A7BA4] text-white hover:shadow-lg py-3"
                  >
                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                  </Button>
                </div>
                
                {submitSuccess && (
                  <div className="p-4 bg-[#D3E9DD]/50 border border-[#26A69A]/30 rounded-lg flex items-center">
                    <CheckCircle className="h-5 w-5 text-[#26A69A] mr-2" />
                    <p className="text-[#14304D]">
                      Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
                    </p>
                  </div>
                )}
                
                {submitError && (
                  <div className="p-4 bg-red-100 border border-red-300 rounded-lg flex items-center">
                    <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                    <p className="text-red-700">
                      {submitError}
                    </p>
                  </div>
                )}
              </form>
            </div>
          </motion.div>
        </div>

        {/* Section de carte */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 max-w-5xl mx-auto"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden border border-[#1A7BA4]/20 shadow-lg">
            <div className="h-80 w-full">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2216.034196221032!2d-3.0169903235913377!3d56.19764317313701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48863f2e76ee1da7%3A0xc65e5a48c1ccd36b!2s12%20Durie%20Street%2C%20Leven%20KY8%204HE%2C%20Royaume-Uni!5e0!3m2!1sfr!2sfr!4v1711495100000!5m2!1sfr!2sfr" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </motion.div>
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
    </section>
  );
} 