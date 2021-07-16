import express from 'express';
import dotenv from 'dotenv';
import products from './data/products.js';

dotenv.config();

const app = express();

app.get('/', (req, res) => {
	res.send('API is running...');
});

app.get('/api/products', (req, res) => {
	res.json(products);
});

app.get('/api/product/:id', (req, res) => {
	const product = products.find(product => product._id === req.params.id);
	res.json(product);
});

const PORT = process.env.PORT || 5000;

app.listen(
	PORT,
	console.log(
		`Serwer uruchomiony w trybie ${process.env.NODE_ENV} i nasłuchuje na porcie ${PORT}`
	)
);
