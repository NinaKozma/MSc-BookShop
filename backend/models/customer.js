import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const customerSchema = mongoose.Schema(
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
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//Poredjenje lozinki korisnika koji pokusava da se loguje
//Korisnik kuca plain text lozinku, a u bazi je ona kriptovana
//Zato mi je ovde trebala ugradjena funkcija compare
customerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//Pre samog save-a, a kod registracije korisnika, vrsi se enkripcija lozinka
//Ovo ne treba vrsiti ako je rec o editovanju profila, u slucaju samu lozinku nismo menjali!
//Jer bi se onda iznova vrsilo hashovanje i ne bismo kasnije mogli da se ulogujemo
customerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const customer = mongoose.model('customer', customerSchema); //napravi model na osnovu seme

export default customer;
