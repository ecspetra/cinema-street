import { ref, getDatabase, set } from "firebase/database";
import checkIfFriendExistsInCollection from "./checkIfFriendExistsInCollection";

const removeFriendFromCollection = async (friendsListRef, selectedUser, currentUser, removeFromFriendsFunction) => {

	const database = getDatabase();

	let currentUserFromCollection = await checkIfFriendExistsInCollection(friendsListRef, selectedUser, currentUser, true);
	let selectedUserFromCollection = await checkIfFriendExistsInCollection(friendsListRef, selectedUser, currentUser, true, true);

	const currentUserRef = ref(database, "/friends/" + currentUserFromCollection.key);
	const selectedUserRef = ref(database, "/friends/" + selectedUserFromCollection.key);

	const currentUserFriendsUpdated = currentUserFromCollection.data.friends.filter(friend => friend.userID !== selectedUser.userID);
	const selectedUserFriendsUpdated = selectedUserFromCollection.data.friends.filter(friend => friend.userID !== currentUser.userID);
	const friendsEmpty = 0;

	const checkCurrentUserFriendsLength = () => {
		if (currentUserFriendsUpdated.length > 0) {
			return currentUserFriendsUpdated;
		} else {
			return friendsEmpty;
		}
	}

	const checkSelectedUserFriendsLength = () => {
		if (selectedUserFriendsUpdated.length > 0) {
			return selectedUserFriendsUpdated;
		} else {
			return friendsEmpty;
		}
	}

	set(currentUserRef, {
		userID: currentUserFromCollection.data.userID,
		info: {
			name: currentUserFromCollection.data.info.name,
			email: currentUserFromCollection.data.info.email,
			avatar: currentUserFromCollection.data.info.avatar,
		},
		friends: checkCurrentUserFriendsLength(),
	});

	set(selectedUserRef, {
		userID: selectedUserFromCollection.data.userID,
		info: {
			name: selectedUserFromCollection.data.info.name,
			email: selectedUserFromCollection.data.info.email,
			avatar: selectedUserFromCollection.data.info.avatar,
		},
		friends: checkSelectedUserFriendsLength(),
	});

	removeFromFriendsFunction(selectedUser.userID);
}

export const removeUserFromFriends = async (friendsListRef, selectedUser, currentUser, removeFromFriendsFunction, setIsFriendFromCollection) => {
	await removeFriendFromCollection(friendsListRef, selectedUser, currentUser, removeFromFriendsFunction);

	checkIfFriendExistsInCollection(friendsListRef, selectedUser, currentUser).then((isFriendFromCollection) => {
		setIsFriendFromCollection(isFriendFromCollection);
	});
}