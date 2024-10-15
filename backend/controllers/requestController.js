const ChatRoom = require('../models/ChatRoom'); 
const Request = require('../models/Request');

exports.getJoinRequests = async (req, res) => {
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
      res.status(500).json({ message: 'Erro ao buscar pedidos de entrada', error });
    }
  };
  
  
  exports.approveJoinRequest = async (req, res) => {
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
  
      // req.io.to(userId).emit('joinApproved', {
      //   chatRoomId: chatRoom._id,
      //   message: 'Você foi aprovado para entrar na sala'
      // });

      res.status(200).json({ message: 'Pedido aprovado com sucesso', chatRoom });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao aprovar pedido de entrada', error });
    }
  };
  
  exports.rejectJoinRequest = async (req, res) => {
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
  
      req.io.to(userId).emit('joinRejected', {
        chatRoomId: chatRoom._id,
        message: 'Seu pedido para entrar na sala foi rejeitado'
      });
      
      res.status(200).json({ message: 'Pedido rejeitado com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao rejeitar pedido de entrada', error });
    }
  };