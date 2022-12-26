import { push, ref, set } from "firebase/database";
import checkIfPersonExistsInCollection from "./checkIfPersonExistsInCollection";

const postPersonToDataBase = async (database, person, userID) => {

	const postListRef = ref(database, 'persons');
	const newPostRef = push(postListRef);

	let personFromCollection = await checkIfPersonExistsInCollection(postListRef, person, userID);

	if (personFromCollection === false) {
		set(newPostRef, {
			person: {
				userID: userID,
				profile_path: person.profile_path,
				name: person.name,
				id: person.id,
			},
		})
	}
}

export default postPersonToDataBase;