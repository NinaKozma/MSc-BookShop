import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/connectDB.js';
import productRoutes from './routes/productRouter.js';
import userRoutes from './routes/userRouter.js';
import orderRoutes from './routes/orderRouter.js';
import uploadRoutes from './routes/uploadRouter.js';
import writerRoutes from './routes/writerRouter.js';
import genreRoutes from './routes/genreRouter.js';
import supplierRoutes from './routes/supplierRouter.js';
import publisherRoutes from './routes/publisherRouter.js';
import reportRoutes from './routes/reportRouter.js';

dotenv.config();

connectDB(); //konekcija sa bazom

const app = express(); //inicijalizacija expressa

//ovo ce mi omoguciti da prihvatam json data u body delu req-a
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/writers', writerRoutes);
app.use('/api/genres', genreRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/publishers', publisherRoutes);
app.use('/api/reports', reportRoutes);

//Prilikom placanja, ide na ovu putanju kako bi uzeo client id
app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

//potrebno je da folder uploads bude dostupan i na frontu, odnosno folder mora da bude static
//--serving static files--
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

//Error middleware - resurs ne postoji
app.use(notFound);
//Error middleware - bilo koji tip greske
app.use(errorHandler);

const PORT = process.env.PORT || 5000; //5000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
