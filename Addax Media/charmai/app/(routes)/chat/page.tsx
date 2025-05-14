'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { Conversation } from '@/app/lib/types/index';
import axios from 'axios';
import { useAuth } from '@/app/context/auth-context';
import ConversationList from '@/app/components/chat/conversation-list';
import ChatContainer from '@/app/components/chat/chat-container';
import { Loader2, Plus } from 'lucide-react';
import Link from 'next/link';

export default function ChatPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center">
          <Loader2 className="h-10 w-10 text-pink-500 animate-spin mb-4" />
          <p className="text-gray-600">Chargement de vos conversations...</p>
        </div>
      </div>
    }>
      <ChatContent />
    </Suspense>
  );
}

function ChatContent() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Charger les conversations au chargement de la page
  useEffect(() => {
    if (user?.memberId) {
      fetchConversations();
    }
  }, [user?.memberId]);

  // Récupérer les conversations
  const fetchConversations = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.get('/api/conversations');
      const { conversations } = response.data;
      
      setConversations(conversations);
      
      // Sélectionner la première conversation s'il y en a
      if (conversations.length > 0 && !selectedConversation) {
        setSelectedConversation(conversations[0]);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des conversations:', error);
      setError('Impossible de charger vos conversations. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  // Créer une nouvelle conversation
  const handleNewConversation = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const defaultPersonality = user?.coachPersonality || 'Masculin';
      
      const response = await axios.post('/api/conversations', {
        coachPersonality: defaultPersonality
      });
      
      const { conversation } = response.data;
      
      // Mettre à jour la liste et sélectionner la nouvelle conversation
      setConversations(prev => [conversation, ...prev]);
      setSelectedConversation(conversation);
    } catch (error) {
      console.error('Erreur lors de la création de la conversation:', error);
      setError('Impossible de créer une nouvelle conversation. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  // Sélectionner une conversation
  const handleSelectConversation = (conversationId: string) => {
    const conversation = conversations.find(c => c.id === conversationId);
    if (conversation) {
      setSelectedConversation(conversation);
    }
  };

  // Supprimer une conversation
  const handleDeleteConversation = async (conversationId: string) => {
    setError(null);
    
    try {
      await axios.delete(`/api/conversations?id=${conversationId}`);
      
      // Mettre à jour la liste
      const updatedConversations = conversations.filter(c => c.id !== conversationId);
      setConversations(updatedConversations);
      
      // Si la conversation supprimée était sélectionnée, sélectionner la première
      if (selectedConversation?.id === conversationId) {
        setSelectedConversation(updatedConversations.length > 0 ? updatedConversations[0] : null);
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de la conversation:', error);
      setError('Impossible de supprimer la conversation. Veuillez réessayer.');
    }
  };

  // Changer la personnalité du coach
  const handlePersonalityChange = async (personality: 'Masculin' | 'Féminin') => {
    if (!selectedConversation) return;
    
    try {
      await axios.put('/api/conversations-personality', {
        conversationId: selectedConversation.id,
        coachPersonality: personality
      });
      
      // Mettre à jour localement
      setSelectedConversation(prev => {
        if (!prev) return null;
        return { ...prev, coachPersonality: personality };
      });
      
      setConversations(prev => 
        prev.map(c => 
          c.id === selectedConversation.id 
            ? { ...c, coachPersonality: personality } 
            : c
        )
      );
    } catch (error) {
      console.error('Erreur lors du changement de personnalité:', error);
      throw new Error('Impossible de changer la personnalité du coach.');
    }
  };

  // Ajoutons la fonction de renommage de conversation
  const handleRenameConversation = async (conversationId: string, newTitle: string) => {
    setError(null);
    
    try {
      const response = await axios.put('/api/conversations-title', {
        conversationId,
        title: newTitle
      });
      
      const { conversation } = response.data;
      
      // Mettre à jour localement
      setConversations(prev => 
        prev.map(c => 
          c.id === conversationId 
            ? { ...c, title: newTitle } 
            : c
        )
      );
      
      // Mettre à jour la conversation sélectionnée si nécessaire
      if (selectedConversation?.id === conversationId) {
        setSelectedConversation(prev => {
          if (!prev) return null;
          return { ...prev, title: newTitle };
        });
      }
    } catch (error) {
      console.error('Erreur lors du renommage de la conversation:', error);
      setError('Impossible de renommer la conversation. Veuillez réessayer.');
    }
  };

  // Afficher un état de chargement
  if (isLoading && conversations.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center">
          <Loader2 className="h-10 w-10 text-pink-500 animate-spin mb-4" />
          <p className="text-gray-600">Chargement de vos conversations...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex h-[calc(100vh-64px)]"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(244, 114, 182, 0.15) 0%, rgba(255, 255, 255, 1) 70%)`
        }}
      >
        {/* Formes géométriques décoratives */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Forme 1 - Cercle gradient */}
          <div className="absolute top-1/4 -left-16 w-64 h-64 rounded-full bg-gradient-to-br from-pink-300 to-rose-200 opacity-20 blur-3xl"></div>
          
          {/* Forme 2 - Cercle gradient */}
          <div className="absolute bottom-1/4 -right-16 w-96 h-96 rounded-full bg-gradient-to-tl from-pink-300 to-rose-200 opacity-20 blur-3xl"></div>
          
          {/* Forme 3 - Rectangle gradient */}
          <div className="absolute top-0 right-1/4 w-32 h-64 rounded-3xl bg-gradient-to-b from-pink-200 to-transparent opacity-20 blur-xl transform rotate-12"></div>
          
          {/* Forme 4 - Rectangle gradient */}
          <div className="absolute bottom-0 left-1/3 w-48 h-32 rounded-3xl bg-gradient-to-r from-rose-200 to-transparent opacity-20 blur-xl transform -rotate-6"></div>
        </div>
        
        {/* Sidebar avec conversation et boutons d'actions */}
        <div className="w-72 h-full border-r border-pink-100 bg-white/80 backdrop-blur-sm flex flex-col z-10 shadow-sm">
          {/* Boutons d'actions */}
          <div className="p-3 flex items-center gap-2 border-b border-pink-100 bg-gradient-to-r from-pink-50 to-white">
            <button 
              onClick={handleNewConversation}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium text-sm hover:from-pink-600 hover:to-rose-600 transition-all shadow-md hover:shadow-lg hover:shadow-pink-100 transform hover:-translate-y-0.5"
            >
              <Plus className="h-4 w-4" />
              <span>Nouvelle conversation</span>
            </button>
          </div>
          
          {/* Liste des conversations */}
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-pink-200 scrollbar-track-transparent">
            <ConversationList
              conversations={conversations}
              activeConversationId={selectedConversation?.id}
              onSelectConversation={handleSelectConversation}
              onNewConversation={handleNewConversation}
              onDeleteConversation={handleDeleteConversation}
              onRenameConversation={handleRenameConversation}
            />
          </div>
        </div>
        
        {/* Zone de chat */}
        <div className="flex-1 relative">
          {/* Cœurs flottants */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute text-pink-400 animate-float"
                style={{
                  left: `${10 + (i * 12)}%`,
                  bottom: `${Math.random() * 40}%`,
                  transform: `rotate(${Math.random() * 45}deg) scale(${0.5 + Math.random() * 1})`,
                  opacity: 0.1 + Math.random() * 0.2,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${Math.random() * 10 + 15}s`
                }}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
            ))}
          </div>
          
          <div className="relative z-10 h-full">
            <ChatContainer
              conversation={selectedConversation}
              onPersonalityChange={handlePersonalityChange}
            />
          </div>
        </div>
      </div>
    </>
  );
} 