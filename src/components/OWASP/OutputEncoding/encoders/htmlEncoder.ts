// HTML Entity Encoding utilities for preventing XSS attacks
// Converts dangerous HTML characters to safe HTML entities

/**
 * HTML Entity Encoding - Encode HTML special characters
 * Converts <, >, &, ", ' to HTML entities to prevent script execution
 */
export const htmlEncode = (input: string): string => {
  // Logic here: Convert <, >, &, ", ' to HTML entities
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Decode HTML entities back to original characters
 * Used for display purposes when safe decoding is needed
 */
export const htmlDecode = (input: string): string => {
  // Logic here: Convert HTML entities back to characters
  return input
    .replace(/&#x2F;/g, '/')
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/&amp;/g, '&');
};

/**
 * Check if a string contains potentially dangerous HTML
 */
export const containsDangerousHtml = (input: string): boolean => {
  // Logic here: Detect patterns that could be XSS attempts
  const dangerousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /<iframe/i,
    /<object/i,
    /<embed/i,
    /expression\s*\(/i
  ];
  
  return dangerousPatterns.some(pattern => pattern.test(input));
};
