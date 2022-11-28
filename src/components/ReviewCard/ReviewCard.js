import React, { useEffect, useState } from "react";
import default_user_icon from "../App/assets/icons/default-user.svg";
import { removeMyReview, setMyReview } from "../../actions";
import { connect } from "react-redux";
import { onValue, push, set, ref } from "firebase/database";
import { database } from "../../firebase";
import moment from "moment";
import NewReviewForm from "../NewReviewForm/NewReviewForm";
import ReactionIcon from "../App/assets/icons/ReactionIcon";
import ReplyCard from "../ReplyCard/ReplyCard";
import classNames from "classnames";

const ReviewCard = (props) => {

	const checkIfReviewLikedByCurrentUser = () => {
		if (props.likes !== 0) {
			const currentUsersLike = props.likes.some(like => like.userID === props.currentUser.uid);
			setIsLikedReview(currentUsersLike);
		} else {
			setIsLikedReview(false);
		}
	};

	const checkIfReviewDislikedByCurrentUser = () => {
		if (props.dislikes !== 0) {
			const currentUsersDislike = props.dislikes.some(dislike => dislike.userID === props.currentUser.uid);
			setIsDislikedReview(currentUsersDislike);
		} else {
			setIsDislikedReview(false);
		}
	};

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

	useEffect(() => {
		checkIfReviewLikedByCurrentUser();
		checkIfReviewDislikedByCurrentUser();
	}, [props.likes, props.dislikes]);

	const handleDeleteCurrentUsersLike = (currentReview, userID) => {

		let updatedLikes = [];
		let emptyLikes = 0;

		if (currentReview.data.review.likes && currentReview.data.review.likes.length > 1) {
			Object.values(currentReview.data.review.likes).map((like) => {
				if (like.userID !== userID) {
					updatedLikes.push(like);
				}
			});
			return updatedLikes;
		} else {
			return emptyLikes;
		}
	}

	const handleDeleteCurrentUsersDislike = (currentReview, userID) => {

		let updatedDislikes = [];
		let emptyDislikes = 0;

		if (currentReview.data.review.dislikes && currentReview.data.review.dislikes.length > 1) {
			Object.values(currentReview.data.review.dislikes).map((dislike) => {
				if (dislike.userID !== userID) {
					updatedDislikes.push(dislike);
				}
			});
			return updatedDislikes;
		} else {
			return emptyDislikes;
		}
	}

	const handleLikeReview = (reviewID) => {

		const reviewsWithLikesFromFirebase = [];

		const likeInfo = {
			userID: props.currentUser.uid
		};

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
					likes: [likeInfo],
					dislikes: props.dislikes,
					userAvatar: props.userIconPath,
					displayName: props.userName,
					reviewText: props.reviewText,
					reviewDate: props.reviewDate,
					replies: props.replies,
				},
			});
		}

		reviewsWithLikesFromFirebase.map((item) => {

			const newReview = !reviewsWithLikesFromFirebase.find(review => review.data.review.id === reviewID);
			const newLike = !item.data.review.likes;

			if (item.data.review.id === reviewID) {

				const reviewRef = ref(database, "/reviews/" + item.key);

				if (newLike) {
					set(reviewRef, {
						review: {
							movieID: item.data.review.movieID,
							id: item.data.review.id,
							likes: [likeInfo],
							dislikes: isDislikedReview === false ? item.data.review.dislikes : handleDeleteCurrentUsersDislike(item, props.currentUser.uid),
							userAvatar: item.data.review.userAvatar,
							displayName: item.data.review.displayName,
							reviewText: item.data.review.reviewText,
							reviewDate: item.data.review.reviewDate,
							replies: item.data.review.replies,
						},
					});
				} else {
					set(reviewRef, {
						review: {
							movieID: item.data.review.movieID,
							id: item.data.review.id,
							likes: isLikedReview === false ? [...item.data.review.likes, likeInfo] : handleDeleteCurrentUsersLike(item, props.currentUser.uid),
							dislikes: isDislikedReview === false ? item.data.review.dislikes : handleDeleteCurrentUsersDislike(item, props.currentUser.uid),
							userAvatar: item.data.review.userAvatar,
							displayName: item.data.review.displayName,
							reviewText: item.data.review.reviewText,
							reviewDate: item.data.review.reviewDate,
							replies: item.data.review.replies,
						}
					});
				}
			} else if (newReview) {
				set(reviewsPostRef, {
					review: {
						movieID: props.movieID,
						id: reviewID,
						likes: [likeInfo],
						dislikes: props.dislikes,
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

		const dislikeInfo = {
			userID: props.currentUser.uid
		};

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
					likes: props.likes,
					dislikes: [dislikeInfo],
					userAvatar: props.userIconPath,
					displayName: props.userName,
					reviewText: props.reviewText,
					reviewDate: props.reviewDate,
					replies: props.replies,
				},
			});
		}

		reviewsWithDislikesFromFirebase.map((item) => {

			const newReview = !reviewsWithDislikesFromFirebase.find(review => review.data.review.id === reviewID);
			const newDislike = !item.data.review.dislikes;

			if (item.data.review.id === reviewID) {

				const reviewRef = ref(database, "/reviews/" + item.key);

				if (newDislike) {
					set(reviewRef, {
						review: {
							movieID: item.data.review.movieID,
							id: item.data.review.id,
							likes: isLikedReview === false ? item.data.review.likes : handleDeleteCurrentUsersLike(item, props.currentUser.uid),
							dislikes: [dislikeInfo],
							userAvatar: item.data.review.userAvatar,
							displayName: item.data.review.displayName,
							reviewText: item.data.review.reviewText,
							reviewDate: item.data.review.reviewDate,
							replies: item.data.review.replies,
						},
					});
				} else {
					set(reviewRef, {
						review: {
							movieID: item.data.review.movieID,
							id: item.data.review.id,
							likes: isLikedReview === false ? item.data.review.likes : handleDeleteCurrentUsersLike(item, props.currentUser.uid),
							dislikes: isDislikedReview === false ? [...item.data.review.dislikes, dislikeInfo] : handleDeleteCurrentUsersDislike(item, props.currentUser.uid),
							userAvatar: item.data.review.userAvatar,
							displayName: item.data.review.displayName,
							reviewText: item.data.review.reviewText,
							reviewDate: item.data.review.reviewDate,
							replies: item.data.review.replies,
						}
					});
				}
			} else if (newReview) {
				set(reviewsPostRef, {
					review: {
						movieID: props.movieID,
						id: reviewID,
						likes: props.likes,
						dislikes: [dislikeInfo],
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
					likes: props.likes ?? 0,
					dislikes: props.dislikes ?? 0,
					userAvatar: props.userIconPath,
					displayName: props.userName,
					reviewText: props.reviewText,
					reviewDate: props.reviewDate,
					replies: [replyInfo],
				},
			});
		}

		reviewsFromFirebase.map((item) => {

			const newReview = !reviewsFromFirebase.find(review => review.data.review.id === reviewID);
			const newReply = !item.data.review.replies;

			if (item.data.review.id === reviewID) {

				const reviewRef = ref(database, "/reviews/" + item.key);

				if (newReply) {
					set(reviewRef, {
						review: {
							movieID: item.data.review.movieID,
							id: item.data.review.id,
							likes: item.data.review.likes ?? 0,
							dislikes: item.data.review.dislikes ?? 0,
							userAvatar: item.data.review.userAvatar,
							displayName: item.data.review.displayName,
							reviewText: item.data.review.reviewText,
							reviewDate: item.data.review.reviewDate,
							replies: [replyInfo],
						}
					});
				} else {
					set(reviewRef, {
						review: {
							movieID: item.data.review.movieID,
							id: item.data.review.id,
							likes: item.data.review.likes ?? 0,
							dislikes: item.data.review.dislikes ?? 0,
							userAvatar: item.data.review.userAvatar,
							displayName: item.data.review.displayName,
							reviewText: item.data.review.reviewText,
							reviewDate: item.data.review.reviewDate,
							replies: [...item.data.review.replies, replyInfo],
						}
					});
				}
			} else if (newReview) {
				set(reviewsPostRef, {
					review: {
						movieID: props.movieID,
						id: reviewID,
						likes: props.likes ?? 0,
						dislikes: props.dislikes ?? 0,
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


	const handleLikeReply = (replyID, reviewID, userID, isLikedReply) => {

		let reviewToChange = props.usersReviews.find(item => item.data.review.id === reviewID);

		const reviewRef = ref(database, "/reviews/" + reviewToChange.key);

		let repliesUpdated = reviewToChange.data.review.replies.map((reply) => {

			const likeInfo = {
				userID: props.currentUser.uid
			};

			const handleDeleteCurrentUserReplyLike = (currentReplyID, userID) => {

				let updatedLikes = [];

				Object.values(reply.likes).map((like) => {
					if (like.userID !== userID) {
						updatedLikes.push(like);
					}
				});

				return updatedLikes;
			}

			const updatedReplyInfo = {
				movieID: reply.movieID,
				id: reply.id,
				likes: isLikedReply === false ? [...reply.likes, likeInfo] : handleDeleteCurrentUserReplyLike(reply.id, userID),
				dislikes: reply.dislikes ?? 0,
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
				likes: reviewToChange.data.review.likes ?? 0,
				dislikes: reviewToChange.data.review.dislikes ?? 0,
				userAvatar: reviewToChange.data.review.userAvatar,
				displayName: reviewToChange.data.review.displayName,
				reviewText: reviewToChange.data.review.reviewText,
				reviewDate: reviewToChange.data.review.reviewDate,
				replies: repliesUpdated,
			}
		});

		getMyReviewsForMovies();
	}

	const handleDislikeReply = (replyID, reviewID, userID, isDislikedReply) => {

		let reviewToChange = props.usersReviews.find(item => item.data.review.id === reviewID);

		const reviewRef = ref(database, "/reviews/" + reviewToChange.key);

		let repliesUpdated = reviewToChange.data.review.replies.map((reply) => {

			const dislikeInfo = {
				userID: props.currentUser.uid
			};

			const handleDeleteCurrentUserReplyDislike = (currentReplyID, userID) => {

				let updatedDislikes = [];

				Object.values(reply.dislikes).map((dislike) => {
					if (dislike.userID !== userID) {
						updatedDislikes.push(dislike);
					}
				});

				return updatedDislikes;
			}

			const updatedReplyInfo = {
				movieID: reply.movieID,
				id: reply.id,
				likes: reply.likes ?? 0,
				dislikes: isDislikedReply === false ? [...reply.likes, dislikeInfo] : handleDeleteCurrentUserReplyDislike(reply.id, userID),
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
				likes: reviewToChange.data.review.likes ?? 0,
				dislikes: reviewToChange.data.review.dislikes ?? 0,
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
						props.likes !== 0 && <span className="review-card__likes-counter">{props.likes.length}</span>
					}
				</button>
				<button className={reviewDislikeActionClassNames} onClick={() => {handleReviewReactionDislikeButtonClick(props.reviewID)}}><ReactionIcon />Dislike
					{
						props.dislikes !== 0 && <span className="review-card__dislikes-counter">{props.dislikes.length}</span>
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
								userID={props.currentUser.uid}
								handleLikeReply={handleLikeReply}
								handleDislikeReply={handleDislikeReply}
								reviewID={props.reviewID}
								key={index}
								userIconPath={item.userAvatar}
								userName={item.displayName}
								replyText={item.replyText}
								reviewDate={item.replyDate}
								likes={item.likes ?? 0}
								dislikes={item.dislikes ?? 0}
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
	currentUser: state.user.currentUser,
})

const mapDispatchToProps = (dispatch) => {
	return {
		handleSetMyReview: (review) => dispatch(setMyReview(review)),
		handleRemoveMyReview: (id) => dispatch(removeMyReview(id))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewCard);