import expressAsyncHandler from 'express-async-handler';
import Product from '../models/book.js';
import Writer from '../models/writer.js';
import Genre from '../models/genre.js';
import Publisher from '../models/publisher.js';
import Supplier from '../models/supplier.js';

//Get all products
//GET /api/products
//Public
const getProducts = expressAsyncHandler(async (req, res) => {
  const pageSize = 8; //proizvoda po stranici
  const page = Number(req.query.pageNumber) || 1; //trenutna stranica - ako nemam query stranice, onda sam ocigledno na prvoj stranici :D

  const keyword = req.query.keyword
    ? {
        title: {
          // regex se koristi kako ne bih morala da, nakon sto ukucam npr. 'to kill'..,
          // imam nula prikazanih proizvoda jer se u sustini nijedan naslov ne poklapa sa tacno tim unosom,
          // nego zelim da mi svakako izlista knjige koje barem sadrze u naslovu tekst koji sam ukucala
          $regex: req.query.keyword,
          $options: 'i', //case-insensitive
        },
      }
    : {}; //inace je ovo prazan string

  const count = await Product.countDocuments({ ...keyword }); //ukupan broj proizvoda
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .populate('writer', 'firstName lastName')
    .populate('genre', 'name')
    .populate('publisher', 'name');

  res.json({ products, page, pages: Math.ceil(count / pageSize) }); //konverzija u JSON!
});

//Get product by ID
//GET /api/products/:id
//Public
const getProductById = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate('writer', 'firstName lastName')
    .populate('genre', 'name')
    .populate('publisher', 'name')
    .populate('supplier', 'name');

  if (product) {
    res.json(product); //konverzija u JSON!
  } else {
    res.status(404);
    //Kada je objectID dobro formatiran, ali kao takav ne postoji u bazi
    throw new Error('Product not found!');
  }
});

//Delete a product
//DELETE /api/products/:id
//Private/Admin
const deleteProduct = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    //Kada je objectID dobro formatiran, ali kao takav ne postoji u bazi
    throw new Error('Product not found!');
  }
});

//Create a new product
//POST /api/products
//Private/Admin
const createProduct = expressAsyncHandler(async (req, res) => {
  const product = new Product({
    title: 'Sample title',
    writer: await (await Writer.findOne())._id,
    genre: await (await Genre.findOne()).id,
    publisher: await (await Publisher.findOne())._id,
    supplier: await (await Supplier.findOne())._id,
    description: 'Sample description',
    price: 0,
    numberOfPages: 0,
    language: 'Sample language',
    countInStock: 0,
    numReviews: 0,
    image: '/images/sample.jpg',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//Update product
//PUT /api/products/:id
//Private/Admin
const updateProduct = expressAsyncHandler(async (req, res) => {
  const {
    title,
    writer,
    genre,
    publisher,
    supplier,
    description,
    price,
    numberOfPages,
    language,
    countInStock,
    image,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.title = title;
    product.writer = writer;
    product.genre = genre;
    product.publisher = publisher;
    product.supplier = supplier;
    product.description = description;
    product.price = price;
    product.numberOfPages = numberOfPages;
    product.language = language;
    product.countInStock = countInStock;
    product.image = image;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found!');
  }
});

//Create a product review
//POST /api/products/:id/reviews
//Private
const createProductReview = expressAsyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed!');
    }

    const review = {
      name: req.user.firstName,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added!' });
  } else {
    res.status(404);
    throw new Error('Product not found!');
  }
});

//Get top rated products
//GET /api/products/top
//Public
const getTopProducts = expressAsyncHandler(async (req, res) => {
  const products = await Product.find({})
    .sort({ rating: -1 })
    .limit(3)
    .populate('writer', 'firstName lastName');
  //sortiraj u rastucem redosledu; otuda -1

  res.json(products);
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
};
