import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { serverConfig } from './config.js';

const app = express();
const { port, jwt: jwtConfig } = serverConfig;

// Middleware
app.use(cors());
app.use(express.json());

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      error: {
        code: 'AUTH_TOKEN_MISSING',
        message: 'Authentication token is required'
      }
    });
  }

  jwt.verify(token, jwtConfig.secret, (err, user) => {
    if (err) {
      return res.status(401).json({
        error: {
          code: 'AUTH_TOKEN_INVALID',
          message: 'Invalid or expired token'
        }
      });
    }
    req.user = user;
    next();
  });
};

// Auth routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  // Mock authentication
  if (email === 'admin@example.com' && password === 'password') {
    const token = jwt.sign(
      { id: '1', role: 'admin' }, 
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    );
    res.json({
      token,
      user: {
        id: '1',
        email: 'admin@example.com',
        name: 'Admin User',
        role: 'admin'
      }
    });
  } else if (email === 'user@example.com' && password === 'password') {
    const token = jwt.sign(
      { id: '2', role: 'customer' },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    );
    res.json({
      token,
      user: {
        id: '2',
        email: 'user@example.com',
        name: 'Test User',
        role: 'customer'
      }
    });
  } else {
    res.status(401).json({
      error: {
        code: 'AUTH_INVALID_CREDENTIALS',
        message: 'Invalid email or password'
      }
    });
  }
});

// Video routes
app.get('/api/videos/:id/status', authenticateToken, (req, res) => {
  // Mock video status
  res.json({
    id: req.params.id,
    status: 'processing',
    progress: 45,
    translations: [
      {
        language: 'es',
        status: 'processing',
        progress: 30
      },
      {
        language: 'fr',
        status: 'queued',
        progress: 0
      }
    ]
  });
});

// Start server
app.listen(port, () => {
  console.log(`API server running on port ${port}`);
});