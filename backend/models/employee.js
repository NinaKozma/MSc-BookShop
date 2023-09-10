import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const employeeSchema = mongoose.Schema(
  {
    JMBG: {
      type: String,
      required: true,
      unique: true,
    },
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

//Pre samog save-a, a kod registracije korisnika, vrsi se enkripcija lozinka
//Ovo ne treba vrsiti ako je rec o editovanju profila, pri cemu samu lozinku nismo menjali!
//Jer bi se onda iznova vrsilo hashovanje i ne bismo kasnije mogli da se ulogujemo
employeeSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//Poredjenje lozinki korisnika koji pokusava da se loguje
//Korisnik kuca plain text lozinku, a u bazi je ona kriptovana
//Zato mi je ovde trebala ugradjena funkcija compare
employeeSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const employee = mongoose.model('employee', employeeSchema); //napravi model na osnovu seme

export default employee;
