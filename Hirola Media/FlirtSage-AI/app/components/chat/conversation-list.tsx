'use client';

import React, { useState } from 'react';
import { Conversation } from '@/app/lib/types/index';
import { useAuth } from '@/app/context/auth-context';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Trash2, Bot, User, Sparkles, Edit2, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Props du composant
interface ConversationListProps {
  conversations: Conversation[];
  activeConversationId?: string;
  onSelectConversation: (id: string) => void;
  onDeleteConversation: (id: string) => void;
  onNewConversation: () => void;
  onRenameConversation: (id: string, newTitle: string) => Promise<void>;
}

// Composant principal pour la liste des conversations
export default function ConversationList({
  conversations,
  activeConversationId,
  onSelectConversation,
  onDeleteConversation,
  onNewConversation,
  onRenameConversation
}: ConversationListProps) {
  const { user } = useAuth();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState<string>('');

  // Commencer l'édition d'un titre
  const startEditing = (conversation: Conversation, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(conversation.id);
    setNewTitle(conversation.title);
  };

  // Sauvegarder le nouveau titre
  const saveTitle = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (newTitle.trim()) {
      await onRenameConversation(id, newTitle.trim());
      setEditingId(null);
    }
  };

  // Annuler l'édition
  const cancelEditing = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(null);
  };

  // Fonction pour tronquer le texte
  const truncateText = (text: string, maxLength: number) => {
    if (!text) return '';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  // Formatage de la date en français
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true, locale: fr });
    } catch (e) {
      return 'date inconnue';
    }
  };

  // Si pas de conversations
  if (conversations.length === 0) {
  return (
      <div className="p-4 h-full flex flex-col items-center justify-center text-center">
        <Sparkles className="h-10 w-10 text-purple-500/60 mb-4" />
        <h3 className="text-lg font-medium text-white mb-2">Aucune conversation</h3>
        <p className="text-gray-400 text-sm mb-6">
          Commencez une nouvelle conversation avec votre coach en séduction
        </p>
        <button
          onClick={onNewConversation}
          className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium text-sm hover:from-purple-700 hover:to-pink-700 transition-all"
        >
          Nouvelle conversation
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-y-auto">
      <AnimatePresence initial={false}>
            {conversations.map((conversation) => {
              const isActive = conversation.id === activeConversationId;
          const isEditing = editingId === conversation.id;
          
          // Trouver le dernier message, s'il y en a
          const lastMessage = conversation.messages && conversation.messages.length > 0
                ? conversation.messages[conversation.messages.length - 1] 
                : null;
          
          // Déterminer le contenu à afficher
          const messagePreview = lastMessage 
            ? truncateText(lastMessage.content, 40)
            : "Nouvelle conversation";
          
          // Déterminer le type du dernier message (utilisateur ou coach)
          const isUserLastMessage = lastMessage ? lastMessage.sender === 'user' : false;
              
              return (
            <motion.div
              key={conversation.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className={`relative ${
                isActive 
                  ? 'bg-gradient-to-r from-purple-900/40 to-black border-l-2 border-l-purple-500' 
                  : 'hover:bg-gray-800/40 border-l-2 border-l-transparent'
              } cursor-pointer transition-all duration-200`}
            >
              <button
                onClick={() => !isEditing && onSelectConversation(conversation.id)}
                className="w-full text-left p-3 focus:outline-none"
              >
                <div className="flex items-center mb-1">
                  {/* Icône de personnalité */}
                  <div className={`mr-2 p-1 rounded-full ${
                    conversation.coachPersonality === 'Masculin'
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-pink-500/20 text-pink-400'
                  }`}>
                    <Bot className="h-3.5 w-3.5" />
                  </div>
                  
                  {/* Titre de la conversation (avec mode édition) */}
                  {isEditing ? (
                    <div className="flex items-center flex-1 gap-1" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="flex-1 bg-gray-800 text-white rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 border border-gray-700"
                        autoFocus
                        onClick={(e) => e.stopPropagation()}
                      />
                      <button 
                        onClick={(e) => saveTitle(conversation.id, e)}
                        className="p-1 rounded hover:bg-green-500/20 text-green-400"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                  <button
                        onClick={cancelEditing}
                        className="p-1 rounded hover:bg-red-500/20 text-red-400"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className={`text-sm font-medium ${isActive ? 'text-white' : 'text-gray-300'}`}>
                        {truncateText(conversation.title, 25)}
                      </span>
                      
                      {/* Date */}
                      <span className="ml-auto text-xs text-gray-500">
                        {conversation.lastMessageAt ? formatDate(conversation.lastMessageAt) : ''}
                        </span>
                    </>
                  )}
                      </div>
                
                {/* Aperçu du dernier message */}
                <div className="flex items-start">
                  <div className="mr-2 mt-0.5">
                    {isUserLastMessage ? (
                      <User className="h-3.5 w-3.5 text-gray-400" />
                    ) : (
                      <Bot className="h-3.5 w-3.5 text-purple-400" />
                      )}
                    </div>
                  <p className={`text-xs ${isActive ? 'text-gray-300' : 'text-gray-400'} line-clamp-2`}>
                    {messagePreview}
                  </p>
                </div>
              </button>
              
              {/* Actions */}
              <div className="absolute right-2 top-3 flex gap-1">
                {/* Bouton de renommage */}
                {!isEditing && (
                  <button
                    onClick={(e) => startEditing(conversation, e)}
                    className="p-1 text-gray-500 hover:text-blue-400 rounded-full hover:bg-blue-500/10 transition-colors"
                    title="Renommer la conversation"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>
                )}
                
                {/* Bouton de suppression */}
                {!isEditing && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm('Êtes-vous sûr de vouloir supprimer cette conversation ?')) {
                        onDeleteConversation(conversation.id);
                      }
                    }}
                    className="p-1 text-gray-500 hover:text-red-400 rounded-full hover:bg-red-500/10 transition-colors"
                    title="Supprimer la conversation"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </motion.div>
              );
            })}
      </AnimatePresence>
    </div>
  );
} 