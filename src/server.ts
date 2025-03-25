import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import connectDB from './database';
import toiletRoutes from './routes/toilet';
import reviewRoutes from './routes/reviews';
import photoRoutes from './routes/photos';
import { validateApiKey } from './middleware/apiKeys';
import fileUpload from 'express-fileupload';
import buildingRoutes from './routes/buildings';

dotenv.config();

connectDB();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use(fileUpload({
    createParentPath: true,
    limits: { 
      fileSize: 5 * 1024 * 1024 // 5MB
    },
    abortOnLimit: true,
    useTempFiles: true,
}));

const uploadsDir = './uploads';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}
// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/buildings', validateApiKey, buildingRoutes);
app.use('/api/toilets', validateApiKey, toiletRoutes);
app.use('/api', validateApiKey, reviewRoutes);
app.use('/api', validateApiKey, photoRoutes);
app.get('/', (_req, res) => {
    res.send('Toilet Finder is running');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
