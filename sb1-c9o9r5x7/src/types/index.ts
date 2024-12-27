export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  emotion?: 'happy' | 'sad' | 'neutral' | 'thinking';
  timestamp: Date;
}

export interface EmotionAnalysis {
  emotion: 'happy' | 'sad' | 'neutral' | 'thinking';
  confidence: number;
}