import express from 'express';
import { login, register, getProfile } from '../controllers/adminController.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register); // Remove in production or protect it
router.get('/profile', authenticateAdmin, getProfile);

export default router;



