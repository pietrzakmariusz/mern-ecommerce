import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

import Rating from './Rating';

function Product({ product }) {
	return (
		<Card className='h-100 my-3 p-3 rounded'>
			<Link to={`/product/${product._id}`}>
				<Card.Img src={product.image} variant='top' />
			</Link>

			<Card.Body className='d-flex flex-column justify-content-between'>
				<Link to={`/product/${product._id}`}>
					<Card.Title as='div'>
						<strong>{product.name}</strong>
					</Card.Title>
				</Link>

				<Card.Text as='div'>
					<Rating value={product.rating} text={`${product.numReviews} ocen`} />
				</Card.Text>

				<Card.Text as='h3' className='text-lowercase'>
					{product.price} zł
				</Card.Text>
			</Card.Body>
		</Card>
	);
}

Product.propTypes = {
	product: PropTypes.object.isRequired,
};

export default Product;
