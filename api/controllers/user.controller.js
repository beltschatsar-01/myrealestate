import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utiles/error.js';

export const test = (req, res) => {
    res.json({
        message: 'My real estate is working'
    });
};