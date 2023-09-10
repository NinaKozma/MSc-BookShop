import expressAsyncHandler from 'express-async-handler';
import Supplier from '../models/supplier.js';

//Get all suppliers
//GET /api/suppliers
//Private/Admin
const getSuppliers = expressAsyncHandler(async (req, res) => {
  const suppliers = await Supplier.find({});

  res.json(suppliers); //konverzija u JSON!
});

//Create a new supplier
//POST /api/products/:id/suppliers
//Private/Admin
const createSupplier = expressAsyncHandler(async (req, res) => {
  //Iz body dela zahteva pokupi naziv
  const { name, address, city, country, phoneNumber, email, fax } = req.body;

  const supplier = await Supplier.create({
    name,
    address,
    city,
    country,
    phoneNumber,
    email,
    fax,
  });

  if (supplier) {
    res.status(201).json({
      _id: supplier._id,
      name: supplier.name,
      address: supplier.address,
      city: supplier.city,
      country: supplier.country,
      phoneNumber: supplier.phoneNumber,
      email: supplier.email,
      fax: supplier.fax,
    });
  } else {
    res.status(400);
    throw new Error('Invalid supplier data!');
  }
});

export { getSuppliers, createSupplier };
