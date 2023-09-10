import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Customer',
    },
  },
  {
    timestamps: true,
  }
);

const bookSchema = mongoose.Schema(
  {
    writer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Writer',
    },
    publisher: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Publisher',
    },
    genre: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Genre',
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Supplier',
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    numberOfPages: {
      type: Number,
      required: true,
      default: 0,
    },
    language: {
      type: String,
      required: true,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const book = mongoose.model('book', bookSchema);

export default book;
