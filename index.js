import express from 'express';
import mongoose from 'mongoose';
import router from './server.js';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path'; // Import the path module separately
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = new Server(server);

// Middleware
app.use(express.json());

// Routes
app.use('/api', router);

// Database connection
mongoose.connect('mongodb://localhost:27017/chatAppDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Serve static files from the 'node_modules' directory
app.use('/socket.io', express.static(path.join(__dirname, 'node_modules/socket.io/client-dist')));

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
