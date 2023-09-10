import express from 'express';
const productRouter = express.Router();
import {
  getProductById,
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} from '../controllers/productController.js';
import { createWriter } from '../controllers/writerController.js';
import { createGenre } from '../controllers/genreController.js';
import { createPublisher } from '../controllers/publisherController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { createSupplier } from '../controllers/supplierController.js';

productRouter.route('/').get(getProducts).post(protect, admin, createProduct);
productRouter.route('/:id/reviews').post(protect, createProductReview);
productRouter.get('/top', getTopProducts);
productRouter
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);
productRouter.route('/:id/writers').post(protect, admin, createWriter);
productRouter.route('/:id/genres').post(protect, admin, createGenre);
productRouter.route('/:id/publishers').post(protect, admin, createPublisher);
productRouter.route('/:id/suppliers').post(protect, admin, createSupplier);

export default productRouter;
