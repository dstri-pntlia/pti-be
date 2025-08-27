import { Router } from 'express';
import { getCustomers, createCustomer, editCustomer, removeCustomer } from '../controllers/customer.controller';

const router = Router();
router.get('/customers', getCustomers);
router.post('/customers', createCustomer);
router.put('/customers/:customerId', editCustomer);
router.delete('/customers/:customerId', removeCustomer);

export default router;