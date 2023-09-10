import express from 'express';
const userRouter = express.Router();
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

//api/users
userRouter.route('/').post(registerUser).get(protect, admin, getUsers);

//api/users/login
userRouter.post('/login', authUser);

//api/users/profile
//Kako bih postavila da ova putanja bude privatna, kao prvi arg prosledjujem protect!!!
//Ako je put metoda, korisnik prvo mora da bude ulogovan, tako da se na to dodaje put
userRouter
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

userRouter
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default userRouter;
