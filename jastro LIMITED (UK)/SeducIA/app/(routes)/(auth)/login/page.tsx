'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/auth-context';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Suspense } from 'react';
import { Heart, Mail, Lock, AlertCircle, CheckCircle, Flame, SparklesIcon } from 'lucide-react';
import { motion } from 'framer-motion';

// Composant qui utilise useSearchParams, englobé dans Suspense
export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen yfc-gradient-bg flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#FF5C3E]/20 border-t-[#FF5C3E] rounded-full animate-spin"></div>
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
    <div className="min-h-screen yfc-gradient-bg flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8 relative">
      {/* Éléments décoratifs de fond */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 right-0 w-96 h-96 rounded-full bg-[#FFA728]/40 blur-3xl"></div>
        <div className="absolute -bottom-40 left-0 w-96 h-96 rounded-full bg-[#FF5C3E]/40 blur-3xl"></div>
        
        {/* Éléments flottants */}
        <motion.div 
          initial={{ y: 0 }}
          animate={{ y: [-10, 10, -10] }}
          transition={{ 
            repeat: Infinity, 
            duration: 6,
            ease: "easeInOut" 
          }}
          className="absolute top-1/4 right-1/4"
        >
          <Heart className="h-16 w-16 text-white/10" />
        </motion.div>
        
        <motion.div 
          initial={{ y: 0 }}
          animate={{ y: [10, -10, 10] }}
          transition={{ 
            repeat: Infinity, 
            duration: 5,
            ease: "easeInOut",
            delay: 0.5
          }}
          className="absolute bottom-1/4 left-1/4"
        >
          <Flame className="h-20 w-20 text-white/10" />
        </motion.div>
      </div>
      
      <div className="w-full max-w-md z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 mb-6">
            <Flame className="w-4 h-4 mr-2 text-[#FFA728]" />
            <span className="text-white/90 text-sm font-medium">Réveillez votre pouvoir de séduction</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">
            <span className="yfc-text-gradient">Connexion</span>
          </h1>
          <p className="text-white/80 text-lg">
            Accédez à votre coach personnel
          </p>
        </motion.div>
        
        {/* Formulaire de connexion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/90 mb-2 font-medium">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-[#FF8046]" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    className="pl-10 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#FF5C3E]/50 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-white/90 mb-2 font-medium">Mot de passe</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-[#FF8046]" />
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#FF5C3E]/50 focus:border-transparent"
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
                className="p-3 bg-[#FF5C3E]/20 border border-[#FF5C3E]/30 rounded-lg"
              >
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-[#FF5C3E] mr-2 flex-shrink-0" />
                  <span className="text-white/90 text-sm">{errorMessage}</span>
                </div>
              </motion.div>
            )}
            
            {loginStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-[#50C878]/20 border border-[#50C878]/30 rounded-lg"
              >
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-[#50C878] mr-2 flex-shrink-0" />
                  <span className="text-white/90 text-sm">Connexion réussie ! Redirection en cours...</span>
                </div>
              </motion.div>
            )}
            
            {/* Bouton de connexion */}
            <Button 
              type="submit" 
              className="w-full py-6 bg-gradient-to-r from-[#FF5C3E] to-[#FFA728] hover:from-[#FF4B2D] hover:to-[#FF9615] text-white font-bold shadow-lg shadow-[#FF5C3E]/20 hover:shadow-[#FF5C3E]/40 transition-all duration-300 hover:translate-y-[-2px] disabled:opacity-70 disabled:hover:translate-y-0"
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
                <span className="flex items-center justify-center">
                  <Heart className="mr-2 h-5 w-5" />
                  Se connecter
                </span>
              )}
            </Button>
            
            <div className="text-center mt-4">
              <a href="/register" className="text-white/80 hover:text-white transition-colors duration-300 text-sm flex items-center justify-center">
                <SparklesIcon className="h-4 w-4 mr-1 text-[#FFA728]" />
                Pas encore inscrit ? Créer un compte
              </a>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}