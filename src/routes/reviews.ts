import express from 'express';
import { getToiletReviews, createReview } from '../reviewController';

const router = express.Router();

router.get('/toilets/:id/reviews', getToiletReviews);
router.post('/toilets/:id/reviews', createReview);

export default router;
