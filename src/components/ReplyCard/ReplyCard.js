import React, { useState, useEffect } from "react";
import default_user_icon from "../App/assets/icons/default-user.svg";
import moment from "moment";
import ReactionIcon from "../App/assets/icons/ReactionIcon";
import classNames from "classnames";
import Dropdown from "../Dropdown/Dropdown";
import getTextLengthForPost from "../../functions/getTextLengthForPost";

const ReplyCard = (props) => {

	const [showMore, setShowMore] = useState(false);
	const [isLikedReply, setIsLikedReply] = useState(false);
	const [isDislikedReply, setIsDislikedReply] = useState(false);
	const [replyText, setReplyText] = useState();

	const maxReplyTextLength = 400;
	const isLongReplyText = props.replyText.length > maxReplyTextLength;

	const isCurrentUsersReply = props.reply.userID === props.userID;

	useEffect(() => {
		setReplyText(getTextLengthForPost(props.replyText, maxReplyTextLength, showMore));
	}, [props.replyText, showMore]);

	const addDefaultSrc = (event) => {
		event.target.src = default_user_icon;
	}

	const checkIfReplyLikedByCurrentUser = () => {
		if (props.likes !== 0) {
			const currentUsersLike = props.likes.some(like => like.userID === props.userID);
			setIsLikedReply(currentUsersLike);
		} else {
			setIsLikedReply(false);
		}
	};

	const checkIfReplyDislikedByCurrentUser = () => {
		if (props.dislikes !== 0) {
			const currentUsersDislike = props.dislikes.some(dislike => dislike.userID === props.userID);
			setIsDislikedReply(currentUsersDislike);
		} else {
			setIsDislikedReply(false);
		}
	};

	useEffect(() => {
		checkIfReplyLikedByCurrentUser();
		checkIfReplyDislikedByCurrentUser();
	}, [props.likes, props.dislikes]);

	const handleReplyReactionLikeButtonClick = (itemID, reviewID, isLikedReply, isDislikedReply) => {
		props.handleLikeReply(itemID, reviewID, isLikedReply, isDislikedReply);
		setIsLikedReply(prevState => !prevState);
	}

	const handleReplyReactionDislikeButtonClick = (itemID, reviewID, isLikedReply, isDislikedReply) => {
		props.handleDislikeReply(itemID, reviewID, isLikedReply, isDislikedReply);
		setIsDislikedReply(prevState => !prevState);
	}

	const replyLikeActionClassNames = classNames('reply-card__action-item', {
		'reply-card__action-item--active': isLikedReply,
	});

	const replyDislikeActionClassNames = classNames('reply-card__action-item', {
		'reply-card__action-item--active': isDislikedReply,
	});

	return (
		<div className="reply-card">
			<div className="reply-card__user-wrap">
				<img className="reply-card__user-avatar" onError={addDefaultSrc} src={props.userIconPath === null ? default_user_icon : props.userIconPath} alt="user-avatar" />
				<div className="reply-card__user-info">
					<div className="reply-card__username">
						{props.reply.displayName}
						{
							props.isProjectUser && <span className="reply-card__user-label">CinemaStreet user</span>
						}
					</div>
					<div className="reply-card__review-date">{moment(props.reply.reviewDate).format("M.D.Y")}</div>
				</div>
			</div>
			<span className="reply-card__text">{replyText}</span>
			{
				isLongReplyText && <button className="reply-card__more-button" onClick={() => {setShowMore(!showMore)}}>{showMore ? 'Show less' : 'Show more'}</button>
			}
			<div className="reply-card__actions">
				<button className={replyLikeActionClassNames} onClick={() => {handleReplyReactionLikeButtonClick(props.reply.id, props.reviewID, isLikedReply, isDislikedReply)}}><ReactionIcon isLike />Like
					{
						props.likes !== 0 && <span className="review-card__action-counter">{props.reply.likes.length}</span>
					}
				</button>
				<button className={replyDislikeActionClassNames} onClick={() => {handleReplyReactionDislikeButtonClick(props.reply.id, props.reviewID, isLikedReply, isDislikedReply)}}><ReactionIcon />Dislike
					{
						props.dislikes !== 0 && <span className="review-card__action-counter">{props.reply.dislikes.length}</span>
					}
				</button>
			</div>
			{
				isCurrentUsersReply && <Dropdown />
			}
		</div>
	)
}

export default ReplyCard;