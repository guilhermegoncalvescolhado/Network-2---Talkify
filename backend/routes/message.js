const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const authMiddleware = require('../middleware/auth');

// Criar uma nova mensagem
router.post('/', authMiddleware, messageController.createMessage);

// Obter a lista de conversas do usuário (semelhante ao WhatsApp)
router.get('/lastConversations', authMiddleware, messageController.getConversationsList);

// Obter uma mensagem específica por ID
router.get('/:id', authMiddleware, messageController.getMessage);

// Atualizar uma mensagem
router.put('/:id', authMiddleware, messageController.updateMessage);

// Deletar uma mensagem
router.delete('/:id', authMiddleware, messageController.deleteMessage);

// Obter mensagens de um chat room específico
router.get('/chatroom/:chatRoomId', authMiddleware, messageController.getMessagesByChatRoom);

// Obter mensagens privadas entre o usuário atual e outro usuário
router.get('/private/:otherUserId', authMiddleware, messageController.getPrivateMessages);

module.exports = router;