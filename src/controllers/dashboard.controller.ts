import { Request, Response } from 'express';
import { getSalesByMonth, getTopProducts, getDashboardSummary, getRecentOrders, getLowStockProducts } from '../models/dashboard.model';

export const salesByMonth = async (req: Request, res: Response) => {
  try {
    const { year } = req.query;
    if (!year) {
      return res.status(400).json({ status: 1, message: 'Year is required', data: null });
    }

    const data = await getSalesByMonth(Number(year));

    return res.status(200).json({
      status: 0,
      message: 'Success',
      data
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 1, message: 'Internal Server Error', data: null });
  }
};


export const topProducts = async (req: Request, res: Response) => {
  try {
    const limit = req.query.limit ? Number(req.query.limit) : 5;
    const data = await getTopProducts(limit);

    return res.status(200).json({
      status: 0,
      message: 'Success',
      data
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 1, message: 'Internal Server Error', data: null });
  }
};

export const dashboardSummary = async (req: Request, res: Response) => {
  try {
    const threshold = req.query.threshold ? Number(req.query.threshold) : 10;
    const data = await getDashboardSummary(threshold);

    return res.status(200).json({
      status: 0,
      message: 'Success',
      data
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 1, message: 'Internal Server Error', data: null });
  }
};

// Low Stock Products
export const lowStockProducts = async (req: Request, res: Response) => {
  try {
    const limit = req.query.limit ? Number(req.query.limit) : 5;
    const data = await getLowStockProducts(limit);

    return res.status(200).json({
      status: 0,
      message: 'Success',
      data
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 1, message: 'Internal Server Error', data: null });
  }
};

// Recent Orders
export const recentOrders = async (req: Request, res: Response) => {
  try {
    const limit = req.query.limit ? Number(req.query.limit) : 5;
    const data = await getRecentOrders(limit);

    return res.status(200).json({
      status: 0,
      message: 'Success',
      data
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 1, message: 'Internal Server Error', data: null });
  }
};