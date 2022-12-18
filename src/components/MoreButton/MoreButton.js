import React, { useState } from "react";
import Loader from "../Loader/Loader";

const MoreButton = (props) => {

	const { listLength, maxListLength, moreButtonOnClickFunction, isFetchResultsButton } = props;
	const [isLoaded, setIsLoaded] = useState(true);

	const handleMoreButtonOnClick = () => {
		setIsLoaded(false);
		moreButtonOnClickFunction();

		setTimeout(() => {
			setIsLoaded(true);
		}, 250);
	}

	const buttonText = listLength > maxListLength || isFetchResultsButton ? 'Show more' : 'Show less';

	return (
		<button className="main-button main-button--more" onClick={() => {handleMoreButtonOnClick()}}>
			{
				isLoaded ? buttonText : <Loader />
			}
		</button>
	)
}

export default MoreButton;