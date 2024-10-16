require('dotenv').config();
const express = require('express');
const fs = require('fs');
const https = require('https');
const connectDB = require('./config/database');
const cors = require('cors');
const routes = require('./routes');
const errorHandler = require('./utils/errorHandler');

const { createWebSocketServer } = require('./config/socket');

const app = express();

// Middleware
app.use(express.json());

const privateKey = fs.readFileSync('../cert/server.key', 'utf8');
const certificate = fs.readFileSync('../cert/server.cert', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const httpsServer = https.createServer(credentials, app);
const wss = createWebSocketServer(httpsServer);

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get('/', (req, res) => {
  res.send('Conexão segura com HTTPS');
});

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
const PORT = process.env.PORT || 5000;
httpsServer.listen(PORT, () => {
  console.log(`Servidor HTTPS rodando na porta ${PORT}`);
});