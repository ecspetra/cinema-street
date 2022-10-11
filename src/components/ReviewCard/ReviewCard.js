import React from "react";
import default_user_icon from "../App/assets/icons/default-user.svg";

const ReviewCard = (props) => {

	const addDefaultSrc = (event) => {
		event.target.src = default_user_icon;
	}

	const userIconPath = props.review.author_details.avatar_path;

	return (
		<div className="review-card">
			<div className="review-card__user-wrap">
				<img className="review-card__user-avatar" onError={addDefaultSrc} src={userIconPath === null ? default_user_icon : userIconPath} alt="user-avatar" />
				<div className="review-card__user-info">
					<div className="review-card__username">{props.review.author_details.username}</div>
					<div className="review-card__user-rating">{props.review.author_details.rating}</div>
				</div>
			</div>
			<div className="review-card__text">{props.review.content}</div>
		</div>
	)
}

export default ReviewCard;