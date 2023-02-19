import React from "react";
import ModalContent from "../../ModalContent/ModalContent";
import Modal from "../../Modal/Modal";
import FriendsList from "../../FriendsList/FriendsList";

const FriendsPopup = (props) => {

	const { isShowModal, setIsShowModal, isMyFriendsList, userID, setIsFriendFromCollection } = props;

	return (
		<Modal className="modal--friends" isShowModal={isShowModal} onClickFunction={() => {setIsShowModal(false)}}>
			<ModalContent isConfirmationPopup={false} title={'Friends'} handleCancelFunction={() => {setIsShowModal(false)}}>
				<FriendsList isMyFriendsList={isMyFriendsList} userID={userID} setIsFriendFromCollection={setIsFriendFromCollection} />
			</ModalContent>
		</Modal>
	)
}

export default FriendsPopup;