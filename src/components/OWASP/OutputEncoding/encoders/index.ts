// Main encoding utilities - Central hub for all encoding strategies
// Provides a unified interface for different encoding contexts

import { htmlEncode, htmlDecode, containsDangerousHtml } from './htmlEncoder';
import { jsEncode, jsStringEncode, jsonEncode, containsDangerousJs } from './jsEncoder';
import { urlEncode, urlPathEncode, urlQueryEncode, isUrlSafe, sanitizeUrl } from './urlEncoder';
import { cssEncode, cssStringEncode, cssPropertyEncode, cssUrlEncode, containsDangerousCss, sanitizeCss } from './cssEncoder';

// Export all encoding functions
export {
  // HTML encoders
  htmlEncode,
  htmlDecode,
  containsDangerousHtml,
  
  // JavaScript encoders
  jsEncode,
  jsStringEncode,
  jsonEncode,
  containsDangerousJs,
  
  // URL encoders
  urlEncode,
  urlPathEncode,
  urlQueryEncode,
  isUrlSafe,
  sanitizeUrl,
  
  // CSS encoders
  cssEncode,
  cssStringEncode,
  cssPropertyEncode,
  cssUrlEncode,
  containsDangerousCss,
  sanitizeCss
};

// Encoding context types
export type EncodingContext = 'html' | 'js' | 'url' | 'css' | 'json' | 'attribute';

/**
 * Comprehensive sanitization using multiple encoding strategies
 * Automatically selects the appropriate encoding based on context
 */
export const sanitizeForDisplay = (input: string, context: EncodingContext = 'html'): string => {
  // Logic here: Apply appropriate encoding based on context
  switch (context) {
    case 'html':
      return htmlEncode(input);
    case 'js':
      return jsEncode(input);
    case 'json':
      return jsonEncode(input);
    case 'url':
      return urlEncode(input);
    case 'css':
      return cssEncode(input);
    case 'attribute':
      // For HTML attributes, use HTML encoding but with additional safety
      return htmlEncode(input).replace(/\s/g, '&#32;');
    default:
      return htmlEncode(input);
  }
};

/**
 * Multi-context security validator
 * Checks if input is safe across multiple contexts
 */
export const isInputSafe = (input: string, contexts: EncodingContext[] = ['html']): boolean => {
  // Logic here: Validate input safety across multiple contexts
  return contexts.every(context => {
    switch (context) {
      case 'html':
        return !containsDangerousHtml(input);
      case 'js':
      case 'json':
        return !containsDangerousJs(input);
      case 'url':
        return isUrlSafe(input);
      case 'css':
        return !containsDangerousCss(input);
      default:
        return !containsDangerousHtml(input);
    }
  });
};

/**
 * Advanced sanitization with multiple encoding layers
 * Applies multiple encoding strategies for maximum security
 */
export const deepSanitize = (input: string, primaryContext: EncodingContext = 'html'): string => {
  // Logic here: Apply multiple layers of encoding for enhanced security
  let sanitized = input;
  
  // First, apply context-specific encoding
  sanitized = sanitizeForDisplay(sanitized, primaryContext);
  
  // Then apply additional safety measures based on detected threats
  if (containsDangerousHtml(input)) {
    sanitized = htmlEncode(sanitized);
  }
  
  if (containsDangerousJs(input)) {
    sanitized = jsStringEncode(sanitized);
  }
  
  return sanitized;
};

/**
 * Encoding configuration for different security levels
 */
export interface EncodingConfig {
  level: 'basic' | 'standard' | 'strict' | 'paranoid';
  contexts: EncodingContext[];
  allowedTags?: string[];
  allowedAttributes?: string[];
}

/**
 * Configurable encoding based on security requirements
 */
export const configuredEncode = (input: string, config: EncodingConfig): string => {
  // Logic here: Apply encoding based on configuration
  const { level, contexts } = config;
  
  switch (level) {
    case 'basic':
      return sanitizeForDisplay(input, contexts[0] || 'html');
    
    case 'standard':
      return contexts.reduce((encoded, context) => {
        return sanitizeForDisplay(encoded, context);
      }, input);
    
    case 'strict':
      return deepSanitize(input, contexts[0] || 'html');
    
    case 'paranoid':
      // Apply all encoding strategies regardless of context
      let paranoidEncoded = input;
      paranoidEncoded = htmlEncode(paranoidEncoded);
      paranoidEncoded = jsStringEncode(paranoidEncoded);
      paranoidEncoded = urlEncode(paranoidEncoded);
      return paranoidEncoded;
    
    default:
      return sanitizeForDisplay(input, 'html');
  }
};
