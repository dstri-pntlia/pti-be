import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './src/routes/users.route';
import productRoutes from './src/routes/product.route';
import cors from "cors";

dotenv.config();
const app = express();


app.use(cors());

app.use(express.json());
app.use('/', userRoutes);
app.use('/', productRoutes)

export default app;
