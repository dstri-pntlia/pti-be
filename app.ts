import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './src/routes/users.route';
import productRoutes from './src/routes/product.route';
import orderRoutes from './src/routes/order.route';
import customerRoutes from './src/routes/customer.route';
import dashBoardRoutes from './src/routes/dashboard.route';
import cors from "cors";

dotenv.config();
const app = express();


app.use(cors());

app.use(express.json());
app.use('/', orderRoutes)
app.use('/', userRoutes);
app.use('/', productRoutes)
app.use('/', customerRoutes);
app.use('/', dashBoardRoutes);

export default app;
