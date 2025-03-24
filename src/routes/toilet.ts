import express from 'express';
import { getToilets, createToilet, getToiletById } from '../toiletController';

const router = express.Router();

router.get('/', getToilets);
router.post('/', createToilet);
router.get('/:id', getToiletById);

export default router;