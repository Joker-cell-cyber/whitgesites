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
      <div className="h-full flex flex-col items-center justify-center p-8 bg-gradient-to-b from-amber-50/80 to-white backdrop-blur-sm">
        <div className="mb-6">
          <Sparkles className="h-16 w-16 text-amber-500/80 mx-auto" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
          Bienvenue sur votre Coach en Séduction
        </h2>
        
        <p className="text-gray-600 text-center max-w-md mx-auto mb-8">
          Posez-moi toutes vos questions sur la séduction, les rencontres et les relations. Je suis là pour vous aider à améliorer votre vie amoureuse.
        </p>
        
        <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto w-full">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200 p-5 hover:border-amber-300 transition-all shadow-sm hover:shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <User className="h-5 w-5 text-amber-500" />
              <span>Pour les hommes</span>
            </h3>
            <p className="text-sm text-gray-600 mb-3">Comment aborder une femme qui me plaît ? Comment faire bonne impression au premier rendez-vous ?</p>
          </div>
          
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200 p-5 hover:border-amber-300 transition-all shadow-sm hover:shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <User className="h-5 w-5 text-orange-500" />
              <span>Pour les femmes</span>
            </h3>
            <p className="text-sm text-gray-600 mb-3">Comment savoir s'il est vraiment intéressé ? Quels signes montrent qu'une relation a du potentiel ?</p>
          </div>
          
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200 p-5 hover:border-amber-300 transition-all shadow-sm hover:shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-amber-400" />
              <span>Relations à distance</span>
            </h3>
            <p className="text-sm text-gray-600 mb-3">Comment maintenir une relation à distance ? Quelles activités faire ensemble à distance ?</p>
          </div>
          
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200 p-5 hover:border-amber-300 transition-all shadow-sm hover:shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-orange-400" />
              <span>Reconquête amoureuse</span>
            </h3>
            <p className="text-sm text-gray-600 mb-3">Comment reconquérir mon ex ? Quelles erreurs éviter pour ne pas empirer la situation ?</p>
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
          <Loader2 className="h-10 w-10 text-amber-500 animate-spin mb-4" />
          <p className="text-gray-600">Chargement de la conversation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-white to-amber-50/80 backdrop-blur-sm">
      {/* En-tête avec la personnalité du coach */}
      <div className="p-4 border-b border-amber-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-amber-500" />
          <span className="font-medium text-gray-800">Coach {personality}</span>
          
          {/* Indicateur de tokens restants */}
          <div className="ml-4 flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-xs">
            <Sparkles className="h-3 w-3 text-amber-500" />
            <span className="font-medium text-amber-600">{displayTokens} tokens</span>
          </div>
        </div>
        
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="text-gray-500 hover:text-amber-600 transition-colors"
        >
          <Settings className="h-5 w-5" />
        </button>
      </div>
      
      {/* Menu de réglages */}
      <AnimatePresence>
        {showSettings && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 border-b border-amber-100 bg-amber-50/50">
              <p className="text-sm text-gray-600 mb-3">Personnalité du coach :</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handlePersonalityChange('Masculin')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                    personality === 'Masculin'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                      : 'bg-white/80 text-gray-600 hover:bg-amber-50 border border-amber-100'
                  }`}
                >
                  Coach Masculin
                </button>
                <button
                  onClick={() => handlePersonalityChange('Féminin')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                    personality === 'Féminin'
                      ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-white'
                      : 'bg-white/80 text-gray-600 hover:bg-amber-50 border border-amber-100'
                  }`}
                >
                  Coach Féminin
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Zone des messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">
              Commencez à discuter avec votre coach en séduction !
            </p>
          </div>
        ) : (
          <>
            <AnimatePresence initial={false}>
              {messages.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm'
                        : 'bg-white border border-amber-100 text-gray-800 shadow-sm'
                    }`}
                  >
                    <div className={`prose ${msg.sender === 'user' ? 'prose-invert' : ''} prose-sm max-w-none`}>
                      <Markdown remarkPlugins={[remarkGfm]}>
                        {msg.content}
                      </Markdown>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {/* Animation de saisie */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-start"
                >
                  <div className="max-w-[80%] rounded-2xl p-4 bg-white border border-amber-100 shadow-sm">
                    <div className="h-6 flex items-center">
                      <LottieAnimation
                        animationData={typingAnimation}
                        style={{ height: '30px', width: '60px' }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
        
        {/* Référence pour le défilement automatique */}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Zone d'erreur */}
      <AnimatePresence>
      {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-red-50 border-t border-red-200 p-3 text-red-600 text-sm"
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
            className="bg-amber-50 border-t border-amber-100 p-3 text-amber-600 text-sm"
          >
            <p className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-500" />
              {TOKEN_COST_MESSAGE} token{TOKEN_COST_MESSAGE > 1 ? 's' : ''} utilisé{TOKEN_COST_MESSAGE > 1 ? 's' : ''} pour ce message.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Zone de saisie */}
      <div className="p-4 border-t border-amber-100">
        <form onSubmit={handleSendMessage} className="relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Écrivez votre message..."
            className="w-full py-3 px-4 pr-12 bg-white text-gray-800 border border-amber-100 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-amber-200 max-h-32"
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
            className="absolute right-3 bottom-3 p-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
} 