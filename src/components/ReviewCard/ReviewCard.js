import React, { useEffect, useState } from "react";
import default_user_icon from "../App/assets/icons/default-user.svg";
import { removeMyReview, setMyReview } from "../../actions";
import { connect } from "react-redux";
import { onValue, push, ref, set, increment, remove, orderByChild } from "firebase/database";
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

	/////////////////////////////////////////////////////////////////

	const reviewsListRef = ref(database, 'reviews');
	const reviewsPostRef = push(reviewsListRef);


	const handleSetMyReview = (id) => {

		// set(reviewsPostRef, {
		// 	review: {
		// 		id: id,
		// 		likesCounter: 1
		// 	},
		// })

		// if (id) {
		// 	set(reviewsPostRef, {
		// 		movie: {
		// 			id: id,
		// 			myMark: mark,
		// 		},
		// 	}).then(() => {
		// 		getMyMarksForMovies();
		// 	})
		// } else getMyMarksForMovies();
	}

	const getMyReviewsForMovies = () => {

		onValue(reviewsListRef, (snapshot) => {
			snapshot.forEach((childSnapshot) => {
				const review = {
					key: childSnapshot.key,
					data: childSnapshot.val(),
				}

				console.log(review);
				props.handleSetMyReview(review);
			});
		});
	}

	useEffect(() => {
		getMyReviewsForMovies();
		// handleSetMyMarkForMovie();
	}, []);

	const dislikesCounter = 0;

	const handleLikeReview = async (id) => {

		// console.log(id);

		// await onValue(reviewsListRef, (snapshot) => {
		// 	snapshot.forEach((childSnapshot) => {
		// 		const review = {
		// 			key: childSnapshot.key,
		// 			data: childSnapshot.val(),
		// 		}
		// 		if (review.data.review.id === id) {
		// 			const dbRef = ref(database, "/reviews/" + review.key);
		// 			remove(dbRef).then(() => console.log("Review removed"));
		// 		} else {
		// 			set(reviewsPostRef, {
		// 				review: {
		// 					id: id,
		// 					likesCounter: review.data.review.likesCounter + 1
		// 				},
		// 			});
		// 			console.log(review.data.review.likesCounter);
		// 		}
		// 	});
		// });
	}

	const handleDislikeReview = () => {

	}

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
				{/*<button className="review-card__like-action" onClick={() => {handleLikeReview(props.review.id)}}>Like <span className="review-card__likes-counter">{likesCounter}</span></button>*/}
				<button className="review-card__like-action" onClick={() => {handleLikeReview(props.review.id)}}>Like</button>
				<button className="review-card__dislike-action" onClick={() => {handleDislikeReview(props.review.id)}}>Dislike <span className="review-card__dislikes-counter">{dislikesCounter}</span></button>
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