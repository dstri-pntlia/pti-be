import { Request, Response } from 'express';
import { getAllOrders, insertOrder,  updateOrder, deleteOrder } from './../models/order.model';

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await getAllOrders();
    if (!orders || orders.length === 0) {
      return res.status(404).json({ status: 1, message: 'No orders found', data: [] });
    }
    return res.status(200).json({ status: 0, message: 'Success', data: orders });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 1, message: 'Internal Server Error', data: null });
  }
}

export const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const newOrder = await insertOrder(orderData);

    return res.status(201).json({
      status: 0,
      message: 'Order created successfully',
      data: newOrder
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 1,
      message: 'Internal Server Error',
      data: null
    });
  }
};

export const editOrder = async (req: Request, res: Response) => {
  try {
    const { orderNumber } = req.params;
    const orderData = req.body;
    const updatedOrder = await updateOrder(orderNumber, orderData);

    if (!updatedOrder) {
      return res.status(404).json({ status: 1, message: 'Order not found', data: null });
    }

    return res.status(200).json({
      status: 0,
      message: 'Order updated successfully',
      data: updatedOrder
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 1,
      message: 'Internal Server Error',
      data: null
    });
  }
};

export const removeOrder = async (req: Request, res: Response) => {
  try {
    const { orderNumber } = req.params;

    // Assuming you have a function to delete an order
    const deletedOrder = await deleteOrder(orderNumber);
    if (!deletedOrder) {
      return res.status(404).json({ status: 1, message: 'Order not found', data: null });
    }

    return res.status(200).json({
      status: 0,
      message: 'Order deleted successfully',
      data: deletedOrder
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 1,
      message: 'Internal Server Error',
      data: null
    });
  }
}