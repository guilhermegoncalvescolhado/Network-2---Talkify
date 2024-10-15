const socketIo = require('socket.io');
const Message = require('../models/Message');
const User = require('../models/User');
const ChatRoom = require('../models/ChatRoom');

const configureSocket = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"]
    }
  });

  io.on('connection', (socket) => {
    console.log('Novo cliente conectado: ', socket.id);

    socket.on('requestJoinRoom', (data) => {
      const { chatRoomId, userId } = data;
      
      io.to(chatRoomId).emit('notifyCreator', {
        message: `Novo pedido de entrada na sala ${chatRoomId} do usuário ${userId}`,
        userId,
        chatRoomId
      });
    });

    socket.on('responseJoinRequest', (data) => {
      const { chatRoomId, userId, approved } = data;

      if (approved) {
        io.to(userId).emit('joinApproved', {
          message: `Você foi aprovado para entrar na sala ${chatRoomId}`,
          chatRoomId
        });

        socket.join(chatRoomId);
      } else {
        io.to(userId).emit('joinRejected', {
          message: `Seu pedido para entrar na sala ${chatRoomId} foi rejeitado`,
          chatRoomId
        });
      }
    });

    socket.on('joinRoom', (chatRoomId) => {
      socket.join(chatRoomId);
      console.log(`Usuário entrou na sala: ${chatRoomId}`);
    });

    socket.on('sendMessage', async (data) => {
      try {
        const { chatRoomId, content, sender, isPrivate, recipient } = data;

        const newMessage = new Message({
          sender,
          content,
          isPrivate
        });

        if (isPrivate) {
          newMessage.recipient = recipient;
          await newMessage.save();
          
          io.to(recipient).emit('receivePrivateMessage', {
            message: newMessage,
            sender: await User.findById(sender).select('username')
          });
        } else {
          newMessage.chatRoom = chatRoomId;
          await newMessage.save();
          
          io.to(chatRoomId).emit('receiveMessage', {
            message: newMessage,
            sender: await User.findById(sender).select('username')
          });
        }
      } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
        socket.emit('messageError', { error: 'Erro ao enviar mensagem' });
      }
    });

    socket.on('updateMessage', async (data) => {
      try {
        const { messageId, content, userId } = data;
        const message = await Message.findById(messageId);

        if (!message) {
          socket.emit('messageError', { error: 'Mensagem não encontrada' });
          return;
        }

        if (message.sender.toString() !== userId) {
          socket.emit('messageError', { error: 'Não autorizado' });
          return;
        }

        message.content = content;
        message.updatedAt = Date.now();
        await message.save();

        if (message.isPrivate) {
          io.to(message.recipient.toString()).emit('messageUpdated', { message });
        } else {
          io.to(message.chatRoom.toString()).emit('messageUpdated', { message });
        }
      } catch (error) {
        console.error('Erro ao atualizar mensagem:', error);
        socket.emit('messageError', { error: 'Erro ao atualizar mensagem' });
      }
    });

    socket.on('deleteMessage', async (data) => {
      try {
        const { messageId, userId } = data;
        const message = await Message.findById(messageId);

        if (!message) {
          socket.emit('messageError', { error: 'Mensagem não encontrada' });
          return;
        }

        if (message.sender.toString() !== userId) {
          socket.emit('messageError', { error: 'Não autorizado' });
          return;
        }

        await Message.findByIdAndDelete(messageId);

        if (message.isPrivate) {
          io.to(message.recipient.toString()).emit('messageDeleted', { messageId });
        } else {
          io.to(message.chatRoom.toString()).emit('messageDeleted', { messageId });
        }
      } catch (error) {
        console.error('Erro ao excluir mensagem:', error);
        socket.emit('messageError', { error: 'Erro ao excluir mensagem' });
      }
    });

    socket.on('getMessagesByChatRoom', async (chatRoomId) => {
      try {
        const messages = await Message.find({ chatRoom: chatRoomId, isPrivate: false })
          .populate('sender', 'username')
          .sort({ createdAt: 1 });

        socket.emit('chatRoomMessages', { messages });
      } catch (error) {
        console.error('Erro ao buscar mensagens da sala:', error);
        socket.emit('messageError', { error: 'Erro ao buscar mensagens da sala' });
      }
    });

    socket.on('getPrivateMessages', async (data) => {
      try {
        const { userId, otherUserId } = data;
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

        socket.emit('privateMessages', { messages });
      } catch (error) {
        console.error('Erro ao buscar mensagens privadas:', error);
        socket.emit('messageError', { error: 'Erro ao buscar mensagens privadas' });
      }
    });

    socket.on('disconnect', () => {
      console.log('Cliente desconectado: ', socket.id);
    });
  });

  return io;
};

module.exports = configureSocket;