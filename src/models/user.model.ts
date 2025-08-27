import { query } from '../config/db';
import { hashPassword } from '../utils/hashPassword';

export const registerUser = async (
  email: string,
  full_name: string,
  username: string,
  password: string,
  role: string = 'customer'
) => {
  const hashedPassword = await hashPassword(password);
  const result: any = await query(
    'INSERT INTO users (email, full_name, username, password_hash, role) VALUES (?, ?, ?, ?, ?)',
    [email, full_name, username, hashedPassword, role]
  );
  return result.insertId;
};

export const getUserByEmail = async (email: string) => {
  const rows: any = await query('SELECT * FROM users WHERE email = ?', [email]);
  return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
};
