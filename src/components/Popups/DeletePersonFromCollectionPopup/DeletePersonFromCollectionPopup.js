import React from "react";
import ModalContent from "../../ModalContent/ModalContent";
import Modal from "../../Modal/Modal";

const DeletePersonFromCollectionPopup = (props) => {

	const { isShowModal, setIsShowModal, handleRemovePersonFromCollection } = props;

	console.log(isShowModal);

	return (
		<Modal isShowModal={isShowModal} onClickFunction={() => {setIsShowModal(false)}}>
			<ModalContent title={'Please confirm the action'} description={'Are you sure you want to delete this person from favorite?'} handleAcceptFunction={handleRemovePersonFromCollection} handleCancelFunction={() => {setIsShowModal(false)}} />
		</Modal>
	)
}

export default DeletePersonFromCollectionPopup;