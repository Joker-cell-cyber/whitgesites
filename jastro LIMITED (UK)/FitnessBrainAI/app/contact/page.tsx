'use client';

import { useState, useCallback } from 'react';
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  Clock, 
  Send, 
  MessageCircle,
  HelpCircle
} from 'lucide-react';

// Fonction pour insérer des caractères invisibles entre les caractères d'un texte
const obfuscateText = (text: string) => {
  if (typeof text !== 'string') return '';
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

  // Informations de contact protégées - utilisez des valeurs réelles en production
  const protectedEmail = "support@fitnessbrainai.com";
  const protectedPhone = "(850) 783-4170";
  const protectedHours = "Lun-Ven: 9h-18h";

  // Fonction pour copier du texte dans le presse-papiers avec vérification côté client
  const copyToClipboard = useCallback((text: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text)
        .catch(err => console.error('Erreur lors de la copie :', err));
    }
  }, []);

  // Handler pour éviter la copie du texte obfusqué
  const handleCopy = useCallback((e: React.ClipboardEvent, text: string) => {
    e.preventDefault();
    copyToClipboard(text);
  }, [copyToClipboard]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
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
        setSubmitError(data.message || 'Une erreur est survenue. Veuillez réessayer.');
      }
    } catch (error) {
      setSubmitError('Une erreur est survenue. Veuillez réessayer.');
      console.error('Erreur lors de l\'envoi du formulaire:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Contact</h1>
            <div className="h-1 w-20 bg-cyan-500 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-md mx-auto">
              Notre équipe est à votre disposition pour répondre à toutes vos questions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Formulaire */}
            <div className="md:col-span-8 bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <MessageCircle className="h-5 w-5 mr-2 text-cyan-500" />
                Envoyez-nous un message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nom complet
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-200 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                      placeholder="Votre nom"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-200 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Sujet
                  </label>
                  <Select
                    value={formData.subject}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}
                  >
                    <SelectTrigger className="w-full border border-gray-200 rounded-md focus:ring-cyan-500 focus:border-cyan-500">
                      <SelectValue placeholder="Sélectionnez un sujet" />
                    </SelectTrigger>
                    <SelectContent className="border border-gray-200 rounded-md">
                      <SelectItem value="question">Question générale</SelectItem>
                      <SelectItem value="support">Support technique</SelectItem>
                      <SelectItem value="billing">Facturation</SelectItem>
                      <SelectItem value="partnership">Partenariat</SelectItem>
                      <SelectItem value="other">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full min-h-[150px] border border-gray-200 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="Détaillez votre demande ici..."
                  />
                </div>
                
                <div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 px-4 rounded-md transition-all"
                  >
                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                  </Button>
                </div>
                
                {submitSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-50 border border-green-200 rounded-md text-green-800 text-sm"
                  >
                    Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
                  </motion.div>
                )}
                
                {submitError && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 border border-red-200 rounded-md text-red-800 text-sm"
                  >
                    {submitError}
                  </motion.div>
                )}
              </form>
            </div>
            
            {/* Informations de contact */}
            <div className="md:col-span-4">
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Nos coordonnées
                </h2>
                
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Mail className="h-5 w-5 text-cyan-500 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">Email</p>
                      <p 
                        className="text-sm text-gray-600 cursor-pointer" 
                        onClick={() => copyToClipboard(protectedEmail)}
                        onCopy={(e) => handleCopy(e, protectedEmail)}
                      >
                        {obfuscateText(protectedEmail)}
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <Phone className="h-5 w-5 text-cyan-500 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">Téléphone</p>
                      <p 
                        className="text-sm text-gray-600 cursor-pointer" 
                        onClick={() => copyToClipboard(protectedPhone)}
                        onCopy={(e) => handleCopy(e, protectedPhone)}
                      >
                        {obfuscateText(protectedPhone)}
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <Clock className="h-5 w-5 text-cyan-500 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">Horaires</p>
                      <p className="text-sm text-gray-600">{protectedHours}</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-cyan-50 p-6 rounded-lg border border-cyan-100">
                <div className="flex items-start">
                  <HelpCircle className="h-5 w-5 text-cyan-600 mt-0.5 mr-3" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-800 mb-2">
                      Besoin d'aide rapide ?
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Consultez notre FAQ pour trouver des réponses à vos questions les plus fréquentes.
                    </p>
                    <Link href="/#faq" className="text-sm font-medium text-cyan-600 hover:text-cyan-700">
                      Voir la FAQ →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 