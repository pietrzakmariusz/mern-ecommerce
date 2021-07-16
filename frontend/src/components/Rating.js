import React from 'react';
import PropTypes from 'prop-types';

function Rating({ value, text, color = '#f8e825' }) {
	const classNameStars = [];

	for (let currentStar = 1; currentStar <= 5; currentStar++) {
		const className =
			value >= currentStar
				? 'fas fa-star'
				: value >= currentStar - 0.5
				? 'fas fa-star-half-alt'
				: 'far fa-star';
		classNameStars.push(className);
	}

	return (
		<div className='rating'>
			{classNameStars.map((classNameStar, index) => (
				<span key={index} style={{ color }} className={classNameStar} />
			))}
			<span className='ms-2'>{text && text}</span>
		</div>
	);
}

Rating.propTypes = {
	value: PropTypes.number.isRequired,
	text: PropTypes.string.isRequired,
	color: PropTypes.string,
};

export default Rating;
