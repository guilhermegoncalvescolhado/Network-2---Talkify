const socketIo = require('socket.io');

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

    socket.on('sendMessage', (data) => {
      const { chatRoomId, message, sender } = data;

      io.to(chatRoomId).emit('receiveMessage', { message, sender });
    });

    socket.on('disconnect', () => {
      console.log('Cliente desconectado: ', socket.id);
    });
  });

  return io;
};

module.exports = configureSocket;
