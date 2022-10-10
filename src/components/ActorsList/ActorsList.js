import React from "react";
import ActorCard from "../ActorCard/ActorCard";

const ActorsList = (props) => {

	const persons = props.persons;

	return (
		<>
			Filter
			<div className="movie-list">
				{persons.map((person, index) => {
					return <ActorCard person={person} key={index} />
				})
				}
			</div>
		</>
	)
}

export default ActorsList;