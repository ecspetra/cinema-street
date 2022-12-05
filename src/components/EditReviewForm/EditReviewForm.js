import React, { useEffect, useRef, useState } from "react";

const EditReviewForm = (props) => {

	const [isShowError, setIsShowError] = useState(false);

	const { reviewID, replyID, initialValue, setIsShowEditReplyForm, setIsShowEditReviewForm, editReplyInReview, editReviewFromFirebase, isEditReplyForm } = props;

	let reviewTextEditRef = useRef();

	const handleSubmitEditReview = (event) => {
		event.preventDefault();

		if (reviewTextEditRef.current.value.length && reviewTextEditRef.current.value.trim() !== '') {
			if (isEditReplyForm) {
				const updatedReplyText = reviewTextEditRef.current.value;
				editReplyInReview(updatedReplyText, reviewID, replyID);
				setIsShowEditReplyForm(false);
			} else {
				const updatedReviewText = reviewTextEditRef.current.value;
				editReviewFromFirebase(updatedReviewText, reviewID);
			}
		} else {
			setIsShowError(true);
		}
	}

	const handleChangeTextareaValue = () => {
		if (reviewTextEditRef.current.value.length) {
			setIsShowError(false);
		}
	}

	const handleCancelButtonClick = () => {
		if (isEditReplyForm) {
			setIsShowEditReplyForm(false);
		} else {
			setIsShowEditReviewForm(false);
		}
	}

	useEffect(() => {
		reviewTextEditRef.current.focus();
	}, []);

	return (
		<form onSubmit={handleSubmitEditReview} className="edit-review-form">
			<textarea className="edit-review-form__textarea" cols="10" rows="8" defaultValue={initialValue} ref={reviewTextEditRef} onChange={() => {handleChangeTextareaValue()}}></textarea>
			{
				isShowError && <p className="error">Form field shouldn't be empty</p>
			}
			<div className="edit-review-form__buttons-wrap">
				<button className="main-button main-button--cancel" onClick={() => {handleCancelButtonClick()}}>Cancel</button>
				<button className="main-button main-button--filled" type="submit">Save changes</button>
			</div>
		</form>
	)
}

export default EditReviewForm;