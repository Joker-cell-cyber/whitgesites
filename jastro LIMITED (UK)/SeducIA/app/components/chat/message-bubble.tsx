'use client';

import React from 'react';
import { Message } from '@/app/lib/types/index';
import { cn } from '@/app/lib/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Info } from 'lucide-react';

interface MessageBubbleProps {
  message: Message & { isSystemMessage?: boolean };
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  const isSystemMessage = message.isSystemMessage === true;
  const formattedTime = format(new Date(message.timestamp), 'HH:mm', { locale: fr });
  
  // Style spécial pour les messages système (changement de personnalité, etc.)
  if (isSystemMessage) {
    return (
      <div className="flex items-center justify-center my-4">
        <div className="bg-purple-500/20 border border-purple-500/30 rounded-full py-1 px-4 flex items-center">
          <Info size={14} className="text-purple-400 mr-2" />
          <span className="text-sm text-purple-300">{message.content}</span>
        </div>
      </div>
    );
  }
  
  return (
    <div 
      className={cn(
        "flex w-full mb-4",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div 
        className={cn(
          "max-w-[75%] rounded-2xl px-4 py-3 shadow-sm",
          isUser 
            ? "bg-purple-600 text-white rounded-tr-none" 
            : "bg-gray-800 text-white rounded-tl-none border border-gray-700"
        )}
      >
        <div className="flex items-center mb-1">
          <div className={cn(
            "text-xs opacity-70",
            isUser ? "text-purple-200" : "text-gray-300"
          )}>
            {isUser ? 'Vous' : 'Coach'} • {formattedTime}
          </div>
        </div>
        <div className="whitespace-pre-wrap">
          {message.content}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble; 