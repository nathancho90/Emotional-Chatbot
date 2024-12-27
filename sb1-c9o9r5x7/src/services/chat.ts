import { Message } from '../types';
import { ChatResponse, ChatOptions } from './types';
import { getChatErrorMessage } from './errors';
import { getFallbackResponse } from './fallback';
import { getOpenAIResponse } from './openai-client';

export async function generateBotResponse(
  messages: Message[],
  options: ChatOptions = {}
): Promise<ChatResponse> {
  const { retryCount = 0, useOfflineMode = false } = options;

  if (useOfflineMode) {
    const lastUserMessage = messages.findLast(msg => msg.sender === 'user');
    return lastUserMessage ? getFallbackResponse(lastUserMessage.text) : {
      text: "How can I help you today?",
      emotion: 'neutral'
    };
  }

  try {
    return await getOpenAIResponse(messages);
  } catch (error: any) {
    console.error('Error generating response:', error);
    const { code, message } = getChatErrorMessage(error);

    // Switch to offline mode for quota errors
    if (code === 'quota_exceeded') {
      return generateBotResponse(messages, { useOfflineMode: true });
    }

    // Retry once for rate limit errors
    if (code === 'rate_limit_exceeded' && retryCount < 1) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      return generateBotResponse(messages, { retryCount: retryCount + 1 });
    }

    return {
      text: message,
      emotion: 'thinking'
    };
  }
}