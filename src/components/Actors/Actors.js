import React from "react";
import ActorsList from "../ActorsList/ActorsList";

const Actors = (props) => {

	return (
		<div className="actors">
			<h1>Actors</h1>
			<ActorsList persons={props.persons} />
		</div>
	)
}

export default Actors;