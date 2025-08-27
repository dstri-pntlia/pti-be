import { query } from '../config/db';

export const getAllOrders = async () => {
    const rows: any = await query('SELECT * FROM orders');
    return Array.isArray(rows) ? rows : [];
}

export const getOrderById = async (orderNumber: string) => {
    const rows = await query('SELECT * FROM orders WHERE orderNumber = ?', [orderNumber]);
    return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
}

export const insertOrder = async (orderData: any) => {
    const {
        orderNumber,
        orderDate,
        requiredDate,
        shippedDate,
        status,
        comments,
        customerNumber
    } = orderData;

    await query(
        `INSERT INTO orders (
            orderNumber, orderDate, requiredDate, shippedDate, status, comments, customerNumber
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [orderNumber, orderDate, requiredDate, shippedDate, status, comments, customerNumber]
    );

    // Fetch and return the inserted row
    const rows = await query<any[]>(
        `SELECT * FROM orders WHERE orderNumber = ?`,
        [orderNumber]
    );

    return rows[0];
}

export const updateOrder = async (orderNumber: string, orderData: any) => {
    const {
        orderDate,
        requiredDate,
        shippedDate,
        status,
        comments,
        customerNumber
    } = orderData;

    await query(
        `UPDATE orders SET
            orderDate = ?, requiredDate = ?, shippedDate = ?, status = ?,
            comments = ?, customerNumber = ?
         WHERE orderNumber = ?`,
        [orderDate, requiredDate, shippedDate, status, comments, customerNumber, orderNumber]
    );

    // Fetch and return the updated row
    const rows = await query<any[]>(
        `SELECT * FROM orders WHERE orderNumber = ?`,
        [orderNumber]
    );

    return rows[0];
}

export const deleteOrder = async (orderNumber: string) => {
    const result = await query('DELETE FROM orders WHERE orderNumber = ?', [orderNumber]);
    return result.affectedRows > 0;
}