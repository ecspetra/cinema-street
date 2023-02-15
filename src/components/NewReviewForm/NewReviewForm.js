import React, { useEffect, useRef, useState, useContext } from "react";
import { push, ref, set } from "firebase/database";
import { database } from "../../firebase";
import { handleChangeInputValue } from "../../functions/handleChangeInputValue";
import classNames from "classnames";
import Error from "../Error/Error";
import './assets/index.scss';
import Button from "../Button/Button";
import md5 from "md5";
import UserContext from "../UserContext/UserContext";
import UserIcon from "../UserIcon/UserIcon";

const NewReviewForm = (props) => {

	const [isShowError, setIsShowError] = useState(false);

	const { reviewID, reviewCardRef, movieID, handleReplyOnReview, isShowReplyForm, setIsShowReplyForm, isReplyForm } = props;

	const { currentUser } = useContext(UserContext);

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
					id: md5(currentUser.uid + movieID),
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
						id: md5(currentUser.uid + movieID),
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

					if (reviewCardRef.current) {
						reviewCardRef.current.classList.add('review-card--new');

						let refOffset = 80;
						let refPosition = reviewCardRef.current.getBoundingClientRect().top;
						let offsetPosition = refPosition + window.pageYOffset - refOffset;

						window.scrollTo({
							top: offsetPosition,
							behavior: "smooth"
						});

						setTimeout(() => {
							reviewCardRef.current.classList.remove('review-card--new');
						}, 2000);
					}
				});
			}
		} else {
			setIsShowError(true);
		}
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

	const textAreaClassNames = classNames('new-review-form__textarea', {
		'new-review-form__textarea--error': isShowError,
	});

	return (
		<form onSubmit={handleSubmitNewReview} className="new-review-form">
			{
				!isReplyForm && <h3 className="new-review-form__title">Leave your feedback</h3>
			}
			<div className="new-review-form__user-wrap">
				<UserIcon profileLink={currentUser.uid} />
				<div className="new-review-form__user-info">
					<div className="new-review-form__username">{currentUser.displayName}</div>
				</div>
			</div>
			<textarea className={textAreaClassNames} cols="10" rows="8" ref={reviewTextRef} onChange={() => {handleChangeInputValue(reviewTextRef, setIsShowError)}}></textarea>
			{
				isShowError && <Error>Text field shouldn't be empty</Error>
			}
			<div className="new-review-form__buttons-wrap">
				{
					isReplyForm && <Button context={'cancel'} buttonOnClickFunction={() => {handleCancelButtonClick()}}>Cancel</Button>
				}
				<Button context={'filled'} buttonType={"submit"}>{isReplyForm ? 'Send reply' : 'Send review'}</Button>
			</div>
		</form>
	)
}

export default NewReviewForm;