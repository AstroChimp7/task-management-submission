import express, { Express } from 'express';
import cors from 'cors';
import 'reflect-metadata';
import dotenv from 'dotenv';
import { AppDataSource } from './config/database';
import authRoutes from './routes/auth.routes';
import taskRoutes from './routes/tasks.routes';

// Load environment variables
dotenv.config();

// Create Express app
const app: Express = express();

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// Middleware
app.use(cors({
    origin: [
        'http://localhost:3001',
        'http://frontend:3001'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Debug route
app.get('/api/test', (req, res) => {
    res.json({ message: 'API endpoint is working' });
});

// Initialising database connection
AppDataSource.initialize()
    .then(() => {
        console.log("Data source has been initialised");
    })
    .catch((error) => {
        console.error("Error during data source initialisation: ", error);
        process.exit(1);
    });

// Mount routes with /api prefix
const apiRouter = express.Router();
apiRouter.use('/auth', authRoutes);
apiRouter.use('/tasks', taskRoutes);

app.use('/api', apiRouter);

// Base route
app.get('/', (req, res) => {
    res.send('Task Management API');
});

// Error handling middleware //added for debugging
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!', details: err.message });
});

export default app;