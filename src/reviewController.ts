import { Request, Response } from 'express';
import Review from './models/Review';
import { CreateReviewRequest } from './types';
import Building from './models/Building';

export async function getToiletReviews(req: Request, res: Response) {
    try {
        const reviews = await Review.find({building_id: req.params.id});
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
      const buildingId = req.params.id;
      const data = req.body as CreateReviewRequest;
      
      console.log('Creating review for building:', buildingId);
      console.log('Review data:', data);
      
      const building = await Building.findOne({id: Number(buildingId)});
      if (!building) {
        return res.status(404).json({ error: 'Building not found with this ID' });
      }
      if (![1, 2, 3].includes(data.type)) {
        return res.status(400).json({ error: 'Invalid toilet type. Must be 1 (Disability), 2 (Female), or 3 (Male)' });
      }

      const review = new Review({
        building_id: buildingId,
        title: data.title,
        reviewer_nickname: data.reviewer_nickname || 'Anonymous',
        cleanliness_rating: data.cleanliness_rating,
        accessibility_rating: data.accessibility_rating,
        overall_rating: data.overall_rating,
        type: data.type,
        comment: data.comment,
      });

      console.log(data.comment)
      
      const newReview = await review.save();

      const totalOverall = building.average_overall * building.reviews_count + data.overall_rating;
      const totalCleanliness = building.average_cleanliness * building.reviews_count + data.cleanliness_rating;
      const totalAccessibility = building.average_accessibility * building.reviews_count + data.accessibility_rating;
      const newReviewsCount = building.reviews_count + 1;

      building.average_overall = totalOverall / newReviewsCount;
      building.average_cleanliness = totalCleanliness / newReviewsCount;
      building.average_accessibility = totalAccessibility / newReviewsCount;
      building.reviews_count = newReviewsCount;
      await building.save();

      
      res.status(201).json(newReview);
    } catch (error) {
      console.error('Error creating review:', error);
      res.status(400).json({ error: 'Failed to create review' });
    }
  }
  
