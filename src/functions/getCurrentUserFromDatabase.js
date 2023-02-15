import { get, getDatabase, ref } from "firebase/database";

export const getCurrentUserFromDatabase = (currentUserID) => {

	const database = getDatabase();
	const postListRef = ref(database, 'users');

	return new Promise((resolve) => {
		get(postListRef).then((snapshot) => {

			let currentUserFromDatabase;

			snapshot.forEach((childSnapshot) => {

				const userFromDatabase = {
					key: childSnapshot.key,
					data: childSnapshot.val(),
				}

				if (userFromDatabase.key === currentUserID) {
					currentUserFromDatabase = userFromDatabase;
				}
			});

			resolve(currentUserFromDatabase);
		});
	});
}