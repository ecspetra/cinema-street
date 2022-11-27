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

					const reviewFromAPI = apiReviews.find(review => review.id === item.data.review.id);

					if (reviewFromAPI) {
						return null;
					} else if (props.movieID === item.data.review.movieID && index <= 7) {
						return <ReviewCard
							movieID={props.movieID}
							reviewID={item.data.review.id}
							key={index}
							userIconPath={item.data.review.userAvatar}
							userName={item.data.review.displayName}
							reviewText={item.data.review.reviewText}
							reviewDate={item.data.review.reviewDate}
							likesCounter={item.data.review.likesCounter}
							dislikesCounter={item.data.review.dislikesCounter}
							replies={item.data.review.replies}
							isProjectUser
						/>
					}
				})
			}
			{
				apiReviews && apiReviews.map((review, index) => {
					if (index <= 7) {

						const reviewReactions = {
							likesCounter: 0,
							dislikesCounter: 0,
						}

						const reviewReplies = [];

						usersReviews.map((item) => {
							if (review.id === item.data.review.id) {

								reviewReactions.likesCounter = item.data.review.likesCounter;
								reviewReactions.dislikesCounter = item.data.review.dislikesCounter;

								return reviewReactions;
							}
						});

						usersReviews.map((item, index) => {
							if (item.data.review.replies.length && review.id === item.data.review.id) {
								item.data.review.replies.map((reply) => {
									return reviewReplies.push(reply);
								})
							}
							return reviewReplies;
						});

						return <ReviewCard
							movieID={props.movieID}
							reviewID={review.id}
							key={index}
							userIconPath={review.author_details.avatar_path}
							userName={review.author_details.username}
							reviewText={review.content}
							reviewDate={review.created_at}
							likesCounter={reviewReactions.likesCounter ?? 0}
							dislikesCounter={reviewReactions.dislikesCounter ?? 0}
							replies={reviewReplies.length ? reviewReplies : 0}
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