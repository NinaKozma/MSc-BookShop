import expressAsyncHandler from 'express-async-handler';
import Genre from '../models/genre.js';

//Get all genres
//GET /api/genres
//Private/Admin
const getGenres = expressAsyncHandler(async (req, res) => {
  const genres = await Genre.find({});

  res.json(genres); //konverzija u JSON!
});

//Create a new genre
//POST /api/products/:id/genres
//Private/Admin
const createGenre = expressAsyncHandler(async (req, res) => {
  //Iz body dela zahteva pokupi naziv
  const { name } = req.body;

  const genre = await Genre.create({
    name,
  });

  if (genre) {
    res.status(201).json({
      _id: genre._id,
      name: genre.name,
    });
  } else {
    res.status(400);
    throw new Error('Invalid genre data!');
  }
});

export { getGenres, createGenre };
