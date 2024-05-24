import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

// Function to generate a random secret key
function generateSecretKey() {
    const secretKeyBuffer = crypto.randomBytes(32);
    const secretKey = secretKeyBuffer.toString('hex');
    return secretKey;
}

// Generate JWT secret key if not provided in .env file
const jwtSecret = process.env.JWT_SECRET || generateSecretKey();

// JWT middleware for authentication
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) return res.sendStatus(401);

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

export { authenticateToken, jwtSecret };
