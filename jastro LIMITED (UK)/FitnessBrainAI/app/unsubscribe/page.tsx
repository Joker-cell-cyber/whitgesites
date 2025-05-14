'use client';

import { useState } from 'react';
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";

export default function Unsubscribe() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      // TODO: Implémenter l'appel API pour le désabonnement
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulation d'appel API
      setMessage({
        type: 'success',
        text: 'Votre demande de désabonnement a été prise en compte. Vous recevrez un email de confirmation.'
      });
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Une erreur est survenue. Veuillez réessayer ou contacter le support.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 shadow-xl border-2 border-red-500">
          <h1 className="text-4xl font-bold text-white mb-3">Désabonnement</h1>
          <div className="border-l-4 border-red-500 pl-4 mb-8">
            <p className="text-red-400 font-medium text-lg mb-2">
              Vous êtes sur le point de vous désabonner de nos services.
            </p>
            <p className="text-gray-300">
              Pour confirmer votre désabonnement, veuillez remplir le formulaire ci-dessous.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                Prénom
              </label>
              <Input
                id="firstName"
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                className="w-full bg-black/50"
                placeholder="Votre prénom"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                Nom
              </label>
              <Input
                id="lastName"
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                className="w-full bg-black/50"
                placeholder="Votre nom"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full bg-black/50"
                placeholder="votre@email.com"
              />
            </div>

            {message && (
              <div className={`p-4 rounded-lg ${
                message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500' : 'bg-red-500/10 text-red-400 border border-red-500'
              }`}>
                {message.text}
              </div>
            )}

            <Button
              type="submit"
              className="w-full text-lg py-6 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 font-bold"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Traitement en cours...' : 'CONFIRMER LE DÉSABONNEMENT'}
            </Button>

            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 mt-6">
              <p className="text-white font-medium text-center mb-2">
                Vous changez d'avis ?
              </p>
              <a href="/" className="block w-full text-center py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors">
                Retourner à l'accueil
              </a>
            </div>

            <p className="text-sm text-gray-400 text-center mt-4">
              Une question ? <a href="/contact" className="text-purple-400 hover:text-purple-300 font-medium">Contactez-nous</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
} 