import React, { useState, useRef, useEffect } from 'react';
import { Bot, AlertCircle } from 'lucide-react';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import { Message } from './types';
import { generateBotResponse } from './services/chat';
import { validateEnvConfig } from './config/env';

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm an emotional chatbot. How are you feeling today?",
      sender: 'bot',
      emotion: 'happy',
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const errors = validateEnvConfig();
    if (errors.length > 0) {
      setError(errors[0]);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (error) {
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const response = await generateBotResponse(messages.concat(userMessage));
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: 'bot',
        emotion: response.emotion,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting bot response:', error);
      setError('Failed to get response from the chatbot. Please try again later.');
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-blue-500 text-white p-4 flex items-center gap-2">
          <Bot className="w-6 h-6" />
          <h1 className="text-xl font-semibold">Emotional Chatbot</h1>
        </div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-red-800">Configuration Error</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        )}
        
        <div className="h-[500px] overflow-y-auto p-4 bg-gray-50">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isTyping && (
            <div className="flex items-center gap-2 text-gray-500 ml-2">
              <Bot className="w-4 h-4" />
              <span className="text-sm">Typing...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <ChatInput onSendMessage={handleSendMessage} disabled={isTyping || !!error} />
      </div>
    </div>
  );
}

export default App;