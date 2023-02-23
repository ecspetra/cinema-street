import { get } from "firebase/database";

export const getFriendsFromDatabase = (friendsListRef, currentUserID, isMyFriendsList) => {
	return new Promise(async (resolve) => {
		get(friendsListRef).then((snapshot) => {

			let response = [];

			if (isMyFriendsList === false) {
				snapshot.forEach((childSnapshot) => {

					const user = {
						key: childSnapshot.key,
						data: childSnapshot.val(),
					}

					if (user.data.friends.length && user.data.friends.some((user) => user.userID === currentUserID)) {
						response.push(user);
					}
				});
			} else {
				snapshot.forEach((childSnapshot) => {

					const user = {
						key: childSnapshot.key,
						data: childSnapshot.val(),
					}

					if (user.data.userID === currentUserID) {
						user.data.friends.map((friend) => {
							response.push(friend);
						})
					}
				});
			}

			resolve(response);
		});
	})
}