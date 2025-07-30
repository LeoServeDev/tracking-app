import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import punchRoutes from './routes/punchRoutes';

dotenv.config();

const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:5173'
    ];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

// Root route
app.get('/', (req, res) => {
  console.log('Root route hit'); 
  res.json({ message: 'Time Tracking API is running!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/punch', punchRoutes);

export default app; 