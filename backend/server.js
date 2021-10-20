import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import cors from 'cors'

import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';

// loads environment vars from .env into process.env.
// Call as early as possible.
dotenv.config();

connectDB();

// initialize server.
const app = express();

// Concise output colored by response status for development use.
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// It parses incoming requests with JSON payloads.
// looks at requests where the Content-Type header matches application/json.
app.use(express.json());

app.use(cors())
// routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// returns the absolute path of the current working directory.
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.get('/', (req, res) => res.send('API is running...'));

// in case the request url didn't match any of the above routes.
app.use(notFound);
// catchs all errors
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
