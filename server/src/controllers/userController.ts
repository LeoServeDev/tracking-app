import { Request, Response } from 'express';
import User from '../models/User';

export const editProfile = async (req: Request & { user?: { userId?: string; _id?: string } }, res: Response) => {
  try {
    const userId = req.user?.userId || req.user?._id;
    const { firstName, lastName, phone, department, profilePicture, isActive } = req.body;
    const updateFields: any = {};
    if (firstName !== undefined) updateFields.firstName = firstName;
    if (lastName !== undefined) updateFields.lastName = lastName;
    if (phone !== undefined) updateFields.phone = phone;
    if (department !== undefined) updateFields.department = department;
    if (profilePicture !== undefined) updateFields.profilePicture = profilePicture;
    if (isActive !== undefined) updateFields.isActive = isActive;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true }
    ).select('-password');
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }
    return res.status(200).json({ user: updatedUser });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err });
  }
}; 