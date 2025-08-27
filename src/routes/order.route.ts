import { Router } from 'express';
import { getOrders, createOrder, editOrder, removeOrder } from '../controllers/order.controller';

const router = Router();
router.get('/orders', getOrders);
router.post('/orders', createOrder);
router.put('/orders/:orderNumber', editOrder);
router.delete('/orders/:orderNumber', removeOrder);

export default router;