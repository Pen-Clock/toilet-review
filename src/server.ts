import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import connectDB from './database';
import toiletRoutes from './routes/toilet';
import reviewRoutes from './routes/reviews';
import { validateApiKey } from './middleware/apiKeys';

dotenv.config();

connectDB();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use('/api/toilets', validateApiKey, toiletRoutes);
app.use('/api', validateApiKey, reviewRoutes);
app.get('/', (_req, res) => {
    res.send('Toilet Finder is running');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
