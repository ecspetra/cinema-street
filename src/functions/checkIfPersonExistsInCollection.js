import { get } from "firebase/database";

const checkIfPersonExistsInCollection = (postListRef, personID, isPersonNeeded = false) => {
	return new Promise(function(resolve) {
		get(postListRef).then((snapshot) => {

			let person = false;

			snapshot.forEach((childSnapshot) => {
				const favoritePerson = {
					key: childSnapshot.key,
					data: childSnapshot.val(),
				}

				if (personID === favoritePerson.data.person.id && isPersonNeeded === true) {
					person = favoritePerson;
				} else if (personID === favoritePerson.data.person.id && isPersonNeeded === false) {
					person = true;
				}
			});

			resolve(person)
		});
	});
}

export default checkIfPersonExistsInCollection;