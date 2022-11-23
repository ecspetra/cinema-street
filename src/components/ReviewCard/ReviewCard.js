import React, { useEffect, useState } from "react";
import default_user_icon from "../App/assets/icons/default-user.svg";
import { removeMyReview, setMyReview } from "../../actions";
import { connect } from "react-redux";
import {onValue, push, set, ref, increment} from "firebase/database";
import { database } from "../../firebase";
import moment from "moment";

const ReviewCard = (props) => {

	const [showMore, setShowMore] = useState(false);

	const REVIEW_TEXT = props.reviewText;
	const isLongReviewText = REVIEW_TEXT.length > 300;

	useEffect(() => {
		if (isLongReviewText) {
			REVIEW_TEXT.substring(0, 300);
		}
	}, [REVIEW_TEXT]);

	const addDefaultSrc = (event) => {
		event.target.src = default_user_icon;
	}

	const reviewsListRef = ref(database, 'reviews');
	const reviewsPostRef = push(reviewsListRef);

	const getMyReviewsForMovies = () => {
		onValue(reviewsListRef, (snapshot) => {
			snapshot.forEach((childSnapshot) => {
				const review = {
					key: childSnapshot.key,
					data: childSnapshot.val(),
				}
				props.handleSetMyReview(review);
			});
		});
	}

	useEffect(() => {
		getMyReviewsForMovies();
	}, []);

	const handleLikeReview = (reviewID) => {

		console.log(reviewID);

		const reviewsWithLikesFromFirebase = [];

		if (props.usersReviews.length) {
			onValue(reviewsListRef, (snapshot) => {
				snapshot.forEach((childSnapshot) => {
					const review = {
						key: childSnapshot.key,
						data: childSnapshot.val(),
					}
					reviewsWithLikesFromFirebase.push(review);
				});
			});
		} else {
			set(reviewsPostRef, {
				review: {
					movieID: props.movieID,
					id: reviewID,
					likesCounter: 1,
					dislikesCounter: props.dislikesCounter,
					userAvatar: props.userIconPath,
					displayName: props.userName,
					reviewText: props.reviewText,
					reviewDate: props.reviewDate,
				},
			});
		}

		reviewsWithLikesFromFirebase.map((item, index) => {

			const newReview = !reviewsWithLikesFromFirebase.find(item => item.data.review.id === reviewID);

			if (item.data.review.id === reviewID) {

				const dbRef = ref(database, "/reviews/" + item.key);

				set(dbRef, {
					review: {
						movieID: item.data.review.movieID,
						id: item.data.review.id,
						likesCounter: increment(1),
						dislikesCounter: item.data.review.dislikesCounter,
						userAvatar: item.data.review.userAvatar,
						displayName: item.data.review.displayName,
						reviewText: item.data.review.reviewText,
						reviewDate: item.data.review.reviewDate,
					}
				});

			} else if (newReview) {
				set(reviewsPostRef, {
					review: {
						movieID: props.movieID,
						id: reviewID,
						likesCounter: 1,
						dislikesCounter: props.dislikesCounter,
						userAvatar: props.userIconPath,
						displayName: props.userName,
						reviewText: props.reviewText,
						reviewDate: props.reviewDate,
					},
				});
			}
		});

		getMyReviewsForMovies();
	}

	const handleDislikeReview = (reviewID) => {

		const reviewsWithDislikesFromFirebase = [];

		if (props.usersReviews.length) {
			onValue(reviewsListRef, (snapshot) => {
				snapshot.forEach((childSnapshot) => {
					const review = {
						key: childSnapshot.key,
						data: childSnapshot.val(),
					}
					reviewsWithDislikesFromFirebase.push(review);
				});
			});
		} else {
			set(reviewsPostRef, {
				review: {
					movieID: props.movieID,
					id: reviewID,
					likesCounter: props.likesCounter,
					dislikesCounter: 1,
					userAvatar: props.userIconPath,
					displayName: props.userName,
					reviewText: props.reviewText,
					reviewDate: props.reviewDate,
				},
			});
		}

		reviewsWithDislikesFromFirebase.map((item, index) => {

			const newReview = !reviewsWithDislikesFromFirebase.find(item => item.data.review.id === reviewID);

			if (item.data.review.id === reviewID) {

				const dbRef = ref(database, "/reviews/" + item.key);

				set(dbRef, {
					review: {
						movieID: item.data.review.movieID,
						id: item.data.review.id,
						likesCounter: item.data.review.likesCounter,
						dislikesCounter: increment(1),
						userAvatar: item.data.review.userAvatar,
						displayName: item.data.review.displayName,
						reviewText: item.data.review.reviewText,
						reviewDate: item.data.review.reviewDate,
					}
				});

			} else if (newReview) {
				set(reviewsPostRef, {
					review: {
						movieID: props.movieID,
						id: reviewID,
						likesCounter: props.likesCounter,
						dislikesCounter: 1,
						userAvatar: props.userIconPath,
						displayName: props.userName,
						reviewText: props.reviewText,
						reviewDate: props.reviewDate,
					},
				});
			}
		});

		getMyReviewsForMovies();
	}

	console.log(props.review);

	return (
		<div className="review-card">
			<div className="review-card__user-wrap">
				<img className="review-card__user-avatar" onError={addDefaultSrc} src={props.userIconPath === null ? default_user_icon : props.userIconPath} alt="user-avatar" />
				<div className="review-card__user-info">
					<div className="review-card__username">
						{props.userName}
						{
							props.isProjectUser && <span className="review-card__user-label">CinemaStreet user</span>
						}
					</div>
					<div className="review-card__review-date">{moment(props.reviewDate).format("M.D.Y")}</div>
				</div>
			</div>
			{(isLongReviewText && !showMore) ? <span className="review-card__text">{REVIEW_TEXT.substring(0, 300) + ' '}</span> : <span className="review-card__text">{REVIEW_TEXT}</span>}
			{isLongReviewText && <button className="review-card__more-button" onClick={() => {setShowMore(!showMore)}}>{showMore ? 'Show less' : 'Show more'}</button>}
			<div className="review-card__actions">
				<button className="review-card__like-action" onClick={() => {handleLikeReview(props.reviewID)}}>Like <span className="review-card__likes-counter">{props.likesCounter}</span></button>
				<button className="review-card__dislike-action" onClick={() => {handleDislikeReview(props.reviewID)}}>Dislike <span className="review-card__dislikes-counter">{props.dislikesCounter}</span></button>
				<button className="review-card__reply-action">Reply</button>
			</div>
		</div>
	)
}

const mapStateToProps = state => ({
	usersReviews: state.reviews.uploadedReviews,
})

const mapDispatchToProps = (dispatch) => {
	return {
		handleSetMyReview: (review) => dispatch(setMyReview(review)),
		handleRemoveMyReview: (id) => dispatch(removeMyReview(id))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewCard);