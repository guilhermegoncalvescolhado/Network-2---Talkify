// routes.js
const express = require('express');
const router = express.Router();

// Importar rotas individuais
const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');
const chatRoutes = require('./routes/chatRoom');
const requestRoutes = require('./routes/request');

// Definir prefixos para as rotas
router.use('/user', userRoutes);
router.use('/message', messageRoutes);
router.use('/rooms', chatRoutes);
router.use('/request', requestRoutes);

module.exports = router;
