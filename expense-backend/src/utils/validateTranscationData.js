import validator from "validator";

export const validateTranscationData = (req) => {

    const { type = "", amount = "", description = "", category = "", date = "" } = req?.body || {}

    let errors = {}

    if (!type) {
        errors.type = "Type is required";
    } else if (!['income', 'expense'].includes(type.toLowerCase())) {
        errors.type = "Type must be either 'income' or 'expense'";
    }

    if (!amount && amount !== 0) {
        errors.amount = "Amount is required";
    } else if (!validator.isNumeric(amount.toString(), { no_symbols: true })) {
        errors.amount = "Amount must be a valid number";
    } else if (parseFloat(amount) <= 0) {
        errors.amount = "Amount must be greater than 0";
    }


    if (!description) {
        errors.description = "Description is required";
    } else if (typeof description !== 'string') {
        errors.description = "Description must be a string";
    } else {
        const trimmedDescription = description.trim();
        if (trimmedDescription.length === 0) {
            errors.description = "Description cannot be empty";
        } else if (trimmedDescription.length > 200) {
            errors.description = "Description cannot exceed 200 characters";
        } else if (trimmedDescription.length < 3) {
            errors.description = "Description must be at least 3 characters";
        }
    }

    if (!category) {
        errors.category = "Category is required";
    } else if (typeof category !== 'string') {
        errors.category = "Category must be a string";
    } else {
        const trimmedCategory = category.trim();
        if (trimmedCategory.length === 0) {
            errors.category = "Category cannot be empty";
        } else if (trimmedCategory.length > 50) {
            errors.category = "Category cannot exceed 50 characters";
        }
    }

     if (!date) {
        errors.date = "Date is required";
    } else if (!validator.isISO8601(date.toString())) {
        errors.date = "Date must be in valid ISO 8601 format (YYYY-MM-DD)";
    } else {
        const transactionDate = new Date(date);
        const today = new Date();
        today.setHours(23, 59, 59, 999); 
        
        if (isNaN(transactionDate.getTime())) {
            errors.date = "Invalid date value";
        } else if (transactionDate > today) {
            errors.date = "Date cannot be in the future";
        }
    
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };

} 