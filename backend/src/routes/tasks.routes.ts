import { Request, Response, Router } from 'express';
import { TasksController } from '../controllers/tasks.controller';
import { authMiddleware, AuthRequest } from '../middleware/auth.middleware';

const router = Router();
const tasksController = new TasksController();

// All routes are protected by the auth middleware 
/*Used any type assertion, becasue the authMiddleware returns a promise
but,express expects a function to return void or nextfunction.*/
router.use(authMiddleware as any); 

router.get('/', async (req: AuthRequest, res: Response)=>{
    await tasksController.getTasks(req, res);
});

router.post('/', async (req: AuthRequest, res: Response)=>{
    await tasksController.createTask(req, res);
});

router.put('/:id', async (req: AuthRequest, res: Response)=>{
    await tasksController.updateTask(req, res);
});

router.delete('/:id', async (req: AuthRequest, res: Response)=>{
    await tasksController.deleteTask(req, res);
});

export default router;