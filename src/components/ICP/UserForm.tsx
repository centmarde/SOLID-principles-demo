import React from 'react';
import type { FormEvent } from 'react';

// BEST PRACTICE: Segregated interfaces following ISP
// Each interface has a single responsibility and clients only depend on what they need

// Core user data interface
interface UserData {
  username: string;
  email: string;
}

// Form action interface
interface FormActions {
  onSubmit: (userData: UserData) => void;
  onCancel: () => void;
}

// Styling interface (optional for components that need styling)
interface FormStyling {
  style?: React.CSSProperties;
  theme?: 'light' | 'dark';
  customCSS?: string;
}

// Admin-specific interface (only admin components need this)
interface AdminCapabilities {
  isAdmin: boolean;
  permissions: string[];
  adminActions: {
    deleteUser: () => void;
    banUser: () => void;
    resetPassword: () => void;
  };
}

// Analytics interface (only components with tracking need this)
interface AnalyticsCapabilities {
  trackingId: string;
  onAnalyticsEvent: (event: string) => void;
}

// Validation interface (only forms with validation need this)
interface ValidationCapabilities {
  validators: {
    validateEmail: (email: string) => boolean;
    validateUsername: (username: string) => boolean;
    validatePassword: (password: string) => boolean;
  };
}

// Social login interface (only forms with social login need this)
interface SocialLoginCapabilities {
  socialLogin: {
    loginWithGoogle: () => void;
    loginWithFacebook: () => void;
    loginWithTwitter: () => void;
  };
}

// Simple 
interface SimpleUserFormProps extends UserData, FormActions, FormStyling {}

// Admin 
interface AdminUserFormProps extends UserData, FormActions, FormStyling, AdminCapabilities {}

// Analytics 
interface AnalyticsUserFormProps extends UserData, FormActions, AnalyticsCapabilities {}

// This component only depends on interfaces it actually uses
function UserForm({ username, email, style, onCancel, onSubmit }: SimpleUserFormProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const userData: UserData = {
      username: formData.get('username') as string,
      email: formData.get('email') as string,
    };
    onSubmit(userData);
  };

  return (
    <form onSubmit={handleSubmit} style={style}>
      {/* UI logic Here */}
    </form>
  );
}

// BENEFIT: Clients can now implement only the interfaces they need
// - Simple forms: UserData + FormActions
// - Styled forms: UserData + FormActions + FormStyling
// - Admin forms: UserData + FormActions + AdminCapabilities
// This follows ISP: no client is forced to depend on methods it doesn't use

export default UserForm;
export type { 
  SimpleUserFormProps, 
  AdminUserFormProps, 
  AnalyticsUserFormProps,
  UserData,
  FormActions,
  FormStyling,
  AdminCapabilities,
  AnalyticsCapabilities,
  ValidationCapabilities,
  SocialLoginCapabilities
};