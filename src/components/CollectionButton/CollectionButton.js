import React, {useState} from "react";
import classNames from "classnames";
import Loader from "../Loader/Loader";

const CollectionButton = (props) => {

	const { isExistsInCollection, collectionButtonOnClickFunction, children } = props;
	const [isLoaded, setIsLoaded] = useState(true);

	const collectionButtonClassNames = classNames('main-button', {
		'main-button--remove': isExistsInCollection,
	});

	const handleCollectionButtonOnClick = async () => {
		setIsLoaded(false);
		collectionButtonOnClickFunction();

		setTimeout(() => {
			setIsLoaded(true);
		}, 1000);
	}

	return (
		<button className={collectionButtonClassNames} onClick={() => {handleCollectionButtonOnClick()}}>
			{
				isLoaded ? children : <Loader />
			}
		</button>
	)
}

export default CollectionButton;