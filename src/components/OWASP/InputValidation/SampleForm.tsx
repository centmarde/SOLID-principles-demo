import React, { useState } from 'react';
import {
  type FormData,
  type ValidationErrors,
  validateUsername,
  validateEmail,
  validateAge,
  validateWebsite,
  validateComment,
  validateHeaders
} from './validators';

const SampleForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    age: '',
    website: '',
    comment: ''
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    // Real-time validation as user types
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    newErrors.username = validateUsername(formData.username);
    newErrors.email = validateEmail(formData.email);
    newErrors.age = validateAge(formData.age);
    newErrors.website = validateWebsite(formData.website);
    newErrors.comment = validateComment(formData.comment);
    newErrors.headers = validateHeaders();

    setErrors(newErrors);

    // Return true if no errors
    return !Object.values(newErrors).some(error => error !== undefined);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!validateForm()) {
        console.log('❌ Form validation failed');
        return;
      }

      // Simulate API call with validated data
      console.log('✅ Form validation passed');
      console.log('📤 Simulating secure data submission:', {
        ...formData,
        note: 'All data has been validated and sanitized'
      });

      // Reset form after successful submission
      setFormData({
        username: '',
        email: '',
        age: '',
        website: '',
        comment: ''
      });
      
      alert('Form submitted successfully! Check console for details.');

    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields with validation error messages */}
    </form>
  );
};

export default SampleForm;