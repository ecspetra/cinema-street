import React from "react";
import ReviewCard from "../ReviewCard/ReviewCard";

const ReviewsList = (props) => {

	const reviews = props.reviews;

	return (
		<div className="reviews-list">
			{
				reviews && reviews.map((review, index) => {
					if (index <= 7) {
						return <ReviewCard review={review} key={index} />
					}
				})
			}
		</div>
	)
}

export default ReviewsList;