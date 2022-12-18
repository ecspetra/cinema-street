import React from 'react';
import RatingIcon from "../App/assets/icons/Rating";
import getRatingStars from "../../functions/getRatingStars";

const Rating = (props) => {

	const { movie, isShowExtendRating, isRatingCount } = props;

	const extendRating = getRatingStars(movie.vote_average);

	return (
		<span className="rating">
			{
				isShowExtendRating ? extendRating : <RatingIcon className="rating__icon" />
			}
			<span className="rating__text">{(movie.vote_average).toFixed(1)}</span>
			{
				isRatingCount && <span className="rating__count">{movie.vote_count} voters</span>
			}
		</span>
	)
}

export default Rating;