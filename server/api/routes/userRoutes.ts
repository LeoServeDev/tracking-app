import { Router } from 'express';
import { getProfile, editProfile } from '../controllers/userController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, editProfile);

export default router; 