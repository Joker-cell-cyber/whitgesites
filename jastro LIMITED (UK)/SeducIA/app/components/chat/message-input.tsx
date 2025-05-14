'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/app/components/ui/button';
import { SendIcon, Loader2 } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (message: string) => Promise<void>;
  disabled?: boolean;
  placeholder?: string;
  isLoading?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  disabled = false,
  placeholder = "Tapez votre message...",
  isLoading = false
}) => {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Ajuster automatiquement la hauteur du textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Envoyer avec Entrée sans Shift
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    if (message.trim() === '' || isSending || isLoading || disabled) return;
    
    try {
      setIsSending(true);
      await onSendMessage(message);
      setMessage('');
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="relative flex items-end bg-gray-900 border-t border-gray-800 p-3 rounded-b-lg">
      <textarea
        ref={textareaRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="flex-1 bg-gray-800 border border-gray-700 rounded-lg resize-none p-3 pr-12 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[50px] max-h-[150px] overflow-y-auto"
        disabled={disabled || isLoading || isSending}
        rows={1}
      />
      <Button
        onClick={handleSendMessage}
        className="absolute right-5 bottom-5 rounded-full p-2 bg-purple-600 hover:bg-purple-700 text-white"
        disabled={message.trim() === '' || disabled || isLoading || isSending}
        aria-label="Envoyer"
      >
        {isLoading || isSending ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <SendIcon className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
};

export default MessageInput; 