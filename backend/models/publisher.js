import mongoose from 'mongoose';

const publisherSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    taxID: {
      type: Number,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const publisher = mongoose.model('publisher', publisherSchema); //napravi model na osnovu seme

export default publisher;
