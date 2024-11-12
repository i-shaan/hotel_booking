import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Extend Express Request interface to include `userId`
declare global {
    namespace Express {
        interface Request {
            userId: string;
        }
    }
}

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.cookies["auth-token"];
    
    if (!token) {
        res.status(401).json({ message: "Unauthorized" });
        return; // Explicitly return to end the function here
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload & { userId: string };
        
        req.userId = decoded.userId;
        next();
        return; // Ensure the function has a return statement
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
        return; // Explicitly return to end the function here
    }
};

export default verifyToken;
