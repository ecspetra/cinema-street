import React, { useEffect } from "react";
import ActorsList from "../ActorsList/ActorsList";
import { LINK_TO_FETCH_PERSONS } from "../../functions/linksToFetch";

const Actors = (props) => {

	return (
		<div className="actors">
			<h1>Actors</h1>
			<ActorsList linkToFetch={LINK_TO_FETCH_PERSONS} />
		</div>
	)
}

export default Actors;