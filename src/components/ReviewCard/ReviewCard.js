import React, {useEffect, useState} from "react";
import default_user_icon from "../App/assets/icons/default-user.svg";

const ReviewCard = (props) => {

	const [showMore, setShowMore] = useState(false);

	const REVIEW_TEXT = props.review.content;
	const isLongReviewText = REVIEW_TEXT.length > 300;

	useEffect(() => {
		if (isLongReviewText) {
			REVIEW_TEXT.substring(0, 300);
		}
	}, [REVIEW_TEXT]);

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
			{(isLongReviewText && !showMore) ? <span className="review-card__text">{REVIEW_TEXT.substring(0, 300) + ' '}</span> : <span className="review-card__text">{REVIEW_TEXT}</span>}
			{isLongReviewText && <button className="review-card__more-button" onClick={() => {setShowMore(!showMore)}}>{showMore ? 'Show less' : 'Show more'}</button>}
		</div>
	)
}

export default ReviewCard;