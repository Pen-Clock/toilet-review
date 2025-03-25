import { Request, Response, NextFunction } from 'express';


const API_KEY = 'toilet-finder-api-key-hackathon-2025';

export const validateApiKey = (req: Request, res: Response, next: NextFunction): void => {

    const providedKey = req.headers['x-api-key'] || req.query.api_key;
  
    if (!providedKey || providedKey !== API_KEY) {
        res.status(401).json({ error: 'Invalid API key' });
        return;
    }
    next();
};