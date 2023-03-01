import React, { useState } from "react";
import { addDefaultImage } from "../../functions/addDefaultImage";
import defaultBackdropsImage from "../App/assets/icons/default-person.svg";
import Loader from "../Loader/Loader";
import CloseIcon from "../App/assets/icons/CloseIcon";
import ArrowIcon from "../App/assets/icons/ArrowIcon";
import Button from "../Button/Button";
import './assets/index.scss';

const Lightbox = (props) => {

	const { images, defaultImage, handleCloseLightbox } = props;

	const [isImageLoaded, setIsImageLoaded] = useState(false);
	const [currentImage, setCurrentImage] = useState(defaultImage);

	const getImage = (direction, imageIndex) => {

		let updatedImage;

		const nextImage = images[imageIndex + 1];
		const prevImage = images[imageIndex - 1];
		const lastImage = images[images.length - 1];

		if (direction === 'Next') {
			updatedImage = {
				image: nextImage !== undefined ? nextImage : images[0],
				index: nextImage !== undefined ? imageIndex + 1 : 0,
			};
		} else {
			updatedImage = {
				image: prevImage !== undefined ? prevImage : lastImage,
				index: prevImage !== undefined ? imageIndex - 1 : images.length - 1,
			};
		}

		setCurrentImage(updatedImage);
	}

	return (
		<div className="lightbox">
			<div className="lightbox__image-wrap">
				<img className="lightbox__image" onError={event => addDefaultImage(event, defaultBackdropsImage)} onLoad={() => {setIsImageLoaded(true)}} src={`https://image.tmdb.org/t/p/w500${currentImage.image.file_path}`} alt="backdrops" />
				{!isImageLoaded && <Loader>Loading image</Loader>}
			</div>
			<Button className="lightbox__button lightbox__button--left" buttonOnClickFunction={() => {getImage('Previous', currentImage.index)}}>
				<ArrowIcon />
			</Button>
			<Button className="lightbox__button lightbox__button--right" buttonOnClickFunction={() => {getImage('Next', currentImage.index)}}>
				<ArrowIcon />
			</Button>
			<Button className="lightbox__button lightbox__button--close" buttonOnClickFunction={() => {handleCloseLightbox()}}>
				<CloseIcon />
			</Button>
		</div>
	)
}

export default Lightbox;