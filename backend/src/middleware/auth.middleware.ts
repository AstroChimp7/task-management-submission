import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../config/database';
import { User } from '../entities/User'

export interface AuthRequest extends Request {
    user?: User;
}

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction)=> {
    try{
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token){
            return res.status(401).json({ message: 'No authentication token, authorization denied'})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string};

        const user = await AppDataSource.getRepository(User).findOne({
            where: { id: decoded.id }
        });

        if(!user){
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user;
        next();
    }catch(error){
        res.status(401).json({ message: 'Token is not valid' })
    }
}