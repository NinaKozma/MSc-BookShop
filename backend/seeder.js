import dotenv from 'dotenv';

import customers from './data/customers.js';
import employees from './data/employees.js';
import genres from './data/genres.js';
import publishers from './data/publishers.js';
import writers from './data/writers.js';
import suppliers from './data/suppliers.js';

import Employee from './models/employee.js';
import Customer from './models/customer.js';
import Book from './models/book.js';
import Genre from './models/genre.js';
import Order from './models/order.js';
import Publisher from './models/publisher.js';
import Suppplier from './models/supplier.js';
import Writer from './models/writer.js';

import connectDB from './config/connectDB.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    //Sve obrisi - ne zelim da punim bazu ako vec ima nesto u njoj
    await Order.deleteMany();
    await Book.deleteMany();
    await Customer.deleteMany();
    await Employee.deleteMany();
    await Genre.deleteMany();
    await Publisher.deleteMany();
    await Suppplier.deleteMany();
    await Writer.deleteMany();

    await Genre.insertMany(genres);
    await Publisher.insertMany(publishers);
    await Writer.insertMany(writers);
    await Suppplier.insertMany(suppliers);
    await Customer.insertMany(customers);
    await Employee.insertMany(employees);

    //await Book.insertMany(products);

    console.log('Data imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    //Sve obrisi - ne zelim da punim bazu ako vec ima nesto u njoj
    await Order.deleteMany();
    await Book.deleteMany();
    await Customer.deleteMany();
    await Employee.deleteMany();
    await Genre.deleteMany();
    await Publisher.deleteMany();
    await Suppplier.deleteMany();
    await Writer.deleteMany();

    console.log('Data destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
