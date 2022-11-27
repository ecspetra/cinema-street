import React, { useState, useEffect } from "react";
import default_user_icon from "../App/assets/icons/default-user.svg";
import moment from "moment";
import ReactionIcon from "../App/assets/icons/ReactionIcon";

const ReplyCard = (props) => {

	const [showMore, setShowMore] = useState(false);
	const [isLikedReply, setIsLikedReply] = useState(false);
	const [isDislikedReply, setIsDislikedReply] = useState(false);

	const REPLY_TEXT = props.replyText;
	const isLongReplyText = REPLY_TEXT.length > 300;

	useEffect(() => {
		if (isLongReplyText) {
			REPLY_TEXT.substring(0, 300);
		}
	}, [REPLY_TEXT]);

	const addDefaultSrc = (event) => {
		event.target.src = default_user_icon;
	}

	const handleReplyReactionLikeButtonClick = (itemID, reviewID, isLikedReply) => {
		props.handleLikeReply(itemID, reviewID, isLikedReply)
		setIsLikedReply(prevState => !prevState);
	}

	const handleReplyReactionDislikeButtonClick = (itemID, reviewID, isDislikedReply) => {
		props.handleDislikeReply(itemID, reviewID, isDislikedReply)
		setIsDislikedReply(prevState => !prevState);
	}

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
			{(isLongReplyText && !showMore) ? <span className="reply-card__text">{props.item.replyText.substring(0, 300) + ' '}</span> : <span className="review-card__text">{props.reply.replyText}</span>}
			{isLongReplyText && <button className="reply-card__more-button" onClick={() => {setShowMore(!showMore)}}>{showMore ? 'Show less' : 'Show more'}</button>}
			<div className="reply-card__actions">
				<button className="reply-card__action-item" onClick={() => {handleReplyReactionLikeButtonClick(props.reply.id, props.reviewID, isLikedReply)}}><ReactionIcon isLike />Like
					{
						props.likesCounter !== 0 && <span className="review-card__likes-counter">{props.reply.likesCounter}</span>
					}
				</button>
				<button className="reply-card__action-item" onClick={() => {handleReplyReactionDislikeButtonClick(props.reply.id, props.reviewID, isDislikedReply)}}><ReactionIcon />Dislike
					{
						props.dislikesCounter !== 0 && <span className="review-card__dislikes-counter">{props.reply.dislikesCounter}</span>
					}
				</button>
			</div>
		</div>
	)
}

export default ReplyCard;