import { analyzeEmotion } from '../utils/emotions';

const fallbackResponses = {
  happy: [
    "I'm glad you're feeling positive! How can I help make your day even better?",
    "That's wonderful! I'd love to hear more about what's making you happy.",
    "Your good mood is contagious! What shall we discuss?"
  ],
  sad: [
    "I understand you might be feeling down. Would you like to talk about it?",
    "I'm here to listen and support you through this difficult time.",
    "Sometimes sharing our feelings can help. What's on your mind?"
  ],
  neutral: [
    "I'm here to help! What would you like to discuss?",
    "I'm all ears! What's on your mind?",
    "How can I assist you today?"
  ],
  thinking: [
    "Let me ponder that for a moment...",
    "That's an interesting point to consider.",
    "I'm processing what you've shared..."
  ]
};

export function getFallbackResponse(message: string) {
  const emotion = analyzeEmotion(message);
  const responses = fallbackResponses[emotion] || fallbackResponses.neutral;
  const randomIndex = Math.floor(Math.random() * responses.length);
  
  return {
    text: responses[randomIndex],
    emotion
  };
}