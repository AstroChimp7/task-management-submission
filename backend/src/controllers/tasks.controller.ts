import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Task } from '../entities/Task';
import { AuthRequest } from '../middleware/auth.middleware';

export class TasksController {
    private taskRepository = AppDataSource.getRepository(Task);

    //Get all tasks for the authenticated user
    async getTasks(req: AuthRequest, res: Response){
        try{
            const tasks = await this.taskRepository.find({
                where: { userId: req.user!.id },
                order: { createdAt: 'DESC' }
            });

            res.json(tasks);
        }catch(error){
            console.error('Error fetching tasks: ', error);
            res.status(500).json({ message: 'Error fetching tasks' })
        }
    }

    //Create a new task
    async createTask(req: AuthRequest, res:Response){
        try{
            const { title, description } = req.body;

            const task = new Task();
            task.title = title;
            task.description = description;
            task.userId = req.user!.id;

            await this.taskRepository.save(task);

            res.status(201).json(task);
        }catch(error){
            console.error('Error creating task: ', error);
            res.status(500).json({ message: 'Error creating task' });
        }
    }

    // Update a task 
    async updateTask(req: AuthRequest, res: Response){
        try{
            const { id } = req.params;
            const { title, description, isComplete } = req.body;

            const task = await this.taskRepository.findOne({
                where: { id, userId: req.user!.id}
            });

            if(!task){
                return res.status(404).json({ message: 'Task not found' });
            }

            // Update task properties
            if(title !== undefined) task.title = title;
            if(description !== undefined) task.description = description;
            if(isComplete !== undefined) task.isComplete = isComplete;

            await this.taskRepository.save(task);

            res.status(200).json(task);
        }catch(error){
            console.error('Error updating task: ', error);
            res.status(500).json({ message: 'Error updating task' });
        }
    }

    async deleteTask(req: AuthRequest, res: Response){
        try{
            const { id } = req.params;

            const task = await this.taskRepository.findOne({
                where: { id, userId: req.user!.id }
            });

            if(!task){
                return res.status(404).json({ message: 'Task not found'});
            }

            await this.taskRepository.remove(task);

            res.status(200).json({ message: 'Task deleted successfully' })
        }catch(error){
            console.error('Error deleting task: ', error);
            res.status(500).json({ message: 'Error deleting task' });
        }
    }
}