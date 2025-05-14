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
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 shadow-xl border border-purple-500/20">
          <h1 className="text-3xl font-bold text-white mb-2">Désabonnement</h1>
          <p className="text-gray-400 mb-8">
            Pour confirmer votre désabonnement, veuillez remplir le formulaire ci-dessous.
          </p>

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
                message.type === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
              }`}>
                {message.text}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Traitement en cours...' : 'Confirmer le désabonnement'}
            </Button>

            <p className="text-sm text-gray-400 text-center mt-4">
              Une question ? <a href="/contact" className="text-purple-400 hover:text-purple-300">Contactez-nous</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
} 