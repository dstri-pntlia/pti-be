import { query } from '../config/db';

// GET all products
export const getAllProducts = async () => {
  const rows = await query('SELECT * FROM products');
  return Array.isArray(rows) ? rows : [];
};

// GET single product by productCode
export const getProductByCode = async (productCode: string) => {
  const rows = await query('SELECT * FROM products WHERE productCode = ?', [productCode]);
  return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
};

// CREATE new product
export const insertProduct = async (productData: any) => {
  const {
    productCode,
    productName,
    productLine,
    productScale,
    productVendor,
    productDescription,
    quantityInStock,
    buyPrice,
    MSRP
  } = productData;

  await query(
    `INSERT INTO products (
      productCode, productName, productLine, productScale, productVendor,
      productDescription, quantityInStock, buyPrice, MSRP
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      productCode, productName, productLine, productScale, productVendor,
      productDescription, quantityInStock, buyPrice, MSRP
    ]
  );

  // Fetch and return the inserted row
  const rows = await query<any[]>(
    `SELECT * FROM products WHERE productCode = ?`,
    [productCode]
  );

  return rows[0];
};

export const updateProduct = async (productCode: string, productData: any) => {
  const {
    productName,
    productLine,
    productScale,
    productVendor,
    productDescription,
    quantityInStock,
    buyPrice,
    MSRP
  } = productData;

  await query(
    `UPDATE products
     SET productName = ?, productLine = ?, productScale = ?, productVendor = ?,
         productDescription = ?, quantityInStock = ?, buyPrice = ?, MSRP = ?
     WHERE productCode = ?`,
    [
      productName, productLine, productScale, productVendor,
      productDescription, quantityInStock, buyPrice, MSRP, productCode
    ]
  );

  // Return the updated row
  const rows = await query<any[]>(
    `SELECT * FROM products WHERE productCode = ?`,
    [productCode]
  );

  return rows[0];
};

// DELETE product by productCode
export const deleteProduct = async (productCode: string) => {
  const result = await query(
    `DELETE FROM products WHERE productCode = ?`,
    [productCode]
  );
  return result; // contains affectedRows in MySQL
};