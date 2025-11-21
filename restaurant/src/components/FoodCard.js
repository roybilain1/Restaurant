// import "../assets/FoodCard.css";
// import React, { useContext } from "react";
// import { CartContext } from "../context/CartContext";

// const ProductCard = ({ food }) => {
//   const { addToCart } = useContext(CartContext);
//   if (!food) {
//     return <div className="product-card">No product data</div>;
//   }
//   const handleAdd = () => {
//     addToCart(food);
//     alert(`${food.name} added to cart!`);
//   };
//   return (
//     <div className="card">
//       <img src={food.image} alt={food.name} className="card-img" />
//       <h3>{food.name}</h3>
//       <p>${food.price}</p>
//       <button onClick={handleAdd} className="buy-btn">
//         Add to Cart
//       </button>
//     </div>
//   );
// };

// export default ProductCard;
