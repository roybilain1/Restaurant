# Add User Name and Email to Cart Items Table

## Step 1: Update the Database Table

Run this SQL in phpMyAdmin:

1. Open phpMyAdmin: `http://localhost/phpmyadmin`
2. Select your `restaurant` database
3. Click on the **SQL** tab
4. Copy and paste this SQL:

```sql
ALTER TABLE cart_items 
ADD COLUMN user_name VARCHAR(255) AFTER user_id,
ADD COLUMN user_email VARCHAR(255) AFTER user_name;
```

5. Click **Go** to execute

## Step 2: Restart Backend Server

The backend has been updated to automatically save user name and email when items are added to cart.

**Stop and restart your backend:**
```bash
cd backend
npm start
```

## What This Does:

Now when you view the `cart_items` table in phpMyAdmin, you'll see:

| id | user_id | user_name | user_email | food_id | food_name | food_price | image_path | quantity | created_at |
|----|---------|-----------|------------|---------|-----------|------------|------------|----------|------------|
| 1  | 3       | John Doe  | john@example.com | 5 | Hummus | 8.50 | images/... | 2 | 2025-12-30... |
| 2  | 3       | John Doe  | john@example.com | 7 | Falafel | 7.00 | images/... | 1 | 2025-12-30... |
| 3  | 5       | Jane Smith | jane@example.com | 10 | Kibbe | 12.50 | images/... | 1 | 2025-12-30... |

## Benefits:

✅ **Easy to see who ordered what** - No need for JOIN queries
✅ **User info visible directly** - Just view the cart_items table
✅ **Quick reporting** - Export data easily from phpMyAdmin
✅ **Better for analysis** - User name and email right there

## View Cart Data in phpMyAdmin:

After adding the columns, you can simply:

1. Go to phpMyAdmin
2. Select `restaurant` database
3. Click on `cart_items` table
4. Click **Browse** tab
5. You'll see all cart items with user names and emails! 🎉

## Test It:

1. Start MySQL (make sure it's running)
2. Run the ALTER TABLE SQL above
3. Start your backend: `npm start`
4. Add items to cart in your React app
5. Check the `cart_items` table in phpMyAdmin
6. You should now see `user_name` and `user_email` columns filled!
