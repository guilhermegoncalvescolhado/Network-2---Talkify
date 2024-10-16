require('dotenv').config();
const express = require('express');
const http = require('http');
const connectDB = require('./config/database');
const cors = require('cors');
const configureSocket = require('./config/socket');
const routes = require('./routes');
const errorHandler = require('./utils/errorHandler');

const app = express();
const server = http.createServer(app);

// Middleware
app.use(express.json());

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Use centralized routes
app.use('/api', routes);

// Connect to MongoDB
connectDB();

// Configure Socket.IO
const io = configureSocket(server);

// Make io accessible to our router
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));