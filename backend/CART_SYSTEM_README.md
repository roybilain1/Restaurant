# Database-Backed Cart System

## Overview
The cart system now stores items in a MySQL database table (`cart_items`), allowing users to access their cart from any device and persist cart data even after logging out and back in.

## Database Setup

### 1. Run the SQL Setup Script
Execute the SQL commands in `cart_setup.sql` in phpMyAdmin or MySQL CLI:

```sql
-- In phpMyAdmin:
-- 1. Select your 'restaurant' database
-- 2. Go to the SQL tab
-- 3. Copy and paste the contents of cart_setup.sql
-- 4. Click "Go" to execute
```

### Table Structure
The `cart_items` table has the following structure:

```sql
CREATE TABLE cart_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  food_name VARCHAR(255) NOT NULL,
  food_price DECIMAL(10, 2) NOT NULL,
  food_image VARCHAR(500),
  food_description TEXT,
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## API Endpoints

### Get User's Cart
```
GET /api/cart
Headers: Authorization: Bearer <token>
Response: Array of cart items
```

### Add Item to Cart
```
POST /api/cart
Headers: 
  Authorization: Bearer <token>
  Content-Type: application/json
Body: {
  "food_name": "Hummus",
  "food_price": 8.50,
  "food_image": "images/menu/cold-mezza/hummus.png",
  "food_description": "Creamy chickpea dip"
}
Response: { success: true, cartItemId: <id> }
```

### Remove Item from Cart
```
DELETE /api/cart/:id
Headers: Authorization: Bearer <token>
Response: { success: true, message: "Item removed from cart" }
```

### Clear Cart
```
DELETE /api/cart
Headers: Authorization: Bearer <token>
Response: { success: true, itemsRemoved: <count> }
```

## Frontend Implementation

### CartContext
The `CartContext` now:
- Fetches cart from backend when user logs in
- Saves cart items to database when added/removed
- Clears local cart when user logs out
- Automatically syncs with the backend

### Key Features
- ✅ Cart persists across devices (logged in with same account)
- ✅ Cart persists after logout/login
- ✅ Cart is user-specific (each user has their own cart)
- ✅ Automatic synchronization with backend
- ✅ Real-time updates when items are added/removed

### Usage in Components
```javascript
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

function MyComponent() {
  const { cartItems, addToCart, removeFromCart, clearCart, loading } = useContext(CartContext);
  
  // cartItems: Array of cart items from database
  // addToCart(food): Async function to add item
  // removeFromCart(itemId): Async function to remove item by ID
  // clearCart(): Async function to clear all items
  // loading: Boolean indicating if cart is being fetched
}
```

## Benefits Over LocalStorage

### Database-Backed Cart
- ✅ Persists across devices
- ✅ Persists after logout/login
- ✅ Can track analytics
- ✅ Can implement abandoned cart features
- ✅ User-specific and secure
- ❌ Requires authentication
- ❌ Requires backend/database

### LocalStorage Cart (Previous)
- ✅ Works without login
- ✅ Fast (no API calls)
- ✅ No backend required
- ❌ Device-specific only
- ❌ Lost if browser data is cleared
- ❌ Not user-specific

## Security
- All cart operations require authentication (JWT token)
- Users can only access/modify their own cart items
- Foreign key constraint ensures data integrity
- Cascade delete removes cart items when user is deleted

## Testing the Cart System

1. **Sign Up/Login**: Create an account and log in
2. **Add Items**: Add several dishes to your cart from the Menu page
3. **View Cart**: Navigate to Cart page and verify items are displayed
4. **Logout**: Log out of your account
5. **Login Again**: Log back in with the same account
6. **Verify Persistence**: Your cart items should still be there!
7. **Different Device**: Try logging in from a different browser/device - your cart will be there too!

## Migration from LocalStorage
If you had items in localStorage previously, they will be lost when switching to the database-backed cart. This is expected behavior as the two systems are incompatible.

To keep localStorage as a fallback for non-authenticated users, you would need to implement a hybrid system (more complex).
