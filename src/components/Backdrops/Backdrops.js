import React, { useState } from 'react';
import default_user_icon from "../App/assets/icons/default-user.svg";
import classNames from "classnames";

const Backdrops = (props) => {

	const [isImageLoaded, setIsImageLoaded] = useState(false);

	const addDefaultSrc = (event) => {
		event.target.src = default_user_icon;
	}

	const backdropsClassNames = classNames('backdrops', {
		'backdrops--loading': !isImageLoaded,
	});

	return (
		<div className={backdropsClassNames}>
			<img className="backdrops__image" onError={addDefaultSrc} onLoad={() => {setIsImageLoaded(true)}} src={'https://image.tmdb.org/t/p/w440_and_h660_face' + props.backdrops.file_path} alt="backdrops" />
		</div>
	)
}

export default Backdrops;