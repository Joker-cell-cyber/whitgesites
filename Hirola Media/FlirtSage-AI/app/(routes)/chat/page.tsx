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
          <Loader2 className="h-10 w-10 text-purple-500 animate-spin mb-4" />
          <p className="text-gray-400">Chargement de vos conversations...</p>
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
          <Loader2 className="h-10 w-10 text-yfc-gold-500 animate-spin mb-4" />
          <p className="text-gray-600">Chargement de vos conversations...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex h-[calc(100vh-64px)] bg-gradient-to-b from-white to-yfc-cream-50">
        {/* Éléments décoratifs subtils */}
        <div className="absolute inset-0 bg-[url('/subtle-pattern.svg')] bg-repeat opacity-[0.03] pointer-events-none"></div>
        <div className="absolute right-0 top-1/4 w-80 h-80 rounded-full bg-yfc-gold-100/30 blur-3xl -z-10 pointer-events-none"></div>
        <div className="absolute left-0 bottom-1/4 w-64 h-64 rounded-full bg-yfc-cream-200/40 blur-3xl -z-10 pointer-events-none"></div>
        
        {/* Sidebar avec conversation et boutons d'actions */}
        <div className="w-72 h-full border-r border-yfc-cream-200 bg-white/90 backdrop-blur-sm flex flex-col z-10">
          {/* Boutons d'actions */}
          <div className="p-3 flex items-center gap-2 border-b border-yfc-cream-200">
            <button 
              onClick={handleNewConversation}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg yfc-button-primary"
            >
              <Plus className="h-4 w-4" />
              <span>Nouvelle conversation</span>
            </button>
          </div>
          
          {/* Liste des conversations */}
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-yfc-gold-200 scrollbar-track-transparent">
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