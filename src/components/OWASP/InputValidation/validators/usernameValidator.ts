import type { ValidationResult } from './types';
import { isASCII, containsXSSPatterns } from './utils';

/**
 * Username validation rules:
 * - Required field
 * - ASCII characters only
 * - 3-20 characters long
 * - Alphanumeric and underscore only
 * - No XSS patterns
 */
export const validateUsername = (username: string): ValidationResult => {
  if (!username.trim()) {
    return 'Username is required';
  }
  
  if (!isASCII(username)) {
    return 'Username must contain only ASCII characters';
  }
  
  if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
    return 'Username must be 3-20 characters, alphanumeric and underscore only';
  }
  
  if (containsXSSPatterns(username)) {
    return 'Username contains potentially malicious content';
  }
  
  return undefined;
};
