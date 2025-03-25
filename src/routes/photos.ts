// src/routes/photos.ts
import express from 'express';
import { getToiletPhotos, uploadPhoto } from '../photoController';

const router = express.Router();

router.get('/toilets/:id/photos', getToiletPhotos);
router.post('/toilets/:id/photos', uploadPhoto);

export default router;
