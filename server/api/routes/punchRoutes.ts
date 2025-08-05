import { Router } from 'express';
import { 
  punchInOut, 
  getAllPunches, 
  getTodayPunches, 
  getWeekPunches, 
  deletePunch, 
  getStats 
} from '../controllers/punchController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.post('/', authenticate, punchInOut);
router.get('/', authenticate, getAllPunches);
router.get('/today', authenticate, getTodayPunches);
router.get('/week', authenticate, getWeekPunches);
router.delete('/:id', authenticate, deletePunch);
router.get('/stats', authenticate, getStats);

export default router; 