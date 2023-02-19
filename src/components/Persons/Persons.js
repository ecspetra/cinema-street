import React, { useContext } from "react";
import PersonsList from "../PersonsList/PersonsList";
import { LINK_TO_FETCH_PERSONS } from "../../functions/linksToFetch";
import SearchPerson from "../SearchPerson/SearchPerson";
import './assets/index.scss';
import UserContext from "../UserContext/UserContext";
import Title from "../Title/Title";

const Persons = () => {

	const { currentUser } = useContext(UserContext);

	return (
		<>
			{
				currentUser !== null ? (
					<div className="persons">
						<div className="persons__favorite-list">
							<Title title={"Favorite persons"} />
							<PersonsList isFavoritePersonsList />
						</div>
						<SearchPerson />
						<div className="persons__general-list">
							<Title title={"Discover persons"} />
							<PersonsList linkToFetch={LINK_TO_FETCH_PERSONS} />
						</div>
					</div>
				) : 'Loading'
			}
		</>
	)
}

export default Persons;