import React, { forwardRef, useEffect, useState } from "react";
import ReviewCard from "../ReviewCard/ReviewCard";
import { connect } from "react-redux";
import { onValue, ref } from "firebase/database";
import { setMyReview } from "../../actions";
import MoreButton from "../MoreButton/MoreButton";
import InfoText from "../InfoText/InfoText";
import './assets/index.scss';
import { database } from "../../firebase";

const ReviewsList = forwardRef((props, reviewCardRef) => {

	const { movieID, handleSetMyReview } = props;

	const reviewsListRef = ref(database, 'reviews');
	const apiReviews = props.reviews;
	const usersReviews = props.usersReviews;
	const initialListLength = 4;
	const [maxResultsLength, setMaxResultsLength] = useState(initialListLength);

	const getReviewsList = () => {
		if (generalReviews.length >= maxResultsLength) {
			setMaxResultsLength(maxResultsLength + 5);
		} else {
			setMaxResultsLength(initialListLength);
		}
	}

	const getMyReviewsForMovies = () => {
		onValue(reviewsListRef, (snapshot) => {
			snapshot.forEach((childSnapshot) => {
				const review = {
					key: childSnapshot.key,
					data: childSnapshot.val(),
				}
				handleSetMyReview(review);
			});
		});
	}

	const getAPIReviews = (review) => {

		const reviewReactions = {
			likes: 0,
			dislikes: 0,
		}

		const reviewReplies = [];

		usersReviews.map((usersReview) => {
			if (review.id === usersReview.data.review.id) {
				if (usersReview.data.review.likes && usersReview.data.review.dislikes) {
					reviewReactions.likes = usersReview.data.review.likes;
					reviewReactions.dislikes = usersReview.data.review.dislikes;
				} else if (usersReview.data.review.likes) {
					reviewReactions.likes = usersReview.data.review.likes;
				} else if (usersReview.data.review.dislikes) {
					reviewReactions.dislikes = usersReview.data.review.dislikes;
				}
				return reviewReactions;
			}
		});

		usersReviews.map((usersReview) => {
			if (usersReview.data.review.replies && review.id === usersReview.data.review.id) {
				usersReview.data.review.replies.map((reply) => {
					return reviewReplies.push(reply);
				})
			}
			return reviewReplies;
		});

		return <ReviewCard
			ref={reviewCardRef}
			getMyReviewsForMovies={getMyReviewsForMovies}
			userID={'userFromAPI'}
			movieID={movieID}
			reviewID={review.id}
			key={review.id}
			userIconPath={review.author_details.avatar_path}
			userName={review.author_details.username}
			reviewText={review.content}
			reviewDate={review.created_at}
			likes={reviewReactions.likes !== undefined ? reviewReactions.likes : 0}
			dislikes={reviewReactions.dislikes !== undefined ? reviewReactions.dislikes : 0}
			replies={reviewReplies.length ? reviewReplies : 0}
		/>
	}

	const getUsersReviews = (review) => {

		return <ReviewCard
			ref={reviewCardRef}
			getMyReviewsForMovies={getMyReviewsForMovies}
			userID={review.data.review.userID}
			movieID={movieID}
			reviewID={review.data.review.id}
			key={review.data.review.id}
			userName={review.data.review.displayName}
			reviewText={review.data.review.reviewText}
			reviewDate={review.data.review.reviewDate}
			likes={review.data.review.likes}
			dislikes={review.data.review.dislikes}
			replies={review.data.review.replies}
		/>
	}

	const getAllReviews = () => {

		const allReviews = [];

		usersReviews.map((review) => {
			const reviewExistsInAPI = apiReviews.find(apiReview => apiReview.id === review.data.review.id);

			if (movieID === review.data.review.movieID && !reviewExistsInAPI) {
				allReviews.push(review);
			}
		});

        allReviews.push(...apiReviews);

		return allReviews;
	}

	const generalReviews = getAllReviews();
	const isShowMoreButton = generalReviews.length !== 0 && generalReviews.length > initialListLength;

	useEffect(() => {
		getMyReviewsForMovies();
	}, []);

	useEffect(() => {
		getAllReviews();
	}, []);

	return (
		<>
			{
				generalReviews.length !== 0 ? (
						<div className="reviews-list">
							{generalReviews.length && generalReviews.map((review, index) => {
								if (index < maxResultsLength) {
									if (review.url) {
										const apiReview = getAPIReviews(review);
										return apiReview;
									} else {
										const userReview = getUsersReviews(review);
										return userReview;
									}
								}
							})}
							{
								isShowMoreButton && <MoreButton listLength={generalReviews.length} maxListLength={maxResultsLength} moreButtonOnClickFunction={getReviewsList} />
							}
						</div>
					)
					: <InfoText>No reviews yet</InfoText>
			}
		</>

	)
})

const mapStateToProps = state => ({
	usersReviews: state.reviews.uploadedReviews,
})

const mapDispatchToProps = (dispatch) => {
	return {
		handleSetMyReview: (review) => dispatch(setMyReview(review)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(ReviewsList);