import type { ValidationResult } from './types';
import { isASCII, hasSafeProtocol, containsUnsafeProtocols } from './utils';

/**
 * Website URL validation rules:
 * - Optional field
 * - ASCII characters only
 * - Valid URL format
 * - Safe protocols only (HTTP/HTTPS)
 * - No unsafe protocols (JavaScript, data, etc.)
 */
export const validateWebsite = (website: string): ValidationResult => {
  if (!website.trim()) {
    return undefined; // Optional field
  }
  
  if (!isASCII(website)) {
    return 'Website URL must contain only ASCII characters';
  }
  
  try {
    new URL(website); // Basic URL format validation
  } catch {
    return 'Please enter a valid website URL';
  }
  
  if (!hasSafeProtocol(website)) {
    return 'Website must use HTTP or HTTPS protocol';
  }
  
  if (containsUnsafeProtocols(website)) {
    return 'Website URL contains potentially unsafe protocol';
  }
  
  return undefined;
};
