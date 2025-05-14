'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/app/lib/auth-hooks';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Suspense } from 'react';
import { Sparkles } from 'lucide-react';

/**
 * Composant de contenu de la page de connexion
 */
function LoginContent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams?.get('redirect') || '/dashboard';

  /**
   * Gère la soumission du formulaire de connexion
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginStatus('loading');
    
    try {
      const result = await login(email, password);
      
      if (result.success) {
        setLoginStatus('success');
        // Redirection après un court délai pour permettre à la session de se mettre à jour
        setTimeout(() => {
          router.push(redirect);
        }, 500);
      } else {
        setErrorMessage(result.message);
        setLoginStatus('error');
      }
    } catch (error: any) {
      setErrorMessage(error.message || 'Une erreur est survenue');
      setLoginStatus('error');
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-ocrf-anthracite-900 to-ocrf-brown-900">
      {/* Motif de fond décoratif */}
      <div className="absolute inset-0 bg-[url('/subtle-grid.svg')] bg-repeat opacity-10 pointer-events-none z-0"></div>
      
      {/* Particules décoratives */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, index) => (
          <div 
            key={index}
            className="absolute w-1 h-20 bg-gradient-to-b from-ocrf-gold-500/0 via-ocrf-gold-500/20 to-ocrf-gold-500/0"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 45}deg)`,
              opacity: Math.random() * 0.3 + 0.1
            }}
          />
        ))}
      </div>
      
      <div className="relative w-full max-w-md p-8 space-y-8 bg-ocrf-anthracite-900/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-ocrf-gold-500/20 z-10">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-ocrf-gold-400 to-ocrf-copper-500 flex items-center justify-center shadow-lg shadow-ocrf-copper-500/30">
              <Sparkles className="w-8 h-8 text-ocrf-anthracite-900" />
            </div>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">Connexion</h1>
          <p className="text-ocrf-gold-300">Accédez à votre espace personnel</p>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-5">
            <div>
              <label className="text-sm font-medium text-ocrf-gold-300 mb-1 block">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-ocrf-copper-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  className="pl-10 bg-ocrf-anthracite-800/60 border-ocrf-gold-500/20 text-white focus:border-ocrf-gold-400 focus:ring focus:ring-ocrf-gold-400/20"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-ocrf-gold-300 mb-1 block">Mot de passe</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-ocrf-copper-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 bg-ocrf-anthracite-800/60 border-ocrf-gold-500/20 text-white focus:border-ocrf-gold-400 focus:ring focus:ring-ocrf-gold-400/20"
                  required
                />
              </div>
            </div>
          </div>
          
          {errorMessage && (
            <div className="p-4 bg-red-900/30 border border-red-500/30 rounded-lg text-red-200 text-sm">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-red-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errorMessage}
              </div>
            </div>
          )}
          
          {loginStatus === 'success' && (
            <div className="p-4 bg-green-900/30 border border-green-500/30 rounded-lg text-green-200 text-sm">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Connexion réussie ! Redirection en cours...
              </div>
            </div>
          )}
          
          <div>
            <Button 
              type="submit" 
              className="w-full py-6 relative overflow-hidden bg-ocrf-anthracite-800 border border-ocrf-gold-500/20 hover:border-ocrf-gold-500/40 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-ocrf-gold-500/20 disabled:opacity-70 group"
              disabled={loginStatus === 'loading'}
            >
              <span className="relative z-10">
                {loginStatus === 'loading' ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Connexion en cours...
                  </span>
                ) : 'Se connecter'}
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-ocrf-gold-500 to-ocrf-copper-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            </Button>
          </div>
        </form>
      </div>
      
      <div className="mt-8 text-center text-sm text-ocrf-gold-400/60">
        ContentForge AI — Générateur d'articles SEO et de descriptions produits
      </div>
    </div>
  );
}

/**
 * Page de connexion avec Suspense
 */
export default function LoginPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <LoginContent />
    </Suspense>
  );
}