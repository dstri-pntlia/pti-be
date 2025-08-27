import { query } from '../config/db';

export const getAllCustomers = async () => {
    const rows: any = await query('SELECT * FROM customers');
    return Array.isArray(rows) ? rows : [];
}

export const getCustomerByNumber = async (customerNumber: string) => {
    const rows = await query('SELECT * FROM customers WHERE customerNumber = ?', [customerNumber]);
    return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
}

export const insertCustomer = async (customerData: any) => {
    const {
        customerNumber,
        customerName,
        contactLastName,
        contactFirstName,
        phone,
        addressLine1,
        addressLine2,
        city,
        state,
        postalCode,
        country
    } = customerData;

    await query(
        `INSERT INTO customers (
            customerNumber, customerName, contactLastName, contactFirstName, phone,
            addressLine1, addressLine2, city, state, postalCode, country
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            customerNumber, customerName, contactLastName, contactFirstName, phone,
            addressLine1, addressLine2, city, state, postalCode, country
        ]
    );

    // Fetch and return the inserted row
    const rows = await query<any[]>(
        `SELECT * FROM customers WHERE customerNumber = ?`,
        [customerNumber]
    );

    return rows[0];
}

export const updateCustomer = async (customerNumber: string, customerData: any) => {
    const {
        customerName,
        contactLastName,
        contactFirstName,
        phone,
        addressLine1,
        addressLine2,
        city,
        state,
        postalCode,
        country
    } = customerData;

    await query(
        `UPDATE customers SET
            customerName = ?, contactLastName = ?, contactFirstName = ?, phone = ?,
            addressLine1 = ?, addressLine2 = ?, city = ?, state = ?,
            postalCode = ?, country = ?
         WHERE customerNumber = ?`,
        [
            customerName, contactLastName, contactFirstName, phone,
            addressLine1, addressLine2, city, state, postalCode, country, customerNumber
        ]
    );

    // Fetch and return the updated row
    const rows = await query<any[]>(
        `SELECT * FROM customers WHERE customerNumber = ?`,
        [customerNumber]
    );

    return rows[0];
}

export const deleteCustomer = async (customerNumber: string) => {
    const result = await query('DELETE FROM customers WHERE customerNumber = ?', [customerNumber]);
    return result.affectedRows > 0;
}