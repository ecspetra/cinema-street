import React, { useState, useRef } from "react";
import Backdrops from '../Backdrops/Backdrops';
import MoreButton from "../MoreButton/MoreButton";
import InfoText from "../InfoText/InfoText";
import Modal from "../Modal/Modal";
import Lightbox from "../Lightbox/Lightbox";
import { CSSTransition } from "react-transition-group";

const BackdropsList = (props) => {

	const { backdrops } = props;

	const initialListLength = 4;

	const backdropsRef = useRef(null);
	const [maxListLength, setMaxListLength] = useState(initialListLength);
	const [isShowModal, setIsShowModal] = useState(false);
	const [isMounted, setIsMounted] = useState(false);
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

	const handleIsShowLightbox = () => {
		setIsShowModal(true);
		setIsMounted(true);
	}

	const [defaultImage, setDefaultImagePath] = useState({
		backdrops: null,
		index: null,
	});

	const handleCloseLightbox = () => {
		setIsMounted(false);

		setTimeout(() => {
			setIsShowModal(false);
		}, 300)
	}

	return (
		<>
			{
				backdrops.length !== 0 ? (
					<>
						<div className="backdrops-list" ref={backdropsRef}>
							{(backdrops && backdrops.map((item, index) => {
								if (index < maxListLength) {
									return <Backdrops setDefaultImagePath={setDefaultImagePath} onOpenImage={handleIsShowLightbox} backdrops={item} index={index} key={item.file_path} />
								}
							}))
							}
						</div>
						{
							isShowModal && (
								<CSSTransition
									in={isMounted}
									appear={true}
									timeout={0}
									classNames="modal"
								>
									<Modal>
										<Lightbox images={backdrops} defaultImage={defaultImage} handleCloseLightbox={handleCloseLightbox} />
									</Modal>
								</CSSTransition>
							)
						}
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