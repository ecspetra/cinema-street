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
							userID={props.currentUser.uid}
							movieID={props.movieID}
							reviewID={item.data.review.id}
							key={index}
							userIconPath={item.data.review.userAvatar}
							userName={item.data.review.displayName}
							reviewText={item.data.review.reviewText}
							reviewDate={item.data.review.reviewDate}
							likes={item.data.review.likes}
							dislikes={item.data.review.dislikes}
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
							likes: 0,
							dislikes: 0,
						}

						const reviewReplies = [];

						usersReviews.map((item) => {
							if (review.id === item.data.review.id) {
								if (item.data.review.likes && item.data.review.dislikes) {
									reviewReactions.likes = item.data.review.likes;
									reviewReactions.dislikes = item.data.review.dislikes;
								} else if (item.data.review.likes) {
									reviewReactions.likes = item.data.review.likes;
								} else if (item.data.review.dislikes) {
									reviewReactions.dislikes = item.data.review.dislikes;
								}
								return reviewReactions;
							}
						});

						usersReviews.map((item) => {
							if (item.data.review.replies.length && review.id === item.data.review.id) {
								item.data.review.replies.map((reply) => {
									return reviewReplies.push(reply);
								})
							}
							return reviewReplies;
						});

						return <ReviewCard
							userID={'userFromAPI'}
							movieID={props.movieID}
							reviewID={review.id}
							key={index}
							userIconPath={review.author_details.avatar_path}
							userName={review.author_details.username}
							reviewText={review.content}
							reviewDate={review.created_at}
							likes={reviewReactions.likes !== undefined ? reviewReactions.likes : 0}
							dislikes={reviewReactions.dislikes !== undefined ? reviewReactions.dislikes : 0}
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
	currentUser: state.user.currentUser,
})

export default connect(mapStateToProps)(ReviewsList);