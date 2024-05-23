import { registerUser, loginUser } from '../Services/userServices.js'; // Assuming Services folder one level up
import jwt from 'jsonwebtoken';
import crypto from 'crypto'

function generateSecretKey() {
  // Generate a random buffer of 32 bytes (256 bits)
  const secretKeyBuffer = crypto.randomBytes(32);

  // Convert the buffer to a hexadecimal string
  const secretKey = secretKeyBuffer.toString('hex');

  return secretKey;
}

const jwtSecret = generateSecretKey(); 

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.sendStatus(401);

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user; // Set req.user to the decoded user object
    next();
  });
}


async function register(req, res) {
  const { username, password } = req.body;
  try {
    const user = await registerUser(username, password);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(400).json({ message: error.message });
  }
}

async function login(req, res) {
  const { username, password } = req.body;
  try {
    const user = await loginUser(username, password);
    const payload = { userId: user.userId };
    const token = jwt.sign(payload, jwtSecret, { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    console.error("Error logging in user:", error.message);
    res.status(401).json({ message: error.message });
  }
}

export { register, login, authenticateToken };
