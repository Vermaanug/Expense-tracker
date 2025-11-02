import validator from "validator";

export const validatePartialTranscationData = (data) => {
  const errors = {};
  
  if (data.type !== undefined) {
    if (!data.type) {
      errors.type = "Type cannot be empty";
    } else if (!['income', 'expense'].includes(data.type.toLowerCase())) {
      errors.type = "Type must be either 'income' or 'expense'";
    }
  }

  if (data.amount !== undefined) {
    if (!data.amount && data.amount !== 0) {
      errors.amount = "Amount cannot be empty";
    } else if (isNaN(data.amount)) {
      errors.amount = "Amount must be a valid number";
    } else if (parseFloat(data.amount) <= 0) {
      errors.amount = "Amount must be greater than 0";
    } else if (!/^\d+(\.\d{1,2})?$/.test(data.amount.toString())) {
      errors.amount = "Amount can have maximum 2 decimal places";
    }
  }

  if (data.description !== undefined) {
    if (!data.description || typeof data.description !== 'string') {
      errors.description = "Description must be a valid string";
    } else {
      const trimmed = data.description.trim();
      if (trimmed.length === 0) {
        errors.description = "Description cannot be empty";
      } else if (trimmed.length < 3) {
        errors.description = "Description must be at least 3 characters";
      } else if (trimmed.length > 200) {
        errors.description = "Description cannot exceed 200 characters";
      }
    }
  }

  if (data.category !== undefined) {
    if (!data.category || typeof data.category !== 'string') {
      errors.category = "Category must be a valid string";
    } else {
      const trimmed = data.category.trim();
      if (trimmed.length === 0) {
        errors.category = "Category cannot be empty";
      } else if (trimmed.length > 50) {
        errors.category = "Category cannot exceed 50 characters";
      }
    }
  }

  if (data.date !== undefined) {
    if (!data.date) {
      errors.date = "Date cannot be empty";
    } else if (!validator.isISO8601(data.date.toString())) {
      errors.date = "Date must be in valid ISO 8601 format (YYYY-MM-DD)";
    } else {
      const transactionDate = new Date(data.date);
      const today = new Date();
      today.setHours(23, 59, 59, 999);
      
      if (isNaN(transactionDate.getTime())) {
        errors.date = "Invalid date value";
      } else if (transactionDate > today) {
        errors.date = "Date cannot be in the future";
      }
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};