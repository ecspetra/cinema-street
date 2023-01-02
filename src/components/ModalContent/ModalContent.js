import React from "react";
import Button from "../Button/Button";
import CloseIcon from "../App/assets/icons/CloseIcon";
import './assets/index.scss';

const ModalContent = (props) => {

	const { title, description, handleAcceptFunction, handleCancelFunction } = props;

	return (
		<div onClick={(event) => {event.stopPropagation()}} className="modal-content">
			<div className="modal-content__text-wrap">
				<h3 className="modal-content__title">{title}</h3>
				<p className="modal-content__description">{description}</p>
			</div>
			<div className="modal-content__buttons-wrap">
				<Button context={'cancel'} buttonOnClickFunction={handleCancelFunction} className='modal-content__button'>Cancel</Button>
				<Button context={'filled'} buttonOnClickFunction={handleAcceptFunction} className='modal-content__button'>Accept</Button>
			</div>
			<Button buttonOnClickFunction={handleCancelFunction} className='modal-content__close-button'>
				<CloseIcon />
			</Button>
		</div>
	);
}

export default ModalContent;