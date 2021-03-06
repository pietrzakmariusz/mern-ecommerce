import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';

import connectDB from './config/db.js';

import productRoutes from './routes/product.routes.js';
import usersRoutes from './routes/user.routes.js';

import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
	res.send('API is running...');
});

app.use('/api/products', productRoutes);
app.use('/api/users', usersRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
	PORT,
	console.log(
		`Serwer uruchomiony w trybie ${process.env.NODE_ENV} i nasłuchuje na porcie ${PORT}`
			.yellow.bold
	)
);
