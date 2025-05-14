'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/app/lib/auth-hooks';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Suspense } from 'react';
import { Leaf, TreePine, Sprout, Mail, Lock } from 'lucide-react';

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
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-[#F8F4E9] via-[#E8DFC7] to-[#F0EBE1]">
      {/* Motifs de fond organiques */}
      <div className="absolute inset-0 bg-[url('/patterns/leaves-pattern.svg')] bg-repeat opacity-5 pointer-events-none z-0"></div>
      
      {/* Éléments décoratifs */}
      <div className="absolute top-20 right-20 opacity-10">
        <TreePine className="h-32 w-32 text-[#5F7138]" />
      </div>
      <div className="absolute bottom-20 left-20 opacity-10">
        <Leaf className="h-24 w-24 text-[#C17A56] rotate-45" />
      </div>
      
      <div className="relative w-full max-w-md p-8 space-y-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-[#5F7138]/20 z-10">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#5F7138] to-[#7F8F55] flex items-center justify-center shadow-md">
              <Sprout className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[#4F4639] mb-2">Connexion</h1>
          <p className="text-[#7F7259]">Accédez à votre espace personnel</p>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-5">
            <div>
              <label className="text-sm font-medium text-[#4F4639] mb-1 block">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-[#5F7138]" />
                </div>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  className="pl-10 bg-[#F8F4E9]/80 border-[#E8DFC7] text-[#4F4639] focus:border-[#5F7138] focus:ring focus:ring-[#5F7138]/20"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-[#4F4639] mb-1 block">Mot de passe</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[#5F7138]" />
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 bg-[#F8F4E9]/80 border-[#E8DFC7] text-[#4F4639] focus:border-[#5F7138] focus:ring focus:ring-[#5F7138]/20"
                  required
                />
              </div>
            </div>
          </div>
          
          {errorMessage && (
            <div className="p-4 bg-[#F9E7E2] border border-[#C17A56]/30 rounded-lg text-[#C17A56] text-sm">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-[#C17A56] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errorMessage}
              </div>
            </div>
          )}
          
          {loginStatus === 'success' && (
            <div className="p-4 bg-[#EDF2E4] border border-[#5F7138]/30 rounded-lg text-[#5F7138] text-sm">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-[#5F7138] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Connexion réussie ! Redirection en cours...
              </div>
            </div>
          )}
          
          <div>
            <Button 
              type="submit" 
              className="w-full py-6 bg-gradient-to-r from-[#5F7138] to-[#7F8F55] hover:from-[#526129] hover:to-[#6C7A47] text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:translate-y-[-2px] disabled:opacity-70 disabled:hover:translate-y-0"
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
          </div>
        </form>
      </div>
      
      <div className="mt-8 text-center text-sm text-[#7F7259]/80">
      AdIntelliVue — Plateforme d'analyse de données publicitaires Facebook Ads propulsée par l'IA
      </div>
    </div>
  );
}

/**
 * Page de connexion avec Suspense
 */
export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-[#F8F4E9]">
      <div className="w-12 h-12 rounded-full border-4 border-[#5F7138]/20 border-t-[#5F7138] animate-spin"></div>
    </div>}>
      <LoginContent />
    </Suspense>
  );
}