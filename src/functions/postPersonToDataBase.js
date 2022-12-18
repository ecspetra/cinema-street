import { set } from "firebase/database";

const postPersonToDataBase = (newPostRef, person, userID) => {

	set(newPostRef, {
		person: {
			userID: userID,
			profile_path: person.profile_path,
			name: person.name,
			id: person.id,
		},
	})
}

export default postPersonToDataBase;