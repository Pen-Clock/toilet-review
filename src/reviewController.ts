import { Request, Response } from 'express';
import Review from './models/Review';
import Toilet from './models/Toilet';
import { CreateReviewRequest } from './types';

export async function getToiletReviews(req: Request, res: Response) {
    try {
        const reviews = await Review.find({toilet_id: req.params.id});
        res.json(reviews);
    }   catch (error) {
        res.status(500).json({error: 'Failed to get all toilet reviews'});
    }
}

export async function getToiletReviewsByType(req: Request, res: Response) {
  try {
    const { id, type } = req.params;
    
    // Validate type parameter
    const typeNum = parseInt(type);
    if (![1, 2, 3].includes(typeNum)) {
      return res.status(400).json({ error: 'Invalid toilet type. Must be 1 (Disability), 2 (Female), or 3 (Male)' });
    }
    
    const reviews = await Review.find({ 
      toilet_id: id,
      type: typeNum
    });
    
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
}

export async function createReview(req: Request, res: Response) {
    try {
      const toiletId = req.params.id;
      const data = req.body as CreateReviewRequest;
      
      console.log('Creating review for toilet:', toiletId);
      console.log('Review data:', data);
      
      const toilet = await Toilet.findById(toiletId);
      if (!toilet) {
        return res.status(404).json({ error: 'Toilet not found with this ID' });
      }
      if (![1, 2, 3].includes(data.type)) {
        return res.status(400).json({ error: 'Invalid toilet type. Must be 1 (Disability), 2 (Female), or 3 (Male)' });
      }

      const review = new Review({
        toilet_id: toiletId,
        reviewer_nickname: data.reviewer_nickname || 'Anonymous',
        cleanliness_rating: data.cleanliness_rating,
        accessibility_rating: data.accessibility_rating,
        overall_rating: data.overall_rating,
        comment: data.comment,
        type: data.type
      });
      
      const newReview = await review.save();
      
      res.status(201).json(newReview);
    } catch (error) {
      console.error('Error creating review:', error);
      res.status(400).json({ error: 'Failed to create review' });
    }
  }
  
