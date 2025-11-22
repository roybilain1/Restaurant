import "../styles/FoodCard.css";
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const FoodCard = ({ food, addToCart }) => {
    if (!food) {
        return <div className="product-card">No product data</div>;
    }
    return (
        <div className="food-box">
            <img src={food.image} alt={food.name} className="food-img" />
            <h3 className="food-name">{food.name}</h3>
            <p className="food-price">{food.price}</p>
            <button className="add-order-btn" onClick={() => addToCart(food)}>
                Add to order
            </button>
        </div>
    );
};

export default FoodCard;


