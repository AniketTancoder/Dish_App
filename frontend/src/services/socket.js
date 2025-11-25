import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';

class SocketService {
  constructor() {
    this.socket = null;
  }

  connect() {
    this.socket = io(SOCKET_URL);
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  onDishUpdate(callback) {
    if (this.socket) {
      this.socket.on('dishUpdated', callback);
    }
  }

  offDishUpdate(callback) {
    if (this.socket) {
      this.socket.off('dishUpdated', callback);
    }
  }
}

export const socketService = new SocketService();