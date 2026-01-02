import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import '../styles/menu.css';
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import { toast } from 'react-toastify';
import "bootstrap/dist/css/bootstrap.min.css";

const Menu = () => {
  // ✅ 1. Declare state variables FIRST
  const [sections, setSections] = useState([]);
  const [foods, setFoods] = useState({});
  const [activeSection, setActiveSection] = useState(''); // Empty string initially
  
  const { addToCart } = useContext(CartContext);
  const { isAuthenticated } = useContext(UserContext);
  const navigate = useNavigate();

  // Helper function to get correct image path
  const getImageSrc = (food, sectionKey) => {
    try {
      // Try to import the image using the filename from image_path
      const fileName = food.image_path.split('/').pop();
      return require(`../images/menu/${sectionKey}/${fileName}`);
    } catch (error) {
      console.warn(`Could not load image for ${food.name}:`, error);
      // Return a placeholder or default image
      return '';
    }
  };

  // ✅ 2. THEN use useEffect to fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching sections...');
        const sectionsResponse = await fetch('https://dynamic-energy-production.up.railway.app/api/sections');
        console.log('Sections response:', sectionsResponse);
        
        if (!sectionsResponse.ok) {
          throw new Error(`Failed to fetch sections: ${sectionsResponse.status}`);
        }
        
        const sectionsData = await sectionsResponse.json();
        console.log('Sections data:', sectionsData);
        
        // Check if sectionsData is an array and has items
        if (!Array.isArray(sectionsData) || sectionsData.length === 0) {
          console.error('No sections data received');
          return;
        }
        
        setSections(sectionsData);
        setActiveSection(sectionsData[0].section_key); // Use section_key instead of key

        const foodsResponse = await fetch('https://dynamic-energy-production.up.railway.app/api/foods');
        
        if (!foodsResponse.ok) {
          throw new Error(`Failed to fetch foods: ${foodsResponse.status}`);
        }
        
        const foodsData = await foodsResponse.json();
        
        // Organize foods by section_key
        const organizedFoods = {};
        sectionsData.forEach(section => {
          organizedFoods[section.section_key] = foodsData.filter(food => food.section_id === section.id);
        });
        
        setFoods(organizedFoods);
      } catch (err) {
        console.error('Detailed error:', err);
        toast.error('Failed to load menu data. Please try again later.');
      }
    };
    
    fetchData();
  }, []);

  return (
    <div className="menu-page">
      <div className="menu-tabs">
        {sections && sections.map(section => (
          <button
            key={section.section_key}
            className={`menu-tab${activeSection === section.section_key ? ' active' : ''}`}
            onClick={() => setActiveSection(section.section_key)}
          >
            {section.label}
          </button>
        ))}
      </div>
      
        <div className="menu-section-content">
        <div className="food-grid">
          {foods[activeSection] && foods[activeSection].map((food, idx) => (
            <div className="food-box" key={food.id}>
              <img 
                src={getImageSrc(food, activeSection)} 
                alt={food.name} 
                className="food-img" 
              />
              <h3 className="food-name">{food.name}</h3>
              <p className="food-price">${food.price}</p>
              <button
                className="add-order-btn"
                onClick={() => {
                  // Check if user is logged in
                  if (!isAuthenticated) {
                    toast.error('Please login to add items to cart!', {
                      icon: "🔒",
                      style: { background: "#dc3545", color: "#fff", fontWeight: "bold" }
                    });
                    navigate('/login');
                    return;
                  }
                  
                  // Add to cart if logged in
                  addToCart({ 
                    id: food.id,
                    name: food.name,
                    price: food.price,
                    image_path: food.image_path
                  });
                  toast.success(`${food.name} added to cart!`, {
                    icon: "🛒",
                    style: { background: "#009970", color: "#fff", fontWeight: "bold" }
                  });
                }}
              >
                {isAuthenticated ? 'Add to order' : 'Login to Order'}
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Menu;