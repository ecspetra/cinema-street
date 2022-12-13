import React, {useEffect, useRef, useState} from "react";
import { connect } from "react-redux";
import { clearCurrentPersonPage } from "../../actions";
import moment from "moment";

const ActorPage = (props) => {

	const { persons, handleClearCurrentPersonPage } = props;

	const isCurrentPersonLoaded = persons.currentPersonInfo !== null;

	const getActorGender = () => {
		if (isCurrentPersonLoaded) {
			if (persons.currentPersonInfo.gender === 1) {
				setPersonGender('Female');
			} else setPersonGender('Male');
		}
	}

	const [personGender, setPersonGender] = useState(() => getActorGender());

	let currentPerson;

	if (isCurrentPersonLoaded) {
		currentPerson = persons.currentPersonInfo;
	}

	const onMoviePageUnmount = useRef();
	onMoviePageUnmount.current = () => {
		handleClearCurrentPersonPage();
	}

	useEffect(() => {
		return () => onMoviePageUnmount.current();
	}, []);

	return (
		<>
			{
				isCurrentPersonLoaded ? (
					<div className="person-page">
						<div className="person-page__image-wrap">
							<img className="person-page__image" src={'https://image.tmdb.org/t/p/w440_and_h660_face' + currentPerson.profile_path} />
						</div>
						<div className="person-page__text-wrap">
							<h1 className="person-page__name">{currentPerson.name}</h1>
							<p className="person-page__role">{currentPerson.known_for_department}</p>
							<div className="person-page__details-wrap">
								<p className="person-page__details person-page__details--country">Country of birth: {currentPerson.place_of_birth}</p>
								<div className="person-page__details person-page__details--dates-wrap">
									<p className="person-page__birthday">{moment(currentPerson.birthday).format("M.D.Y")}</p>
									{
										currentPerson.deathday && <p className="person-page__deathday">&nbsp;— {moment(currentPerson.deathday).format("M.D.Y")}</p>
									}
								</div>
							</div>
							<p className="person-page__biography">{currentPerson.biography}</p>

							<p className="person-page__gender">{personGender}</p>
						</div>
					</div>
				)
					: 'Loading'
			}
		</>
	);
}

const mapStateToProps = state => ({
	persons: state.persons,
})

const mapDispatchToProps = (dispatch) => {
	return {
		handleClearCurrentPersonPage: () => dispatch(clearCurrentPersonPage()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ActorPage);