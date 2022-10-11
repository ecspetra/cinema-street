import React from 'react';
import RatingIcon from "../App/assets/icons/Rating";

const Rating = (props) => {

	return (
		<span className="rating">
			<RatingIcon className="rating__icon" />
			<span className="rating__text">{(props.movie.vote_average).toFixed(1)}</span>
			{
				props.isRatingCount && <span className="rating__count">{props.movie.vote_count} voters</span>
			}
		</span>
	)
}

export default Rating;