import { Router } from 'express';
import { editProfile } from '../controllers/userController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.patch('/profile', authenticate, editProfile);

export default router; 