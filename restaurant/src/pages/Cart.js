import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "bootstrap/dist/css/bootstrap.min.css";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  const total = cartItems.reduce((sum, item) => {
    const price = Number(item.price.replace('$', ''));
    return sum + price;
  }, 0);
  const discount = total > 60 ? total * 0.2 : 0;
  const finalTotal = total - discount;

  return (
    <div className="container mt-4">
      <h2>Your Cart 🛒</h2>

      {Array.isArray(cartItems) && cartItems.length === 0 ? (
        <p className="text-muted">Your cart is empty.</p>
      ) : (
        <>
          <div className="d-flex flex-wrap gap-3 mb-4">
            {cartItems.map((item, idx) => (
              item && typeof item === 'object' ? (
                <div
                  key={item.id || idx}
                  className="card"
                  style={{ width: "250px", height: "320px", borderRadius: "10px", display: "flex", flexDirection: "column" }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="card-img-top"
                    style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "10px 10px 0 0", background: "#fff" }}
                  />
                  <div className="card-body d-flex flex-column justify-content-between" style={{ flex: 1 }}>
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.price}</p>
                    <button
                      onClick={() => removeFromCart(item.id || idx)}
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
