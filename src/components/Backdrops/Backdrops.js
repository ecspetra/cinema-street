import React, { useState } from 'react';
import Loader from "../Loader/Loader";
import { addDefaultImage } from "../../functions/addDefaultImage";
import defaultBackdropsImage from "../App/assets/icons/default-person.svg";

const Backdrops = (props) => {

	const [isImageLoaded, setIsImageLoaded] = useState(false);

	return (
		<div className="backdrops">
			<img className="backdrops__image" onError={event => addDefaultImage(event, defaultBackdropsImage)} onLoad={() => {setIsImageLoaded(true)}} src={'https://image.tmdb.org/t/p/w440_and_h660_face' + props.backdrops.file_path} alt="backdrops" />
			{!isImageLoaded && <Loader>Loading image</Loader>}
		</div>
	)
}

export default Backdrops;