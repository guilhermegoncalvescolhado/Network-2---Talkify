const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController')
const authMiddleware = require('../middleware/auth');

router.post('/register', authController.createUser);
router.post('/login', authController.login);
router.get('/auth', authMiddleware, authController.authenticate);
router.get('/profile', authMiddleware, userController.getProfile);
router.put('/profile', authMiddleware, userController.updateProfile);
router.delete('/account', authMiddleware, userController.deleteAccount);

module.exports = router;