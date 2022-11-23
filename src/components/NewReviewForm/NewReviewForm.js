import React, { useRef } from "react";
import { push, ref, set } from "firebase/database";
import { database } from "../../firebase";
import { v1 as uuidv1 } from 'uuid';
import { connect } from "react-redux";
import default_user_icon from "../App/assets/icons/default-user.svg";

const NewReviewForm = (props) => {

	const reviewsListRef = ref(database, 'reviews');
	const reviewsPostRef = push(reviewsListRef);

	let reviewTextRef = useRef();

	const handleSubmitNewReview = async (event) => {
		event.preventDefault();

		set(reviewsPostRef, {
			review: {
				movieID: props.movieID,
				id: uuidv1(),
				likesCounter: 0,
				dislikesCounter: 0,
				userAvatar: props.currentUser.photoURL,
				displayName: props.currentUser.displayName,
				reviewText: reviewTextRef.current.value,
				reviewDate: new Date().getTime(),
			},
		}).then(() => {
			reviewTextRef.current.value = '';
		});
	}

	const addDefaultSrc = (event) => {
		event.target.src = default_user_icon;
	}

	return (
		<form onSubmit={handleSubmitNewReview} className="new-review-form">
			<div className="new-review-form__user-wrap">
				<img className="new-review-form__user-avatar" onError={addDefaultSrc} src={props.currentUser.photoURL === null ? default_user_icon : props.currentUser.photoURL} alt="user-avatar" />
				<div className="new-review-form__user-info">
					<div className="new-review-form__username">{props.currentUser.displayName}</div>
				</div>
			</div>
			<textarea className="new-review-form__textarea" cols="10" rows="8" ref={reviewTextRef}></textarea>
			<button className="new-review-form__button" type="submit">Send review</button>
		</form>
	)
}

const mapStateToProps = state => ({
	currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(NewReviewForm);