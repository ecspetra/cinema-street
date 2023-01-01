import RatingIcon from "../components/App/assets/icons/Rating";

const getCountOfFilledStars = (voteAverage) => {

	const movieRating = getRoundedMovieRating(voteAverage);
	let filledStarsCount = 0;
	let filledStarsCountArray = [];

	while (movieRating > filledStarsCount) {
		filledStarsCount += 0.5;
		filledStarsCountArray.push(filledStarsCount);
	}

	return filledStarsCountArray;
}

const getMovieRating = (voteAverage) => {
	let stars = [];

	const maxRatingAvailable = 10;

	const filledStars = getCountOfFilledStars(voteAverage);

	Array.apply(null, { length: maxRatingAvailable }).map((item, index) => {

		let starIndex = index + 1;
		let lastStar = filledStars[filledStars.length - 1];

		const fullStar = <RatingIcon key={index} />;
		const halfStar = <RatingIcon key={index} className="star--half" isHalf />;
		const emptyStar = <RatingIcon key={index} className="star--empty" isEmpty />;

		if (starIndex <= lastStar) {
			stars.push(fullStar);
		} else if (starIndex - 0.5 == lastStar) {
			stars.push(halfStar);
		} else {
			stars.push(emptyStar);
		}
	});

	return stars;
}

const getRoundedMovieRating = (voteAverage) => {
	let rating = voteAverage;
	return (Math.round(rating * 2) / 2).toFixed(1);
}

export default getMovieRating;