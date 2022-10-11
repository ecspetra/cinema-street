import React from "react";
import ActorCard from "../ActorCard/ActorCard";

const ActorsList = (props) => {

	const persons = props.persons;

	return (
		<div className="persons-list">
			{
				persons && persons.map((person, index) => {
					if (index <= 7) {
						return <ActorCard person={person} key={index} isMovieCharacter={props.isMovieCharacter} />
					}
				})
			}
		</div>
	)
}

export default ActorsList;