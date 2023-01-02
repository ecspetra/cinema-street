import React, { useRef, useState } from 'react';
import Loader from "../Loader/Loader";
import { addDefaultImage } from "../../functions/addDefaultImage";
import defaultBackdropsImage from "../App/assets/icons/default-person.svg";
import './assets/index.scss';

const Backdrops = (props) => {

	const { onOpenImage, index, backdrops, setDefaultImagePath } = props;

	const backdropsImageRef = useRef();

	const [isImageLoaded, setIsImageLoaded] = useState(false);

	const handleSetImage = () => {
		onOpenImage();
		setDefaultImagePath({image: backdrops, index: index});
	}

	return (
		<div ref={backdropsImageRef} className="backdrops" onClick={() => {handleSetImage()}}>
			<img className="backdrops__image" onError={event => addDefaultImage(event, defaultBackdropsImage)} onLoad={() => {setIsImageLoaded(true)}} src={'https://image.tmdb.org/t/p/w500' + backdrops.file_path} alt="backdrops" />
			{!isImageLoaded && <Loader>Loading image</Loader>}
		</div>
	)
}

export default Backdrops;