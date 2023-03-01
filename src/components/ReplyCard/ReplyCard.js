import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import ReactionIcon from "../App/assets/icons/ReactionIcon";
import classNames from "classnames";
import Dropdown from "../Dropdown/Dropdown";
import getTextLengthForPost from "../../functions/getTextLengthForPost";
import DropdownOption from "../DropdownOption/DropdownOption";
import DeleteIcon from "../App/assets/icons/DeleteIcon";
import EditReviewForm from "../EditReviewForm/EditReviewForm";
import EditIcon from "../App/assets/icons/EditIcon";
import './assets/index.scss';
import UserIcon from "../UserIcon/UserIcon";
import UserContext from "../UserContext/UserContext";

const ReplyCard = (props) => {

	const { reply, userID, userIconPath, handleLikeReply, handleDislikeReply, deleteReplyFromReview, editReplyInReview, reviewID } = props;

	const maxReplyTextLength = 400;
	const isLongReplyText = reply.replyText.length > maxReplyTextLength;
	const [isReplyTextHidden, setIsReplyTextHidden] = useState(isLongReplyText);
	const [isShowEditReplyForm, setIsShowEditReplyForm] = useState(false);
	const [isLikedReply, setIsLikedReply] = useState(false);
	const [isDislikedReply, setIsDislikedReply] = useState(false);
	const [replyContent, setReplyContent] = useState();

	const { currentUser } = useContext(UserContext);

	const isCurrentUsersReply = reply.userID === currentUser.userID;

	useEffect(() => {
		setReplyContent(getTextLengthForPost(reply.replyText, maxReplyTextLength, isReplyTextHidden, isLongReplyText));
	}, [reply.replyText, isReplyTextHidden]);

	const checkIfReplyLikedByCurrentUser = () => {
		if (reply.likes !== 0) {
			const currentUsersLike = reply.likes.some(like => like.userID === currentUser.userID);
			setIsLikedReply(currentUsersLike);
		} else {
			setIsLikedReply(false);
		}
	};

	const checkIfReplyDislikedByCurrentUser = () => {
		if (reply.dislikes !== 0) {
			const currentUsersDislike = reply.dislikes.some(dislike => dislike.userID === currentUser.userID);
			setIsDislikedReply(currentUsersDislike);
		} else {
			setIsDislikedReply(false);
		}
	};

	useEffect(() => {
		checkIfReplyLikedByCurrentUser();
		checkIfReplyDislikedByCurrentUser();
	}, [reply.likes, reply.dislikes]);

	const handleReplyReactionLikeButtonClick = (itemID, reviewID, isLikedReply, isDislikedReply) => {
		handleLikeReply(itemID, reviewID, isLikedReply, isDislikedReply);
		setIsLikedReply(prevState => !prevState);
	}

	const handleReplyReactionDislikeButtonClick = (itemID, reviewID, isLikedReply, isDislikedReply) => {
		handleDislikeReply(itemID, reviewID, isLikedReply, isDislikedReply);
		setIsDislikedReply(prevState => !prevState);
	}

	const handleDeleteReply = (replyID, reviewID) => {
		setIsShowEditReplyForm(false);
		deleteReplyFromReview(replyID, reviewID);
	}

	const replyLikeActionClassNames = classNames('reply-card__action-item', {
		'reply-card__action-item--active': isLikedReply,
	});

	const replyDislikeActionClassNames = classNames('reply-card__action-item', {
		'reply-card__action-item--active': isDislikedReply,
	});

	const replyCardClassNames = classNames('reply-card', {
		'reply-card--own': isCurrentUsersReply,
	})

	return (
		<div className={replyCardClassNames}>
			<div className="reply-card__user-wrap">
				<UserIcon isUserFromAPI={userID === 'userFromAPI'} profileImageSrc={userIconPath} profileLink={userID} />
				<div className="reply-card__user-info">
					<div className="reply-card__username">
						{reply.displayName}
						{
							isCurrentUsersReply && <span className="label">my reply</span>
						}
					</div>
					<div className="reply-card__review-date">{moment(reply.replyDate).format("M.D.Y")}</div>
				</div>
			</div>
			{
				isShowEditReplyForm
					? <EditReviewForm reviewID={reviewID} replyID={reply.id} initialValue={replyContent} setIsShowEditReplyForm={setIsShowEditReplyForm} editReplyInReview={editReplyInReview} isEditReplyForm />
					: <>
					<span className="reply-card__text">{replyContent}</span>
					{
						isLongReplyText && <button className="reply-card__more-button" onClick={() => {setIsReplyTextHidden(!isReplyTextHidden)}}>{isReplyTextHidden ? 'Show more' : 'Show less'}</button>
					}
					<div className="reply-card__actions">
						<button className={replyLikeActionClassNames} onClick={() => {handleReplyReactionLikeButtonClick(reply.id, reviewID, isLikedReply, isDislikedReply)}}><ReactionIcon isLike />Like
							{
								reply.likes !== 0 && <span className="review-card__action-counter">{reply.likes.length}</span>
							}
						</button>
						<button className={replyDislikeActionClassNames} onClick={() => {handleReplyReactionDislikeButtonClick(reply.id, reviewID, isLikedReply, isDislikedReply)}}><ReactionIcon />Dislike
							{
								reply.dislikes !== 0 && <span className="review-card__action-counter">{reply.dislikes.length}</span>
							}
						</button>
					</div>
				</>
			}
			{
				isCurrentUsersReply && <Dropdown>
					<DropdownOption onClickAction={() => {handleDeleteReply(reply.id, reviewID)}}>
						<DeleteIcon className="dropdown__icon dropdown__icon--delete" />
						Delete
					</DropdownOption>
					<DropdownOption onClickAction={() => {setIsShowEditReplyForm(true)}}>
						<EditIcon className="dropdown__icon" />
						Edit reply
					</DropdownOption>
				</Dropdown>
			}
		</div>
	)
}

export default ReplyCard;