import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "bootstrap/dist/css/bootstrap.min.css";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);
  const discount = total > 150 ? total * 0.2 : 0;
  const finalTotal = total - discount;

  return (
    <div className="container mt-4">
      <h2>Your Cart 🛒</h2>

      {cartItems.length === 0 ? (
        <p className="text-muted">Your cart is empty.</p>
      ) : (
        <>
          <div className="d-flex flex-wrap gap-3">
            {cartItems.map((food) => (
              <div
                key={food.id}
                className="card"
                style={{ width: "250px", borderRadius: "10px" }}
              >
                <img
                  src={food.image}
                  alt={food.name}
                  className="card-img-top"
                  style={{ borderRadius: "10px 10px 0 0" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{food.name}</h5>
                  <p className="card-text">${food.price}</p>
                  <button
                    onClick={() => removeFromCart(food.id)}
                    className="btn btn-outline-danger w-100"
                  >
                    Remove
                  </button>
                </div>
              </div>
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
