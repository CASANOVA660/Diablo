import express from 'express';
import {
  createOrder,
  getOrder,
  getAllOrders,
  updateOrderStatus,
} from '../controllers/orderController.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/:id', getOrder);
router.get('/', authenticateAdmin, getAllOrders);
router.put('/:id/status', authenticateAdmin, updateOrderStatus);

export default router;



