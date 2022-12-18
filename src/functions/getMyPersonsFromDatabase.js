import { get } from "firebase/database";

const getMyPersonsFromDatabase = (postListRef, receivedFavoritePersonsKeys, handleSetFavoritePersons, userID = null) => {
	get(postListRef).then((snapshot) => {
		const receivedPersons = [];

		snapshot.forEach((childSnapshot) => {
			const favoritePerson = {
				key: childSnapshot.key,
				data: childSnapshot.val(),
			}

			if (userID === null) {
				if (receivedPersons.length < 20 && receivedFavoritePersonsKeys.length === 0) {
					receivedPersons.push(favoritePerson);
				} else if (receivedFavoritePersonsKeys.length > 0) {
					if (receivedPersons.length < 20 && !receivedFavoritePersonsKeys.includes(favoritePerson.key)) {
						receivedPersons.push(favoritePerson);
					}
				}
			} else {
				if (receivedPersons.length < 20 && receivedFavoritePersonsKeys.length === 0 && favoritePerson.data.person.userID === userID) {
					receivedPersons.push(favoritePerson);
				} else if (receivedFavoritePersonsKeys.length > 0) {
					if (receivedPersons.length < 20 && !receivedFavoritePersonsKeys.includes(favoritePerson.key) && favoritePerson.data.person.userID === userID) {
						receivedPersons.push(favoritePerson);
					}
				}
			}
		});

		handleSetFavoritePersons(receivedPersons);
	});
}

export default getMyPersonsFromDatabase;