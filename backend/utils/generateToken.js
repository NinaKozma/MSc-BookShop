import jwt from 'jsonwebtoken';

//Metoda se generisanja tokena -- sign in
//Kao ulazni parametar prima id usera i on ce biti u payload delu tokena
//Token istice za 30 dana
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

export default generateToken;
