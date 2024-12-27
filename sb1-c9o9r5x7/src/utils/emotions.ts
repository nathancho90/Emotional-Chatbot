export const analyzeEmotion = (text: string): 'happy' | 'sad' | 'neutral' | 'thinking' => {
  const happyKeywords = ['great', 'happy', 'excellent', 'good', 'love', 'wonderful'];
  const sadKeywords = ['sad', 'bad', 'terrible', 'unhappy', 'sorry', 'worried'];
  
  const lowerText = text.toLowerCase();
  
  if (happyKeywords.some(word => lowerText.includes(word))) return 'happy';
  if (sadKeywords.some(word => lowerText.includes(word))) return 'sad';
  
  return 'neutral';
};

export const getBotResponse = (message: string): { text: string; emotion: 'happy' | 'sad' | 'neutral' | 'thinking' } => {
  const userEmotion = analyzeEmotion(message);
  
  const responses = {
    happy: {
      text: "I'm glad you're feeling positive! How can I help make your day even better?",
      emotion: 'happy' as const
    },
    sad: {
      text: "I understand you might be feeling down. Would you like to talk about it?",
      emotion: 'sad' as const
    },
    neutral: {
      text: "I'm here to help! What would you like to discuss?",
      emotion: 'neutral' as const
    }
  };
  
  return responses[userEmotion] || responses.neutral;
};