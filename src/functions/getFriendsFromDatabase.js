import { get } from "firebase/database";

export const getFriendsFromDatabase = (friendsListRef, currentUserID) => {
	return new Promise(async (resolve) => {
		get(friendsListRef).then((snapshot) => {

			let response = [];

			snapshot.forEach((childSnapshot) => {

				const user = {
					key: childSnapshot.key,
					data: childSnapshot.val(),
				}

				if (user.data.friends.length && (user.data.userID === currentUserID)) {
					user.data.friends.map((friend) => {
						response.push(friend);
					})
				}
			});

			resolve(response);
		});
	})
}