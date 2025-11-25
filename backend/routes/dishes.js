const express = require('express');
const router = express.Router();
const Dish = require('../models/Dish');

// Get all dishes
router.get('/', async (req, res) => {
  try {
    const dishes = await Dish.find().sort({ createdAt: -1 });
    res.json(dishes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Toggle publish status
router.patch('/:id/toggle-publish', async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id);
    if (!dish) {
      return res.status(404).json({ message: 'Dish not found' });
    }

    dish.isPublished = !dish.isPublished;
    const updatedDish = await dish.save();

    // Emit real-time update
    req.io.emit('dishUpdated', updatedDish);

    res.json(updatedDish);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Initialize sample data
router.post('/initialize', async (req, res) => {
  try {
    console.log('Deleting existing dishes...');
    await Dish.deleteMany({});
    console.log('Existing dishes deleted');

    const sampleDishes = [
      {
        dishId: 'dish1',
        dishName: 'Margherita Pizza',
        imageUrl: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop',
        isPublished: true
      },
      {
        dishId: 'dish2',
        dishName: 'Caesar Salad',
        imageUrl: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop',
        isPublished: false
      },
      {
        dishId: 'dish3',
        dishName: 'Chocolate Cake',
        imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
        isPublished: true
      },
      {
        dishId: 'dish4',
        dishName: 'Grilled Salmon',
        imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
        isPublished: false
      },
      {
        dishId: 'dish5',
        dishName: 'Beef Burger',
        imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
        isPublished: false
      },
      {
        dishId: 'dish7',
        dishName: 'Sushi Platter',
        imageUrl: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop',
        isPublished: true
      },
      {
        dishId: 'dish8',
        dishName: 'Tacos Al Pastor',
        imageUrl: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&h=300&fit=crop',
        isPublished: false
      },
      {
        dishId: 'dish9',
        dishName: 'Beef Ramen',
        imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop',
        isPublished: false
      },
      {
        dishId: 'dish10',
        dishName: 'Mushroom Risotto',
        imageUrl: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop',
        isPublished: false
      },
      {
        dishId: 'dish11',
        dishName: 'Ice Cream Sundae',
        imageUrl: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop',
        isPublished: true
      },
      {
        dishId: 'dish12',
        dishName: 'Chicken Biryani',
        imageUrl: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop',
        isPublished: false
      },
      {
        dishId: 'dish13',
        dishName: 'Avocado Toast',
        imageUrl: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop',
        isPublished: true
      }
    ];

    console.log(`Inserting ${sampleDishes.length} sample dishes...`);
    const dishes = await Dish.insertMany(sampleDishes);
    console.log(`Successfully inserted ${dishes.length} dishes`);
    res.json({ message: 'Sample data initialized', dishes });
  } catch (error) {
    console.error('Error initializing sample data:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;