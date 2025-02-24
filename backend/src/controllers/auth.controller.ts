import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { User } from '../entities/User';
import { hashPassword, comparePassword } from '../utils/password';
import jwt from 'jsonwebtoken'

export class AuthController{
    private userRepository = AppDataSource.getRepository(User);

    // Resgistering new user
    async register(req: Request, res: Response){
        try{
            const { username, password } = req.body;

            // Check if user already exists
            const existingUser = await this.userRepository.findOne({
                where: { username }
            });
            if (existingUser){
                return res.status(400).json({ message: 'Username already exists'});
            }

            // Creating new user
            const user = new User();
            user.username = username;
            user.password = await hashPassword(password);

            // Save user 
            await this.userRepository.save(user);

            // Generate JWT token
            const token = jwt.sign(
                { id: user.id },
                process.env.JWT_SECRET!,
                { expiresIn: '1d' }
            );

            res.status(201).json({
                message: 'User registred successfully'
            });

        }catch(error){
            console.error('Registration error: ', error);
            res.status(500).json({ message: 'Error registering user' });
        }

    }

    //Login user 
    async login(req: Request, res:Response){
        try{
            const { username, password } = req.body;

            // Find user
            const user = await this.userRepository.findOne({
                where: { username }
            });
            if(!user){
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Password comparision
            const isPasswordValid = await comparePassword(password, user.password);
            if(!isPasswordValid){
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign(
                { id: user.id },
                process.env.JWT_SECRET!,
                { expiresIn: '1d'}
            );

            res.json({
                message: 'Login successful',
                token,
                user: {
                    id: user.id,
                    username: user.username
                }
            });
        }catch(error){
            console.error('Login error:', error);
            res.status(500).json( {message: 'Error logging in'} );
        }
    }
}