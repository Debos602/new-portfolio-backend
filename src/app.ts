import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { UserRoutes } from './app/modules/user.route';
import path from 'path';
import globalErrorHandler from './app/Middlewar/globalErrorHandler';

const app: Application = express();



const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true, // Allow credentials (cookies, auth headers)
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions)); // Apply CORS with the options
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Handle preflight requests (OPTIONS)
app.options('*', cors(corsOptions)); // Allow preflight requests from all origins

// Routes
app.use('/api', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to our portfolio server');
});

// Global error handler
app.use(globalErrorHandler);

// "Not Found" handler for unmatched routes
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: 'Not Found',
  });
});

export default app;
