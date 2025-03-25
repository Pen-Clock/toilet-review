import express from 'express';
import { getBuildings, createBuilding, getBuildingById } from '../buildingController';

const router = express.Router();

router.get('/', getBuildings);
router.post('/', createBuilding);
router.get('/:id', getBuildingById);

export default router;
