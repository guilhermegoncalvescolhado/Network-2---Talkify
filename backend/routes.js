// routes.js
const express = require('express');
const router = express.Router();

// Importar rotas individuais
const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');

// Definir prefixos para as rotas
router.use('/user', userRoutes);
router.use('/message', messageRoutes);

module.exports = router;
