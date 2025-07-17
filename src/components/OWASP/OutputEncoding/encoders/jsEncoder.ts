// JavaScript Encoding utilities for preventing XSS attacks in JS context
// Escapes characters that could break JavaScript execution

/**
 * JavaScript Encoding - Encode for JavaScript context
 * Handles quotes, backslashes, and control characters safely
 */
export const jsEncode = (input: string): string => {
  // Logic here: Encode characters that could break JavaScript execution
  return input
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/'/g, "\\'")
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t')
    .replace(/\b/g, '\\b')
    .replace(/\f/g, '\\f')
    .replace(/\v/g, '\\v')
    .replace(/\0/g, '\\0');
};

/**
 * Encode for JavaScript string literals
 * More comprehensive encoding for strings within JavaScript code
 */
export const jsStringEncode = (input: string): string => {
  // Logic here: Enhanced encoding for JavaScript string contexts
  return input
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/'/g, "\\'")
    .replace(/`/g, '\\`')
    .replace(/\$/g, '\\$')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t')
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, (char) => {
      return '\\u' + char.charCodeAt(0).toString(16).padStart(4, '0');
    });
};

/**
 * Encode for JSON context within JavaScript
 */
export const jsonEncode = (input: any): string => {
  // Logic here: Safe JSON encoding with additional escaping
  return JSON.stringify(input)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
};

/**
 * Check if a string contains potentially dangerous JavaScript
 */
export const containsDangerousJs = (input: string): boolean => {
  // Logic here: Detect patterns that could be JS injection attempts
  const dangerousPatterns = [
    /eval\s*\(/i,
    /function\s*\(/i,
    /=\s*new\s+/i,
    /\.\s*constructor/i,
    /setTimeout|setInterval/i,
    /document\.|window\./i,
    /alert\s*\(/i,
    /confirm\s*\(/i,
    /prompt\s*\(/i
  ];
  
  return dangerousPatterns.some(pattern => pattern.test(input));
};
