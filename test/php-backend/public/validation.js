/**
 * Validation functions - pure functions that return validation results
 */

/**
 * Validates email format
 * @param {string} email
 * @returns {{valid: boolean, error: string}}
 */
function validateEmail(email) {
    if (!email || email.trim() === '') {
        return { valid: false, error: 'Email is required' };
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { valid: false, error: 'Please enter a valid email address' };
    }
    
    return { valid: true, error: '' };
}

/**
 * Validates password
 * @param {string} password
 * @returns {{valid: boolean, error: string}}
 */
function validatePassword(password) {
    if (!password || password.trim() === '') {
        return { valid: false, error: 'Password is required' };
    }
    
    if (password.length < 8) {
        return { valid: false, error: 'Password must be at least 8 characters long' };
    }
    
    return { valid: true, error: '' };
}

/**
 * Validates UUID format
 * @param {string} uuid
 * @returns {{valid: boolean, error: string}}
 */
function validateUserId(uuid) {
    if (!uuid || uuid.trim() === '') {
        return { valid: false, error: 'User UUID is required' };
    }
    
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(uuid.trim())) {
        return { valid: false, error: 'Please enter a valid UUID format' };
    }
    
    return { valid: true, error: '' };
}

/**
 * Validates order amount
 * @param {string|number} amount
 * @returns {{valid: boolean, error: string}}
 */
function validateAmount(amount) {
    if (amount === null || amount === undefined || amount === '') {
        return { valid: false, error: 'Amount is required' };
    }
    
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount)) {
        return { valid: false, error: 'Amount must be a valid number' };
    }
    
    if (numAmount <= 0) {
        return { valid: false, error: 'Amount must be greater than zero' };
    }
    
    return { valid: true, error: '' };
}

/**
 * Validates register form data
 * @param {{email: string, password: string}} formData
 * @returns {{valid: boolean, errors: {email?: string, password?: string}}}
 */
function validateRegisterForm(formData) {
    const emailResult = validateEmail(formData.email);
    const passwordResult = validatePassword(formData.password);
    
    const errors = {};
    if (!emailResult.valid) {
        errors.email = emailResult.error;
    }
    if (!passwordResult.valid) {
        errors.password = passwordResult.error;
    }
    
    return {
        valid: emailResult.valid && passwordResult.valid,
        errors
    };
}

/**
 * Validates order form data
 * @param {{userId: string, amount: string|number}} formData
 * @returns {{valid: boolean, errors: {userId?: string, amount?: string}}}
 */
function validateOrderForm(formData) {
    const userIdResult = validateUserId(formData.userId);
    const amountResult = validateAmount(formData.amount);
    
    const errors = {};
    if (!userIdResult.valid) {
        errors.userId = userIdResult.error;
    }
    if (!amountResult.valid) {
        errors.amount = amountResult.error;
    }
    
    return {
        valid: userIdResult.valid && amountResult.valid,
        errors
    };
}

