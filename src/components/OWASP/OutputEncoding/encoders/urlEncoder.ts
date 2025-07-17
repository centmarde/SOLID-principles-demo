// URL Encoding utilities for preventing XSS attacks in URL context
// Safely encodes URLs and URL parameters

/**
 * URL Encoding - Encode for URL context
 * Uses encodeURIComponent for safe URL parameter encoding
 */
export const urlEncode = (input: string): string => {
  // Logic here: Use encodeURIComponent to safely encode URLs
  return encodeURIComponent(input);
};

/**
 * URL Path Encoding - Encode for URL path segments
 * More restrictive encoding for URL paths
 */
export const urlPathEncode = (input: string): string => {
  // Logic here: Encode characters that could break URL paths
  return input
    .replace(/[^a-zA-Z0-9\-._~]/g, (char) => {
      return '%' + char.charCodeAt(0).toString(16).toUpperCase().padStart(2, '0');
    });
};

/**
 * URL Query Parameter Encoding
 * Specific encoding for query parameters
 */
export const urlQueryEncode = (input: string): string => {
  // Logic here: Encode query parameters safely
  return encodeURIComponent(input)
    .replace(/[!'()*]/g, (char) => {
      return '%' + char.charCodeAt(0).toString(16).toUpperCase();
    });
};

/**
 * Validate URL safety
 * Checks for dangerous URL schemes and patterns
 */
export const isUrlSafe = (url: string): boolean => {
  // Logic here: Validate URL doesn't contain dangerous schemes
  const dangerousSchemes = [
    /^javascript:/i,
    /^data:/i,
    /^vbscript:/i,
    /^file:/i,
    /^ftp:/i
  ];
  
  const dangerousPatterns = [
    /%3cscript/i,
    /%3e/i,
    /javascript%3a/i,
    /\.\.\//,
    /%2e%2e%2f/i
  ];
  
  return !dangerousSchemes.some(scheme => scheme.test(url)) &&
         !dangerousPatterns.some(pattern => pattern.test(url));
};

/**
 * Sanitize URL for safe display
 * Removes or encodes dangerous elements in URLs
 */
export const sanitizeUrl = (url: string): string => {
  // Logic here: Clean and encode URL for safe display
  if (!isUrlSafe(url)) {
    return '#'; // Return safe fallback for dangerous URLs
  }
  
  try {
    const urlObj = new URL(url);
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return '#';
    }
    return urlObj.toString();
  } catch {
    // If URL parsing fails, encode the entire string
    return urlEncode(url);
  }
};
