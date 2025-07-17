import type { ValidationResult } from './types';
import { isASCII } from './utils';

/**
 * Age validation rules:
 * - Required field
 * - ASCII characters only
 * - Must be numeric
 * - Reasonable range (1-150)
 */
export const validateAge = (age: string): ValidationResult => {
  if (!age.trim()) {
    return 'Age is required';
  }
  
  if (!isASCII(age)) {
    return 'Age must contain only ASCII characters';
  }
  
  if (!/^\d+$/.test(age)) {
    return 'Age must be a number';
  }
  
  const ageNum = parseInt(age, 10);
  if (ageNum < 1 || ageNum > 150) {
    return 'Age must be between 1 and 150';
  }
  
  return undefined;
};
