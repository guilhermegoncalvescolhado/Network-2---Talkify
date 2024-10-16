const ChatRoom = require('../models/ChatRoom'); 
const Request = require('../models/Request');
const WebSocket = require('ws');
const { getWebSocketServer } = require('../config/socket'); 
const Message = require('../models/Message');
const User = require('../models/User');
const { encrypt } = require('../config/sec');

exports.getJoinRequests = async (req, res, next) => {
    try {
      const chatRoom = await ChatRoom.findById(req.params.chatRoomId);
  
      if (!chatRoom) {
        return res.status(404).json({ message: 'Chat room não encontrado' });
      }
  
      if (chatRoom.creator.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Você não tem permissão para ver os pedidos deste chat room' });
      }
  
      const requests = await Request.find({ chatRoom: chatRoom._id, requestType: 'join_room' }).populate('requester', 'username email');
  
      res.status(200).json(requests);
    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    }
  };
  
  
  exports.approveJoinRequest = async (req, res, next) => {
    try {
      const request = await Request.findById(req.params.requestId).populate('chatRoom');
  
      if (!request) {
        return res.status(404).json({ message: 'Pedido não encontrado' });
      }
  
      if (request.chatRoom.creator.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Você não tem permissão para aprovar este pedido' });
      }
  
      const chatRoom = request.chatRoom;
      chatRoom.participants.push(request.requester);
      await chatRoom.save();
  
      request.status = 'approved';
      await request.save();
  
      await Request.findByIdAndDelete(req.params.requestId);
  
      const wss = getWebSocketServer();

      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ message: 'Pedido para entrar na sala aceito', chatRoom: chatRoom._id }));
        }
      });


      const user = await User.findById(request.requester);
      const encryptedMessage = JSON.stringify(encrypt("Usuário " + user.username + " se juntou ao chat"))
      const newMessage = new Message({
        sender: request.requester,
        content: encryptedMessage,
        isPrivate: false,
        chatRoom: chatRoom._id
      });

      await newMessage.save()

      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ message: 'Nova mensagem', chatRoom: chatRoom._id}));
        }
      });

      res.status(200).json({ message: 'Pedido aprovado com sucesso', chatRoom });
    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    }
  };
  
  exports.rejectJoinRequest = async (req, res, next) => {
    try {
      const request = await Request.findById(req.params.requestId).populate('chatRoom');
  
      if (!request) {
        return res.status(404).json({ message: 'Pedido não encontrado' });
      }
  
      if (request.chatRoom.creator.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Você não tem permissão para rejeitar este pedido' });
      }
  
      request.status = 'rejected';
      await request.save();
  
      await Request.findByIdAndDelete(req.params.requestId);
  
      const wss = getWebSocketServer();

      res.status(200).json({ message: 'Pedido rejeitado com sucesso' });
    } catch (error) {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        next(error);
    }
  };