import React, { useEffect, useState } from "react";
import classNames from "classnames";
import Loader from "../Loader/Loader";

const CollectionButton = (props) => {

	const { className, isExistsInCollection, collectionButtonOnClickFunction, children } = props;
	const [isLoaded, setIsLoaded] = useState(false);

	const collectionButtonClassNames = classNames('main-button', className, {
		'main-button--remove': isExistsInCollection,
	});

	const handleCollectionButtonOnClick = async () => {
		setIsLoaded(false);
		collectionButtonOnClickFunction();

		setTimeout(() => {
			setIsLoaded(true);
		}, 1000);
	}

	useEffect(() => {
		if (isExistsInCollection !== undefined) {
			setIsLoaded(true);
		}
	}, [isExistsInCollection]);

	return (
		<button className={collectionButtonClassNames} onClick={() => {handleCollectionButtonOnClick()}}>
			{
				isLoaded === true ? children : <Loader />
			}
		</button>
	)
}

export default CollectionButton;