// src/routes/photos.ts
import express from 'express';
import { getToiletPhotos, uploadPhoto } from '../photoController';

const router = express.Router();

router.get('/buildings/:id/photos', getToiletPhotos);
router.post('/buildings/:id/photos', uploadPhoto);

export default router;
