import bcrypt from 'bcryptjs';

const customers = [
  {
    firstName: 'Mila',
    lastName: 'Ekmecic',
    dateOfBirth: '1999-02-11',
    address: 'Bele Gabrica 54',
    city: 'Subotica',
    country: 'Srbija',
    phoneNumber: '0605303549',
    email: 'milek@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    firstName: 'Aleksandra',
    lastName: 'Djordjevic',
    dateOfBirth: '1998-10-05',
    address: 'Ulica nade 2',
    city: 'Subotica',
    country: 'Srbija',
    phoneNumber: '0615781489',
    email: 'alek@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    firstName: 'Anja',
    lastName: 'Perge',
    dateOfBirth: '1998-03-30',
    address: 'Beogradski put 102',
    city: 'Subotica',
    country: 'Srbija',
    phoneNumber: '0604789877',
    email: 'anjko@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default customers;
