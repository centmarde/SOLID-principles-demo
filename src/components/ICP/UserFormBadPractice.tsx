import React from 'react';
import type { FormEvent } from 'react';

// BAD PRACTICE: Monolithic interface that forces clients to depend on methods they don't use
// This violates ISP by creating a "fat" interface with too many responsibilities

interface UserFormProps {
  // Basic user data
  username: string;
  email: string;
  
  // Admin-only properties that regular forms don't need
  isAdmin?: boolean;
  permissions?: string[];
  adminActions?: {
    deleteUser: () => void;
    banUser: () => void;
    resetPassword: () => void;
  };
  
  // Styling properties that not all forms need
  style?: React.CSSProperties;
  theme?: 'light' | 'dark';
  customCSS?: string;
  
  // Form actions
  onSubmit: (userData: any) => void;
  onCancel: () => void;
  
  // Analytics properties that simple forms don't need
  trackingId?: string;
  onAnalyticsEvent?: (event: string) => void;
  
  // Validation properties that some forms might not need
  validators?: {
    validateEmail: (email: string) => boolean;
    validateUsername: (username: string) => boolean;
    validatePassword: (password: string) => boolean;
  };
  
  // Social media integration that most forms don't need
  socialLogin?: {
    loginWithGoogle: () => void;
    loginWithFacebook: () => void;
    loginWithTwitter: () => void;
  };
}

// BAD PRACTICE COMPONENT - forced to accept ALL properties even if not used
function UserFormBadPractice({ 
  username, 
  email, 
  style, 
  onCancel, 
  onSubmit,
  // Forced to accept these even though this simple form doesn't need them
  isAdmin,
  permissions,
  adminActions,
  theme,
  customCSS,
  trackingId,
  onAnalyticsEvent,
  validators,
  socialLogin
}: UserFormProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Component is cluttered with unnecessary logic for features it doesn't use
    if (trackingId && onAnalyticsEvent) {
      onAnalyticsEvent('form_submit_start');
    }
    
    const formData = new FormData(event.currentTarget);
    const userData = {
      username: formData.get('username') as string,
      email: formData.get('email') as string,
    };
    
    // Unnecessary validation logic that this simple form doesn't need
    if (validators) {
      if (!validators.validateEmail(userData.email)) {
        return;
      }
      if (!validators.validateUsername(userData.username)) {
        return;
      }
    }
    
    onSubmit(userData);
    
    if (trackingId && onAnalyticsEvent) {
      onAnalyticsEvent('form_submit_success');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={style} className={customCSS}>
     {/* UI Logic*/}
      
      {/* Component forced to handle admin features it doesn't implement */}
      {isAdmin && adminActions && (
        <div>
          <button type="button" onClick={adminActions.deleteUser}>Delete User</button>
          <button type="button" onClick={adminActions.banUser}>Ban User</button>
          <button type="button" onClick={adminActions.resetPassword}>Reset Password</button>
        </div>
      )}
      
      {/* Component forced to handle social login it doesn't need */}
      {socialLogin && (
        <div>
          <button type="button" onClick={socialLogin.loginWithGoogle}>Google Login</button>
          <button type="button" onClick={socialLogin.loginWithFacebook}>Facebook Login</button>
          <button type="button" onClick={socialLogin.loginWithTwitter}>Twitter Login</button>
        </div>
      )}
      
      <div>
        <button type="submit">Submit</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

// PROBLEMS WITH THIS APPROACH:
// 1. Every client must know about ALL interface properties
// 2. Component becomes bloated with unused functionality
// 3. Hard to maintain and test
// 4. Violates Single Responsibility Principle as well
// 5. Forces unnecessary dependencies on clients

export default UserFormBadPractice;
