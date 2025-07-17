import type { ValidationResult } from './types';
import { isASCII, containsLineBreaks } from './utils';

/**
 * HTTP Headers validation rules:
 * - ASCII characters only in both keys and values
 * - No line break characters (prevents header injection)
 */
export const validateHeaders = (): ValidationResult => {
  // In a real application, you would validate actual request headers
  // This is a demonstration of what to check for
  const simulatedHeaders = {
    'user-agent': 'Mozilla/5.0...',
    'content-type': 'application/json',
    'accept': 'text/html'
  };

  for (const [key, value] of Object.entries(simulatedHeaders)) {
    if (!isASCII(key) || !isASCII(value)) {
      return `Header "${key}" contains non-ASCII characters`;
    }
    
    if (containsLineBreaks(key) || containsLineBreaks(value)) {
      return `Header "${key}" contains line break characters`;
    }
  }
  
  return undefined;
};
