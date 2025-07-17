// Types for validation
export interface FormData {
  username: string;
  email: string;
  age: string;
  website: string;
  comment: string;
}

export interface ValidationErrors {
  username?: string;
  email?: string;
  age?: string;
  website?: string;
  comment?: string;
  headers?: string;
}

export type ValidationResult = string | undefined;
