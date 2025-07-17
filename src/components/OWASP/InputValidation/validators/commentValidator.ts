import type { ValidationResult } from './types';
import { isASCII, containsXSSPatterns, containsSQLInjectionPatterns } from './utils';

/**
 * Comment validation rules:
 * - Required field
 * - ASCII characters only
 * - Maximum 500 characters
 * - No XSS patterns
 * - No SQL injection patterns
 */
export const validateComment = (comment: string): ValidationResult => {
  if (!comment.trim()) {
    return 'Comment is required';
  }
  
  if (!isASCII(comment)) {
    return 'Comment must contain only ASCII characters';
  }
  
  if (comment.length > 500) {
    return 'Comment must be less than 500 characters';
  }
  
  if (containsXSSPatterns(comment)) {
    return 'Comment contains potentially malicious content';
  }
  
  if (containsSQLInjectionPatterns(comment)) {
    return 'Comment contains potentially malicious SQL patterns';
  }
  
  return undefined;
};
