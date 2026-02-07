import express from 'express';
import { uploadMiddleware, uploadImage } from '../controllers/uploadController.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticateAdmin, uploadMiddleware, uploadImage);

export default router;



