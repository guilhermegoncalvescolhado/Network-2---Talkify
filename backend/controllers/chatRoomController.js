const ChatRoom = require('../models/ChatRoom'); 
const Request = require('../models/Request');

exports.createChatRoom = async (req, res) => {
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

    res.status(201).json(savedChatRoom);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar chat room', error });
  }
};

exports.getAllChatRooms = async (req, res) => {
  try {
    const chatRooms = await ChatRoom.find().populate('participants', 'username email');

    res.status(200).json(chatRooms);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar todas as salas', error });
  }
};

exports.getChatRoom = async (req, res) => {
  try {
    const chatRoom = await ChatRoom.findById(req.params.id).populate('participants', 'username email');

    if (!chatRoom) {
      return res.status(404).json({ message: 'Chat room não encontrado' });
    }

    res.status(200).json(chatRoom);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar chat room', error });
  }
};

exports.updateChatRoom = async (req, res) => {
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

    res.status(200).json(updatedChatRoom);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar chat room', error });
  }
};

exports.deleteChatRoom = async (req, res) => {
  try {
    const chatRoom = await ChatRoom.findById(req.params.id);

    if (!chatRoom) {
      return res.status(404).json({ message: 'Chat room não encontrado' });
    }

    if (chatRoom.creator.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Você não tem permissão para deletar este chat room' });
    }

    await ChatRoom.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Chat room deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar chat room', error });
  }
};

exports.getChatRoomsForUser = async (req, res) => {
  try {
    const chatRooms = await ChatRoom.find({ participants: req.user.id }).populate('participants', 'username email');

    res.status(200).json(chatRooms);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar chat rooms do usuário', error });
  }
};

exports.joinChatRoom = async (req, res) => {
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
  
      // req.io.to(chatRoom.creator).emit('notifyCreator', {
      //   userId: req.user.id,
      //   chatRoomId: chatRoom._id,
      //   message: `Usuário ${req.user.username} quer entrar na sala`
      // });
  
      res.status(201).json({ message: 'Pedido de entrada enviado com sucesso', request: newRequest });  
    } catch (error) {
      res.status(500).json({ message: 'Erro ao adicionar usuário ao chat room', error });
    }
};

exports.removeUserFromChatRoom = async (req, res) => {
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

    res.status(200).json(updatedChatRoom);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao remover usuário do chat room', error });
  }
};
