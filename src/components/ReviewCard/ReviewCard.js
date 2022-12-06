import React, { useEffect, useState } from "react";
import default_user_icon from "../App/assets/icons/default-user.svg";
import { removeMyReview, setMyReview } from "../../actions";
import { connect } from "react-redux";
import {onValue, push, set, ref, remove} from "firebase/database";
import { database } from "../../firebase";
import moment from "moment";
import NewReviewForm from "../NewReviewForm/NewReviewForm";
import ReactionIcon from "../App/assets/icons/ReactionIcon";
import ReplyCard from "../ReplyCard/ReplyCard";
import classNames from "classnames";
import ReplyIcon from "../App/assets/icons/ReplyIcon";
import getTextLengthForPost from "../../functions/getTextLengthForPost";
import Dropdown from "../Dropdown/Dropdown";
import DropdownOption from "../DropdownOption/DropdownOption";
import DeleteIcon from "../App/assets/icons/DeleteIcon";
import EditReviewForm from "../EditReviewForm/EditReviewForm";
import EditIcon from "../App/assets/icons/EditIcon";

const ReviewCard = (props) => {

	const { userID, movieID, reviewID, userIconPath, userName, reviewText, reviewDate, likes, dislikes, replies, usersReviews, currentUser, handleSetMyReview, handleRemoveMyReview } = props;

	const checkIfReviewLikedByCurrentUser = () => {
		if (likes !== 0) {
			const currentUsersLike = likes.some(like => like.userID === userID);
			setIsLikedReview(currentUsersLike);
		} else {
			setIsLikedReview(false);
		}
	};

	const checkIfReviewDislikedByCurrentUser = () => {
		if (dislikes !== 0) {
			const currentUsersDislike = dislikes.some(dislike => dislike.userID === userID);
			setIsDislikedReview(currentUsersDislike);
		} else {
			setIsDislikedReview(false);
		}
	};

	const maxReviewTextLength = 400;
	const isLongReviewText = reviewText.length > maxReviewTextLength;
	const [isReviewTextHidden, setIsReviewTextHidden] = useState(isLongReviewText);
	const [isShowReplyForm, setIsShowReplyForm] = useState(false);
	const [isShowEditReviewForm, setIsShowEditReviewForm] = useState(false);
	const [isLikedReview, setIsLikedReview] = useState(false);
	const [isDislikedReview, setIsDislikedReview] = useState(false);
	const [reviewContent, setReviewContent] = useState();

	const isCurrentUsersReview = userID === currentUser.uid;

	useEffect(() => {
		setReviewContent(getTextLengthForPost(reviewText, maxReviewTextLength, isReviewTextHidden, isLongReviewText));
	}, [reviewText, isReviewTextHidden]);

	const addDefaultSrc = (event) => {
		event.target.src = default_user_icon;
	}

	if (reviewID === '636de2bdd4653700b44daee9') {
		console.log(isReviewTextHidden);
		// console.log(reviewID);
	}

	const reviewsListRef = ref(database, 'reviews');
	const reviewsPostRef = push(reviewsListRef);

	useEffect(() => {
		checkIfReviewLikedByCurrentUser();
		checkIfReviewDislikedByCurrentUser();
	}, [likes, dislikes]);

	const deleteReviewFromFirebase = (reviewID) => {
		let reviewToDelete = usersReviews.find(item => item.data.review.id === reviewID);

		const reviewRef = ref(database, "/reviews/" + reviewToDelete.key);

		remove(reviewRef).then(() => {handleRemoveMyReview(reviewID)});
	}

	const editReviewFromFirebase = (updatedReviewText, reviewID) => {
		let reviewToChange = usersReviews.find(item => item.data.review.id === reviewID);

		const reviewRef = ref(database, "/reviews/" + reviewToChange.key);

		set(reviewRef, {
			review: {
				userID: reviewToChange.data.review.userID,
				movieID: reviewToChange.data.review.movieID,
				id: reviewToChange.data.review.id,
				likes: reviewToChange.data.review.likes,
				dislikes: reviewToChange.data.review.dislikes,
				userAvatar: reviewToChange.data.review.userAvatar,
				displayName: reviewToChange.data.review.displayName,
				reviewText: updatedReviewText,
				reviewDate: reviewToChange.data.review.reviewDate,
				replies: reviewToChange.data.review.replies,
			},
		});

		props.getMyReviewsForMovies();
		setIsShowEditReviewForm(false);
	}

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
			userID: userID,
		};

		if (usersReviews.length) {
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
					userID: userID,
					movieID: movieID,
					id: reviewID,
					likes: [likeInfo],
					dislikes: dislikes,
					userAvatar: userIconPath,
					displayName: userName,
					reviewText: reviewText,
					reviewDate: reviewDate,
					replies: replies,
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
							userID: item.data.review.userID,
							movieID: item.data.review.movieID,
							id: item.data.review.id,
							likes: [likeInfo],
							dislikes: isDislikedReview === false ? item.data.review.dislikes : handleDeleteCurrentUsersDislike(item, userID),
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
							userID: item.data.review.userID,
							movieID: item.data.review.movieID,
							id: item.data.review.id,
							likes: isLikedReview === false ? [...item.data.review.likes, likeInfo] : handleDeleteCurrentUsersLike(item, userID),
							dislikes: isDislikedReview === false ? item.data.review.dislikes : handleDeleteCurrentUsersDislike(item, userID),
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
						userID: userID,
						movieID: movieID,
						id: reviewID,
						likes: [likeInfo],
						dislikes: dislikes,
						userAvatar: userIconPath,
						displayName: userName,
						reviewText: reviewText,
						reviewDate: reviewDate,
						replies: replies,
					},
				});
			}
		});

		props.getMyReviewsForMovies();
	}

	const handleDislikeReview = (reviewID) => {

		const reviewsWithDislikesFromFirebase = [];

		const dislikeInfo = {
			userID: userID,
		};

		if (usersReviews.length) {
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
					userID: userID,
					movieID: movieID,
					id: reviewID,
					likes: likes,
					dislikes: [dislikeInfo],
					userAvatar: userIconPath,
					displayName: userName,
					reviewText: reviewText,
					reviewDate: reviewDate,
					replies: replies,
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
							userID: item.data.review.userID,
							movieID: item.data.review.movieID,
							id: item.data.review.id,
							likes: isLikedReview === false ? item.data.review.likes : handleDeleteCurrentUsersLike(item, userID),
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
							userID: item.data.review.userID,
							movieID: item.data.review.movieID,
							id: item.data.review.id,
							likes: isLikedReview === false ? item.data.review.likes : handleDeleteCurrentUsersLike(item, userID),
							dislikes: isDislikedReview === false ? [...item.data.review.dislikes, dislikeInfo] : handleDeleteCurrentUsersDislike(item, userID),
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
						userID: userID,
						movieID: movieID,
						id: reviewID,
						likes: likes,
						dislikes: [dislikeInfo],
						userAvatar: userIconPath,
						displayName: userName,
						reviewText: reviewText,
						reviewDate: reviewDate,
						replies: replies,
					},
				});
			}
		});

		props.getMyReviewsForMovies();
	}

	const handleReplyOnReview = (replyInfo, reviewID) => {

		const reviewsFromFirebase = [];

		if (usersReviews.length) {
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
					userID: userID,
					movieID: movieID,
					id: reviewID,
					likes: likes ?? 0,
					dislikes: dislikes ?? 0,
					userAvatar: userIconPath,
					displayName: userName,
					reviewText: reviewText,
					reviewDate: reviewDate,
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
							userID: item.data.review.userID,
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
							userID: item.data.review.userID,
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
						userID: userID,
						movieID: movieID,
						id: reviewID,
						likes: likes ?? 0,
						dislikes: dislikes ?? 0,
						userAvatar: userIconPath,
						displayName: userName,
						reviewText: reviewText,
						reviewDate: reviewDate,
						replies: [replyInfo],
					},
				});
			}
		});

		setIsShowReplyForm(false);
		props.getMyReviewsForMovies();
	}

	const handleDeleteCurrentUserReplyLike = (currentReply, userID) => {

		let updatedLikes = [];
		let emptyLikes = 0;

		if (currentReply.likes && currentReply.likes.length > 1) {
			Object.values(currentReply.likes).map((like) => {
				if (like.userID !== userID) {
					updatedLikes.push(like);
				}
			});
			return updatedLikes;
		} else {
			return emptyLikes;
		}
	}

	const handleDeleteCurrentUserReplyDislike = (currentReply, userID) => {

		let updatedDislikes = [];
		let emptyDislikes = 0;

		if (currentReply.dislikes && currentReply.dislikes.length > 1) {
			Object.values(currentReply.dislikes).map((dislike) => {
				if (dislike.userID !== userID) {
					updatedDislikes.push(dislike);
				}
			});
			return updatedDislikes;
		} else {
			return emptyDislikes;
		}
	}

	const handleLikeReply = (replyID, reviewID, isLikedReply, isDislikedReply) => {

		let reviewToChange = usersReviews.find(item => item.data.review.id === reviewID);

		const reviewRef = ref(database, "/reviews/" + reviewToChange.key);

		let repliesUpdated = reviewToChange.data.review.replies.map((reply) => {

			const likeInfo = {
				userID: currentUser.uid,
			};

			const checkReplyForLikes = (reply) => {

				let updatedReplyLikes = [];

				if (reply.likes !== 0) {
					if (isLikedReply === false) {
						updatedReplyLikes = [...reply.likes, likeInfo];
						return updatedReplyLikes;
					} else {
						return handleDeleteCurrentUserReplyLike(reply, userID);
					}
				} else {
					return [likeInfo];
				}
			}

			const updatedReplyInfo = {
				userID: reply.userID,
				movieID: reply.movieID,
				id: reply.id,
				likes: checkReplyForLikes(reply),
				dislikes: isDislikedReply === false ? reply.dislikes : handleDeleteCurrentUserReplyDislike(reply, userID),
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
				userID: reviewToChange.data.review.userID,
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

		props.getMyReviewsForMovies();
	}

	const handleDislikeReply = (replyID, reviewID, isLikedReply, isDislikedReply) => {

		let reviewToChange = usersReviews.find(item => item.data.review.id === reviewID);

		const reviewRef = ref(database, "/reviews/" + reviewToChange.key);

		let repliesUpdated = reviewToChange.data.review.replies.map((reply) => {

			const dislikeInfo = {
				userID: currentUser.uid,
			};

			const checkReplyForDislikes = (reply) => {

				let updatedReplyDislikes = [];

				if (reply.dislikes !== 0) {
					if (isDislikedReply === false) {
						updatedReplyDislikes = [...reply.dislikes, dislikeInfo];
						return updatedReplyDislikes;
					} else {
						return handleDeleteCurrentUserReplyDislike(reply, userID);
					}
				} else {
					return [dislikeInfo];
				}
			}

			const updatedReplyInfo = {
				userID: reply.userID,
				movieID: reply.movieID,
				id: reply.id,
				likes: isLikedReply === false ? reply.likes : handleDeleteCurrentUserReplyLike(reply, userID),
				dislikes: checkReplyForDislikes(reply),
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
				userID: reviewToChange.data.review.userID,
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

		props.getMyReviewsForMovies();
	}

	const deleteReplyFromReview = (replyID, reviewID) => {

		let reviewToChange = usersReviews.find(item => item.data.review.id === reviewID);

		const reviewRef = ref(database, "/reviews/" + reviewToChange.key);
		const repliesUpdated = reviewToChange.data.review.replies.filter(reply => reply.id !== replyID);
		const repliesEmpty = 0;

		const checkRepliesLength = () => {
			if (reviewToChange.data.review.replies.length > 1) {
				return repliesUpdated;
			} else {
				return repliesEmpty;
			}
		}

		set(reviewRef, {
			review: {
				userID: reviewToChange.data.review.userID,
				movieID: reviewToChange.data.review.movieID,
				id: reviewToChange.data.review.id,
				likes: reviewToChange.data.review.likes ?? 0,
				dislikes: reviewToChange.data.review.dislikes ?? 0,
				userAvatar: reviewToChange.data.review.userAvatar,
				displayName: reviewToChange.data.review.displayName,
				reviewText: reviewToChange.data.review.reviewText,
				reviewDate: reviewToChange.data.review.reviewDate,
				replies: checkRepliesLength(),
			}
		});

		props.getMyReviewsForMovies();

	}

	const editReplyInReview = (updatedReplyText, reviewID, replyID) => {

		let reviewToChange = usersReviews.find(item => item.data.review.id === reviewID);
		let replyToChange = reviewToChange.data.review.replies.find(item => item.id === replyID);

		const reviewRef = ref(database, "/reviews/" + reviewToChange.key);

		console.log(reviewToChange, replyToChange, replyID);

		const replyInfo = {
			userID: replyToChange.userID,
			movieID: replyToChange.movieID,
			id: replyToChange.id,
			likes: replyToChange.likes,
			dislikes: replyToChange.dislikes,
			userAvatar: replyToChange.userAvatar,
			displayName: replyToChange.displayName,
			replyText: updatedReplyText,
			replyDate: replyToChange.replyDate,
		}

		const repliesUpdated = reviewToChange.data.review.replies.map((reply) => {
			if (reply.id === replyID) {
				return replyInfo;
			} else {
				return reply;
			}
		});

		set(reviewRef, {
			review: {
				userID: reviewToChange.data.review.userID,
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

		props.getMyReviewsForMovies();
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
				<img className="review-card__user-avatar" onError={addDefaultSrc} src={userIconPath === null ? default_user_icon : userIconPath} alt="user-avatar" />
				<div className="review-card__user-info">
					<div className="review-card__username">
						{userName}
						{
							isCurrentUsersReview && <span className="label">my review</span>
						}
					</div>
					<div className="review-card__review-date">{moment(reviewDate).format("M.D.Y")}</div>
				</div>
			</div>
			{
				isShowEditReviewForm
					? <EditReviewForm reviewID={reviewID} initialValue={reviewContent} setIsShowEditReviewForm={setIsShowEditReviewForm} editReviewFromFirebase={editReviewFromFirebase} />
					: (<>
						<span className="review-card__text">{reviewContent}</span>
						{
							isLongReviewText && <button className="review-card__more-button" onClick={() => {setIsReviewTextHidden(!isReviewTextHidden)}}>{isReviewTextHidden ? 'Show more' : 'Show less'}</button>
						}
						<div className="review-card__actions">
							<button className={reviewLikeActionClassNames} onClick={() => {handleReviewReactionLikeButtonClick(reviewID)}}><ReactionIcon isLike />Like
								{
									likes !== 0 && <span className="review-card__action-counter">{likes.length}</span>
								}
							</button>
							<button className={reviewDislikeActionClassNames} onClick={() => {handleReviewReactionDislikeButtonClick(reviewID)}}><ReactionIcon />Dislike
								{
									dislikes !== 0 && <span className="review-card__action-counter">{dislikes.length}</span>
								}
							</button>
							<button className="review-card__action-item" onClick={() => {setIsShowReplyForm(!isShowReplyForm)}}><ReplyIcon />Reply</button>
						</div>
					</>)
			}
			{
				replies.length && <div className="review-card__replies-list">
					{
						replies.map((item, index) => {
							return <ReplyCard
								reply={item}
								userID={currentUser.uid}
								handleLikeReply={handleLikeReply}
								handleDislikeReply={handleDislikeReply}
								deleteReplyFromReview={deleteReplyFromReview}
								editReplyInReview={editReplyInReview}
								reviewID={reviewID}
								key={index}
							/>
						})
					}
				</div>
			}
			{
				isCurrentUsersReview && <Dropdown>
					<DropdownOption onClickAction={() => {deleteReviewFromFirebase(reviewID)}}>
						<DeleteIcon className="dropdown__icon dropdown__icon--delete" />
						Delete
					</DropdownOption>
					<DropdownOption onClickAction={() => {setIsShowEditReviewForm(true)}}>
						<EditIcon className="dropdown__icon" />
						Edit review
					</DropdownOption>
				</Dropdown>
			}
			{
				isShowReplyForm && <NewReviewForm reviewID={reviewID} movieID={movieID} setIsShowReplyForm={setIsShowReplyForm} handleReplyOnReview={handleReplyOnReview} isShowReplyForm={isShowReplyForm} isReplyForm />
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