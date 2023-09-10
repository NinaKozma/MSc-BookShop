import express from 'express';
const publisherRouter = express.Router();
import { getPublishers } from '../controllers/publisherController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

publisherRouter.route('/').get(protect, admin, getPublishers);

export default publisherRouter;
