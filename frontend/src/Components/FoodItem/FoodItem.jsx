import React, { useContext } from 'react'; 
import './FoodItem.css';
import { assets } from '../../assets/assets'; 
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  const cartCount = cartItems?.[id] || 0;

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img className='food-item-image' src={`${url}/images/${image}`} alt="Food Item"/>
        {cartCount === 0 ? (
          <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt='Add'/>
        ) : (
          <div className='food-item-counter'>
            <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt='Remove'/>
            <p>{cartCount}</p>
            <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt='Add'/>
          </div>
        )}
      </div>
      <div className="food-item-name-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt='Rating stars'/>
        </div>
        <p className='food-item-desc'>{description}</p>
        <p className='food-item-price'>${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
