import { openai } from '../config/openai';

export async function getChatCompletion(message: string) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: message }],
      model: 'gpt-3.5-turbo',
    });

    return completion.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    throw error;
  }
}