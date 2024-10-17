require('dotenv').config();
const express = require('express');
const http = require('http');
const connectDB = require('./config/database');
const cors = require('cors');
const routes = require('./routes');
const errorHandler = require('./utils/errorHandler');

const { createWebSocketServer } = require('./config/socket');

const app = express();

// Middleware
app.use(express.json());
const server = http.createServer(app);
const wss = createWebSocketServer(server);

// CORS configuration
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Use centralized routes
app.use('/api', routes);

// Connect to MongoDB
connectDB();

// Make io accessible to our router
app.use((req, res, next) => {
  next();
});

// Error handling middleware
app.use(errorHandler);

// Start server
server.listen(5000, () => console.log(`Server running on port ${5000}`));