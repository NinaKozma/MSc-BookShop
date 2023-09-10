//Middleware za validaciju tokena
import jwt from 'jsonwebtoken';
import expressAsyncHandler from 'express-async-handler';
import Customer from '../models/customer.js';
import Employee from '../models/employee.js';

const protect = expressAsyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]; //Headers, authorization, value: Bearer 'token'

      const decoded = jwt.verify(token, process.env.JWT_SECRET); //dekodira token, kako bih dobila ID korisnika

      req.user =
        (await Employee.findById(decoded.id).select('-password')) ||
        (await Customer.findById(decoded.id).select('-password'));

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed!');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token found!');
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.JMBG) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin!');
  }
};

export { protect, admin };
