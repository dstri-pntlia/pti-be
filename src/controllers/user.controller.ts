import { Request, Response } from 'express';
import { getAllUsers,getUserByUsername } from '../models/user.model';
import { apiResponse } from '../utils/apiResponse';
import bcrypt from 'bcrypt';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    if (!users || users.length === 0) {
      return apiResponse(res, 404, 'No users found', []);
    }
    return apiResponse(res, 200, 'Success', users);
  } catch (error) {
    return apiResponse(res, 500, 'Internal Server Error', null);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;


    if (!password || password.length < 8) {
      return res.status(400).json({
        status: 102,
        message: 'Password minimal 8 karakter',
        data: null,
      });
    }

    const user = await getUserByUsername(username);
    if (!user) {
      return res.status(401).json({
        status: 103,
        message: 'Username atau password salah',
        data: null,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: 103,
        message: 'Username atau password salah',
        data: null,
      });
    }

    return res.status(200).json({
      status: 0,
      message: 'Login Sukses',
      data: { },
    });
  } catch (error) {
    console.error(error);
    return apiResponse(res, 500, 'Internal Server Error', null);
  }
};
