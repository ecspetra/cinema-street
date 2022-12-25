import { get } from "firebase/database";

const checkIfPersonExistsInCollection = (postListRef, person, userID, isPersonNeeded = false) => {

	return new Promise((resolve) => {
		get(postListRef).then((snapshot) => {

			let isPersonFromCollection = false;

			snapshot.forEach((childSnapshot) => {
				const favoritePerson = {
					key: childSnapshot.key,
					data: childSnapshot.val(),
				}

				if (userID === favoritePerson.data.person.userID && (person.id === favoritePerson.data.person.id || person.name === favoritePerson.data.person.name) && isPersonNeeded === true) {
					isPersonFromCollection = favoritePerson;
				} else if (userID === favoritePerson.data.person.userID && (person.id === favoritePerson.data.person.id || person.name === favoritePerson.data.person.name) && isPersonNeeded === false) {
					isPersonFromCollection = true;
				}
			});

			resolve(isPersonFromCollection)
		});
	});
}

export default checkIfPersonExistsInCollection;