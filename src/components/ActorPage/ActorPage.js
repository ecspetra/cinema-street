import React from "react";

const ActorPage = (props) => {

	const { persons } = props;

	const gender = persons.currentPersonInfo.gender;

	const getActorGender = () => {
		if (gender === 1) {
			return <span>Female</span>
		} else return <span>Male</span>
	}

	return (
		<div>
			<img src={'https://image.tmdb.org/t/p/w440_and_h660_face' + persons.currentPersonInfo.profile_path} />
			<p>{persons.currentPersonInfo.name}</p>
			<p>{persons.currentPersonInfo.biography}</p>
			<p>{persons.currentPersonInfo.birthday}</p>
			{
				persons.currentPersonInfo.deathday && <p>{persons.currentPersonInfo.deathday}</p>
			}
			<p>{persons.currentPersonInfo.place_of_birth}</p>
			<p>{getActorGender()}</p>
		</div>
	);
}

export default ActorPage;