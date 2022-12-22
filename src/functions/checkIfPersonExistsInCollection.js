import { get } from "firebase/database";

const checkIfPersonExistsInCollection = (postListRef, personID, userID, isPersonNeeded = false) => {
	return new Promise((resolve) => {
		get(postListRef).then((snapshot) => {

			let person = false;

			snapshot.forEach((childSnapshot) => {
				const favoritePerson = {
					key: childSnapshot.key,
					data: childSnapshot.val(),
				}

				if (userID === favoritePerson.data.person.userID && personID === favoritePerson.data.person.id && isPersonNeeded === true) {
					person = favoritePerson;
				} else if (userID === favoritePerson.data.person.userID && personID === favoritePerson.data.person.id && isPersonNeeded === false) {
					person = true;
				}
			});

			resolve(person)
		});
	});
}

export default checkIfPersonExistsInCollection;