export type ChatError = {
  code: string;
  message: string;
};

export function getChatErrorMessage(error: any): ChatError {
  // OpenAI API errors
  if (error?.error?.code === 'insufficient_quota') {
    return {
      code: 'quota_exceeded',
      message: "I'm currently experiencing high demand. Switching to offline mode."
    };
  }
  
  if (error?.error?.code === 'invalid_api_key') {
    return {
      code: 'invalid_key',
      message: "There seems to be an issue with the API key configuration."
    };
  }

  // Internal errors
  if (error?.message === 'rate_limit_exceeded') {
    return {
      code: 'rate_limit_exceeded',
      message: "I'm receiving too many messages. Please wait a moment."
    };
  }

  if (error?.message === 'empty_response') {
    return {
      code: 'empty_response',
      message: "I couldn't generate a proper response. Let me try again."
    };
  }

  // Default error
  return {
    code: 'unknown',
    message: "I'm having trouble connecting right now. Please try again in a moment."
  };
}