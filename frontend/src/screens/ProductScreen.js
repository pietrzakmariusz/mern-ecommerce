import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import axios from 'axios';

import Rating from '../components/Rating';

function ProductScreen({ match }) {
	const [product, setProduct] = useState({});

	useEffect(() => {
		const fetchProduct = async () => {
			const { data } = await axios.get(`/api/product/${match.params.id}`);

			setProduct(data);
		};

		fetchProduct();
	}, [match.params.id]);
	// const product = products.find(product => product._id === match.params.id);

	const availability =
		product.countInStock > 0 ? (
			<p className='text-succes'>Na stanie</p>
		) : (
			<p className='text-danger'>Wyprzedane</p>
		);

	return (
		<>
			<Link className='btn btn-light my-3' to='/'>
				&lt; Wróć
			</Link>
			<Row>
				<Col md={12} xl={6}>
					<Image
						className='mx-auto d-block pb-5'
						src={product.image}
						alt={product.name}
						fluid
					/>
				</Col>
				<Col md={6} xl={3}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>{product.name}</h2>
						</ListGroup.Item>

						<ListGroup.Item>
							<Rating
								value={product.rating}
								text={`${product.numReviews} ocen`}
							/>
						</ListGroup.Item>

						<ListGroup.Item>Opis: {product.description}</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={6} xl={3}>
					<Card>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<Row>
									<Col>Cena:</Col>
									<Col>
										<strong>{product.price} zł</strong>
									</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Dostępność:</Col>
									<Col>{availability}</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Button
									className='w-100'
									block
									disabled={product.countInStock === 0}
								>
									Dodaj do koszyka
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
}

export default ProductScreen;
