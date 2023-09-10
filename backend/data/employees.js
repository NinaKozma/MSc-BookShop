import bcrypt from 'bcryptjs';

const employees = [
  {
    JMBG: '1301998825078',
    firstName: 'Nina',
    lastName: 'Kozma',
    dateOfBirth: '1998-01-13',
    address: 'Sergeja Jesenjina 23',
    city: 'Subotica',
    country: 'Srbija',
    phoneNumber: '0611399652',
    email: 'nina.kozma@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    JMBG: '2801999825045',
    firstName: 'Ana',
    lastName: 'Popovic',
    dateOfBirth: '1999-01-28',
    address: 'Strazilovska 12',
    city: 'Novi Sad',
    country: 'Srbija',
    phoneNumber: '0647874985',
    email: 'ana@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    JMBG: '3005998825056',
    firstName: 'Tamara',
    lastName: 'Zuvela',
    dateOfBirth: '1998-05-30',
    address: 'Strazilovska 12',
    city: 'Novi Sad',
    country: 'Srbija',
    phoneNumber: '0641237894',
    email: 'zuvela@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default employees;
