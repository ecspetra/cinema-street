import React, {useEffect, useRef, useState} from "react";
import { push, ref, set } from "firebase/database";
import { database } from "../../firebase";
import { v1 as uuidv1 } from 'uuid';
import { connect } from "react-redux";
import default_user_icon from "../App/assets/icons/default-user.svg";

const NewReviewForm = (props) => {

	const [isShowError, setIsShowError] = useState(false);

	const { reviewID, movieID, handleReplyOnReview, isShowReplyForm, setIsShowReplyForm, isReplyForm, currentUser } = props;

	let reviewTextRef = useRef();

	const handleSubmitNewReview = (event) => {
		event.preventDefault();

		if (reviewTextRef.current.value.length && reviewTextRef.current.value.trim() !== '') {

			const reviewsListRef = ref(database, 'reviews');
			const reviewsPostRef = push(reviewsListRef);

			if (isReplyForm) {

				const replyInfo = {
					userID: currentUser.uid,
					movieID: movieID,
					id: uuidv1(),
					likes: 0,
					dislikes: 0,
					userAvatar: currentUser.photoURL,
					displayName: currentUser.displayName,
					replyText: reviewTextRef.current.value,
					replyDate: new Date().getTime(),
				}

				handleReplyOnReview(replyInfo, reviewID);
				reviewTextRef.current.value = '';

			} else {
				set(reviewsPostRef, {
					review: {
						userID: currentUser.uid,
						movieID: movieID,
						id: uuidv1(),
						likes: 0,
						dislikes: 0,
						userAvatar: currentUser.photoURL,
						displayName: currentUser.displayName,
						reviewText: reviewTextRef.current.value,
						reviewDate: new Date().getTime(),
						replies: 0,
					},
				}).then(() => {
					reviewTextRef.current.value = '';
				});
			}
		} else {
			setIsShowError(true);
		}
	}

	const addDefaultSrc = (event) => {
		event.target.src = default_user_icon;
	}

	useEffect(() => {
		if (isShowReplyForm) {
			reviewTextRef.current.focus();
		}
	}, []);

	const handleChangeTextareaValue = () => {
		if (reviewTextRef.current.value.length) {
			setIsShowError(false);
		}
	}

	const handleCancelButtonClick = () => {
		setIsShowReplyForm(false);
	}

	return (
		<form onSubmit={handleSubmitNewReview} className="new-review-form">
			{
				!isReplyForm && <h3 className="new-review-form__title">Leave your feedback</h3>
			}
			<div className="new-review-form__user-wrap">
				<img className="new-review-form__user-avatar" onError={addDefaultSrc} src={currentUser.photoURL === null ? default_user_icon : currentUser.photoURL} alt="user-avatar" />
				<div className="new-review-form__user-info">
					<div className="new-review-form__username">{currentUser.displayName}</div>
				</div>
			</div>
			<textarea className="new-review-form__textarea" cols="10" rows="8" ref={reviewTextRef} onChange={() => {handleChangeTextareaValue()}}></textarea>
			{
				isShowError && <p className="error">Form field shouldn't be empty</p>
			}
			<div className="new-review-form__buttons-wrap">
				{
					isReplyForm && <button className="main-button main-button--cancel" onClick={() => {handleCancelButtonClick()}}>Cancel</button>
				}
				<button className="main-button main-button--filled" type="submit">{isReplyForm ? 'Send reply' : 'Send review'}</button>
			</div>
		</form>
	)
}

const mapStateToProps = state => ({
	currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(NewReviewForm);