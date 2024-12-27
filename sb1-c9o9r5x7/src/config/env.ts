interface EnvConfig {
  OPENAI_API_KEY: string;
}

export function getEnvConfig(): EnvConfig {
  return {
    OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY || ''
  };
}

export function validateEnvConfig(): string[] {
  const config = getEnvConfig();
  const errors: string[] = [];

  if (!config.OPENAI_API_KEY) {
    errors.push('OpenAI API key is missing. Please add it to your .env file.');
  }

  return errors;
}