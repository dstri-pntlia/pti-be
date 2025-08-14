import { Request, Response } from 'express';
import { getAllProducts, insertProduct, updateProduct, deleteProduct } from './../models/product.model';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await getAllProducts();
    if (!products || products.length === 0) {
      return res.status(404).json({ status: 1, message: 'No products found', data: [] });
    }
    return res.status(200).json({ status: 0, message: 'Success', data: products });
  } catch (error) {
    return res.status(500).json({ status: 1, message: 'Internal Server Error', data: null });
  }
}

export const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const newProduct = await insertProduct(productData);

    return res.status(201).json({
      status: 0,
      message: 'Product created successfully',
      data: newProduct
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

export const editProduct = async (req: Request, res: Response) => {
  try {
    const { productCode } = req.params;
    const productData = req.body;
    const updatedProduct = await updateProduct(productCode, productData);

    if (!updatedProduct) {
      return res.status(404).json({ status: 1, message: 'Product not found', data: null });
    }

    return res.status(200).json({
      status: 0,
      message: 'Product updated successfully',
      data: updatedProduct
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

// DELETE product
export const removeProduct = async (req: Request, res: Response) => {
  try {
    const { productCode } = req.params;
    const result = await deleteProduct(productCode);

    if (result.affectedRows === 0) {
      return res.status(404).json({ status: 1, message: 'Product not found', data: null });
    }

    return res.status(200).json({
      status: 0,
      message: 'Product deleted successfully',
      data: null
    });
  } catch (error) {
    console.error(error);

      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
      return res.status(400).json({
        status: 1,
        message: 'Produk tidak dapat dihapus karena masih memiliki order terkait.',
        data: null
      });
    }

    return res.status(500).json({
      status: 1,
      message: 'Internal Server Error',
      data: null
    });
  }
};