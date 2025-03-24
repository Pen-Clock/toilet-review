import { Request, Response } from "express";
import Toilet from "./models/Toilet";
import { CreateToiletRequest } from "./types";
import { error } from "console";

export async function getToilets(_req: Request, res: Response) {
    try {
        const toilets = await Toilet.find();
        res.json(toilets);
    }  catch (error) {
        res.status(500).json({error: 'Failed to get all toilets'});
    }
}

export async function getToiletById(req: Request, res: Response) {
    try {
      const toilet = await Toilet.findById(req.params.id);
      
      if (!toilet) {
        return res.status(404).json({ error: 'Toilet not found' });
      }
      
      res.json(toilet);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch toilet' });
    }
  }

export async function createToilet(req: Request, res: Response) {
    try {
        const data = req.body as CreateToiletRequest;

        const toilet  = new Toilet({
            name: data.name,
            description: data.description, 
            location: {
                type: 'Point',
                coordinates: [data.longitude, data.latitude]
            },
            address: data.address,
            is_accessible: data.is_accessible,
            opening_hours: data.opening_hours
        });
        
        const newToilet = await toilet.save();
        res.status(201).json(newToilet);
    }   catch (error) {
        res.status(400).json({erorr: 'Failed to create toilet'});
    }
}

