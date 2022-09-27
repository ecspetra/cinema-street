import React from "react";
import ActorCard from "../ActorCard/ActorCard";

const ActorsList = (props) => {
	return (
		<>
			Filter
			<div className="movie-list">
				{props.persons.map((person, index) => {
					return <ActorCard person={person} key={index} />
				})
				}
			</div>
		</>
	)
}

export default ActorsList;