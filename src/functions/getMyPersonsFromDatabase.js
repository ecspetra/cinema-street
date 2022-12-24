import { get } from "firebase/database";

export const getTotalFavoritePersons = (postListRef, userID) => {
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

export const getMyPersonsFromDatabase = (postListRef, receivedFavoritePersonsKeys, userID) => {
	return new Promise(async (resolve) => {
		get(postListRef).then((snapshot) => {

			getTotalFavoritePersons(postListRef, userID).then((data) => {

				const initialListLength = 8;
				const maxResponseLength = 24;
				const isFirstRenderForList = receivedFavoritePersonsKeys.length === 0;
				const isShortList = data.length <= initialListLength;

				const response = {
					dataFromResponse: [],
					isLastData: false,
				}

				snapshot.forEach((childSnapshot) => {

					const favoritePerson = {
						key: childSnapshot.key,
						data: childSnapshot.val(),
					}

					if (isFirstRenderForList) {
						if (response.dataFromResponse.length < maxResponseLength && favoritePerson.data.person.userID === userID) {
							response.dataFromResponse.push(favoritePerson);
						}
					} else {
						if (response.dataFromResponse.length < maxResponseLength && !receivedFavoritePersonsKeys.includes(favoritePerson.key) && favoritePerson.data.person.userID === userID) {
							response.dataFromResponse.push(favoritePerson);
						}
					}
				});

				const isMoreResultsAvailable = response.dataFromResponse.length + receivedFavoritePersonsKeys.length < data.length;

				if (isShortList) {
					response.isLastData = true;
				} else {
					if (isFirstRenderForList) {
						if (isMoreResultsAvailable) {
							response.isLastData = false;
						}
					} else {
						if (isMoreResultsAvailable) {
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

export const fillFavoritePersonsList = (postListRef, receivedFavoritePersonsKeys, userID) => {
	return new Promise(async (resolve) => {
		get(postListRef).then((snapshot) => {

			getTotalFavoritePersons(postListRef, userID).then((data) => {

				const response = {
					dataFromResponse: [],
				}

				snapshot.forEach((childSnapshot) => {

					const favoritePerson = {
						key: childSnapshot.key,
						data: childSnapshot.val(),
					}

					if (!receivedFavoritePersonsKeys.includes(favoritePerson.key) && favoritePerson.data.person.userID === userID) {
						response.dataFromResponse.push(favoritePerson);
					}
				});

				resolve(response);
			})
		});
	})
}