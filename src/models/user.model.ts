import { query } from '../config/db';

export const getAllUsers = async () => {
  const rows = await query('SELECT * FROM employees');
  return Array.isArray(rows) ? rows : [];
};

export const getUserByUsername = async (username: string) => {
  const rows = await query('SELECT * FROM users WHERE username = ?', [username]);
  return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
};
