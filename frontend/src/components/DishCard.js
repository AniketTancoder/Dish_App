import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/DishCard.css';

const DishCard = ({ dish, onTogglePublish, isUpdating }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <motion.div
      className={`dish-card ${dish.isPublished ? 'published' : 'unpublished'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      layout
    >
      <div className="dish-image-container">
        {imageError ? (
          <div className="dish-image-placeholder">
            <span>🍽️</span>
            <p>Image not available</p>
          </div>
        ) : (
          <img
            src={dish.imageUrl}
            alt={dish.dishName}
            className="dish-image"
            onError={handleImageError}
          />
        )}
        <div className={`status-badge ${dish.isPublished ? 'published' : 'unpublished'}`}>
          {dish.isPublished ? 'Published' : 'Unpublished'}
        </div>
      </div>
      
      <div className="dish-info">
        <h3 className="dish-name">{dish.dishName}</h3>
        <p className="dish-id">ID: {dish.dishId}</p>
      </div>
      
      <motion.button
        className={`toggle-btn ${dish.isPublished ? 'unpublish' : 'publish'}`}
        onClick={() => onTogglePublish(dish._id)}
        disabled={isUpdating}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isUpdating ? (
          <div className="loading-spinner"></div>
        ) : (
          dish.isPublished ? 'Unpublish' : 'Publish'
        )}
      </motion.button>
    </motion.div>
  );
};

export default DishCard;