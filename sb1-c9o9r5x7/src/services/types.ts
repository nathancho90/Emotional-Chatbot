export interface ChatResponse {
  text: string;
  emotion: 'happy' | 'sad' | 'neutral' | 'thinking';
}

export interface ChatOptions {
  retryCount?: number;
  useOfflineMode?: boolean;
}