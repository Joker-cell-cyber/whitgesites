'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/app/lib/auth-hooks';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Suspense } from 'react';
import Link from 'next/link';
import { Mail, Lock, BrainCircuit, CheckCircle, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-[#F5F2FC] to-white">
      {/* Éléments décoratifs */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#FBFAF6] to-transparent"></div>
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#E2D9F3]/30 blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[#D3E9DD]/30 blur-3xl"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-sm border border-[#E2D9F3]/50 overflow-hidden p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-[#A590DC]/10 flex items-center justify-center">
                <BrainCircuit className="h-8 w-8 text-[#A590DC]" />
              </div>
            </div>
            <h1 className="text-2xl font-medium text-[#2A303D] mb-2">Connexion</h1>
            <p className="text-[#2A303D]/60 text-sm">Accédez à votre espace d'entraînement personnel</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="text-sm font-medium text-[#2A303D]/80 mb-1 block">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-[#A590DC]" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    className="pl-10 h-10 bg-[#F8F7FC] border-[#E2D9F3] rounded-lg text-[#2A303D] focus:border-[#A590DC] focus:ring-[#A590DC]/20"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="text-sm font-medium text-[#2A303D]/80 mb-1 block">
                  Mot de passe
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-[#A590DC]" />
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10 h-10 bg-[#F8F7FC] border-[#E2D9F3] rounded-lg text-[#2A303D] focus:border-[#A590DC] focus:ring-[#A590DC]/20"
                    required
                  />
                </div>
              </div>
            </div>
            
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-[#FFF0F0] border border-[#FFCCD5] rounded-lg text-[#E57373] text-sm"
              >
                <div className="flex items-center">
                  <XCircle className="h-4 w-4 mr-2 text-[#E57373]" />
                  {errorMessage}
                </div>
              </motion.div>
            )}
            
            {loginStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-[#F0FFF4] border border-[#D3E9DD] rounded-lg text-[#4CAF50] text-sm"
              >
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-[#4CAF50]" />
                  Connexion réussie ! Redirection en cours...
                </div>
              </motion.div>
            )}
            
            <Button 
              type="submit" 
              className="w-full h-11 bg-[#A590DC] hover:bg-[#8A72CA] text-white font-medium rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-2px]"
              disabled={loginStatus === 'loading'}
            >
              {loginStatus === 'loading' ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Connexion en cours...
                </span>
              ) : 'Se connecter'}
            </Button>
            
            <div className="text-center mt-6">
              <Link 
                href="/contact" 
                className="text-[#A590DC] hover:text-[#8A72CA] text-sm transition-colors duration-200"
              >
                Besoin d'aide ? Contactez-nous
              </Link>
            </div>
          </form>
        </div>
        
        <div className="text-center mt-6 text-[#2A303D]/50 text-xs">
          FitnessBrainAI — Votre coach fitness IA personnel
        </div>
      </motion.div>
    </div>
  );
}

/**
 * Page de connexion avec Suspense
 */
export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen bg-[#F5F2FC]">
      <div className="w-10 h-10 border-2 border-[#A590DC]/30 border-t-[#A590DC] rounded-full animate-spin"></div>
    </div>}>
      <LoginContent />
    </Suspense>
  );
}