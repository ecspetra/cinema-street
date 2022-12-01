const getTextLengthForPost = (reviewText, maxLength, showMore) => {

	const shortReviewText = reviewText.substring(0, maxLength);

	if (showMore) {
		return reviewText;
	} else {
		return shortReviewText;
	}

}

export default getTextLengthForPost;