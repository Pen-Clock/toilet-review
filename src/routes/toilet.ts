import express from 'express';
import { getToilets, createToilet, getToiletById, getBuildingToilets } from '../toiletController';

const router = express.Router();

router.get('/', getToilets);
router.post('/', createToilet);
router.get('/:id', getToiletById);
router.get('/building/:buildingId', getBuildingToilets);

export default router;