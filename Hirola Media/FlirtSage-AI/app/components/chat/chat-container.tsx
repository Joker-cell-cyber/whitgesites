'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Conversation, Message } from '@/app/lib/types/index';
import axios from 'axios';
import { useAuth } from '@/app/context/auth-context';
import { useStats } from '@/app/context/stats-context';
import { ArrowUp, Loader2, Settings, User, Bot, RefreshCw, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import LottieAnimation from '@/app/components/ui/lottie-animation';
import typingAnimation from '@/public/animations/typing.json';
import { TOKEN_COST_MESSAGE } from '@/app/lib/constants';
import Link from 'next/link';

// Interface pour les props du composant
interface ChatContainerProps {
  conversation: Conversation | null;
  onPersonalityChange?: (personality: 'Masculin' | 'Féminin') => Promise<void>;
}

// Composant principal pour le conteneur de chat
export default function ChatContainer({ conversation, onPersonalityChange }: ChatContainerProps) {
  const { user } = useAuth();
  const { stats, refreshStats } = useStats();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showTokenUsage, setShowTokenUsage] = useState(false);
  const [personality, setPersonality] = useState<'Masculin' | 'Féminin'>(
    conversation?.coachPersonality as 'Masculin' | 'Féminin' || 'Masculin'
  );
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Fonction de log côté client
  const logClient = (message: string, data?: any) => {
    console.log(`[CLIENT] ${message}`);
    if (data) console.log(data);
  };
  
  // Utiliser les statistiques pour calculer le nombre de tokens affichés
  const displayTokens = stats?.tokenBalance 
    ? Math.floor(stats.tokenBalance * 1.7) 
    : user?.tokenBalance 
      ? Math.floor(user.tokenBalance * 1.7) 
      : 0;

  // Mettre à jour les messages quand la conversation change
  useEffect(() => {
    if (conversation?.id) {
      logClient(`Chargement de la conversation: ${conversation.id}`);
      fetchMessages(conversation.id);
      setPersonality(conversation.coachPersonality as 'Masculin' | 'Féminin' || 'Masculin');
    } else {
      setMessages([]);
    }
  }, [conversation?.id]);

  // Ajuster la hauteur du textarea selon le contenu
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  // Faire défiler jusqu'au dernier message
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Récupérer les messages d'une conversation
  const fetchMessages = async (conversationId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      logClient(`Récupération des messages pour la conversation: ${conversationId}`);
      const response = await axios.get(`/api/messages?conversationId=${conversationId}`);
      const { messages } = response.data;
      
      logClient(`${messages?.length || 0} messages récupérés pour la conversation: ${conversationId}`);
      setMessages(messages || []);
    } catch (error) {
      console.error('Erreur lors de la récupération des messages:', error);
      setError("Impossible de charger les messages. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  // Envoyer un message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || !conversation?.id) return;
    
    // Vérifier si l'utilisateur a suffisamment de tokens
    const currentTokenBalance = stats?.tokenBalance || user?.tokenBalance || 0;
    if (currentTokenBalance <= 0) {
      setError("Vous n'avez plus de tokens. Veuillez en acheter pour continuer à discuter.");
      return;
    }
    
    const messageContent = message.trim();
    setMessage('');
    
    logClient(`Envoi d'un nouveau message: "${messageContent ? messageContent.substring(0, 50) + '...' : 'Message vide'}"`, {
      conversationId: conversation.id
    });
    
    const userMessage = {
      id: `temp-${Date.now()}`,
      conversationId: conversation.id,
      content: messageContent,
      timestamp: new Date().toISOString(),
      sender: 'user' as const
    };
    
    // Ajouter le message de l'utilisateur localement
    setMessages(prev => [...prev, userMessage]);
    logClient(`Message utilisateur ajouté localement avec id temporaire: ${userMessage.id}`);
    
    // Animation de saisie du coach
    setIsTyping(true);
    setError(null);
    
    try {
      // Définir un timeout pour la requête
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 50000); // 50 secondes
      
      logClient(`Appel de l'API pour traiter le message: ${userMessage.id}`);
      
      // Envoyer le message à l'API
      const response = await axios.post('/api/messages', {
        conversationId: conversation.id,
        content: messageContent,
        sender: 'user'
      }, {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      // Récupérer la réponse
      const { messages: updatedMessages } = response.data;
      
      logClient(`Réponse de l'API reçue avec ${updatedMessages?.length || 0} messages`, {
        lastMessageSender: updatedMessages?.length ? updatedMessages[updatedMessages.length - 1].sender : 'unknown',
        lastMessageContent: updatedMessages?.length && updatedMessages[updatedMessages.length - 1].content ? 
          updatedMessages[updatedMessages.length - 1].content.substring(0, 50) + '...' : 'Contenu vide'
      });

      // Vérifier si la dernière réponse de l'IA est vide ou trop courte
      if (updatedMessages && updatedMessages.length > 0) {
        const lastMessage = updatedMessages[updatedMessages.length - 1];
        if (lastMessage.sender === 'coach') {
          // Réponse trop courte (moins de 20 caractères)
          if (lastMessage.content.length < 20) {
            logClient(`Réponse trop courte détectée: "${lastMessage.content}"`);
            setError("La réponse générée est trop courte. Veuillez réessayer.");
            console.error("Réponse trop courte détectée:", lastMessage.content);
            // Conserver le message de l'utilisateur mais ne pas afficher la réponse du coach
            setMessages(prev => prev.filter(m => m.sender !== 'coach' || m.id !== lastMessage.id));
            return;
          }
          
          // Vérifier si la réponse contient un message générique couramment utilisé 
          // pour signaler une erreur de génération
          const genericPhrases = [
            "j'ai rencontré un petit problème technique",
            "la connexion avec mon cerveau est un peu lente",
            "je suis désolé, je n'ai pas pu",
            "peux-tu reformuler ta question"
          ];
          
          const isGenericError = genericPhrases.some(phrase => 
            lastMessage.content.toLowerCase().includes(phrase.toLowerCase())
          );
          
          if (isGenericError) {
            logClient(`Message d'erreur générique détecté dans la réponse`);
            setError("La réponse générée n'était pas optimale. Veuillez reformuler votre question ou essayer plus tard.");
            // On garde quand même la réponse dans ce cas
          }
        }
      }
      
      // Vérifier si le dernier message utilisateur correspond à notre requête
      const userMessages = updatedMessages.filter((m: Message) => m.sender === 'user');
      const lastUserMessage = userMessages[userMessages.length - 1];
      
      if (lastUserMessage && lastUserMessage.content !== messageContent) {
        logClient(`ALERTE: Le dernier message utilisateur dans la réponse (${lastUserMessage.content ? lastUserMessage.content.substring(0, 30) + '...' : 'Contenu vide'}) ne correspond pas au message envoyé (${messageContent ? messageContent.substring(0, 30) + '...' : 'Message vide'})`);
      }
      
      // Mettre à jour l'état avec les messages mis à jour
      setMessages(updatedMessages || []);
      logClient(`État des messages mis à jour avec ${updatedMessages?.length || 0} messages`);
      
      // Rafraîchir les statistiques pour mettre à jour le solde de tokens
      await refreshStats(true);
      
      // Afficher la notification de consommation de tokens
      setShowTokenUsage(true);
      
      // Masquer la notification après 3 secondes
      setTimeout(() => {
        setShowTokenUsage(false);
      }, 3000);
    } catch (error: any) {
      logClient(`Erreur lors de l'envoi du message:`, error);
      
      // Ne pas supprimer le message de l'utilisateur en cas d'erreur
      // Mais afficher un message d'erreur approprié selon le type d'erreur
      if (error.name === 'AbortError' || (error.response && error.response.status === 504)) {
        setError("La génération de la réponse a pris trop de temps. Veuillez réessayer avec une question plus simple ou réessayer plus tard.");
      } else if (error.response && error.response.status === 429) {
        setError("Trop de requêtes en même temps. Veuillez attendre quelques secondes avant de réessayer.");
      } else if (error.response && error.response.status === 401) {
        setError("Votre session a expiré. Veuillez vous reconnecter.");
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else {
        setError("Impossible d'envoyer votre message. Veuillez réessayer.");
      }
    } finally {
      setIsTyping(false);
    }
  };

  // Faire défiler jusqu'au dernier message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Changer la personnalité du coach
  const handlePersonalityChange = async (newPersonality: 'Masculin' | 'Féminin') => {
    if (!conversation?.id || !onPersonalityChange) return;
    
    try {
      setPersonality(newPersonality);
      setShowSettings(false);
      await onPersonalityChange(newPersonality);
    } catch (error) {
      console.error('Erreur lors du changement de personnalité:', error);
      setError("Impossible de changer la personnalité du coach. Veuillez réessayer.");
    }
  };

  // Afficher un message d'accueil si pas de conversation
  if (!conversation) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 bg-gradient-to-b from-blue-50 to-white backdrop-blur-sm">
        <div className="mb-6">
          <Sparkles className="h-16 w-16 text-purple-500/80 mx-auto" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
          Bienvenue chez FlirtSage AI
        </h2>
        
        <p className="text-gray-700 text-center max-w-md mx-auto mb-8">
          Je suis votre coach personnel pour tout ce qui touche à la séduction. 
          N'hésitez pas à me poser vos questions sur le dating, les relations et la séduction.
        </p>
        
        <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto w-full">
          <div className="bg-gradient-to-r from-purple-900/20 to-purple-900/40 rounded-xl border border-purple-500/30 p-5 hover:border-purple-500/60 transition-all">
            <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <User className="h-5 w-5 text-purple-400" />
              <span>Pour les hommes</span>
            </h3>
            <p className="text-sm text-gray-700 mb-3">Comment aborder une femme qui me plaît ? Comment faire bonne impression au premier rendez-vous ?</p>
          </div>
          
          <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/40 rounded-xl border border-purple-500/30 p-5 hover:border-purple-500/60 transition-all">
            <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <User className="h-5 w-5 text-pink-400" />
              <span>Pour les femmes</span>
            </h3>
            <p className="text-sm text-gray-700 mb-3">Comment savoir s'il est vraiment intéressé ? Quels signes montrent qu'une relation a du potentiel ?</p>
          </div>
          
          <div className="bg-gradient-to-r from-blue-900/20 to-blue-900/40 rounded-xl border border-purple-500/30 p-5 hover:border-purple-500/60 transition-all">
            <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-blue-400" />
              <span>Relations à distance</span>
            </h3>
            <p className="text-sm text-gray-700 mb-3">Comment maintenir une relation à distance ? Quelles activités faire ensemble à distance ?</p>
          </div>
          
          <div className="bg-gradient-to-r from-amber-900/20 to-amber-900/40 rounded-xl border border-purple-500/30 p-5 hover:border-purple-500/60 transition-all">
            <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-400" />
              <span>Reconquête amoureuse</span>
            </h3>
            <p className="text-sm text-gray-700 mb-3">Comment reconquérir mon ex ? Quelles erreurs éviter pour ne pas empirer la situation ?</p>
          </div>
        </div>
      </div>
    );
  }

  // Afficher l'état de chargement lors de la récupération des messages
  if (isLoading && messages.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-700 font-medium">Chargement de votre conversation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full">
      {!messages.length && !isLoading && (
        <div className="flex items-center justify-center h-full">
          <div className="w-full max-w-xl p-6 md:p-10 rounded-2xl bg-gradient-to-b from-blue-50 to-white border border-blue-100/50 shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Bienvenue chez FlirtSage AI</h2>
            <p className="text-gray-700 mb-6">
              Je suis votre coach personnel pour tout ce qui touche à la séduction. 
              N'hésitez pas à me poser vos questions sur le dating, les relations et la séduction.
            </p>
            <div className="space-y-4">
              <button 
                className="w-full p-3 text-left rounded-xl border border-blue-100 bg-white hover:bg-blue-50 transition-colors text-gray-700 font-medium"
                onClick={() => {
                  handleSendMessage({} as React.FormEvent);
                }}
              >
                Comment approcher quelqu'un qui me plaît dans un bar?
              </button>
              <button 
                className="w-full p-3 text-left rounded-xl border border-blue-100 bg-white hover:bg-blue-50 transition-colors text-gray-700 font-medium"
                onClick={() => {
                  handleSendMessage({} as React.FormEvent);
                }}
              >
                Quels sont les signes qu'une personne est intéressée par moi?
              </button>
              <button 
                className="w-full p-3 text-left rounded-xl border border-blue-100 bg-white hover:bg-blue-50 transition-colors text-gray-700 font-medium"
                onClick={() => {
                  handleSendMessage({} as React.FormEvent);
                }}
              >
                Comment gérer un premier rendez-vous pour qu'il se passe bien?
              </button>
            </div>
          </div>
        </div>
      )}

      {isLoading && !messages.length && (
        <div className="flex items-center justify-center h-full">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-700 font-medium">Chargement de votre conversation...</p>
          </div>
        </div>
      )}

      {messages.length > 0 && (
        <div 
          ref={messagesEndRef}
          className="flex-1 overflow-y-auto p-4 space-y-4"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] md:max-w-[70%] rounded-2xl p-4 ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-blue-600 to-amber-500 text-white shadow-md'
                    : 'bg-white border border-blue-100 text-gray-800 shadow-sm'
                }`}
              >
                <div className="prose prose-invert prose-sm max-w-none">
                  <Markdown remarkPlugins={[remarkGfm]}>
                    {message.content}
                  </Markdown>
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-blue-100 max-w-[80%] md:max-w-[70%] rounded-2xl p-4 shadow-sm">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}

      <div className="p-4 border-t border-blue-100 bg-white">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-600 transition-colors"
              aria-label="Settings"
            >
              <Settings size={18} />
            </button>
            <span className="text-xs text-gray-500">Mode: {personality === 'Masculin' ? 'Masculin' : 'Féminin'}</span>
          </div>
          
          <button
            onClick={() => {
              setMessages([]);
              setMessage('');
              setIsLoading(true);
              setError(null);
              setIsTyping(false);
              setShowTokenUsage(false);
            }}
            className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
          >
            Nouvelle conversation
          </button>
        </div>

        {showSettings && (
          <div className="mb-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <div className="mb-3">
              <p className="text-sm font-medium text-gray-700 mb-2">Personnalité du coach</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handlePersonalityChange('Masculin')}
                  className={`px-3 py-1.5 rounded-lg text-sm ${
                    personality === 'Masculin'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-blue-100 hover:bg-blue-50'
                  }`}
                >
                  Masculin
                </button>
                <button
                  onClick={() => handlePersonalityChange('Féminin')}
                  className={`px-3 py-1.5 rounded-lg text-sm ${
                    personality === 'Féminin'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-blue-100 hover:bg-blue-50'
                  }`}
                >
                  Féminin
                </button>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-700">Tokens disponibles: <span className="font-medium">{displayTokens}</span></p>
              <Link href="/tokens" className="text-xs text-blue-600 hover:text-blue-800 transition-colors">
                Acheter des tokens
              </Link>
            </div>
          </div>
        )}
        
        {/* Zone de saisie de message */}
        <form onSubmit={handleSendMessage} className="relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Écrivez votre message..."
            className="w-full py-3 px-4 pr-12 bg-white text-gray-800 border border-blue-100 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-200 max-h-32"
            rows={1}
            disabled={isLoading || isTyping}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
          />
          
          <button
            type="submit"
            disabled={!message.trim() || isLoading || isTyping}
            className="absolute right-3 bottom-3 p-1.5 rounded-full bg-gradient-to-r from-blue-600 to-amber-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </form>

        {/* Zone d'erreur */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3 text-red-600 text-sm"
            >
              <p>{error}</p>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Notification de consommation de tokens */}
        <AnimatePresence>
          {showTokenUsage && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 bg-blue-50 border border-blue-100 rounded-lg p-3 text-blue-600 text-sm"
            >
              <p className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-500" />
                {TOKEN_COST_MESSAGE} token{TOKEN_COST_MESSAGE > 1 ? 's' : ''} utilisé{TOKEN_COST_MESSAGE > 1 ? 's' : ''} pour ce message.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 