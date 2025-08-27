import { Request, Response } from 'express';
import { getAllCustomers, insertCustomer, updateCustomer, deleteCustomer } from './../models/customer.model';

export const getCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await getAllCustomers();
    if (!customers || customers.length === 0) {
      return res.status(404).json({ status: 1, message: 'No customers found', data: [] });
    }
    return res.status(200).json({ status: 0, message: 'Success', data: customers });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 1, message: 'Internal Server Error', data: null });
  }
};

export const createCustomer = async (req: Request, res: Response) => {
  try {
    const customerData = req.body;
    const newCustomer = await insertCustomer(customerData);

    return res.status(201).json({
      status: 0,
      message: 'Customer created successfully',
      data: newCustomer
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

export const editCustomer = async (req: Request, res: Response) => {
  try {
    const { customerId } = req.params;
    const customerData = req.body;
    const updatedCustomer = await updateCustomer(customerId, customerData);

    if (!updatedCustomer) {
      return res.status(404).json({ status: 1, message: 'Customer not found', data: null });
    }

    return res.status(200).json({
      status: 0,
      message: 'Customer updated successfully',
      data: updatedCustomer
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

export const removeCustomer = async (req: Request, res: Response) => {
  try {
    const { customerId } = req.params;
    const deletedCustomer = await deleteCustomer(customerId);

    if (!deletedCustomer) {
      return res.status(404).json({ status: 1, message: 'Customer not found', data: null });
    }

    return res.status(200).json({
      status: 0,
      message: 'Customer deleted successfully',
      data: deletedCustomer
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