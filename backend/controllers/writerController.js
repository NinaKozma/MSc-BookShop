import expressAsyncHandler from 'express-async-handler';
import Writer from '../models/writer.js';

//Get all writers
//GET /api/writers
//Private/Admin
const getWriters = expressAsyncHandler(async (req, res) => {
  const writers = await Writer.find({});

  res.json(writers); //konverzija u JSON!
});

//Create a new writer
//POST /api/products/:id/writers
//Private/Admin
const createWriter = expressAsyncHandler(async (req, res) => {
  //Iz body dela zahteva pokupi naziv
  const { firstName, lastName, dateOfBirth, nationality } = req.body;

  const writer = await Writer.create({
    firstName,
    lastName,
    dateOfBirth,
    nationality,
  });

  if (writer) {
    res.status(201).json({
      _id: writer._id,
      firstName: writer.firstName,
      lastName: writer.lastName,
      dateOfBirth: writer.dateOfBirth,
      nationality: writer.nationality,
    });
  } else {
    res.status(400);
    throw new Error('Invalid writer data!');
  }
});

export { getWriters, createWriter };
