const express = require('express');
const router = express.Router();
const chatRoomController = require('../controllers/chatRoomController');
const authMiddleware = require('../middleware/auth');

router.post('/create-chat', authMiddleware, chatRoomController.createChatRoom);
router.get('/:id', chatRoomController.getChatRoom);
router.put('/:id', authMiddleware, chatRoomController.updateChatRoom);
router.delete('/:id', authMiddleware, chatRoomController.deleteChatRoom);
router.get('/chat-by-user/:id', authMiddleware, chatRoomController.getChatRoomsForUser);
router.post('/join-chat/:chatRoomId', authMiddleware, chatRoomController.joinChatRoom);

module.exports = router;