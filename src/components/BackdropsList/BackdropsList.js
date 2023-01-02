import React, { useState, useRef } from "react";
import Backdrops from '../Backdrops/Backdrops';
import MoreButton from "../MoreButton/MoreButton";
import InfoText from "../InfoText/InfoText";
import Modal from "../Modal/Modal";
import Lightbox from "../Lightbox/Lightbox";
import './assets/index.scss';

const BackdropsList = (props) => {

	const { backdrops } = props;

	const initialListLength = 4;

	const backdropsRef = useRef(null);
	const [maxListLength, setMaxListLength] = useState(initialListLength);
	const [isShowModal, setIsShowModal] = useState(false);
	const isShowMoreButton = backdrops.length !== 0 && backdrops.length >= maxListLength;

	const getBackdrops = () => {
		if (backdrops.length !== maxListLength) {
			setMaxListLength(backdrops.length);
		} else {
			let refOffset = 120;
			let refPosition = backdropsRef.current.getBoundingClientRect().top;
			let offsetPosition = refPosition + window.pageYOffset - refOffset;

			window.scrollTo({
				top: offsetPosition,
				behavior: "smooth"
			});

			setTimeout(() => {
				setMaxListLength(initialListLength);
			}, 750);
		}
	}

	const [defaultImage, setDefaultImagePath] = useState({
		backdrops: null,
		index: null,
	});

	return (
		<>
			{
				backdrops.length !== 0 ? (
					<>
						<div className="backdrops-list" ref={backdropsRef}>
							{(backdrops && backdrops.map((item, index) => {
								if (index < maxListLength) {
									return <Backdrops setDefaultImagePath={setDefaultImagePath} onOpenImage={() => {setIsShowModal(true)}} backdrops={item} index={index} key={item.file_path} />
								}
							}))
							}
						</div>
						<Modal isShowModal={isShowModal}>
							<Lightbox images={backdrops} defaultImage={defaultImage} handleCloseLightbox={() => {setIsShowModal(false)}} />
						</Modal>
						{
							isShowMoreButton && <MoreButton listLength={backdrops.length} maxListLength={maxListLength} moreButtonOnClickFunction={getBackdrops} />
						}
					</>
				)
					: <InfoText>No backdrops yet</InfoText>
			}
		</>

	)
}

export default BackdropsList;