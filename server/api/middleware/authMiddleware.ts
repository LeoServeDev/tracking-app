import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'tracker-app';

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    
    // Check if user exists in database
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    
    // Check if user is active
    if (user.isActive === false) {
      return res.status(401).json({ message: 'User account is deactivated' });
    }
    
    // Attach user data to request
    req.user = {
      userId: user._id,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    };
    
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}; 