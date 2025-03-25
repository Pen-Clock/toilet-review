import express from 'express';
import { getToiletReviews, createReview, getToiletReviewsByType } from '../reviewController';

const router = express.Router();

router.get('/toilets/:id/reviews', getToiletReviews);
router.post('/toilets/:id/reviews', createReview);router.get('/toilets/:id/reviews/type/:type', getToiletReviewsByType);
export default router;
