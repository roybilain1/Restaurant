import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "bootstrap/dist/css/bootstrap.min.css";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, loading } = useContext(CartContext);

  // Helper function to get correct image path
  const getImageSrc = (item) => {
    // For database items, image_path contains the path
    const imagePath = item.image_path;
    if (!imagePath) return '';
    
    try {
      // Extract filename from image_path
      const fileName = imagePath.split('/').pop();
      
      // Try to determine section from the image path
      const pathParts = imagePath.split('/');
      const sectionIndex = pathParts.findIndex(part => part === 'menu');
      const sectionKey = sectionIndex !== -1 && sectionIndex + 1 < pathParts.length 
        ? pathParts[sectionIndex + 1] 
        : 'cold-mezza'; // fallback
      
      return require(`../images/menu/${sectionKey}/${fileName}`);
    } catch (error) {
      console.warn(`Could not load image for ${item.food_name}:`, error);
      return '';
    }
  };

  // Get item name (from database)
  const getItemName = (item) => item.food_name;
  
  // Get item price (from database)
  const getItemPrice = (item) => {
    return typeof item.food_price === 'number' ? item.food_price : Number(item.food_price);
  };

  const total = cartItems.reduce((sum, item) => {
    return sum + (getItemPrice(item) * (item.quantity || 1));
  }, 0);
  
  const discount = total > 60 ? total * 0.2 : 0;
  const finalTotal = total - discount;

  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <h2>Your Cart 🛒</h2>
        <p>Loading cart...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center">Your Cart 🛒</h2>

      {Array.isArray(cartItems) && cartItems.length === 0 ? (
        <p className="text-muted text-center">Your cart is empty.</p>
      ) : (
        <>
          <div className="d-flex flex-wrap gap-3 mb-4 justify-content-center">
            {cartItems.map((item) => (
              item && typeof item === 'object' ? (
                <div
                  key={item.id}
                  className="card"
                  style={{ width: "250px", height: "320px", borderRadius: "10px", display: "flex", flexDirection: "column" }}
                >
                  <img
                    src={getImageSrc(item)}
                    alt={getItemName(item)}
                    className="card-img-top"
                    style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "10px 10px 0 0", background: "#fff" }}
                  />
                  <div className="card-body d-flex flex-column justify-content-between" style={{ flex: 1 }}>
                    <h5 className="card-title">{getItemName(item)}</h5>
                    <p className="card-text">
                      ${getItemPrice(item).toFixed(2)}
                      {item.quantity && item.quantity > 1 && (
                        <span className="text-muted"> × {item.quantity}</span>
                      )}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="btn btn-outline-danger w-100 mt-auto"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : null
            ))}
          </div>

          <hr className="my-4" />

          <div className="text-center">
            <h4>
              Total:{" "}
              <span
                className={discount > 0 ? "text-decoration-line-through text-muted" : ""}
              >
                ${total.toFixed(2)}
              </span>
            </h4>

            {discount > 0 && (
              <>
                <h5 className="text-success">
                  🎉 You got a 20% discount!
                </h5>
                <h4>
                  Final Total: <strong>${finalTotal.toFixed(2)}</strong>
                </h4>
              </>
            )}

            <button
              onClick={clearCart}
              className="btn btn-dark mt-3"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
