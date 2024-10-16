const ChatRoom = require('../models/ChatRoom'); 
const Request = require('../models/Request');
const WebSocket = require('ws');
const { getWebSocketServer } = require('../config/socket'); 
const User = require('../models/User');
const Message = require('../models/Message');
const { encrypt } = require('../config/sec');

exports.createChatRoom = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'O nome do chat room é obrigatório' });
    }

    const newChatRoom = new ChatRoom({
        name,
        participants: [req.user.id], 
        creator: req.user.id,
    });

    const savedChatRoom = await newChatRoom.save();

    const user = await User.findById(req.user.id);
    const encryptedMessage = JSON.stringify(encrypt("Bem vindo ao chat room criado pelo usuario " + user.username));
    const newMessage = new Message({
      sender: req.user.id,
      content: encryptedMessage,
      isPrivate: false,
      chatRoom: savedChatRoom._id
    });

    await newMessage.save();

    const wss = getWebSocketServer();
    
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ message: 'Nova sala criada', chatRoom: savedChatRoom._id }));
      }
    });
    
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ message: 'Nova mensagem', chatRoom: savedChatRoom._id}));
      }
    });

    res.status(201).json(savedChatRoom);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getAllChatRooms = async (req, res, next) => {
  try {
    const chatRooms = await ChatRoom.find().populate('participants', 'username email');

    res.status(200).json(chatRooms);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getChatRoom = async (req, res, next) => {
  try {
    const chatRoom = await ChatRoom.findById(req.params.id).populate('participants', 'username email');

    if (!chatRoom) {
      return res.status(404).json({ message: 'Chat room não encontrado' });
    }

    res.status(200).json(chatRoom);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.updateChatRoom = async (req, res, next) => {
  try {
    const { name } = req.body;
    const chatRoom = await ChatRoom.findById(req.params.id);

    if (!chatRoom) {
      return res.status(404).json({ message: 'Chat room não encontrado' });
    }

    if (chatRoom.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Você não tem permissão para editar este chat room' });
    }

    if (name) chatRoom.name = name;

    const updatedChatRoom = await chatRoom.save();

    const wss = getWebSocketServer();

    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ message: 'Sala de chat atualizada ', chatRoom: updatedChatRoom._id }));
      }
    });

    res.status(200).json(updatedChatRoom);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.deleteChatRoom = async (req, res, next) => {
  try {
    const chatRoom = await ChatRoom.findById(req.params.id);

    if (!chatRoom) {
      return res.status(404).json({ message: 'Chat room não encontrado' });
    }

    if (chatRoom.creator.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Você não tem permissão para deletar este chat room' });
    }

    await ChatRoom.findByIdAndDelete(req.params.id);

    const wss = getWebSocketServer();

    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ message: 'Sala apagada ', chatRoom: req.params.id }));
      }
    });

    res.status(200).json({ message: 'Chat room deletado com sucesso' });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getChatRoomsForUser = async (req, res, next) => {
  try {
    const chatRooms = await ChatRoom.find({ participants: req.user.id }).populate('participants', 'username email');

    res.status(200).json(chatRooms);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.joinChatRoom = async (req, res, next) => {
    try {
      const chatRoom = await ChatRoom.findById(req.params.chatRoomId);
  
      if (!chatRoom) {
        return res.status(404).json({ message: 'Chat room não encontrado' });
      }
  
      if (chatRoom.participants.includes(req.user.id)) {
        return res.status(400).json({ message: 'Usuário já está no chat room' });
      }
  
      const newRequest = new Request({
        requester: req.user.id,
        requestType: 'join_room',
        chatRoom: chatRoom._id,
        status: 'pending',
      });

      await newRequest.save();

      const wss = getWebSocketServer();

       wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ message: 'Usuário quer entrar na sala ', chatRoom: req.params.id, userId: req.user.id }));
        }
      });
  
      res.status(201).json({ message: 'Pedido de entrada enviado com sucesso', request: newRequest });  
    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    }
};

exports.removeUserFromChatRoom = async (req, res, next) => {
  try {
    const chatRoom = await ChatRoom.findById(req.params.chatRoomId);

    if (!chatRoom) {
      return res.status(404).json({ message: 'Chat room não encontrado' });
    }

    if (chatRoom.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Você não tem permissão para remover usuários deste chat room' });
    }

    if (!chatRoom.participants.includes(req.body.userId)) {
      return res.status(400).json({ message: 'Usuário não está no chat room' });
    }

    chatRoom.participants = chatRoom.participants.filter(userId => userId.toString() !== req.body.userId);
    const updatedChatRoom = await chatRoom.save();

    const wss = getWebSocketServer();

    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ message: 'Usuário removido da sala ', user: req.body.userId, chatRoom: req.params.chatRoomId }));
      }
    });

    res.status(200).json(updatedChatRoom);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
