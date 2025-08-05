import { Request, Response } from 'express';
import User from '../models/User';

export const getProfile = async (req: Request & { user?: { userId?: string; _id?: string } }, res: Response) => {
  try {
    const userId = req.user?.userId || req.user?._id;
    console.log('Fetching profile for user:', userId);
    
    const user = await User.findById(userId).select('-password');
    if (!user) {
      console.log('User not found:', userId);
      return res.status(404).json({ message: 'User not found.' });
    }
    
    console.log('Profile fetched successfully for:', user.email);
    return res.status(200).json({ 
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture,
        phone: user.phone,
        department: user.department,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
  } catch (err) {
    console.error('Error fetching profile:', err);
    return res.status(500).json({ message: 'Server error', error: err });
  }
};

export const editProfile = async (req: Request & { user?: { userId?: string; _id?: string } }, res: Response) => {
  try {
    const userId = req.user?.userId || req.user?._id;
    const { firstName, lastName, phone, department, profilePicture, isActive } = req.body;
    
    console.log('Updating profile for user:', userId, 'with data:', req.body);
    
    // Validate input
    if (firstName && firstName.trim().length < 2) {
      return res.status(400).json({ message: 'First name must be at least 2 characters long.' });
    }
    
    if (lastName && lastName.trim().length < 2) {
      return res.status(400).json({ message: 'Last name must be at least 2 characters long.' });
    }
    
    const updateFields: any = {};
    if (firstName !== undefined) updateFields.firstName = firstName.trim();
    if (lastName !== undefined) updateFields.lastName = lastName.trim();
    if (phone !== undefined) updateFields.phone = phone;
    if (department !== undefined) updateFields.department = department;
    if (profilePicture !== undefined) updateFields.profilePicture = profilePicture;
    if (isActive !== undefined) updateFields.isActive = isActive;
    
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!updatedUser) {
      console.log('User not found for update:', userId);
      return res.status(404).json({ message: 'User not found.' });
    }
    
    console.log('Profile updated successfully for:', updatedUser.email);
    return res.status(200).json({ 
      user: {
        id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        role: updatedUser.role,
        profilePicture: updatedUser.profilePicture,
        phone: updatedUser.phone,
        department: updatedUser.department,
        isActive: updatedUser.isActive,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt
      }
    });
  } catch (err) {
    console.error('Error updating profile:', err);
    return res.status(500).json({ message: 'Server error', error: err });
  }
}; 