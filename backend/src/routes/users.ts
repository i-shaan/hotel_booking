import express, { Request, Response, Router } from 'express';

const check = require('express-validator').check;
const validationResult = require('express-validator').validationResult;
import User from '../models/user';
import jwt from 'jsonwebtoken';

const router: Router = express.Router();

router.post('/register', [
    check('firstName').notEmpty().isString().withMessage('First Name is required'),
    check('lastName').notEmpty().isString().withMessage('Last Name is required'),
    check('email').isEmail().withMessage('Valid email is required'),
    check('password').isLength({ min: 6 }).withMessage('Password with 6 or more characters required'),
], async (req: Request, res: Response) :Promise<any> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()
    })
}

    try {
        const { email, password, firstName, lastName } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
            
        }

        user = new User({ email, password, firstName, lastName });
        await user.save();

        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ message: 'JWT_SECRET not set' });
            
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        res.cookie('auth-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 8640000,
        });

        return res.status(200).json({ message: 'Registration successful' });
    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;