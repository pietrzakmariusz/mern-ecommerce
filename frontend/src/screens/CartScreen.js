import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	Row,
	Col,
	ListGroup,
	Image,
	Form,
	Button,
	Card,
} from 'react-bootstrap';

import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cart.actions';

function CartScreen({ match, location, history }) {
	const productId = match.params.id;

	// const qty= location.search ? Number(location.search.split('=')[1]) : 1;
	const query = new URLSearchParams(location.search);
	const quantity = Number(query.get('qty')) || 1;

	const dispatch = useDispatch();

	const { cartItems } = useSelector(state => state.cart);

	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, quantity));
		}
	}, [dispatch, productId, quantity]);

	const removeFromCartHandler = id => {
		dispatch(removeFromCart(id));
	};

	const checkoutHandler = () => {
		history.push('/login?redirect=shipping');
	};

	return (
		<Row>
			<Col md={8}>
				<h1>Koszyk zakupów</h1>
				{cartItems.length === 0 ? (
					<Message>
						Brak produktów w koszyku <Link to='/'>Wróć do sklepu</Link>
					</Message>
				) : (
					<ListGroup variant='flush'>
						{cartItems.map(item => (
							<ListGroup.Item key={item.id}>
								<Row>
									<Col md={2}>
										<Image src={item.image} alt={item.name} fluid rounded />
									</Col>
									<Col md={4}>
										<Link to={`/product/${item.id}`}>{item.name}</Link>
									</Col>
									<Col md={2}>{item.price} zł</Col>
									<Col md={2}>
										<Form.Control
											as='select'
											value={item.quantity}
											onChange={e =>
												dispatch(addToCart(item.id, Number(e.target.value)))
											}
											className='form-select pe-4'
										>
											{[...Array(item.countInStock).keys()].map(x => (
												<option key={x + 1} value={x + 1}>
													{x + 1}
												</option>
											))}
										</Form.Control>
									</Col>
									<Col md={2}>
										<Button
											className='w-100'
											block
											variant='light'
											onClick={() => removeFromCartHandler(item.id)}
										>
											<span className='fas fa-trash'></span>
										</Button>
									</Col>
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>
				)}
			</Col>
			<Col md={4}>
				<Card>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<Row>
								<h3>
									Ilość sztuk:{' '}
									{cartItems.reduce((acc, item) => acc + item.quantity, 0)}
								</h3>
							</Row>
							<Row>
								<h4>
									Wartość:{' '}
									{cartItems
										.reduce((acc, item) => acc + item.quantity * item.price, 0)
										.toFixed(2)}{' '}
									zł
								</h4>
							</Row>
						</ListGroup.Item>

						<ListGroup.Item>
							<Button
								className='w-100'
								block
								disabled={cartItems.length === 0}
								onClick={checkoutHandler}
							>
								Przejdź do płatności
							</Button>
						</ListGroup.Item>
					</ListGroup>
				</Card>
			</Col>
		</Row>
	);
}

export default CartScreen;
