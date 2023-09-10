import mongoose from 'mongoose';

const writerSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const writer = mongoose.model('writer', writerSchema); //napravi model na osnovu seme

export default writer;
