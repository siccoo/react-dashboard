import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'wss://your-websocket-url';
let socket: Socket;

export const connectSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL);
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};

export const subscribeToData = (callback: (data: any) => void) => {
  if (socket) {
    socket.on('data', callback);
  }
};