import { registerUser, loginUser } from '../Services/userServices.js';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../Middleware/jwtMiddleware.js';

async function register(req, res) {
  const { username, password } = req.body;
  try {
    console.log(username,password);
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
    console.log(username,password);
    const user = await loginUser(username, password);
    const payload = { userId: user.userId };
    const token = jwt.sign(payload, jwtSecret, { expiresIn: "1h" });
    res.json({ token });

    // Emit login event upon successful authentication
  } catch (error) {
    console.error("Error logging in user:", error.message);
    res.status(401).json({ message: error.message });
  }
}

export { register, login };
