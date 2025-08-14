import { Router } from 'express';
import { getProducts, createProduct, editProduct, removeProduct } from '../controllers/products.controller';

const router = Router();
router.get('/products', getProducts);
router.post('/products', createProduct);
router.put('/:productCode', editProduct);
router.delete('/:productCode', removeProduct)

export default router;
