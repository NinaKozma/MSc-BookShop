import express from 'express';
const supplierRouter = express.Router();
import { getSuppliers } from '../controllers/supplierController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

supplierRouter.route('/').get(protect, admin, getSuppliers);

export default supplierRouter;
