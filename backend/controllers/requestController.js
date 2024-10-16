const ChatRoom = require('../models/ChatRoom'); 
const Request = require('../models/Request');
const WebSocket = require('ws');
const { getWebSocketServer } = require('../config/socket'); 

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