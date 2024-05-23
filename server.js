import express from "express";
import {
  register,
  login,
  authenticateToken,
} from "./Controllers/authController.js";
import { processLlm } from "./Controllers/endpointController.js";
import path from 'path'; // Import the path module separately
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/message",processLlm);

router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, './Templates/Register/register.html'));
});

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, './Templates/Login/login.html'));
});

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './Templates/Chat/index.html'));
});

export default router;
