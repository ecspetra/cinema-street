import React from "react";
import ReviewCard from "../ReviewCard/ReviewCard";
import { connect } from "react-redux";

const ReviewsList = (props) => {

	const apiReviews = props.reviews;
	const usersReviews = props.usersReviews;

	return (
		<div className="reviews-list">
			{
				usersReviews && usersReviews.map((item, index) => {
					if (props.movieID === item.data.review.movieID && index <= 7) {
						return <ReviewCard
							movieID={props.movieID}
							review={item}
							key={index}
							userIconPath={item.data.review.userAvatar}
							userName={item.data.review.displayName}
							reviewText={item.data.review.reviewText}
							reviewDate={item.data.review.reviewDate}
							isProjectUser
						/>
					}
				})
			}
			{
				apiReviews && apiReviews.map((review, index) => {
					if (index <= 7) {
						return <ReviewCard
							review={review}
							key={index}
							userIconPath={review.author_details.avatar_path}
							userName={review.author_details.username}
							reviewText={review.content}
							reviewDate={review.created_at}
						/>
					}
				})
			}
		</div>
	)
}

const mapStateToProps = state => ({
	usersReviews: state.reviews.uploadedReviews,
})

export default connect(mapStateToProps)(ReviewsList);