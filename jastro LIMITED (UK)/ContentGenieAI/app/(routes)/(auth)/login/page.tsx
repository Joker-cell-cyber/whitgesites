'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/app/lib/auth-hooks';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Suspense } from 'react';
import { Droplet, Mail, Lock, AlertCircle, CheckCircle, Fish } from 'lucide-react';
import { motion } from 'framer-motion';

// Définition du composant WaveIcon
const WaveIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
    <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
    <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
  </svg>
);

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen flex flex-col items-center justify-center p-4"
    >
      {/* Élément de fond */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#14304D]/90 via-[#1A7BA4]/80 to-[#0B4D6C]/90"></div>
      </div>
      
      {/* Bulles animées */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full bg-[#BBE5EF]/30 backdrop-blur-sm border border-[#BBE5EF]/10 w-${4 + (i % 4) * 2} h-${4 + (i % 4) * 2}`}
            initial={{ 
              x: `${20 + i * 15}%`, 
              y: '110%', 
              opacity: 0.2 + (i % 10) * 0.05 
            }}
            animate={{ 
              y: '-10%',
              transition: { 
                duration: 15 + i * 2.5, 
                repeat: Infinity, 
                ease: 'linear'
              }
            }}
          />
        ))}
      </div>
      
      {/* Éléments décoratifs */}
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-[#BBE5EF]/10 rounded-full z-0 opacity-50"></div>
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-[#BBE5EF]/20 rounded-full z-0 opacity-50"></div>
      
      <div className="relative w-full max-w-md p-8 space-y-8 bg-white/5 backdrop-blur-md rounded-xl border border-[#BBE5EF]/20 shadow-xl shadow-[#14304D]/20 z-10">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#1A7BA4] to-[#26A69A] flex items-center justify-center shadow-lg">
              <WaveIcon className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Connexion</h1>
          <p className="text-[#BBE5EF]">Accédez à votre espace ContentGenieAI</p>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-5">
            <div>
              <label className="text-sm font-medium text-[#BBE5EF] mb-1 block">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-[#26A69A]" />
                </div>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  className="pl-10 bg-white/10 border-[#BBE5EF]/30 text-white placeholder-[#BBE5EF]/50 focus:border-[#26A69A] focus:ring focus:ring-[#26A69A]/20"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-[#BBE5EF] mb-1 block">Mot de passe</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[#26A69A]" />
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 bg-white/10 border-[#BBE5EF]/30 text-white placeholder-[#BBE5EF]/50 focus:border-[#26A69A] focus:ring focus:ring-[#26A69A]/20"
                  required
                />
              </div>
            </div>
          </div>
          
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-white text-sm"
            >
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                {errorMessage}
              </div>
            </motion.div>
          )}
          
          {loginStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-[#26A69A]/10 border border-[#26A69A]/20 rounded-lg text-white text-sm"
            >
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-[#26A69A] mr-2" />
                Connexion réussie ! Redirection en cours...
              </div>
            </motion.div>
          )}
          
          <div>
            <Button 
              type="submit" 
              className="w-full py-6 bg-gradient-to-r from-[#1A7BA4] to-[#26A69A] hover:from-[#166285] hover:to-[#1E8C82] text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-[#1A7BA4]/30 disabled:opacity-70 hover:-translate-y-1 active:translate-y-0"
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
                  <Droplet className="mr-2 h-5 w-5" />
                  Se connecter
                </span>
              )}
            </Button>
          </div>
        </form>
      </div>
      
      <div className="mt-8 text-center text-sm text-[#BBE5EF]/60">
        ContentGenieAI — Générateur d'articles SEO et de descriptions produits
      </div>
    </motion.div>
  );
}

/**
 * Page de connexion avec Suspense
 */
export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-[#1A7BA4]">
      <div className="w-12 h-12 rounded-full border-4 border-[#BBE5EF]/20 border-t-[#BBE5EF] animate-spin"></div>
    </div>}>
      <LoginContent />
    </Suspense>
  );
}