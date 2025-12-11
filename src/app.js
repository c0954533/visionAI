import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import uploadRoutes from './routes/uploadRoutes.js';
import analyzeRoutes from './routes/analyzeRoutes.js';
import historyRoutes from './routes/historyRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// main API endpoints
app.use('/api/upload', uploadRoutes);
app.use('/api/analyze', analyzeRoutes);
app.use('/api/history', historyRoutes);

export default app;
