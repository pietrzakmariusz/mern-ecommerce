import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';

import Message from '../components/Message';
import Loader from '../components/Loader';
import Rating from '../components/Rating';

import { listProductDetails } from '../actions/product.actions';

function ProductScreen({ match }) {
	const dispatch = useDispatch();

	const { loading, error, product } = useSelector(
		state => state.productDetails
	);

	useEffect(() => {
		dispatch(listProductDetails(match.params.id));
	}, [dispatch, match]);

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
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
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
			)}
		</>
	);
}

export default ProductScreen;
