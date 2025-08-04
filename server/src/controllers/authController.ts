import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'tracker-app';

export const register = async (req: Request, res: Response) => {
  console.log('Register endpoint hit with body:', req.body);
  try {
    const { firstName, lastName, email, password, role } = req.body;
    console.log('Extracted data:', { firstName, lastName, email, role });
    
    if (!firstName || !lastName || !email || !password) {
      console.log('Missing required fields');
      return res.status(400).json({ message: 'All required fields must be filled.' });
    }
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists with email:', email);
      return res.status(409).json({ message: 'Email already in use.' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: role || 'worker',
    });
    
    console.log('User created successfully:', user._id);
    return res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    console.error('Registration error:', err);
    return res.status(500).json({ message: 'Server error', error: err });
  }
};

export const login = async (req: Request, res: Response) => {
  console.log('Login endpoint hit with body:', req.body);
  try {
    const { email, password } = req.body;
    console.log('Login attempt for email:', email);
    
    if (!email || !password) {
      console.log('Missing email or password');
      return res.status(400).json({ message: 'Email and password are required.' });
    }
    
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found for email:', email);
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password mismatch for user:', email);
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    console.log('Login successful for user:', email);
    return res.status(200).json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Server error', error: err });
  }
};

export const logout = (req: Request, res: Response) => {
  // For JWT, logout is handled client-side by deleting the token.
  // This endpoint exists for frontend compatibility or future blacklisting.
  return res.status(200).json({ message: 'Logged out successfully.' });
}; 