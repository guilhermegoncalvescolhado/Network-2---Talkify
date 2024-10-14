const express = require('express');
const router = express.Router();
const chatRoomController = require('../controllers/chatRoomController');
const authMiddleware = require('../middleware/auth');

router.get('/', chatRoomController.getAllChatRooms);
router.post('/create-chat', authMiddleware, chatRoomController.createChatRoom);
router.get('/:id', chatRoomController.getChatRoom);
router.put('/:id', authMiddleware, chatRoomController.updateChatRoom);
router.delete('/:id', authMiddleware, chatRoomController.deleteChatRoom);
router.get('/chat-by-user/:id', authMiddleware, chatRoomController.getChatRoomsForUser);
router.get('/requests/:chatRoomId', authMiddleware, chatRoomController.getJoinRequests);
router.post('/join-chat/:chatRoomId', authMiddleware, chatRoomController.joinChatRoom);
router.post('/approve-request/:requestId', authMiddleware, chatRoomController.approveJoinRequest);
router.post('/reject-request/:requestId', authMiddleware, chatRoomController.rejectJoinRequest);

module.exports = router;