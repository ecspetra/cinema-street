import React, { useState } from "react";
import Loader from "../Loader/Loader";
import './assets/index.scss';

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
		<button className="more-button" onClick={() => {handleMoreButtonOnClick()}}>
			{
				isLoaded ? buttonText : <Loader />
			}
		</button>
	)
}

export default MoreButton;