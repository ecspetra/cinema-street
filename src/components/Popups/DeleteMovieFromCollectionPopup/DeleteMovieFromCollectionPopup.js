import React from "react";
import ModalContent from "../../ModalContent/ModalContent";
import Modal from "../../Modal/Modal";

const DeleteMovieFromCollectionPopup = (props) => {

	const { isShowModal, setIsShowModal, handleRemoveMovieFromCollection } = props;

	return (
		<Modal isShowModal={isShowModal} onClickFunction={() => {setIsShowModal(false)}}>
			<ModalContent title={'Please confirm the action'} description={'Are you sure you want to delete this movie from favorite?'} handleAcceptFunction={handleRemoveMovieFromCollection} handleCancelFunction={() => {setIsShowModal(false)}} />
		</Modal>
	)
}

export default DeleteMovieFromCollectionPopup;