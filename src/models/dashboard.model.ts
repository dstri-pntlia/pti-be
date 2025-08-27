import { query } from '../config/db';

export const getSalesByMonth = async (year: number) => {
  const rows = await query<any[]>(
    `SELECT
       MONTH(o.orderDate) AS month,
       SUM(od.quantityOrdered * od.priceEach) AS totalSales
     FROM orders o
     JOIN orderdetails od ON o.orderNumber = od.orderNumber
     WHERE YEAR(o.orderDate) = ?
     GROUP BY MONTH(o.orderDate)
     ORDER BY MONTH(o.orderDate)`,
    [year]
  );

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return months.map((m, i) => {
    const row = rows.find(r => r.month === i + 1);
    return { month: m, sales: row ? parseFloat(row.totalSales) : 0 };
  });
};

export const getTopProducts = async (limit: number = 5) => {
  const rows = await query<any[]>(
    `SELECT
       p.productName AS name,
       SUM(od.quantityOrdered) AS sales
     FROM orderdetails od
     JOIN products p ON od.productCode = p.productCode
     GROUP BY p.productName
     ORDER BY sales DESC
     LIMIT ?`,
    [limit]
  );

  return rows.map(r => ({
    name: r.name,
    sales: parseInt(r.sales)
  }));
};

export const getDashboardSummary = async (threshold: number = 10) => {
  const [salesRow] = await query<any[]>(
    `SELECT SUM(od.quantityOrdered * od.priceEach) AS totalSales
     FROM orders o
     JOIN orderdetails od ON o.orderNumber = od.orderNumber
     WHERE o.status = 'Shipped'`
  );

  const [ordersRow] = await query<any[]>(`SELECT COUNT(*) AS totalOrders FROM orders`);
  const [customersRow] = await query<any[]>(`SELECT COUNT(*) AS totalCustomers FROM customers`);
  const [lowStockRow] = await query<any[]>(
    `SELECT COUNT(*) AS lowStock FROM products WHERE quantityInStock < ?`,
    [threshold]
  );

  return {
    totalSales: salesRow?.totalSales ? parseFloat(salesRow.totalSales) : 0,
    totalOrders: ordersRow?.totalOrders || 0,
    totalCustomers: customersRow?.totalCustomers || 0,
    lowStock: lowStockRow?.lowStock || 0
  };
};

export const getLowStockProducts = async (limit: number = 5) => {
  const rows = await query<any[]>(
    `SELECT productName, quantityInStock AS stock
     FROM products
     WHERE quantityInStock < 1000
     ORDER BY quantityInStock ASC
     LIMIT ?`,
    [limit]
  );

  return rows.map(r => ({
    productName: r.productName,
    stock: r.stock
  }));
};

// 6. Recent Orders
export const getRecentOrders = async (limit: number = 5) => {
  const rows = await query<any[]>(
    `SELECT
       o.orderNumber AS orderId,
       c.customerName AS customer,
       o.status,
       SUM(od.quantityOrdered * od.priceEach) AS amount,
       o.orderDate AS date
     FROM orders o
     JOIN customers c ON o.customerNumber = c.customerNumber
     JOIN orderdetails od ON o.orderNumber = od.orderNumber
     GROUP BY o.orderNumber, c.customerName, o.status, o.orderDate
     ORDER BY o.orderDate DESC
     LIMIT ?`,
    [limit]
  );

  return rows.map(r => ({
    orderId: r.orderId,
    customer: r.customer,
    status: r.status,
    amount: parseFloat(r.amount),
    date: r.date
  }));
};