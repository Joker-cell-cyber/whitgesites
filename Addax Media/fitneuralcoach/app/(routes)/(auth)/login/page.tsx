'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/app/lib/auth-hooks';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Suspense } from 'react';

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
  const redirect = searchParams?.get('redirect') || '/coach';

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
    <div>
      <h1 className="text-center text-2xl font-bold text-white mb-6">Connexion</h1>
      <p className="text-center text-neutral-light mb-6">Accédez à votre espace d'entraînement personnel</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-white mb-1 block">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-rose-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-rose-500 focus:ring focus:ring-rose-500/20"
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="password" className="text-sm font-medium text-white mb-1 block">
              Mot de passe
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-rose-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-rose-500 focus:ring focus:ring-rose-500/20"
                required
              />
            </div>
          </div>
        </div>
        
        {errorMessage && (
          <div className="p-4 bg-red-900/20 border border-red-500/20 rounded-lg text-red-200 text-sm">
            <div className="flex items-center">
              <svg className="h-5 w-5 text-red-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errorMessage}
            </div>
          </div>
        )}
        
        {loginStatus === 'success' && (
          <div className="p-4 bg-green-900/20 border border-green-500/20 rounded-lg text-green-200 text-sm">
            <div className="flex items-center">
              <svg className="h-5 w-5 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Connexion réussie ! Redirection en cours...
            </div>
          </div>
        )}
        
        <Button 
          type="submit" 
          className="w-full bg-gradient-to-br from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 shadow-lg shadow-rose-500/20 hover:shadow-rose-500/30"
          disabled={loginStatus === 'loading'}
        >
          {loginStatus === 'loading' ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Connexion en cours...
            </span>
          ) : 'Se connecter'}
        </Button>
      </form>
    </div>
  );
}

/**
 * Page de connexion avec Suspense
 */
export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-32">
      <svg className="animate-spin h-8 w-8 text-rose-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>}>
      <LoginContent />
    </Suspense>
  );
}