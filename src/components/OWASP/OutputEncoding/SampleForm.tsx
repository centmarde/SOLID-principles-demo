import React, { useState } from 'react';
import type { EncodingContext } from './encoders';
import { 
  sanitizeForDisplay, 
  htmlEncode,
  jsEncode,
  urlEncode,
  cssEncode,
  containsDangerousHtml,
  containsDangerousJs,
  isUrlSafe,
  containsDangerousCss,
  deepSanitize,
  isInputSafe
} from './encoders';

// OWASP Output Encoding Demonstration
// This component demonstrates various output encoding strategies to prevent XSS attacks

interface UserContent {
  username: string;
  comment: string;
  htmlContent: string;
  jsCode: string;
  url: string;
}

const SampleForm: React.FC = () => {
  const [userInput, setUserInput] = useState<UserContent>({
    username: '',
    comment: '',
    htmlContent: '',
    jsCode: '',
    url: ''
  });

  const [displayContent, setDisplayContent] = useState<UserContent>({
    username: '',
    comment: '',
    htmlContent: '',
    jsCode: '',
    url: ''
  });

  // Security analysis for each input field
  const [securityAnalysis, setSecurityAnalysis] = useState<{
    [key in keyof UserContent]: {
      isHtmlSafe: boolean;
      isJsSafe: boolean;
      isUrlSafe: boolean;
      isCssSafe: boolean;
      overallSafe: boolean;
    }
  }>({
    username: { isHtmlSafe: true, isJsSafe: true, isUrlSafe: true, isCssSafe: true, overallSafe: true },
    comment: { isHtmlSafe: true, isJsSafe: true, isUrlSafe: true, isCssSafe: true, overallSafe: true },
    htmlContent: { isHtmlSafe: true, isJsSafe: true, isUrlSafe: true, isCssSafe: true, overallSafe: true },
    jsCode: { isHtmlSafe: true, isJsSafe: true, isUrlSafe: true, isCssSafe: true, overallSafe: true },
    url: { isHtmlSafe: true, isJsSafe: true, isUrlSafe: true, isCssSafe: true, overallSafe: true }
  });

  // Dangerous: Direct rendering without encoding (for demonstration)
  const renderUnsafe = (content: string) => {
    // DON'T DO THIS: This is vulnerable to XSS
    return { __html: content };
  };

  // Safe: Properly encoded rendering
  const renderSafe = (content: string, context: EncodingContext = 'html') => {
    return sanitizeForDisplay(content, context);
  };

  // Analyze security of input across different contexts
  const analyzeInputSecurity = (input: string) => {
    return {
      isHtmlSafe: !containsDangerousHtml(input),
      isJsSafe: !containsDangerousJs(input),
      isUrlSafe: isUrlSafe(input),
      isCssSafe: !containsDangerousCss(input),
      overallSafe: isInputSafe(input, ['html', 'js', 'url', 'css'])
    };
  };

  const handleInputChange = (field: keyof UserContent, value: string) => {
    setUserInput(prev => ({ ...prev, [field]: value }));
    
    // Update security analysis for the changed field
    const analysis = analyzeInputSecurity(value);
    setSecurityAnalysis(prev => ({ 
      ...prev, 
      [field]: analysis 
    }));
  };

  const handleSafeDisplay = () => {
    // Apply appropriate encoding based on context
    setDisplayContent({
      username: sanitizeForDisplay(userInput.username, 'html'),
      comment: sanitizeForDisplay(userInput.comment, 'html'),
      htmlContent: sanitizeForDisplay(userInput.htmlContent, 'html'),
      jsCode: sanitizeForDisplay(userInput.jsCode, 'js'),
      url: sanitizeForDisplay(userInput.url, 'url')
    });
  };

  const handleAdvancedSafeDisplay = () => {
    // Apply deep sanitization for enhanced security
    setDisplayContent({
      username: deepSanitize(userInput.username, 'html'),
      comment: deepSanitize(userInput.comment, 'html'),
      htmlContent: deepSanitize(userInput.htmlContent, 'html'),
      jsCode: deepSanitize(userInput.jsCode, 'js'),
      url: deepSanitize(userInput.url, 'url')
    });
  };

  const handleDangerousDisplay = () => {
    // WARNING: This demonstrates unsafe practices - DON'T USE IN PRODUCTION
    setDisplayContent({
      username: userInput.username,
      comment: userInput.comment,
      htmlContent: userInput.htmlContent,
      jsCode: userInput.jsCode,
      url: userInput.url
    });
  };

  return (
    <div>
        {/* UI logic here */}
    </div>
  );
};

export default SampleForm;