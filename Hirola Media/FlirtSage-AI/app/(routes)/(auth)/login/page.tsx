'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/auth-context';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Suspense } from 'react';
import { Heart, Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

// Composant qui utilise useSearchParams, englobé dans Suspense
export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-white to-yfc-cream-50 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-yfc-gold-200 border-t-yfc-gold-500 rounded-full animate-spin"></div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}

// Fonction Login renommée en LoginContent pour clarté
function LoginContent() {
  // État local
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Hooks
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams?.get('redirect') || '/chat';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginStatus('loading');
    
    try {
      const result = await login(email, password);
      
      if (result.success) {
        setLoginStatus('success');
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
    <div className="min-h-screen flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8 relative bg-gradient-to-b from-white to-yfc-cream-50">
      {/* Éléments décoratifs subtils */}
      <div className="absolute inset-0 bg-[url('/subtle-pattern.svg')] bg-repeat opacity-[0.03]"></div>
      <div className="absolute right-0 top-1/4 w-80 h-80 rounded-full bg-yfc-gold-100/30 blur-3xl -z-10"></div>
      <div className="absolute left-0 bottom-1/4 w-64 h-64 rounded-full bg-yfc-cream-200/40 blur-3xl -z-10"></div>
      
      <div className="w-full max-w-md z-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center space-x-2 bg-yfc-cream-100 text-yfc-gold-800 px-4 py-2 rounded-full mb-6">
            <Heart className="h-4 w-4 text-yfc-gold-500 mr-2" />
            <span className="text-sm font-medium">Accédez à votre espace</span>
          </div>
          
          <h1 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-4">
            <span className="yfc-elegant-text relative inline-block">
              Connexion
              <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-yfc-gold-400"></span>
            </span>
          </h1>
          <p className="text-gray-600 max-w-xs mx-auto">
            Retrouvez vos conversations et continuez votre coaching personnalisé
          </p>
        </motion.div>
        
        {/* Formulaire de connexion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-xl border border-yfc-cream-200 shadow-sm p-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-yfc-gold-700 mb-2">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-yfc-gold-500" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    className="pl-10 bg-white border border-yfc-cream-200 rounded-lg text-yfc-gold-800 placeholder-yfc-gold-400 focus:outline-none focus:ring-2 focus:ring-yfc-gold-500/50 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-yfc-gold-700 mb-2">Mot de passe</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-yfc-gold-500" />
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10 bg-white border border-yfc-cream-200 rounded-lg text-yfc-gold-800 placeholder-yfc-gold-400 focus:outline-none focus:ring-2 focus:ring-yfc-gold-500/50 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>
            
            {/* Messages d'erreur ou de succès */}
            {loginStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center bg-red-50 text-red-700 px-4 py-2 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                  <span className="text-sm">{errorMessage}</span>
                </div>
              </motion.div>
            )}
            
            {loginStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center bg-green-50 text-green-700 px-4 py-2 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-sm">Connexion réussie ! Redirection en cours...</span>
                </div>
              </motion.div>
            )}
            
            {/* Bouton de connexion */}
            <Button 
              type="submit" 
              className="yfc-button-primary w-full py-6"
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
              ) : (
                "Se connecter"
              )}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}