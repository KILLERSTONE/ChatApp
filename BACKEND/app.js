import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import initializeChatSocket from "./Sockets/chatSocket.js";
import userRoutes from "./Routes/userRouter.js";
import chatRoutes from "./Routes/chatRouter.js";
import { jwtSecret } from './Middleware/jwtMiddleware.js';
import { Server } from 'socket.io'; // Correct import statement

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server); // Initialize socket server using Server class

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Get directory path using fileURLToPath
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Initialize chat socket
initializeChatSocket(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
