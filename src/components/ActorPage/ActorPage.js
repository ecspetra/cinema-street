import React from "react";

const ActorPage = (props) => {

	const gender = props.persons.currentPersonInfo.gender;

	const getActorGender = () => {
		if (gender === 1) {
			return <span>Female</span>
		} else return <span>Male</span>
	}

	return (
		<div>
			<img src={'https://image.tmdb.org/t/p/w440_and_h660_face' + props.persons.currentPersonInfo.profile_path} />
			<p>{props.persons.currentPersonInfo.name}</p>
			<p>{props.persons.currentPersonInfo.biography}</p>
			<p>{props.persons.currentPersonInfo.birthday}</p>
			{
				props.persons.currentPersonInfo.deathday && <p>{props.persons.currentPersonInfo.deathday}</p>
			}
			<p>{props.persons.currentPersonInfo.place_of_birth}</p>
			<p>{getActorGender()}</p>
		</div>
	);
}

export default ActorPage;