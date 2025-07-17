import type { ValidationResult } from './types';
import { isASCII, containsLineBreaks } from './utils';

/**
 * Email validation rules:
 * - Required field
 * - ASCII characters only
 * - Valid email format
 * - No header injection patterns (line breaks)
 */
export const validateEmail = (email: string): ValidationResult => {
  if (!email.trim()) {
    return 'Email is required';
  }
  
  if (!isASCII(email)) {
    return 'Email must contain only ASCII characters';
  }
  
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  
  if (containsLineBreaks(email)) {
    return 'Email contains invalid characters';
  }
  
  return undefined;
};
