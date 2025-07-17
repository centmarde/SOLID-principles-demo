import type { ValidationResult } from './types';

/**
 * Utility functions for common validation patterns
 */

/**
 * Check if a string contains only ASCII characters
 * This prevents encoding-based attacks and ensures proper header handling
 */
export const isASCII = (str: string): boolean => {
  return /^[\x00-\x7F]*$/.test(str);
};

/**
 * Check if a string contains potentially malicious XSS patterns
 */
export const containsXSSPatterns = (str: string): boolean => {
  return /<script|javascript:|on\w+=/i.test(str);
};

/**
 * Check if a string contains SQL injection patterns
 */
export const containsSQLInjectionPatterns = (str: string): boolean => {
  return /(\bUNION\b|\bSELECT\b|\bINSERT\b|\bDELETE\b|\bDROP\b)/i.test(str);
};

/**
 * Check if a string contains line break characters (for header injection prevention)
 */
export const containsLineBreaks = (str: string): boolean => {
  return /[\r\n\t]/.test(str);
};

/**
 * Check if URL uses safe protocols only
 */
export const hasSafeProtocol = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return ['http:', 'https:'].includes(urlObj.protocol);
  } catch {
    return false;
  }
};

/**
 * Check if URL contains potentially unsafe protocols
 */
export const containsUnsafeProtocols = (url: string): boolean => {
  return /javascript:|data:|vbscript:|file:/i.test(url);
};
