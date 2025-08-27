import { Request, Response } from 'express';
import { registerUser, getUserByEmail } from '../models/user.model';
import { apiResponse } from '../utils/apiResponse';
import validator from 'validator';
import bcrypt from 'bcrypt';
import { generateToken } from '../config/jwt';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, full_name, username, password } = req.body;

    if (!validator.isEmail(email)) {
      return apiResponse(res, 400, 'Parameter email tidak sesuai format', null);
    }

    if (!password || password.length < 8) {
      return apiResponse(res, 400, 'Password minimal 8 karakter', null);
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return apiResponse(res, 400, 'Email sudah terdaftar', null);
    }

    await registerUser(email, full_name, username, password, 'customer');

    return apiResponse(res, 200, 'Registrasi berhasil silahkan login', null);
  } catch (error) {
    console.error(error);
    return apiResponse(res, 500, 'Internal Server Error', null);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!validator.isEmail(email)) {
      return apiResponse(res, 400, 'Parameter email tidak sesuai format', null);
    }

    if (!password || password.length < 8) {
      return apiResponse(res, 400, 'Password minimal 8 karakter', null);
    }

    const user = await getUserByEmail(email);
    if (!user) {
      return apiResponse(res, 401, 'Email atau password salah', null);
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return apiResponse(res, 401, 'Email atau password salah', null);
    }

    const token = generateToken({
      id: user.user_id,
      email: user.email,
      role: user.role
    });

    return apiResponse(res, 200, 'Login sukses', { token });
  } catch (error) {
    console.error(error);
    return apiResponse(res, 500, 'Internal Server Error', null);
  }
};
