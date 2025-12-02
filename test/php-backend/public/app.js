/**
 * Main application logic - coordinates validation, API calls, and UI updates
 */

/**
 * Updates error message display for a field
 * @param {string} fieldId
 * @param {string} errorMessage
 */
function updateFieldError(fieldId, errorMessage) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(`${fieldId}-error`);
    
    if (errorElement) {
        errorElement.textContent = errorMessage || '';
        errorElement.classList.toggle('error-visible', !!errorMessage);
    }
    
    if (field) {
        field.setAttribute('aria-invalid', errorMessage ? 'true' : 'false');
        field.classList.toggle('error', !!errorMessage);
    }
}

/**
 * Updates submit button state based on form validity
 * @param {string} formId
 * @param {boolean} isValid
 */
function updateSubmitButtonState(formId, isValid) {
    const submitButton = document.getElementById(`${formId}-submit`);
    if (submitButton) {
        submitButton.disabled = !isValid;
    }
}

/**
 * Updates result message display
 * @param {string} resultId
 * @param {string} message
 * @param {boolean} isSuccess
 */
function updateResultMessage(resultId, message, isSuccess) {
    const resultElement = document.getElementById(resultId);
    if (resultElement) {
        resultElement.textContent = message || '';
        resultElement.className = `result-message ${isSuccess ? 'success' : 'error'}`;
        resultElement.classList.toggle('result-visible', !!message);
    }
}

/**
 * Gets form data as object
 * @param {HTMLFormElement} form
 * @returns {object}
 */
function getFormData(form) {
    const formData = new FormData(form);
    const data = {};
    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }
    return data;
}

/**
 * Handles register form validation and submission
 */
function setupRegisterForm() {
    const form = document.getElementById('register-form');
    const emailField = document.getElementById('email');
    const passwordField = document.getElementById('password');
    
    if (!form || !emailField || !passwordField) {
        return;
    }
    
    // Validate on input change
    function validateAndUpdateState() {
        const formData = getFormData(form);
        const validation = validateRegisterForm(formData);
        
        updateFieldError('email', validation.errors.email);
        updateFieldError('password', validation.errors.password);
        updateSubmitButtonState('register', validation.valid);
    }
    
    emailField.addEventListener('input', validateAndUpdateState);
    passwordField.addEventListener('input', validateAndUpdateState);
    
    // Handle form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = getFormData(form);
        const validation = validateRegisterForm(formData);
        
        // Update all errors
        updateFieldError('email', validation.errors.email);
        updateFieldError('password', validation.errors.password);
        
        if (!validation.valid) {
            // Focus first field with error
            if (validation.errors.email) {
                emailField.focus();
            } else if (validation.errors.password) {
                passwordField.focus();
            }
            updateSubmitButtonState('register', false);
            return;
        }
        
        // Disable submit button during request
        updateSubmitButtonState('register', false);
        updateResultMessage('register-result', 'Registering...', true);
        
        try {
            const result = await registerUser(formData.email, formData.password);
            
            if (result.success && result.data) {
                updateResultMessage(
                    'register-result',
                    `User registered successfully! UUID: ${result.data.uuid}`,
                    true
                );
                form.reset();
                validateAndUpdateState(); // Reset button state
                // Refresh users list
                loadUsers();
            } else {
                updateResultMessage('register-result', result.error || 'Registration failed', false);
                updateSubmitButtonState('register', true); // Re-enable on error
            }
        } catch (error) {
            updateResultMessage('register-result', error.message || 'An error occurred', false);
            updateSubmitButtonState('register', true);
        }
    });
    
    // Initial validation state (form starts invalid)
    validateAndUpdateState();
}

/**
 * Handles order form validation and submission
 */
function setupOrderForm() {
    const form = document.getElementById('order-form');
    const userIdField = document.getElementById('userId');
    const amountField = document.getElementById('amount');
    
    if (!form || !userIdField || !amountField) {
        return;
    }
    
    // Validate on input change
    function validateAndUpdateState() {
        const formData = getFormData(form);
        const validation = validateOrderForm(formData);
        
        updateFieldError('userId', validation.errors.userId);
        updateFieldError('amount', validation.errors.amount);
        updateSubmitButtonState('order', validation.valid);
    }
    
    userIdField.addEventListener('input', validateAndUpdateState);
    amountField.addEventListener('input', validateAndUpdateState);
    
    // Handle form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = getFormData(form);
        const validation = validateOrderForm(formData);
        
        // Update all errors
        updateFieldError('userId', validation.errors.userId);
        updateFieldError('amount', validation.errors.amount);
        
        if (!validation.valid) {
            // Focus first field with error
            if (validation.errors.userId) {
                userIdField.focus();
            } else if (validation.errors.amount) {
                amountField.focus();
            }
            updateSubmitButtonState('order', false);
            return;
        }
        
        // Disable submit button during request
        updateSubmitButtonState('order', false);
        updateResultMessage('order-result', 'Placing order...', true);
        
        try {
            const result = await placeOrder(formData.userId, formData.amount);
            
            if (result.success && result.data) {
                updateResultMessage(
                    'order-result',
                    `Order placed successfully! Order UUID: ${result.data.uuid}`,
                    true
                );
                form.reset();
                validateAndUpdateState(); // Reset button state
                // Refresh orders list
                loadOrders();
            } else {
                updateResultMessage('order-result', result.error || 'Order placement failed', false);
                updateSubmitButtonState('order', true); // Re-enable on error
            }
        } catch (error) {
            updateResultMessage('order-result', error.message || 'An error occurred', false);
            updateSubmitButtonState('order', true);
        }
    });
    
    // Initial validation state (form starts invalid)
    validateAndUpdateState();
}

/**
 * Loads and displays users list
 */
async function loadUsers() {
    const loadingEl = document.getElementById('users-loading');
    const errorEl = document.getElementById('users-error');
    const listEl = document.getElementById('users-list');
    
    loadingEl.style.display = 'block';
    errorEl.textContent = '';
    errorEl.style.display = 'none';
    listEl.innerHTML = '';
    
    try {
        const result = await listUsers();
        
        if (result.success && result.data && result.data.users) {
            const users = result.data.users;
            
            if (users.length === 0) {
                listEl.innerHTML = '<p class="empty-message">No users registered yet.</p>';
            } else {
                const usersHtml = users.map(user => `
                    <div class="data-item" role="listitem">
                        <div class="data-item-header">
                            <strong>${escapeHtml(user.email)}</strong>
                            <code class="uuid">${escapeHtml(user.uuid)}</code>
                        </div>
                        <div class="data-item-meta">
                            <small>Registered: ${escapeHtml(user.createdAt)}</small>
                        </div>
                    </div>
                `).join('');
                listEl.innerHTML = usersHtml;
            }
        } else {
            errorEl.textContent = result.error || 'Failed to load users';
            errorEl.style.display = 'block';
        }
    } catch (error) {
        errorEl.textContent = error.message || 'An error occurred while loading users';
        errorEl.style.display = 'block';
    } finally {
        loadingEl.style.display = 'none';
    }
}

/**
 * Loads and displays orders list
 */
async function loadOrders() {
    const loadingEl = document.getElementById('orders-loading');
    const errorEl = document.getElementById('orders-error');
    const listEl = document.getElementById('orders-list');
    
    loadingEl.style.display = 'block';
    errorEl.textContent = '';
    errorEl.style.display = 'none';
    listEl.innerHTML = '';
    
    try {
        const result = await listOrders();
        
        if (result.success && result.data && result.data.orders) {
            const orders = result.data.orders;
            
            if (orders.length === 0) {
                listEl.innerHTML = '<p class="empty-message">No orders placed yet.</p>';
            } else {
                const ordersHtml = orders.map(order => `
                    <div class="data-item" role="listitem">
                        <div class="data-item-header">
                            <strong>$${order.amount.toFixed(2)}</strong>
                            <code class="uuid">${escapeHtml(order.uuid)}</code>
                        </div>
                        <div class="data-item-meta">
                            <small>User: <code>${escapeHtml(order.userId)}</code></small>
                            <small>Placed: ${escapeHtml(order.createdAt)}</small>
                        </div>
                    </div>
                `).join('');
                listEl.innerHTML = ordersHtml;
            }
        } else {
            errorEl.textContent = result.error || 'Failed to load orders';
            errorEl.style.display = 'block';
        }
    } catch (error) {
        errorEl.textContent = error.message || 'An error occurred while loading orders';
        errorEl.style.display = 'block';
    } finally {
        loadingEl.style.display = 'none';
    }
}

/**
 * Loads and displays products list
 */
async function loadProducts() {
    const loadingEl = document.getElementById('products-loading');
    const errorEl = document.getElementById('products-error');
    const listEl = document.getElementById('products-list');
    
    if (!loadingEl || !errorEl || !listEl) {
        return; // Products section not on this page
    }
    
    loadingEl.style.display = 'block';
    errorEl.textContent = '';
    errorEl.style.display = 'none';
    listEl.innerHTML = '';
    
    try {
        const result = await listProducts();
        
        if (result.success && result.data && result.data.products) {
            const products = result.data.products;
            
            if (products.length === 0) {
                listEl.innerHTML = '<p class="empty-message">No products available yet.</p>';
            } else {
                const productsHtml = products.map(product => `
                    <div class="data-item" role="listitem">
                        <div class="data-item-header">
                            <strong>${escapeHtml(product.name)}</strong>
                            <span class="price">$${product.price.toFixed(2)}</span>
                        </div>
                        <p class="description">${escapeHtml(product.description)}</p>
                        <div class="data-item-meta">
                            <a href="product-detail.html?uuid=${encodeURIComponent(product.uuid)}" class="product-link">View Details</a>
                            <small>Created: ${escapeHtml(product.createdAt)}</small>
                        </div>
                    </div>
                `).join('');
                listEl.innerHTML = productsHtml;
            }
        } else {
            errorEl.textContent = result.error || 'Failed to load products';
            errorEl.style.display = 'block';
        }
    } catch (error) {
        errorEl.textContent = error.message || 'An error occurred while loading products';
        errorEl.style.display = 'block';
    } finally {
        loadingEl.style.display = 'none';
    }
}

/**
 * Escapes HTML to prevent XSS
 * @param {string} text
 * @returns {string}
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Sets up refresh buttons and initial data loading
 */
function setupDataLists() {
    const refreshUsersBtn = document.getElementById('refresh-users');
    const refreshOrdersBtn = document.getElementById('refresh-orders');
    const refreshProductsBtn = document.getElementById('refresh-products');
    
    if (refreshUsersBtn) {
        refreshUsersBtn.addEventListener('click', loadUsers);
    }
    
    if (refreshOrdersBtn) {
        refreshOrdersBtn.addEventListener('click', loadOrders);
    }
    
    if (refreshProductsBtn) {
        refreshProductsBtn.addEventListener('click', loadProducts);
    }
    
    // Load initial data
    loadUsers();
    loadOrders();
    loadProducts();
}

// Initialize forms when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setupRegisterForm();
        setupOrderForm();
        setupDataLists();
    });
} else {
    setupRegisterForm();
    setupOrderForm();
    setupDataLists();
}

