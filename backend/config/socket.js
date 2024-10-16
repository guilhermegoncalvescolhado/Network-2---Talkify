const WebSocket = require('ws');

let wss;

const createWebSocketServer = (server) => {
  if (!wss) {
    wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
      console.log('Novo cliente conectado');

      ws.on('message', (message) => {
        console.log(`Recebido: ${message}`);
      });

      ws.on('close', () => {
        console.log('Cliente desconectado');
      });
    });
  }

  return wss;
};

const getWebSocketServer = () => {
  return wss; 
};

module.exports = { createWebSocketServer, getWebSocketServer };