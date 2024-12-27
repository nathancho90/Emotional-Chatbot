import OpenAI from 'openai';
import { getEnvConfig, validateEnvConfig } from './env';

const errors = validateEnvConfig();
if (errors.length > 0) {
  console.error('Environment configuration errors:', errors);
}

export const openai = new OpenAI({
  apiKey: getEnvConfig().OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});