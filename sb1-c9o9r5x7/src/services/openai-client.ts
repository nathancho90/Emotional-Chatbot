import { openai } from '../config/openai';
import { Message } from '../types';
import { rateLimiter } from './rate-limiter';
import { ChatResponse } from './types';
import { analyzeEmotion } from '../utils/emotions';

const SYSTEM_PROMPT = `You are an empathetic AI assistant that helps users with their concerns. 
Respond in a natural, conversational way while being mindful of the user's emotional state.
Keep responses concise (max 2-3 sentences).`;

export async function getOpenAIResponse(messages: Message[]): Promise<ChatResponse> {
  const canMakeRequest = await rateLimiter.checkLimit();
  if (!canMakeRequest) {
    throw new Error('rate_limit_exceeded');
  }

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }))
    ],
    temperature: 0.7,
    max_tokens: 150
  });

  const response = completion.choices[0]?.message?.content;
  if (!response) {
    throw new Error('empty_response');
  }

  return {
    text: response,
    emotion: analyzeEmotion(response)
  };
}