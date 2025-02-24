import { Request, Response, Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const router = Router();
const authController = new AuthController();

//logging middleware for this router //added for debugging 
router.use((req, res, next) => {
    console.log('Auth route accessed:', req.method, req.path);
    next();
});

router.post('/register', async(req: Request, res: Response) => {
    console.log('Register route hit');
    console.log('Request body:', req.body);
    try {
        await authController.register(req, res);
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ 
            error: 'Registration failed', 
            details: error
        });
    }
});

router.post('/login', async(req: Request, res: Response) => {
    console.log('Login route hit');
    console.log('Request body:', req.body);
    try {
        await authController.login(req, res);
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            error: 'Login failed',
            details: error
        });
    }
});

export default router;