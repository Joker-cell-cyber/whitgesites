'use client';

import { useState, useRef, useEffect } from 'react';
import { Message } from '@/app/lib/types/coach';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { User, Bot, SendHorizonal } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ChatInterfaceProps {
  initialMessages: Message[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export default function ChatInterface({ 
  initialMessages, 
  onSendMessage, 
  isLoading 
}: ChatInterfaceProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Mettre à jour les messages lorsque initialMessages change
  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);
  
  // Faire défiler vers le bas lorsque de nouveaux messages sont ajoutés
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Gérer l'envoi de message
  const handleSendMessage = () => {
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };
  
  // Gérer la soumission par la touche Entrée
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900 rounded-lg border border-gray-700 relative">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            <p>Commencez à discuter avec votre coach IA</p>
          </div>
        ) : (
          <>
            {messages.filter(m => m.role !== 'system').map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-6`}
              >
                <div 
                  className={`${
                    message.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none ml-12' 
                      : 'bg-gray-800 text-white rounded-tl-none border border-purple-500/20 mr-12'
                  } max-w-[90%] rounded-2xl p-6 shadow-lg`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      message.role === 'user' 
                        ? 'bg-blue-700' 
                        : 'bg-purple-800'
                    }`}>
                      {message.role === 'user' ? (
                        <User className="h-5 w-5 text-white" />
                      ) : (
                        <Bot className="h-5 w-5 text-white" />
                      )}
                    </div>
                    <span className="font-medium text-lg">
                      {message.role === 'user' ? 'Vous' : 'Coach IA'}
                    </span>
                  </div>
                  
                  <div className="prose prose-invert max-w-none text-sm sm:text-base whitespace-pre-wrap leading-relaxed">
                    <ReactMarkdown>
                      {message.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
        
        {isLoading && (
          <div className="flex justify-start mb-6">
            <div className="max-w-[90%] rounded-2xl p-6 bg-gray-800 text-white rounded-tl-none border border-purple-500/20 mr-12 shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-purple-800 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <span className="font-medium text-lg">Coach IA</span>
              </div>
              <div className="flex items-center space-x-3 p-2">
                <div className="w-3 h-3 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-3 h-3 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                <div className="w-3 h-3 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '600ms' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-4 flex items-center gap-3 pb-2">
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Posez une question à votre coach IA..."
          className="flex-grow bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent p-6 text-base"
          disabled={isLoading}
        />
        <Button
          onClick={handleSendMessage}
          disabled={isLoading || !inputValue.trim()}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-6 h-auto rounded-lg"
        >
          <SendHorizonal className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
} 