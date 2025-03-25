import { Request, Response } from "express";
import Toilet from "./models/Toilet";
import { CreateToiletRequest } from "./types";
import Building from './models/Building';

export async function getToilets(_req: Request, res: Response) {
    try {
        const toilets = await Toilet.find().populate('building_id');;
        res.json(toilets);
    }  catch (error) {
        res.status(500).json({error: 'Failed to get all toilets'});
    }
}

export async function getBuildingToilets(req: Request, res: Response) {
    try {
        const buildingId = req.params.buildingId;
      
      
      const building = await Building.findById(buildingId);
      if (!building) {
        return res.status(404).json({ error: 'Building not found' });
      }
      
      const toilets = await Toilet.find({ building_id: buildingId });
      res.json(toilets);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch toilets' });
    }
}

export async function getToiletById(req: Request, res: Response) {
    try {
      const toilet = await Toilet.findById(req.params.id).populate('building_id');
      
      if (!toilet) {
        return res.status(404).json({ error: 'Toilet not found' });
      }
      
      res.json(toilet);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch toilet' });
    }
  }

// Create a new toilet
export async function createToilet(req: Request, res: Response) {
    try {
      const data = req.body as CreateToiletRequest;
      
      // Check if building exists
      const building = await Building.findById(data.building_id);
      if (!building) {
        return res.status(404).json({ error: 'Building not found' });
      }
      
      const toilet = new Toilet({
        building_id: data.building_id,
        name: data.name,
        location: {
          type: 'Point',
          coordinates: [data.longitude, data.latitude]
        }
      });
      
      const newToilet = await toilet.save();
      res.status(201).json(newToilet);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create toilet' });
    }
  }

