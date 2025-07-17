// CSS Encoding utilities for preventing XSS attacks in CSS context
// Encodes characters that could break CSS or inject malicious styles

/**
 * CSS Encoding - Encode for CSS context
 * Encodes characters that could break CSS using hexadecimal encoding
 */
export const cssEncode = (input: string): string => {
  // Logic here: Encode characters that could break CSS
  return input.replace(/[<>"'&\\\(\)\[\]{}]/g, (char) => {
    const hex = char.charCodeAt(0).toString(16);
    return `\\${hex.padStart(6, '0')} `;
  });
};

/**
 * CSS String Encoding - Encode for CSS string values
 * More specific encoding for CSS string contexts
 */
export const cssStringEncode = (input: string): string => {
  // Logic here: Encode for CSS string values within quotes
  return input
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/'/g, "\\'")
    .replace(/\n/g, '\\A ')
    .replace(/\r/g, '\\D ')
    .replace(/\t/g, '\\9 ')
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, (char) => {
      return '\\' + char.charCodeAt(0).toString(16).padStart(6, '0') + ' ';
    });
};

/**
 * CSS Property Value Encoding
 * Encoding for CSS property values
 */
export const cssPropertyEncode = (input: string): string => {
  // Logic here: Encode for CSS property values
  return input.replace(/[^a-zA-Z0-9\-]/g, (char) => {
    const hex = char.charCodeAt(0).toString(16);
    return `\\${hex.padStart(6, '0')} `;
  });
};

/**
 * CSS URL Encoding
 * Specific encoding for URLs within CSS
 */
export const cssUrlEncode = (input: string): string => {
  // Logic here: Encode URLs for use in CSS url() functions
  return input
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\28 ')
    .replace(/\)/g, '\\29 ')
    .replace(/"/g, '\\"')
    .replace(/'/g, "\\'")
    .replace(/\s/g, '\\20 ');
};

/**
 * Check if CSS contains potentially dangerous content
 */
export const containsDangerousCss = (input: string): boolean => {
  // Logic here: Detect patterns that could be CSS injection attempts
  const dangerousPatterns = [
    /expression\s*\(/i,
    /javascript\s*:/i,
    /vbscript\s*:/i,
    /data\s*:/i,
    /@import/i,
    /behavior\s*:/i,
    /-moz-binding/i,
    /\.innerHTML/i,
    /\.outerHTML/i
  ];
  
  return dangerousPatterns.some(pattern => pattern.test(input));
};

/**
 * Sanitize CSS for safe display
 * Removes or encodes dangerous CSS properties and values
 */
export const sanitizeCss = (input: string): string => {
  // Logic here: Clean CSS content for safe display
  if (containsDangerousCss(input)) {
    return cssEncode(input);
  }
  
  // Remove potentially dangerous CSS properties
  return input
    .replace(/expression\s*\([^)]*\)/gi, '')
    .replace(/javascript\s*:[^;]*/gi, '')
    .replace(/vbscript\s*:[^;]*/gi, '')
    .replace(/@import[^;]*/gi, '')
    .replace(/behavior\s*:[^;]*/gi, '');
};
