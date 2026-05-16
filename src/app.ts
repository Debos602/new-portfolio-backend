import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { UserRoutes } from './app/modules/user.route';
import path from 'path';
import globalErrorHandler from './app/Middlewar/globalErrorHandler';

const app: Application = express();



// Support a comma-separated list in FRONTEND_URLS or single FRONTEND_URL
const rawFrontends = (process.env.FRONTEND_URLS || process.env.FRONTEND_URL || '');
const allowedOrigins = rawFrontends.split(',').map(s => s.trim()).filter(Boolean);

const corsOptions = {
  origin: (origin: string | undefined, callback: any) => {
    // allow requests with no origin (e.g., curl, server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.length === 0) return callback(null, true); // no restriction configured
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
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
