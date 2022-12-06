const getTextLengthForPost = (reviewText, maxLength, isTextHidden, isLongText) => {

	const shortReviewText = reviewText.substring(0, maxLength) + '... ';

	if (isTextHidden && isLongText) {
		return shortReviewText;
	} else {
		return reviewText + ' ';
	}

}

export default getTextLengthForPost;