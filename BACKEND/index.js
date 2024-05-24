import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url'; // Import fileURLToPath function
import mongoose from 'mongoose';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { processLlm } from './Controllers/endpointController.js';
import userRoutes from './Routes/userRouter.js';
import chatRoutes from './Routes/chatRouter.js';
import User from './Models/Users.js';
import Message from './Models/Message.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Get directory path using fileURLToPath
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/chat', chatRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


// Socket.io Configuration
io.on('connection', socket => {
  console.log('New client connected');
  
  // Handle 'sendMessage' event
  socket.on('sendMessage', async (message) => {
    try {
      // Find recipient user and get their status
      const recipient = await User.findById(message.recipient);
      const recipientStatus = recipient ? recipient.status : null;
      
      // Find sender user
      const sender = await User.findById(message.sender);
      
      // Check recipient status and respond accordingly
      if (recipientStatus === 'BUSY') {
        // If recipient is busy, send message to LLM for processing
        const llmResponse = await processLlm({ body: { message: message.content }, user: message.sender });
        socket.emit('receiveMessage', { ...llmResponse, user: message.sender }); // Include user ID in the message
        
      } else {
        // If recipient is not busy, send message to all connected clients
        io.emit('receiveMessage', message);

        // Save the message to MongoDB with associated user
        await Message.create({ user: sender._id, message: message.content });
      }
    } catch (error) {
      // Log and handle errors
      console.error('Error handling sendMessage event:', error);
      socket.emit('errorMessage', 'An error occurred while sending the message');
    }
  });

  // Handle client disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});