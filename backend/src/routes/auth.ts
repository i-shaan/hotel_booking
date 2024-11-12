import express, { Request, Response, Router } from 'express';

const check = require('express-validator').check;
const validationResult = require('express-validator').validationResult;
import User from '../models/user';
import jwt from 'jsonwebtoken';
import brcypt from "bcryptjs";
import verifyToken from "../middleware/auth"
const router: Router = express.Router();

router.post('/login', [
    check('email').isEmail().withMessage('Valid email is required'),
    check('password').isLength({ min: 6 }).withMessage('Password with 6 or more characters required')
], async (req: Request, res: Response): Promise<any> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }

    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid Email' });
        }

        const check = await brcypt.compare(password, user.password);
        if (!check) {
            return res.status(400).json({ message: 'Invalid Password' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
            expiresIn: '1d'
        });

        res.cookie('auth-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 8640000,
        });

        return res.status(200).json({ message: 'Successfully logged in!', userId: user._id });
    }catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
router.get("/validate-token",verifyToken,(req:Request,res:Response)=>{
    res.status(200).send({userId:req.userId})
})
router.post("/logout",(req:Request,res:Response)=>{
    res.cookie("auth-token","",{
        expires:new Date(0),
    });
    res.send();
})
export default router;