// server.js
require('dotenv').config();
const express = require('express');
const http = require('http');
const connectDB = require('./config/database');
const configureSocket = require('./config/socket');
const routes = require('./routes');
const errorHandler = require('./utils/errorHandler');

const app = express();
const server = http.createServer(app);

// Middleware
app.use(express.json());

// Usar as rotas centralizadas
app.use('/api', routes);

// Connect to MongoDB
connectDB();

// Configure Socket.IO
//const io = configureSocket(server);

// Make io accessible to our router
// app.use((req, res, next) => {
//   req.io = io;
//   next();
// });

// Middleware de tratamento de erros
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));