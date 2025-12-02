/**
 * API client service - handles communication with backend API
 */

const API_BASE_URL = window.location.origin;

/**
 * Makes an API request
 * @param {string} endpoint
 * @param {string} method
 * @param {object} data
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
async function apiRequest(endpoint, method = 'GET', data = null) {
    try {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
            }
        };

        if (data && method !== 'GET') {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        const responseData = await response.json();

        if (!response.ok) {
            return {
                success: false,
                error: responseData.error || `HTTP ${response.status}: ${response.statusText}`
            };
        }

        return {
            success: true,
            data: responseData
        };
    } catch (error) {
        return {
            success: false,
            error: error.message || 'Network error occurred'
        };
    }
}

/**
 * Registers a new user
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{success: boolean, data?: {uuid: string}, error?: string}>}
 */
async function registerUser(email, password) {
    return apiRequest('/register', 'POST', { email, password });
}

/**
 * Places an order
 * @param {string} userId
 * @param {number} amount
 * @returns {Promise<{success: boolean, data?: {uuid: string}, error?: string}>}
 */
async function placeOrder(userId, amount) {
    return apiRequest('/orders', 'POST', { userId, amount: parseFloat(amount) });
}

/**
 * Lists all users
 * @returns {Promise<{success: boolean, data?: {users: Array}, error?: string}>}
 */
async function listUsers() {
    return apiRequest('/users', 'GET');
}

/**
 * Lists all orders
 * @returns {Promise<{success: boolean, data?: {orders: Array}, error?: string}>}
 */
async function listOrders() {
    return apiRequest('/orders/list', 'GET');
}

/**
 * Lists all products
 * @returns {Promise<{success: boolean, data?: {products: Array}, error?: string}>}
 */
async function listProducts() {
    return apiRequest('/products', 'GET');
}

/**
 * Gets product detail by UUID
 * @param {string} uuid
 * @returns {Promise<{success: boolean, data?: {product: Object}, error?: string}>}
 */
async function getProductDetail(uuid) {
    return apiRequest(`/products/${uuid}`, 'GET');
}

