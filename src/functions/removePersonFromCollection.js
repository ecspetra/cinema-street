import checkIfPersonExistsInCollection from "./checkIfPersonExistsInCollection";
import { ref, getDatabase, remove } from "firebase/database";

const removePersonFromCollection = async (postListRef, person, removeFromFavoritePersonsFunction) => {

	const database = getDatabase();

	let personFromCollection = await checkIfPersonExistsInCollection(postListRef, person.id, true);

	removeFromFavoritePersonsFunction(person.id);

	const dbRef = ref(database, "/persons/" + personFromCollection.key);
	remove(dbRef);
}

export default removePersonFromCollection;