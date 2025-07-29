// src/components/MSMEForm/utils/validation.js
export const validateForm = (formData, page) => {
  const newErrors = {};
  const requiredFields = {
    1: ['unitName', 'mobile'],
    2: ['udyamNumber'],
    11: ['signature']
  };

  // Common validation patterns
  const validations = {
    unitName: {
      test: (value) => value.trim().length > 0,
      message: "इकाई का नाम आवश्यक है"
    },
    mobile: {
      test: (value) => /^[6-9]\d{9}$/.test(value),
      message: "कृपया 10 अंकों का मान्य मोबाइल नंबर दर्ज करें"
    },
    email: {
      test: (value) => !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: "मान्य ईमेल दर्ज करें"
    },
    udyamNumber: {
      test: (value) => value.trim().length > 0,
      message: "उद्यम पंजीकरण संख्या आवश्यक है"
    },
    signature: {
      test: (value) => !!value,
      message: "कृपया हस्ताक्षर अपलोड करें"
    }
  };

  // Validate required fields for the current page
  if (requiredFields[page]) {
    requiredFields[page].forEach(field => {
      if (!validations[field].test(formData[field])) {
        newErrors[field] = validations[field].message;
      }
    });
  }

  // Page-specific conditional validations
  if (page === 1 && formData.email) {
    if (!validations.email.test(formData.email)) {
      newErrors.email = validations.email.message;
    }
  }

  return {
    isValid: Object.keys(newErrors).length === 0,
    errors: newErrors
  };
};

// Field-specific validation functions for real-time validation
export const validateField = (name, value) => {
  const validations = {
    mobile: (val) => /^[0-9]{0,10}$/.test(val),
    email: (val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
    numeric: (val) => !val || /^[0-9]*$/.test(val),
    percentage: (val) => !val || (val >= 0 && val <= 100)
  };

  if (name === 'mobile') return validations.mobile(value);
  if (name === 'email') return validations.email(value);
  if (name.includes('percent') || name.includes('share')) return validations.percentage(value);
  if (name.includes('phone') || name.match(/_male|_female|_sc|_st|_obc|_disabled/)) {
    return validations.numeric(value);
  }
  return true;
};