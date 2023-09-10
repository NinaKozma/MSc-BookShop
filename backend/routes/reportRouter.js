import express from 'express';
const reportRouter = express.Router();
import { getReports } from '../controllers/reportsController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

reportRouter.route('/').get(protect, admin, getReports);

export default reportRouter;
