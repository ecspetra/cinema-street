import React from 'react';
import RatingIcon from "../App/assets/icons/Rating";

const Rating = (props) => {

	const getCountOfFilledStars = () => {

		const movieRating = getRoundedMovieRating();
		let filledStarsCount = 0;
		let filledStarsCountArray = [];

		while (movieRating > filledStarsCount) {
			filledStarsCount += 0.5;
			filledStarsCountArray.push(filledStarsCount);
		}

		return filledStarsCountArray;
	}

	const getMovieRating = () => {
		let stars = [];
		const movieRating = getRoundedMovieRating();
		const fullStar = <RatingIcon className="rating__icon" />;
		const halfStar = <RatingIcon className="rating__icon rating__icon--half" isHalf />;
		const emptyStar = <RatingIcon className="rating__icon rating__icon--empty" isEmpty />;
		const maxRatingAvailable = 10;

		// for (let currentStarIteration = 1; currentStarIteration <= maxRatingAvailable; currentStarIteration++) {
		// 	// if movie rating is bigger than current iteration, then it's a full star. I.e. rating 6 is bigger than starIteration 1
		// 	if (movieRating >= currentStarIteration) {
		// 		stars.push(fullStar);
		// 	//if rating is the same as currentStarIteration with substracted 0.5, then it's a half star
		// 	} else if (movieRating == currentStarIteration - 0.5) {
		// 		stars.push(halfStar);
		// 	// in other cases it's an empty star. I.e. rating 6 is lower that currentStarIteration 9
		// 	} else {
		// 		stars.push(emptyStar);
		// 	}
		// }


		// const filledStars = getCountOfFilledStars();
		// // console.log(filledStars);
		// // console.log(filledStars[Math.round(filledStars.length - 1)]);
		// // console.log(filledStars[Math.round(filledStars.length - 2)]);
		// // console.log(Math.floor(filledStars[filledStars.length - 1]));
		// // console.log(filledStars[filledStars.length - 2]);
		// // console.log(Number(props.movie.vote_average.toFixed(1)));
		//
		//
		// const ratingArray = [];
		//
		// // console.log(filledStars[filledStars.length - 2] === Number(props.movie.vote_average.toFixed(1)), filledStars[filledStars.length - 2], Number(props.movie.vote_average.toFixed(1)));
		// // console.log(filledStars[filledStars.length - 2] === Number(props.movie.vote_average.toFixed(1)), filledStars[filledStars.length - 2], Number(props.movie.vote_average.toFixed(1)));
		//

		const filledStars = getCountOfFilledStars();

		Array.apply(null, { length: maxRatingAvailable }).map((item, index) => {

			let starIndex = index + 1;
			let lastStar = filledStars[filledStars.length - 1];

			if (starIndex <= lastStar) {
				stars.push(fullStar);
			} else if (starIndex - 0.5 == lastStar) {
				stars.push(halfStar);
			} else stars.push(emptyStar);
		});


		return stars;
	}

	const getRoundedMovieRating = () => {
		let rating = props.movie.vote_average;

		return (Math.round(rating * 2) / 2).toFixed(1);
	}

	const rating = getMovieRating();

	return (
		<span className="rating">
			{
				props.isShowExtendRating ? rating : <RatingIcon className="rating__icon" />
			}
			<span className="rating__text">{(props.movie.vote_average).toFixed(1)}</span>
			{
				props.isRatingCount && <span className="rating__count">{props.movie.vote_count} voters</span>
			}
		</span>
	)
}

export default Rating;