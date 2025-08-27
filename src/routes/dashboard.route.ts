import { Router } from 'express';
import { salesByMonth, topProducts, dashboardSummary, lowStockProducts, recentOrders } from '../controllers/dashboard.controller';

const router = Router();

router.get('/sales-by-month', salesByMonth);
router.get('/top-products', topProducts);
router.get('/summary', dashboardSummary);
router.get('/low-stock', lowStockProducts);
router.get('/recent-orders', recentOrders);

export default router;
