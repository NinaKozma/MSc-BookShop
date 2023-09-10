import expressAsyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import Customer from '../models/customer.js';
import Employee from '../models/employee.js';

//Authentification of user & get token -- logovanje korisnika
//POST /api/users/login
//Public
const authUser = expressAsyncHandler(async (req, res) => {
  //Iz body dela zahteva pokupi email i lozinku
  const { email, password } = req.body;

  //Prvo proveri da li postoji kupac sa takvim mejlom
  const customer = await Customer.findOne({ email: email });
  //Onda proveri da li postoji admin sa takvim mejlom
  const employee = await Employee.findOne({ email: email });

  //Ako postoji, uporedi lozinke...
  if (customer && (await customer.matchPassword(password))) {
    res.json({
      _id: customer._id,
      firstName: customer.firstName,
      lastName: customer.lastName,
      dateOfBirth: customer.dateOfBirth,
      address: customer.address,
      city: customer.city,
      country: customer.country,
      phoneNumber: customer.phoneNumber,
      email: customer.email,
      isAdmin: false,
      token: generateToken(customer._id),
    });
  } else if (employee && (await employee.matchPassword(password))) {
    res.json({
      _id: employee._id,
      JMBG: employee.JMBG,
      firstName: employee.firstName,
      lastName: employee.lastName,
      dateOfBirth: employee.dateOfBirth,
      address: employee.address,
      city: employee.body,
      country: employee.country,
      phoneNumber: employee.phoneNumber,
      email: employee.email,
      isAdmin: true,
      token: generateToken(employee._id),
    });
  } else {
    res.status(401); //unathorized
    throw new Error('Invalid email or password!');
  }
});

//Register new user
//POST /api/users
//Public
const registerUser = expressAsyncHandler(async (req, res) => {
  //Iz body dela zahteva pokupi podatke o korisniku
  const {
    firstName,
    lastName,
    dateOfBirth,
    address,
    city,
    country,
    phoneNumber,
    email,
    password,
  } = req.body;

  //Prvo proveri da li postoji kupac sa takvim mejlom
  const customerExists = await Customer.findOne({ email: email });
  //Onda proveri da li postoji admin sa takvim mejlom
  const employeeExists = await Employee.findOne({ email: email });

  if (customerExists || employeeExists) {
    res.status(400);
    throw new Error('User with that mail already exists!');
  }

  const customer = await Customer.create({
    firstName,
    lastName,
    dateOfBirth,
    address,
    city,
    country,
    phoneNumber,
    email,
    password,
  });

  if (customer) {
    res.status(201).json({
      _id: customer._id,
      firstName: customer.firstName,
      lastName: customer.lastName,
      dateOfBirth: customer.dateOfBirth,
      address: customer.address,
      city: customer.body,
      country: customer.country,
      phoneNumber: customer.phoneNumber,
      email: customer.email,
      token: generateToken(customer._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data!');
  }
});

//Get user profile
//GET /api/users/profile
//Private
const getUserProfile = expressAsyncHandler(async (req, res) => {
  const user =
    (await Employee.findById(req.user._id)) ||
    (await Customer.findById(req.user._id));

  if (user) {
    res.json({
      _id: user._id,
      JMBG: user.JMBG,
      firstName: user.firstName,
      lastName: user.lastName,
      dateOfBirth: user.dateOfBirth,
      address: user.address,
      city: user.city,
      country: user.country,
      phoneNumber: user.phoneNumber,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

//Update user profile
//PUT /api/users/profile
//Private
const updateUserProfile = expressAsyncHandler(async (req, res) => {
  const user =
    (await Employee.findById(req.user._id)) ||
    (await Customer.findById(req.user._id));

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.dateOfBirth = req.body.dateOfBirth || user.dateOfBirth;
    user.address = req.body.address || user.address;
    user.city = req.body.city || user.city;
    user.country = req.body.country || user.country;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password; //automatski se enkriptuje zbog middleware-a u modelu
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      dateOfBirth: updatedUser.dateOfBirth,
      address: updatedUser.address,
      city: updatedUser.body,
      country: updatedUser.country,
      phoneNumber: updatedUser.phoneNumber,
      email: updatedUser.email,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

/************************ ADMIN AREA ****************************/

//Get users
//GET /api/users
//Private/Admin
const getUsers = expressAsyncHandler(async (req, res) => {
  const [users, admins] = await Promise.all([
    Customer.find({}),
    Employee.find({}),
  ]);

  users.push(...admins);

  res.json(users);
});

//Delete user
//DELETE /api/users/:id
//Private/Admin
const deleteUser = expressAsyncHandler(async (req, res) => {
  const user =
    (await Employee.findById(req.params.id)) ||
    (await Customer.findById(req.params.id));

  console.log(user);

  if (user) {
    await user.remove();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

//Get user by id
//GET /api/users/:id
//Private/Admin
const getUserById = expressAsyncHandler(async (req, res) => {
  const user =
    (await Employee.findById(req.params.id).select('-password')) ||
    (await Customer.findById(req.params.id).select('-password'));

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

//Update user
//PUT /api/users/:id
//Private/Admin
const updateUser = expressAsyncHandler(async (req, res) => {
  const user =
    (await Employee.findById(req.params.id)) ||
    (await Customer.findById(req.params.id));

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.dateOfBirth = req.body.dateOfBirth || user.dateOfBirth;
    user.address = req.body.address || user.address;
    user.city = req.body.city || user.city;
    user.country = req.body.country || user.country;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;

    //Postavi korisnika za admina!
    if (user.JMBG === undefined && req.body.JMBG !== undefined) {
      user.JMBG = req.body.JMBG;

      await user.save();

      Customer.findOne({ _id: user._id })
        .then((doc) => {
          const firstName = doc.firstName;
          const lastName = doc.lastName;
          const dateOfBirth = doc.dateOfBirth;
          const JMBG = user.JMBG;
          const address = doc.address;
          const city = doc.city;
          const country = doc.country;
          const phoneNumber = doc.phoneNumber;
          const email = doc.email;
          const password = doc.password;

          // Inserting the doc in destination collection
          Employee.insertMany({
            firstName,
            lastName,
            dateOfBirth,
            JMBG,
            address,
            city,
            country,
            phoneNumber,
            email,
            password,
          }).then((d) => {
            res.json({
              firstName,
              lastName,
              dateOfBirth,
              address,
              city,
              country,
              phoneNumber,
            });
          });

          // Removing doc from the source collection
          Customer.deleteOne({ _id: user._id })
            .then((d) => {
              console.log('Removed customer succesfully');
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      user.JMBG = req.body.JMBG || user.JMBG;
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        dateOfBirth: updatedUser.dateOfBirth,
        address: updatedUser.address,
        city: updatedUser.body,
        country: updatedUser.country,
        phoneNumber: updatedUser.phoneNumber,
      });
    }
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
