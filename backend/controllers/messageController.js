const Message = require('../models/Message');
const User = require('../models/User');
const ChatRoom = require('../models/ChatRoom');
const WebSocket = require('ws');
const { getWebSocketServer } = require('../config/socket'); 

exports.startPrivateMessage = async (req, res, next) => {
  try {
    const { email } = req.body;
    const sender = req.user.id;
    const recipient = await User.findOne({ email: email });
    console.log(recipient)
    const newMessage = new Message({
      sender,
      content: "Primeira mensagem entre voces",
      isPrivate: true,
      recipient: recipient._id
    });  
    console.log(newMessage);
    await newMessage.save();

    const wss = getWebSocketServer();

    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ message: 'Nova mensagem', recipient: recipient}));
      }
    });
    
    res.status(201).json({ 
      message: 'Mensagem criada com sucesso',
      message: newMessage
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

exports.createMessage = async (req, res, next) => {
  try {
    const { recipient, content, chatRoom, isPrivate } = req.body;
    const sender = req.user.id; // Assumindo que o ID do usuário está disponível através do middleware de autenticação

    if (isPrivate && chatRoom) {
      const error = new Error('Mensagens privadas não podem ter um chatRoom');
      error.statusCode = 400;
      throw error;
    }

    if (!isPrivate && !chatRoom) {
      const error = new Error('Mensagens não privadas devem ter um chatRoom');
      error.statusCode = 400;
      throw error;
    }

    const newMessage = new Message({
      sender,
      content,
      isPrivate
    });

    if (isPrivate) {
      newMessage.recipient = recipient;
    } else {
      newMessage.chatRoom = chatRoom;
    }

    await newMessage.save();

    const wss = getWebSocketServer();

    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ message: 'Nova mensagem', chatRoom: chatRoom, recipient: recipient}));
      }
    });

    res.status(201).json({ 
      message: 'Mensagem criada com sucesso',
      message: newMessage
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getMessage = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id)
      .populate('sender', 'username')
      .populate('recipient', 'username')
      .populate('chatRoom', 'name');

    if (!message) {
      const error = new Error('Mensagem não encontrada');
      error.statusCode = 404;
      throw error;
    }

    res.json(message);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.updateMessage = async (req, res, next) => {
  try {
    const { content } = req.body;
    const message = await Message.findById(req.params.id);

    if (!message) {
      const error = new Error('Mensagem não encontrada');
      error.statusCode = 404;
      throw error;
    }

    if (message.sender.toString() !== req.user.id) {
      const error = new Error('Não autorizado');
      error.statusCode = 403;
      throw error;
    }

    message.content = content;
    message.updatedAt = Date.now();

    await message.save();

    const wss = getWebSocketServer();

    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ message: 'Mensagem atualizada', content: content}));
      }
    });
    res.json({ message: 'Mensagem atualizada com sucesso', message });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.deleteMessage = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      const error = new Error('Mensagem não encontrada');
      error.statusCode = 404;
      throw error;
    }

    if (message.sender.toString() !== req.user.id) {
      const error = new Error('Não autorizado');
      error.statusCode = 403;
      throw error;
    }

    await Message.findByIdAndDelete(req.params.id);

    const wss = getWebSocketServer();

    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ message: 'Mensagem deletada', chatRoom: chatRoom, recipient: recipient}));
      }
    });

    res.json({ message: 'Mensagem excluída com sucesso' });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getMessagesByChatRoom = async (req, res, next) => {
  try {
    const messages = await Message.find({ chatRoom: req.params.chatRoomId, isPrivate: false })
      .populate('sender', 'username')
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getPrivateMessages = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const otherUserId = req.params.otherUserId;
    const messages = await Message.find({
      isPrivate: true,
      $or: [
        { sender: userId, recipient: otherUserId },
        { sender: otherUserId, recipient: userId }
      ]
    })
    .populate('sender', 'username')
    .populate('recipient', 'username')
    .sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getConversationsList = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Buscar todas as mensagens privadas do usuário
    const privateMessages = await Message.find({
      isPrivate: true,
      $or: [{ sender: userId }, { recipient: userId }]
    })
    .sort({ createdAt: -1 })
    .populate('sender', 'username')
    .populate('recipient', 'username');

    // Buscar todas as mensagens de chatRoom que o usuário participa
    const chatRoomMessages = await Message.find({
      isPrivate: false,
      chatRoom: { $in: (await ChatRoom.find({ participants: userId })).map(room => room._id) }
    })
    .sort({ createdAt: -1 })
    .populate('chatRoom', 'name')
    .populate('sender', 'username');

    // Combinar e processar as mensagens
    const conversations = {};
    console.log(privateMessages)
    privateMessages.length > 0 && privateMessages.forEach(msg => {
      const otherUser = msg.sender._id.toString() === userId ? msg.recipient : msg.sender;
      const convoId = `private_${otherUser._id}`;
      if (!conversations[convoId] || conversations[convoId].createdAt < msg.createdAt) {
        conversations[convoId] = {
          id: convoId,
          type: 'private',
          name: otherUser.username,
          lastMessage: msg.content,
          lastMessageSender: msg.sender._id.toString() === userId ? 'You' : msg.sender.username,
          createdAt: msg.createdAt
        };
      }
    });

    console.log("pimba")

    chatRoomMessages.forEach(msg => {
      const convoId = `group_${msg.chatRoom._id}`;
      if (!conversations[convoId] || conversations[convoId].createdAt < msg.createdAt) {
        conversations[convoId] = {
          id: convoId,
          type: 'group',
          name: msg.chatRoom.name,
          lastMessage: msg.content,
          lastMessageSender: msg.sender._id.toString() === userId ? 'You' : msg.sender.username,
          createdAt: msg.createdAt
        };
      }
    });

    // Converter o objeto em array e ordenar por data da última mensagem
    const sortedConversations = Object.values(conversations).sort((a, b) => b.createdAt - a.createdAt);

    res.json(sortedConversations);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};