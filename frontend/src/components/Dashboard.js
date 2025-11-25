import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DishCard from './DishCard';
import { dishAPI } from '../services/api';
import { socketService } from '../services/socket';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingDish, setUpdatingDish] = useState(null);
  const [stats, setStats] = useState({ total: 0, published: 0, unpublished: 0 });

  const calculateStats = useCallback((dishesList) => {
    const total = dishesList.length;
    const published = dishesList.filter(dish => dish.isPublished).length;
    const unpublished = total - published;
    setStats({ total, published, unpublished });
  }, []);

  const fetchDishes = useCallback(async () => {
    try {
      setLoading(true);
      const response = await dishAPI.getAllDishes();
      setDishes(response.data);
      calculateStats(response.data);
    } catch (error) {
      console.error('Error fetching dishes:', error);
    } finally {
      setLoading(false);
    }
  }, [calculateStats]);

  const initializeSampleData = async () => {
    try {
      setLoading(true);
      console.log('Initializing sample data...');
      const response = await dishAPI.initializeData();
      console.log('Initialize response:', response);
      await fetchDishes();
      console.log('Sample data initialized successfully');
    } catch (error) {
      console.error('Error initializing data:', error);
      alert(`Failed to initialize sample data: ${error.message}`);
    }
  };

  const handleTogglePublish = async (dishId) => {
    try {
      setUpdatingDish(dishId);
      await dishAPI.togglePublish(dishId);
      // Real-time update will handle the UI update via socket
    } catch (error) {
      console.error('Error toggling publish status:', error);
    } finally {
      setUpdatingDish(null);
    }
  };

  const handleDishUpdate = useCallback((updatedDish) => {
    setDishes(prevDishes => {
      const updatedDishes = prevDishes.map(dish =>
        dish._id === updatedDish._id ? updatedDish : dish
      );
      calculateStats(updatedDishes);
      return updatedDishes;
    });
  }, [calculateStats]);

  useEffect(() => {
    fetchDishes();

    // Initialize socket connection
    socketService.connect();
    socketService.onDishUpdate(handleDishUpdate);

    return () => {
      socketService.offDishUpdate(handleDishUpdate);
      socketService.disconnect();
    };
  }, [fetchDishes, handleDishUpdate]);

  if (loading && dishes.length === 0) {
    return (
      <div className="dashboard-loading">
        <motion.div
          className="loading-spinner-large"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <p>Loading delicious dishes...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <motion.header
        className="dashboard-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>🍽️ Dish Management Dashboard</h1>
        <p>Manage and monitor your dish publishing status in real-time</p>
        
        <div className="stats-container">
          <motion.div 
            className="stat-card total"
            whileHover={{ scale: 1.05 }}
          >
            <h3>Total Dishes</h3>
            <span className="stat-number">{stats.total}</span>
          </motion.div>
          <motion.div 
            className="stat-card published"
            whileHover={{ scale: 1.05 }}
          >
            <h3>Published</h3>
            <span className="stat-number">{stats.published}</span>
          </motion.div>
          <motion.div 
            className="stat-card unpublished"
            whileHover={{ scale: 1.05 }}
          >
            <h3>Unpublished</h3>
            <span className="stat-number">{stats.unpublished}</span>
          </motion.div>
        </div>
      </motion.header>

      {dishes.length === 0 ? (
        <motion.div 
          className="empty-state"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2>No dishes found</h2>
          <p>Let's add some delicious dishes to get started!</p>
          <motion.button
            className="initialize-btn"
            onClick={initializeSampleData}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Initialize Sample Data
          </motion.button>
        </motion.div>
      ) : (
        <motion.div 
          className="dishes-grid"
          layout
        >
          <AnimatePresence>
            {dishes.map((dish) => (
              <DishCard
                key={dish._id}
                dish={dish}
                onTogglePublish={handleTogglePublish}
                isUpdating={updatingDish === dish._id}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      <motion.footer
        className="dashboard-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p>Real-time updates enabled • Changes sync across all clients</p>
      </motion.footer>
    </div>
  );
};

export default Dashboard;