
# Setup Instructions for Database-Backed Cart

## What You Need to Do Now

### Step 1: Create the Cart Table in phpMyAdmin

1. Open phpMyAdmin in your browser (usually `http://localhost/phpmyadmin`)
2. Select your `restaurant` database from the left sidebar
3. Click on the **SQL** tab at the top
4. Copy and paste the following SQL code:

```sql
CREATE TABLE IF NOT EXISTS cart_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  food_name VARCHAR(255) NOT NULL,
  food_price DECIMAL(10, 2) NOT NULL,
  food_image VARCHAR(500),
  food_description TEXT,
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id)
);
```

5. Click the **Go** button to execute the SQL
6. You should see a success message like "Table created successfully"
7. Click on the **Structure** tab to verify the table was created with all columns

### Step 2: Test Your Application

The backend server is already running with the new cart endpoints! ✅

Now test the cart functionality:

1. **Open your browser** and go to `http://localhost:3000`
2. **Sign up or login** to your account
3. **Go to the Menu page** and add some dishes to your cart
4. **Go to the Cart page** to see your items
5. **Important Test**: Refresh the page or close/reopen the browser
6. **Expected Result**: Your cart items should still be there! They're saved in the database now.

### Step 3: Test Cross-Device Persistence (Optional)

1. Note down your login credentials
2. Open a different browser (Chrome, Firefox, Safari, etc.) or use Incognito/Private mode
3. Go to `http://localhost:3000` and login with the same account
4. Navigate to the Cart page
5. **Expected Result**: You should see the same cart items from before!

## What Changed

### ✅ Benefits of Database Cart:
- Cart persists across devices (same login = same cart everywhere)
- Cart survives browser close/refresh
- Cart persists even after logout/login
- Each user has their own private cart
- Cart data is secure (requires authentication)

### 📋 Current System Status:
- ✅ Backend cart API endpoints created
- ✅ Frontend CartContext updated to use database
- ✅ Cart page updated to display database items
- ✅ Backend server running with cart API
- ⏳ **Waiting for you**: Create the `cart_items` table in phpMyAdmin

## Troubleshooting

### If you get errors after creating the table:
1. Make sure you're logged in to the application
2. Check browser console (F12) for any error messages
3. Check that the table was created correctly in phpMyAdmin
4. Verify all existing tables are present: `users`, `comments`, `cart_items`, `foods`, `sections`

### If cart items don't show up:
1. Make sure you're logged in
2. Try adding a new item to the cart
3. Check browser console for error messages
4. Verify the backend server is running (should show "🛒 Cart API: Ready")

### If you see "Failed to fetch cart" or similar errors:
1. Check that the `cart_items` table exists in phpMyAdmin
2. Verify the foreign key relationship to `users` table is correct
3. Make sure you're logged in with a valid account

## Files Modified

- ✅ `/backend/server.js` - Added cart API endpoints
- ✅ `/backend/cart_setup.sql` - SQL script to create cart table
- ✅ `/restaurant/src/context/CartContext.js` - Updated to use backend API
- ✅ `/restaurant/src/pages/Cart.js` - Updated to display database items
- ✅ `/backend/CART_SYSTEM_README.md` - Detailed documentation

## Next Steps

After creating the table and testing:
- Your cart system will be fully functional!
- Try adding items, removing them, clearing the cart
- Test the 20% discount feature (add items totaling over $60)
- Enjoy your professional restaurant web app! 🎉
