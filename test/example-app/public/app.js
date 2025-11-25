/**
 * Frontend Application
 * Interacts with the Clean Architecture backend via REST API.
 */

const API_BASE = 'http://localhost:3000/api';

let currentUser = null;
let currentToken = null;

// Utility functions
function showResult(elementId, message, type = 'info') {
  const element = document.getElementById(elementId);
  element.textContent = message;
  element.className = `result ${type}`;
  element.style.display = 'block';
}

function clearResult(elementId) {
  const element = document.getElementById(elementId);
  element.textContent = '';
  element.className = 'result';
  element.style.display = 'none';
}

function addEventToLog(eventData) {
  const log = document.getElementById('events-log');
  const eventItem = document.createElement('div');
  eventItem.className = 'event-item';
  const time = new Date().toLocaleTimeString();
  eventItem.innerHTML = `<time>${time}</time> - ${JSON.stringify(eventData, null, 2)}`;
  log.appendChild(eventItem);
  log.scrollTop = log.scrollHeight;
}

// Register form
document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  clearResult('register-result');

  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  try {
    const response = await fetch(`${API_BASE}/identity/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      showResult('register-result', `✅ ${data.message || 'User registered successfully!'}`, 'success');
      document.getElementById('register-form').reset();
    } else {
      showResult('register-result', `❌ Error: ${data.error || 'Registration failed'}`, 'error');
    }
  } catch (error) {
    showResult('register-result', `❌ Network error: ${error.message}`, 'error');
  }
});

// Authenticate form
document.getElementById('auth-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  clearResult('auth-result');

  const email = document.getElementById('auth-email').value;
  const password = document.getElementById('auth-password').value;

  try {
    const response = await fetch(`${API_BASE}/identity/authenticate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      currentUser = data.userId;
      currentToken = data.token;
      showResult('auth-result', `✅ Login successful! Token: ${data.token.substring(0, 20)}...`, 'success');
      document.getElementById('current-user').textContent = `Logged in as: ${data.userId}`;
      document.getElementById('order-user-id').value = data.userId;
      document.getElementById('view-user-id').value = data.userId;
      document.getElementById('cancel-user-id').value = data.userId;
    } else {
      showResult('auth-result', `❌ Error: ${data.error || 'Authentication failed'}`, 'error');
    }
  } catch (error) {
    showResult('auth-result', `❌ Network error: ${error.message}`, 'error');
  }
});

// Place order form
document.getElementById('place-order-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  clearResult('place-order-result');

  const userId = document.getElementById('order-user-id').value;
  const items = Array.from(document.querySelectorAll('.order-item')).map((item) => ({
    productId: item.querySelector('.product-id').value,
    quantity: parseInt(item.querySelector('.quantity').value, 10),
    unitPrice: parseFloat(item.querySelector('.unit-price').value),
  }));

  try {
    const response = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, items }),
    });

    const data = await response.json();

    if (response.ok) {
      showResult('place-order-result', `✅ Order placed! Order ID: ${data.orderId}`, 'success');
      addEventToLog({ type: 'OrderPlaced', orderId: data.orderId, userId });
      document.getElementById('view-order-id').value = data.orderId;
      document.getElementById('cancel-order-id').value = data.orderId;
    } else {
      showResult('place-order-result', `❌ Error: ${data.error || 'Failed to place order'}`, 'error');
    }
  } catch (error) {
    showResult('place-order-result', `❌ Network error: ${error.message}`, 'error');
  }
});

// View order form
document.getElementById('view-order-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  clearResult('view-order-result');

  const orderId = document.getElementById('view-order-id').value;
  const userId = document.getElementById('view-user-id').value;

  if (!orderId || !userId) {
    showResult('view-order-result', '❌ Please enter both Order ID and User ID', 'error');
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/orders/${orderId}?userId=${encodeURIComponent(userId)}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();

      if (response.ok) {
        const summary = `
          <strong>Order Summary:</strong><br>
          ID: ${data.id}<br>
          User ID: ${data.userId}<br>
          Status: <strong>${data.status}</strong><br>
          Total Amount: <strong>$${data.totalAmount.toFixed(2)}</strong><br>
          Item Count: ${data.itemCount}
        `;
        showResult('view-order-result', summary, 'success');
      } else {
        showResult('view-order-result', `❌ Error: ${data.error || 'Order not found'}`, 'error');
      }
  } catch (error) {
    showResult('view-order-result', `❌ Network error: ${error.message}`, 'error');
  }
});

// Cancel order form
document.getElementById('cancel-order-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  clearResult('cancel-order-result');

  const orderId = document.getElementById('cancel-order-id').value;
  const userId = document.getElementById('cancel-user-id').value;

  try {
    const response = await fetch(`${API_BASE}/orders/${orderId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });

    const data = await response.json();

    if (response.ok) {
      showResult('cancel-order-result', `✅ ${data.message || 'Order cancelled successfully!'}`, 'success');
    } else {
      showResult('cancel-order-result', `❌ Error: ${data.error || 'Failed to cancel order'}`, 'error');
    }
  } catch (error) {
    showResult('cancel-order-result', `❌ Network error: ${error.message}`, 'error');
  }
});

// Add order item button
document.getElementById('add-item-btn').addEventListener('click', () => {
  const itemsContainer = document.getElementById('order-items');
  const newItem = document.createElement('div');
  newItem.className = 'order-item';
  newItem.innerHTML = `
    <label>Product ID:</label>
    <input type="text" class="product-id" placeholder="prod_2" required>
    <label>Quantity:</label>
    <input type="number" class="quantity" min="1" value="1" required>
    <label>Unit Price:</label>
    <input type="number" class="unit-price" min="0" step="0.01" value="5.00" required>
  `;
  itemsContainer.appendChild(newItem);
});

// Clear events button
document.getElementById('clear-events-btn').addEventListener('click', () => {
  document.getElementById('events-log').innerHTML = '';
});

// Health check on load
fetch(`${API_BASE}/health`)
  .then((res) => res.json())
  .then((data) => {
    console.log('Backend health:', data);
  })
  .catch((err) => {
    console.error('Backend not available:', err);
    showResult('register-result', '⚠️ Backend server not running. Please start the server first.', 'error');
  });

