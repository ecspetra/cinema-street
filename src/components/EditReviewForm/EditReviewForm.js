import React, { useEffect, useRef, useState } from "react";
import { handleChangeInputValue } from "../../functions/handleChangeInputValue";
import classNames from "classnames";
import Error from "../Error/Error";
import './assets/index.scss';
import Button from "../Button/Button";

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

	const textAreaClassNames = classNames('edit-review-form__textarea', {
		'edit-review-form__textarea--error': isShowError,
	});

	return (
		<form onSubmit={handleSubmitEditReview} className="edit-review-form">
			<textarea className={textAreaClassNames} cols="10" rows="8" defaultValue={initialValue} ref={reviewTextEditRef} onChange={() => {handleChangeInputValue(reviewTextEditRef, setIsShowError)}}></textarea>
			{
				isShowError && <Error>Text field shouldn't be empty</Error>
			}
			<div className="edit-review-form__buttons-wrap">
				<Button context={'cancel'} buttonOnClickFunction={() => {handleCancelButtonClick()}}>Cancel</Button>
				<Button context={'filled'} type="submit">Save changes</Button>
			</div>
		</form>
	)
}

export default EditReviewForm;