import { ref, getDatabase, set } from "firebase/database";
import checkIfFriendExistsInCollection from "./checkIfFriendExistsInCollection";

const removeFriendFromCollection = async (friendsListRef, user, currentUserID, removeFromFriendsFunction) => {

	const database = getDatabase();

	let friendFromCollection = await checkIfFriendExistsInCollection(friendsListRef, user, currentUserID, true);

	const dbRef = ref(database, "/friends/" + friendFromCollection.key);

	const friendsUpdated = friendFromCollection.data.friends.filter(friend => friend.key !== user.key);
	const friendsEmpty = 0;

	const checkFrindsLength = () => {
		if (friendFromCollection.data.friends.length > 1) {
			return friendsUpdated;
		} else {
			return friendsEmpty;
		}
	}

	set(dbRef, {
		userID: friendFromCollection.data.userID,
		info: {
			name: friendFromCollection.data.info.name,
			email: friendFromCollection.data.info.email,
			avatar: friendFromCollection.data.info.avatar,
		},
		friends: checkFrindsLength(),
	});

	removeFromFriendsFunction(user.key);
}

export const removeUserFromFriends = async (friendsListRef, user, currentUserID, removeFromFriendsFunction, setIsFriendFromCollection) => {
	await removeFriendFromCollection(friendsListRef, user, currentUserID, removeFromFriendsFunction);

	checkIfFriendExistsInCollection(friendsListRef, user, currentUserID).then((isFriendFromCollection) => {
		setIsFriendFromCollection(isFriendFromCollection);
	});
}