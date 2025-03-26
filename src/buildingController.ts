import { Request, Response } from 'express';
import Building from './models/Building';
import { CreateBuildingRequest } from './types';

export async function getBuildings(_req: Request, res: Response) {
  try {
    const buildings = await Building.find();
    res.json(buildings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch buildings' });
  }
}


export async function getBuildingById(req: Request, res: Response) {
  try {
    console.log(req.params.id)
    const building = await Building.find({ "id": Number(req.params.id) });
    console.log(building)
    
    if (!building) {
      return res.status(404).json({ error: 'Building not found' });
    }
    
    res.json(building[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch building' });
  }
}


export async function createBuilding(req: Request, res: Response) {
  try {
    const data = req.body as CreateBuildingRequest;
    
    const building = new Building({
      name: data.name,
      location: {
        type: 'Point',
        coordinates: [data.longitude, data.latitude]
      },
      address: data.address,
      male_toilets_count: data.male_toilets_count,
      female_toilets_count: data.female_toilets_count,
      unisex_toilets_count: data.unisex_toilets_count
    });
    
    const newBuilding = await building.save();
    res.status(201).json(newBuilding);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create building' });
  }
}


