import { get } from "firebase/database";

const checkIfFriendExistsInCollection = (friendsListRef, user, currentUserID, isUserNeeded = false) => {

	return new Promise((resolve) => {
		get(friendsListRef).then((snapshot) => {

			let isFriendFromCollection = false;

			snapshot.forEach((childSnapshot) => {
				const friend = {
					key: childSnapshot.key,
					data: childSnapshot.val(),
				}

				if (friend.data.friends.length && currentUserID === friend.data.userID && friend.data.friends.some(friend => user.data.avatar === friend.data.avatar) && isUserNeeded === true) {
					isFriendFromCollection = friend;
				} else if (friend.data.friends.length && currentUserID === friend.data.userID && friend.data.friends.some(friend => user.data.avatar === friend.data.avatar) && isUserNeeded === false) {
					isFriendFromCollection = true;
				}
			});

			resolve(isFriendFromCollection)
		});
	});
}

export default checkIfFriendExistsInCollection;