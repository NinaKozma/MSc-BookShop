import express from 'express';
const genreRouter = express.Router();
import { getGenres } from '../controllers/genreController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

genreRouter.route('/').get(protect, admin, getGenres);

export default genreRouter;
