import React, { useEffect, useState } from "react";
import default_user_icon from "../App/assets/icons/default-user.svg";
import { removeMyReview, setMyReview } from "../../actions";
import { connect } from "react-redux";
import {onValue, push, set, ref, increment} from "firebase/database";
import { database } from "../../firebase";
import moment from "moment";
import NewReviewForm from "../NewReviewForm/NewReviewForm";
import ReactionIcon from "../App/assets/icons/ReactionIcon";
import ReplyCard from "../ReplyCard/ReplyCard";
import classNames from "classnames";

const ReviewCard = (props) => {

	const [showMore, setShowMore] = useState(false);
	const [isShowReplyForm, setIsShowReplyForm] = useState(false);
	const [isLikedReview, setIsLikedReview] = useState(false);
	const [isDislikedReview, setIsDislikedReview] = useState(false);

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
					likesCounter: increment(1),
					dislikesCounter: props.dislikesCounter,
					userAvatar: props.userIconPath,
					displayName: props.userName,
					reviewText: props.reviewText,
					reviewDate: props.reviewDate,
					replies: props.replies,
				},
			});
		}

		reviewsWithLikesFromFirebase.map((item) => {

			const newReview = !reviewsWithLikesFromFirebase.find(item => item.data.review.id === reviewID);

			if (item.data.review.id === reviewID) {

				const reviewRef = ref(database, "/reviews/" + item.key);

				set(reviewRef, {
					review: {
						movieID: item.data.review.movieID,
						id: item.data.review.id,
						likesCounter: !isLikedReview ? increment(1) : increment(-1),
						dislikesCounter: item.data.review.dislikesCounter,
						userAvatar: item.data.review.userAvatar,
						displayName: item.data.review.displayName,
						reviewText: item.data.review.reviewText,
						reviewDate: item.data.review.reviewDate,
						replies: item.data.review.replies,
					}
				});
			} else if (newReview) {
				set(reviewsPostRef, {
					review: {
						movieID: props.movieID,
						id: reviewID,
						likesCounter: increment(1),
						dislikesCounter: props.dislikesCounter,
						userAvatar: props.userIconPath,
						displayName: props.userName,
						reviewText: props.reviewText,
						reviewDate: props.reviewDate,
						replies: props.replies,
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
					dislikesCounter: increment(1),
					userAvatar: props.userIconPath,
					displayName: props.userName,
					reviewText: props.reviewText,
					reviewDate: props.reviewDate,
					replies: props.replies,
				},
			});
		}

		reviewsWithDislikesFromFirebase.map((item) => {

			const newReview = !reviewsWithDislikesFromFirebase.find(item => item.data.review.id === reviewID);

			if (item.data.review.id === reviewID) {

				const reviewRef = ref(database, "/reviews/" + item.key);

				set(reviewRef, {
					review: {
						movieID: item.data.review.movieID,
						id: item.data.review.id,
						likesCounter: item.data.review.likesCounter,
						dislikesCounter: !isDislikedReview ? increment(1) : increment(-1),
						userAvatar: item.data.review.userAvatar,
						displayName: item.data.review.displayName,
						reviewText: item.data.review.reviewText,
						reviewDate: item.data.review.reviewDate,
						replies: item.data.review.replies,
					}
				});
			} else if (newReview) {
				set(reviewsPostRef, {
					review: {
						movieID: props.movieID,
						id: reviewID,
						likesCounter: props.likesCounter,
						dislikesCounter: increment(1),
						userAvatar: props.userIconPath,
						displayName: props.userName,
						reviewText: props.reviewText,
						reviewDate: props.reviewDate,
						replies: props.replies,
					},
				});
			}
		});

		getMyReviewsForMovies();
	}

	const handleReplyOnReview = (replyInfo, reviewID) => {

		const reviewsFromFirebase = [];

		if (props.usersReviews.length) {
			onValue(reviewsListRef, (snapshot) => {
				snapshot.forEach((childSnapshot) => {
					const review = {
						key: childSnapshot.key,
						data: childSnapshot.val(),
					}
					reviewsFromFirebase.push(review);
				});
			});
		} else {
			set(reviewsPostRef, {
				review: {
					movieID: props.movieID,
					id: reviewID,
					likesCounter: props.likesCounter,
					dislikesCounter: props.dislikesCounter,
					userAvatar: props.userIconPath,
					displayName: props.userName,
					reviewText: props.reviewText,
					reviewDate: props.reviewDate,
					replies: [replyInfo],
				},
			});
		}

		reviewsFromFirebase.map((item) => {

			const newReview = !reviewsFromFirebase.find(item => item.data.review.id === reviewID);

			if (item.data.review.id === reviewID) {

				const reviewRef = ref(database, "/reviews/" + item.key);

				set(reviewRef, {
					review: {
						movieID: item.data.review.movieID,
						id: item.data.review.id,
						likesCounter: item.data.review.likesCounter,
						dislikesCounter: item.data.review.dislikesCounter,
						userAvatar: item.data.review.userAvatar,
						displayName: item.data.review.displayName,
						reviewText: item.data.review.reviewText,
						reviewDate: item.data.review.reviewDate,
						replies: [...item.data.review.replies, replyInfo],
					}
				});
			} else if (newReview || item.data.review.replies === undefined) {
				set(reviewsPostRef, {
					review: {
						movieID: props.movieID,
						id: reviewID,
						likesCounter: props.likesCounter,
						dislikesCounter: props.dislikesCounter,
						userAvatar: props.userIconPath,
						displayName: props.userName,
						reviewText: props.reviewText,
						reviewDate: props.reviewDate,
						replies: [replyInfo],
					},
				});
			}
		});

		setIsShowReplyForm(false);

		getMyReviewsForMovies();
	}


	const handleLikeReply = (replyID, reviewID, isLikedReply) => {

		let reviewToChange = props.usersReviews.find(item => item.data.review.id === reviewID);

		const reviewRef = ref(database, "/reviews/" + reviewToChange.key);

		let repliesUpdated = reviewToChange.data.review.replies.map((reply) => {
			const updatedReplyInfo = {
				movieID: reply.movieID,
				id: reply.id,
				likesCounter: !isLikedReply ? increment(1) : increment(-1),
				dislikesCounter: reply.dislikesCounter,
				userAvatar: reply.userAvatar,
				displayName: reply.displayName,
				replyText: reply.replyText,
				replyDate: reply.replyDate,
			}

			if (reply.id === replyID) {
				return updatedReplyInfo;
			}

			return reply;
		});

		set(reviewRef, {
			review: {
				movieID: reviewToChange.data.review.movieID,
				id: reviewToChange.data.review.id,
				likesCounter: reviewToChange.data.review.likesCounter,
				dislikesCounter: reviewToChange.data.review.dislikesCounter,
				userAvatar: reviewToChange.data.review.userAvatar,
				displayName: reviewToChange.data.review.displayName,
				reviewText: reviewToChange.data.review.reviewText,
				reviewDate: reviewToChange.data.review.reviewDate,
				replies: repliesUpdated,
			}
		});

		getMyReviewsForMovies();
	}

	const handleDislikeReply = (replyID, reviewID, isDislikedReply) => {

		let reviewToChange = props.usersReviews.find(item => item.data.review.id === reviewID);

		const reviewRef = ref(database, "/reviews/" + reviewToChange.key);

		let repliesUpdated = reviewToChange.data.review.replies.map((reply) => {
			const updatedReplyInfo = {
				movieID: reply.movieID,
				id: reply.id,
				likesCounter: reply.likesCounter,
				dislikesCounter: !isDislikedReply ? increment(1) : increment(-1),
				userAvatar: reply.userAvatar,
				displayName: reply.displayName,
				replyText: reply.replyText,
				replyDate: reply.replyDate,
			}

			if (reply.id === replyID) {
				return updatedReplyInfo;
			}

			return reply;
		});

		set(reviewRef, {
			review: {
				movieID: reviewToChange.data.review.movieID,
				id: reviewToChange.data.review.id,
				likesCounter: reviewToChange.data.review.likesCounter,
				dislikesCounter: reviewToChange.data.review.dislikesCounter,
				userAvatar: reviewToChange.data.review.userAvatar,
				displayName: reviewToChange.data.review.displayName,
				reviewText: reviewToChange.data.review.reviewText,
				reviewDate: reviewToChange.data.review.reviewDate,
				replies: repliesUpdated,
			}
		});

		getMyReviewsForMovies();
	}

	const handleReviewReactionLikeButtonClick = (reviewID) => {
		handleLikeReview(reviewID);
		setIsLikedReview(prevState => !prevState);
	}

	const handleReviewReactionDislikeButtonClick = (reviewID) => {
		handleDislikeReview(reviewID);
		setIsDislikedReview(prevState => !prevState);
	}

	const reviewLikeActionClassNames = classNames('review-card__action-item', {
		'review-card__action-item--active': isLikedReview,
	});

	const reviewDislikeActionClassNames = classNames('review-card__action-item', {
		'review-card__action-item--active': isDislikedReview,
	});

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
				<button className={reviewLikeActionClassNames} onClick={() => {handleReviewReactionLikeButtonClick(props.reviewID)}}><ReactionIcon isLike />Like
					{
						props.likesCounter !== 0 && <span className="review-card__likes-counter">{props.likesCounter}</span>
					}
				</button>
				<button className={reviewDislikeActionClassNames} onClick={() => {handleReviewReactionDislikeButtonClick(props.reviewID)}}><ReactionIcon />Dislike
					{
						props.dislikesCounter !== 0 && <span className="review-card__dislikes-counter">{props.dislikesCounter}</span>
					}
				</button>
				<button className="review-card__action-item" onClick={() => {setIsShowReplyForm(true)}}>Reply</button>
			</div>
			{
				props.replies && <div className="review-card__replies-list">
					{
						props.replies.map((item, index) => {
							return <ReplyCard
								reply={item}
								handleLikeReply={handleLikeReply}
								handleDislikeReply={handleDislikeReply}
								reviewID={props.reviewID}
								key={index}
								userIconPath={item.userAvatar}
								userName={item.displayName}
								replyText={item.replyText}
								reviewDate={item.replyDate}
								likesCounter={item.likesCounter ?? 0}
								dislikesCounter={item.dislikesCounter ?? 0}
							/>
						})
					}
				</div>
			}
			{
				isShowReplyForm && <NewReviewForm reviewID={props.reviewID} movieID={props.movieID} handleReplyOnReview={handleReplyOnReview} isReplyForm />
			}
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