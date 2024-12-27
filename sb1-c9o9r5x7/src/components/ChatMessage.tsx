import React from 'react';
import { Message } from '../types';
import { SmilePlus, Frown, Smile, Brain } from 'lucide-react';

const EmotionIcon = ({ emotion }: { emotion?: 'happy' | 'sad' | 'neutral' | 'thinking' }) => {
  switch (emotion) {
    case 'happy':
      return <SmilePlus className="w-6 h-6 text-green-500" />;
    case 'sad':
      return <Frown className="w-6 h-6 text-blue-500" />;
    case 'thinking':
      return <Brain className="w-6 h-6 text-purple-500" />;
    default:
      return <Smile className="w-6 h-6 text-gray-500" />;
  }
};

const ChatMessage = ({ message }: { message: Message }) => {
  const isBot = message.sender === 'bot';
  
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
      <div className={`flex items-start max-w-[80%] ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
        <div className={`
          px-4 py-2 rounded-lg
          ${isBot ? 'bg-white mr-2 rounded-tl-none' : 'bg-blue-500 ml-2 rounded-tr-none text-white'}
        `}>
          <p className="text-sm">{message.text}</p>
          <span className="text-xs opacity-50">
            {message.timestamp.toLocaleTimeString()}
          </span>
        </div>
        <div className="mt-1">
          <EmotionIcon emotion={message.emotion} />
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;