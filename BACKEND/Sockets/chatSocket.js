import { Server } from 'socket.io';
import { authenticateToken } from '../Middleware/jwtMiddleware.js';
import { saveMessage } from '../Services/chatServices.js';

export default function initializeChatSocket(server) {
  const io = new Server(server); // Use the Server class directly to initialize the socket server

  io.use((socket, next) => {
    // Authentication middleware for socket connections
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error('Authentication error'));
    
    authenticateToken({ headers: { authorization: `Bearer ${token}` } }, null, (error) => {
      if (error) {
        return next(new Error('Authentication error'));
      }
      next();
    });
  });

  io.on('connection', (socket) => {
    console.log('A user connected via socket');

    socket.on('message', async (data) => {
      console.log('Received message via socket:', data);

      // Save the message to the database
      try {
        await saveMessage(data.user, data.message, data.processedMessage);
        console.log('Message saved to the database');
      } catch (error) {
        console.error('Error saving message:', error);
      }

      // Broadcast the message to all connected clients
      io.emit('message', data);
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected via socket');
    });
  });
}
