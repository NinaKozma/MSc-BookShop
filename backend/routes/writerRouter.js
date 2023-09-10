import express from 'express';
const writerRouter = express.Router();
import { getWriters } from '../controllers/writerController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

writerRouter.route('/').get(protect, admin, getWriters);

export default writerRouter;
