// routes.js
const express = require('express');
const router = express.Router();

// Importar rotas individuais
const userRoutes = require('./routes/user');

// Definir prefixos para as rotas
router.use('/user', userRoutes);

module.exports = router;
