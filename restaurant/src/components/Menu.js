import React, { useState } from 'react';
import '../styles/menu.css';

const sections = [
  { key: 'hot-mezza', label: 'Hot Mezza' },
  { key: 'cold-mezza', label: 'Cold Mezza' },
  { key: 'machewe', label: 'Machewe' },
  { key: 'drinks', label: 'Drinks' },
  { key: 'desserts', label: 'Lebanese Desserts' },
];

const placeholderImage = require('../images/chez-roy-restaurant.png');

const hotMezzaFoods = [
  { name: 'Sambousek', price: '$5', image: placeholderImage },
  { name: 'Kibbeh', price: '$8', image: placeholderImage },
  { name: 'Falafel', price: '$6', image: placeholderImage },
  { name: 'Batata Harra', price: '$5', image: placeholderImage },
  { name: 'Soujouk', price: '$7', image: placeholderImage },
  { name: 'Makanek', price: '$7', image: placeholderImage },
  { name: 'Cheese Rolls', price: '$6', image: placeholderImage },
];

const coldMezzaFoods = [
  { name: 'Hummus', price: '$5', image: placeholderImage },
  { name: 'Labneh', price: '$4', image: placeholderImage },
  { name: 'Moutabbal', price: '$5', image: placeholderImage },
  { name: 'Tabbouleh', price: '$6', image: placeholderImage },
  { name: 'Fattoush', price: '$6', image: placeholderImage },
  { name: 'Warak Enab', price: '$7', image: placeholderImage },
  { name: 'Shanklish', price: '$6', image: placeholderImage },
];

const macheweFoods = [
  { name: 'Grilled Kafta', price: '$10', image: placeholderImage },
  { name: 'Grilled Chicken', price: '$11', image: placeholderImage },
  { name: 'Grilled Meat', price: '$13', image: placeholderImage },
  { name: 'Taouk', price: '$10', image: placeholderImage },
  { name: 'Lamb Chops', price: '$15', image: placeholderImage },
  { name: 'Mixed Grill', price: '$16', image: placeholderImage },
  { name: 'Arayes', price: '$8', image: placeholderImage },
];

const drinks = [
  { name: 'Pepsi', price: '$2', image: placeholderImage },
  { name: '7Up', price: '$2', image: placeholderImage },
  { name: 'Orange Juice', price: '$3', image: placeholderImage },
  { name: 'Apple Juice', price: '$3', image: placeholderImage },
  { name: 'Beer', price: '$4', image: placeholderImage },
  { name: 'Araq', price: '$5', image: placeholderImage },
  { name: 'Red Wine', price: '$6', image: placeholderImage },
];

const desserts = [
  { name: 'Baklava', price: '$4', image: placeholderImage },
  { name: 'Knefeh', price: '$5', image: placeholderImage },
  { name: 'Maamoul', price: '$4', image: placeholderImage },
  { name: 'Atayef', price: '$5', image: placeholderImage },
  { name: 'Mouhalabieh', price: '$4', image: placeholderImage },
  { name: 'Znoud El Sit', price: '$5', image: placeholderImage },
  { name: 'Rice Pudding', price: '$4', image: placeholderImage },
];

const sectionFoods = {
  'hot-mezza': hotMezzaFoods,
  'cold-mezza': coldMezzaFoods,
  'machewe': macheweFoods,
  'drinks': drinks,
  'desserts': desserts,
};

const Menu = () => {
  const [activeSection, setActiveSection] = useState(sections[0].key);

  return (
    <div className="menu-page">
      <div className="menu-tabs">
        {sections.map(section => (
          <button
            key={section.key}
            className={`menu-tab${activeSection === section.key ? ' active' : ''}`}
            onClick={() => setActiveSection(section.key)}
          >
            {section.label}
          </button>
        ))}
      </div>
      <div className="menu-section-content">
        <div className="food-grid">
          {sectionFoods[activeSection].map((food, idx) => (
            <div className="food-box" key={idx}>
              <img src={food.image} alt={food.name} className="food-img" />
              <h3 className="food-name">{food.name}</h3>
              <p className="food-price">{food.price}</p>
              <button className="add-order-btn">Add to order</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;