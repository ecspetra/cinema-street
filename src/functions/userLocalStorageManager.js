export const saveUserToLocalStorage = (userToSave) => {
	localStorage.setItem('user', JSON.stringify(userToSave));
}

export const removeUserFromLocalStorage = () => {
	localStorage.removeItem('user');
}

export const formUserObject = (user) => {
	const userToSave = {
		userID: user.uid ? user.uid : user.userID,
		name: user.displayName ? user.displayName : user.name,
		email: user.email,
		avatar: user.photoURL ? user.photoURL : user.avatar,
		country: user.country ? user.country : "No information yet",
		dateOfBirth: user.dateOfBirth ? user.dateOfBirth : "No information yet",
		biography: user.biography ? user.biography : "No information yet",
	}

	return userToSave;
}