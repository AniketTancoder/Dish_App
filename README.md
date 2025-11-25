# 🍽️ Dish Management App

A modern, real-time dish management application built with React, Node.js, Express, and MongoDB. This application allows users to manage dish publishing status with live updates across multiple clients.

## 📋 Features

### Core Functionality
- **Real-time Dashboard**: View all dishes with their current publishing status
- **Dish Management**: Toggle publish/unpublish status for individual dishes
- **Live Updates**: Real-time synchronization across all connected clients using WebSocket
- **Responsive Design**: Modern, mobile-friendly interface with smooth animations
- **Sample Data**: Initialize the application with sample dishes for testing

### User Interface
- **Interactive Cards**: Each dish is displayed in an attractive card format
- **Status Indicators**: Clear visual indicators for published/unpublished dishes
- **Statistics Dashboard**: Overview of total, published, and unpublished dishes
- **Loading States**: Smooth loading animations during data operations
- **Error Handling**: Graceful error handling with user-friendly messages

### Technical Features
- **RESTful API**: Complete REST API for dish operations
- **WebSocket Integration**: Real-time communication using Socket.IO
- **Database Integration**: MongoDB with Mongoose ODM
- **CORS Support**: Cross-origin resource sharing enabled
- **Environment Configuration**: Secure environment variable management

## 🛠️ Technologies Used

### Frontend
- **React**: Component-based UI library
- **Framer Motion**: Animation library for smooth transitions
- **Axios**: HTTP client for API communication
- **Socket.IO Client**: Real-time communication
- **CSS3**: Modern styling with animations

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **Socket.IO**: Real-time bidirectional communication
- **CORS**: Cross-origin resource sharing

### Development Tools
- **npm**: Package management
- **Create React App**: React application boilerplate
- **ESLint**: Code linting
- **Git**: Version control

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js)
- **MongoDB** (local installation or cloud service like MongoDB Atlas)
- **Git** (for cloning the repository)

## 🚀 Installation and Setup

### 1. Clone the Repository
```bash
git clone [<repository-url>](https://github.com/AniketTancoder/Dish_App.git)
cd dish-management-app
```

### 2. Backend Setup

#### Install Dependencies
```bash
cd backend
npm install
```

#### Environment Configuration
Create a `.env` file in the backend directory:
```
MONGODB_URI=mongodb://localhost:27017/dish_management
PORT=5000
```

#### Database Setup
Ensure MongoDB is running on your system. For local MongoDB:
- Install MongoDB Community Server
- Start MongoDB service
- Or use MongoDB Compass for GUI management

### 3. Frontend Setup

#### Install Dependencies
```bash
cd ../frontend
npm install
```

## ▶️ Running the Application

### Development Mode

#### Start Backend Server
```bash
cd backend
npm start
```
The backend server will start on `http://localhost:5000`

#### Start Frontend Application
```bash
cd frontend
npm start
```
The frontend application will open in your browser at `http://localhost:3000`

### Production Build

#### Build Frontend
```bash
cd frontend
npm run build
```

#### Start Backend in Production
```bash
cd backend
npm start
```

## 📡 API Endpoints

### Dishes API

#### GET /api/dishes
- **Description**: Retrieve all dishes
- **Response**: Array of dish objects

#### PATCH /api/dishes/:id/toggle-publish
- **Description**: Toggle the publish status of a specific dish
- **Parameters**: id (dish ID)
- **Response**: Updated dish object

#### POST /api/dishes/initialize
- **Description**: Initialize database with sample dish data
- **Response**: Success message with inserted dishes

### WebSocket Events

#### dishUpdated
- **Description**: Emitted when a dish's publish status changes
- **Data**: Updated dish object

## 📁 Project Structure

```
dish-management-app/
├── backend/
│   ├── config/
│   │   └── database.js          # Database connection configuration
│   ├── models/
│   │   └── Dish.js              # Dish data model
│   ├── routes/
│   │   └── dishes.js            # API routes for dish operations
│   ├── .env                     # Environment variables
│   ├── package.json             # Backend dependencies
│   └── server.js                # Main server file
├── frontend/
│   ├── public/
│   │   ├── index.html           # HTML template
│   │   └── favicon.ico          # Application icon
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.js     # Main dashboard component
│   │   │   └── DishCard.js      # Individual dish card component
│   │   ├── services/
│   │   │   ├── api.js           # API service functions
│   │   │   └── socket.js        # WebSocket service
│   │   ├── styles/
│   │   │   ├── Dashboard.css    # Dashboard styling
│   │   │   └── DishCard.css     # Dish card styling
│   │   ├── App.js               # Main React component
│   │   └── index.js             # Application entry point
│   ├── package.json             # Frontend dependencies
│   └── README.md                # Frontend-specific documentation
└── README.md                    # Main project documentation
```

## 🎯 How to Use

### Initial Setup
1. Start both backend and frontend servers
2. Open the application in your browser
3. Click "Initialize Sample Data" to populate the database with sample dishes

### Managing Dishes
1. **View Dishes**: All dishes are displayed in card format on the dashboard
2. **Toggle Status**: Click the "Publish" or "Unpublish" button on any dish card
3. **Real-time Updates**: Changes are immediately reflected across all open browser tabs
4. **Statistics**: Monitor total, published, and unpublished dish counts

### Features Overview
- **Published Dishes**: Displayed with green borders and "Published" badges
- **Unpublished Dishes**: Displayed with red borders and "Unpublished" badges
- **Loading States**: Visual feedback during operations
- **Error Handling**: User-friendly error messages for failed operations

## 🔧 Troubleshooting

### Common Issues

#### Backend Connection Issues
- Ensure MongoDB is running
- Check that port 5000 is not in use
- Verify environment variables in `.env` file

#### Frontend Connection Issues
- Ensure backend is running on port 5000
- Check browser console for CORS errors
- Verify API_BASE_URL in frontend services

#### Database Issues
- Ensure MongoDB connection string is correct
- Check database permissions
- Verify MongoDB service is running

#### Real-time Updates Not Working
- Check WebSocket connection in browser developer tools
- Ensure Socket.IO server is running
- Verify CORS configuration for WebSocket

### Development Tips
- Use browser developer tools to inspect network requests
- Check console logs for error messages
- Use MongoDB Compass to inspect database contents
- Test API endpoints using tools like Postman


## 📞 Support

For support, please contact the development team or create an issue in the repository.

---

**Happy Cooking! 🍳**
