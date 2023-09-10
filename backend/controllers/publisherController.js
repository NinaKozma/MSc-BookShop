import expressAsyncHandler from 'express-async-handler';
import Publisher from '../models/publisher.js';

//Get all publishers
//GET /api/publishers
//Private/Admin
const getPublishers = expressAsyncHandler(async (req, res) => {
  const publishers = await Publisher.find({});

  res.json(publishers); //konverzija u JSON!
});

//Create a new publisher
//POST /api/products/:id/publishers
//Private/Admin
const createPublisher = expressAsyncHandler(async (req, res) => {
  //Iz body dela zahteva pokupi naziv
  const { name, taxID, address, city, country, phoneNumber, email } = req.body;

  const publisher = await Publisher.create({
    name,
    taxID,
    address,
    city,
    country,
    phoneNumber,
    email,
  });

  if (publisher) {
    res.status(201).json({
      _id: publisher._id,
      name: publisher.name,
      taxID: publisher.taxID,
      address: publisher.address,
      city: publisher.city,
      country: publisher.country,
      phoneNumber: publisher.phoneNumber,
      email: publisher.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid publisher data!');
  }
});

export { getPublishers, createPublisher };
