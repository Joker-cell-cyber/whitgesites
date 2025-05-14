'use client';

import { useState } from 'react';
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import Link from 'next/link';

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
      // Appel API pour le désabonnement
      const response = await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la demande de désabonnement');
      }

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
    <div className="min-h-screen bg-gradient-to-b from-ocrf-anthracite-900 to-ocrf-brown-900 py-12">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-ocrf-anthracite-800/50 backdrop-blur-sm border border-ocrf-gold-500/10 rounded-xl p-6">
          <h1 className="text-2xl font-bold text-white mb-4">Désabonnement</h1>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-ocrf-brown-200 mb-2">
                Prénom
              </label>
              <Input
                id="firstName"
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                className="w-full bg-ocrf-anthracite-700 border-ocrf-gold-500/20"
                placeholder="Votre prénom"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-ocrf-brown-200 mb-2">
                Nom
              </label>
              <Input
                id="lastName"
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                className="w-full bg-ocrf-anthracite-700 border-ocrf-gold-500/20"
                placeholder="Votre nom"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-ocrf-brown-200 mb-2">
                Email associé à votre compte
              </label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full bg-ocrf-anthracite-700 border-ocrf-gold-500/20"
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

            <div className="pt-2">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Traitement en cours...' : 'Confirmer le désabonnement'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 