import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const PORT = process.env.PORT || 5000;

const MONGODB_URI = process.env.MONGODB_URI || '';

// Debug logging
console.log('Environment variables loaded:');
console.log('PORT:', PORT);
console.log('MONGODB_URI:', MONGODB_URI ? 'Set (length: ' + MONGODB_URI.length + ')' : 'Not set');

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  }); 