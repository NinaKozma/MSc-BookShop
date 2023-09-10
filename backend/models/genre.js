import mongoose from 'mongoose';

const genreSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const genre = mongoose.model('genre', genreSchema); //napravi model na osnovu seme

export default genre;
