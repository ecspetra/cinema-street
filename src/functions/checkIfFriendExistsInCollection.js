import { get } from "firebase/database";

const checkIfFriendExistsInCollection = (friendsListRef, selectedUser, currentUser, isUserNeeded = false, isSelectedUserNeeded = false) => {

	return new Promise((resolve) => {
		get(friendsListRef).then((snapshot) => {

			let isFriendFromCollection = false;

			snapshot.forEach((childSnapshot) => {
				const friend = {
					key: childSnapshot.key,
					data: childSnapshot.val(),
				}

				if (isSelectedUserNeeded === true) {
					if (friend.data.friends.length && selectedUser.userID === friend.data.userID && friend.data.friends.some(friend => currentUser.userID === friend.userID) && isUserNeeded === true) {

						isFriendFromCollection = friend;
					} else if (friend.data.friends.length && selectedUser.userID === friend.data.userID && friend.data.friends.some(friend => currentUser.userID === friend.userID) && isUserNeeded === false) {
						isFriendFromCollection = true;
					}
				} else {
					if (friend.data.friends.length && currentUser.userID === friend.data.userID && friend.data.friends.some(friend => selectedUser.userID === friend.userID) && isUserNeeded === true) {
						isFriendFromCollection = friend;
					} else if (friend.data.friends.length && currentUser.userID === friend.data.userID && friend.data.friends.some(friend => selectedUser.userID === friend.userID) && isUserNeeded === false) {
						isFriendFromCollection = true;
					}
				}
			});

			resolve(isFriendFromCollection);
		});
	});
}

export default checkIfFriendExistsInCollection;