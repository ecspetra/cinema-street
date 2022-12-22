import { get } from "firebase/database";

const getTotalFavoritePersons = (postListRef, userID) => {
	return new Promise((resolve) => {
		get(postListRef).then((snapshot) => {
			const totalFavoritePersons = [];

			snapshot.forEach((childSnapshot) => {
				const favoritePerson = {
					key: childSnapshot.key,
					data: childSnapshot.val(),
				}

				if (favoritePerson.data.person.userID === userID) {
					totalFavoritePersons.push(favoritePerson);
				}
			});

			resolve(totalFavoritePersons);
		});
	})
}

const getMyPersonsFromDatabase = (postListRef, receivedFavoritePersonsKeys, userID) => {
	return new Promise(async (resolve) => {
		get(postListRef).then((snapshot) => {

			getTotalFavoritePersons(postListRef, userID).then((data) => {

				const initialListLength = 8;
				const maxResponseLength = 24;
				const isFirstRenderForList = !receivedFavoritePersonsKeys.length;

				const response = {
					dataFromResponse: [],
					isLastData: false,
				}

				snapshot.forEach((childSnapshot) => {
					const favoritePerson = {
						key: childSnapshot.key,
						data: childSnapshot.val(),
					}

					if (response.dataFromResponse.length < maxResponseLength && receivedFavoritePersonsKeys.length === 0 && favoritePerson.data.person.userID === userID) {
						response.dataFromResponse.push(favoritePerson);
					} else if (receivedFavoritePersonsKeys.length > 0) {
						console.log(receivedFavoritePersonsKeys);
						if (response.dataFromResponse.length < maxResponseLength && !receivedFavoritePersonsKeys.includes(favoritePerson.key) && favoritePerson.data.person.userID === userID) {
							response.dataFromResponse.push(favoritePerson);
						}
					}
				});

				if (data.length <= initialListLength) {
					response.isLastData = true;
				} else {
					if (isFirstRenderForList && response.dataFromResponse.length <= data.length) {
						response.isLastData = false;
					} else {
						if (response.dataFromResponse.length + receivedFavoritePersonsKeys.length < data.length) {
							response.isLastData = false;
						} else {
							response.isLastData = true;
						}
					}
				}

				resolve(response);
			})
		});
	})
}

export default getMyPersonsFromDatabase;