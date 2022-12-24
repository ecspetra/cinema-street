import React from "react";
import PersonsList from "../PersonsList/PersonsList";
import { LINK_TO_FETCH_PERSONS } from "../../functions/linksToFetch";
import SearchPerson from "../SearchPerson/SearchPerson";

const Persons = () => {

	return (
		<div className="persons">
			<div className="persons__favorite-list">
				<h1>Favorite persons</h1>
				<PersonsList isFavoritePersonsList />
			</div>
			<SearchPerson />
			<div className="persons__general-list">
				<h1>Discover persons</h1>
				<PersonsList linkToFetch={LINK_TO_FETCH_PERSONS} />
			</div>
		</div>
	)
}

export default Persons;