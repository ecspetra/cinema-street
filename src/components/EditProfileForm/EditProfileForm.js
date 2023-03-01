import React, { useState, useRef, useContext, useEffect } from "react";
import { handleChangeInputValue } from "../../functions/handleChangeInputValue";
import Button from "../Button/Button";
import Input from "../Input/Input";
import UserContext from "../UserContext/UserContext";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { getAuth, updateProfile } from "firebase/auth";
import CalendarInput from "../CalendarInput/CalendarInput";
import './assets/index.scss';
import {getCurrentUserFromDatabase} from "../../functions/getCurrentUserFromDatabase";
import {setUser} from "../../actions";
import {connect} from "react-redux";
import {saveUserToLocalStorage} from "../../functions/userLocalStorageManager";

const EditProfileForm = (props) => {

	const { setIsEditState, handleSetUser, userInfo, updatedProfileImage, handleUpdateProfilePage, setTemporaryProfileImage } = props;

	const [dateOfBirthValue, setDateOfBirthValue] = useState("No information yet");
	const [biographyInputValue, setBiographyInputValue] = useState("No information yet");

	const { currentUser } = useContext(UserContext);

	const nameInputRef = useRef(currentUser.name);
	const countryInputRef = useRef(userInfo.country);

	const database = getDatabase();
	const auth = getAuth();

	const [nameError, setNameError] = useState({
		nameErrorText: '',
		isShowError: false,
	});

	const handleCancelButtonClick = () => {
		setTemporaryProfileImage(null);
		setIsEditState(false);
	}

	const checkIfNameInputValid = () => {
		if (nameInputRef.current.value.length) {
			setNameError({nameErrorText: '', isShowError: false});
			return true;
		} else {
			setNameError({nameErrorText: 'Name shouldn`t be empty', isShowError: true});
			return false;
		}
	}

	const handleSetDateInputValue = (date) => {
		setDateOfBirthValue(date);
	}

	let fieldsValues = {
		nameInputValue: '',
		updatedProfileImage: '',
		countryInputValue: '',
		dateOfBirth: '',
		biography: '',
	}

	const handleChangeBiographyValue = (event) => {
		setBiographyInputValue(event.target.value);
	}

	const { setCurrentUser } = useContext(UserContext);

	useEffect(() => {
		fieldsValues = {
			nameInputValue: nameInputRef.current.value,
			updatedProfileImage: updatedProfileImage,
			countryInputValue: countryInputRef.current.value,
			dateOfBirth: dateOfBirthValue,
			biographyValue: biographyInputValue,
		}
	}, [nameInputRef, countryInputRef, dateOfBirthValue, biographyInputValue, updatedProfileImage]);

	const handleSubmitEditProfile = async (event) => {

		event.preventDefault();

		const isNameInputValid = checkIfNameInputValid();

		if (isNameInputValid) {

			updateProfile(auth.currentUser, {
				displayName: fieldsValues.nameInputValue ? fieldsValues.nameInputValue: currentUser.name,
				photoURL: fieldsValues.updatedProfileImage ? fieldsValues.updatedProfileImage : currentUser.avatar,
			});

			getCurrentUserFromDatabase(currentUser.userID).then((user) => {

				const userRef = ref(database, "/users/" + user.key);

				const userToSave = {
					userID: user.data.userID,
					name: fieldsValues.nameInputValue,
					email: user.data.email,
					avatar: fieldsValues.updatedProfileImage ? fieldsValues.updatedProfileImage : user.data.avatar,
					country: fieldsValues.countryInputValue.trim() !== '' ? fieldsValues.countryInputValue : "No information yet",
					dateOfBirth: fieldsValues.dateOfBirth,
					biography: biographyInputValue.trim() !== '' ? biographyInputValue : "No information yet",
				}

				set(userRef, userToSave).then(() => {
					saveUserToLocalStorage(userToSave);
					setCurrentUser(userToSave);
					handleUpdateProfilePage();
					setIsEditState(false);
				})
			});
		}
	}

	return (
		<form onSubmit={handleSubmitEditProfile} className="edit-profile-form">
			<div className="edit-profile-form__field">
				<label className="edit-profile-form__label" htmlFor="email">Enter your email</label>
				<Input id="email" isDisabled={true} isValid={true} defaultValue={currentUser.email} />
			</div>
			<div className="edit-profile-form__field">
				<label className="edit-profile-form__label" htmlFor="name">Enter your name</label>
				<Input inputRef={nameInputRef} id="name" defaultValue={currentUser.name} isValid={!nameError.isShowError} errorText={nameError.nameErrorText} onChangeFunction={() => {handleChangeInputValue(nameInputRef, setNameError)}} />
			</div>
			<div className="edit-profile-form__field">
				<label className="edit-profile-form__label" htmlFor="country">Choose your country</label>
				<Input inputRef={countryInputRef} id="country" isValid={true} defaultValue={userInfo.country} />
			</div>
			<CalendarInput className="edit-profile-form__field" handleSetDateInputValue={handleSetDateInputValue} inputDefaultValue={userInfo.dateOfBirth}/>
			<div className="edit-profile-form__field">
				<label className="edit-profile-form__label" htmlFor="biography">Enter your additional information</label>
				<textarea className="edit-profile-form__textarea" id="biography" defaultValue={userInfo.biography} onChange={(event) => handleChangeBiographyValue(event)} />
			</div>
			<div className="edit-profile-form__buttons-wrap">
				<Button context={'cancel'} buttonOnClickFunction={() => {handleCancelButtonClick()}}>Cancel</Button>
				<Button context={'filled'} buttonType={"submit"}>Save changes</Button>
			</div>
		</form>
	)
}

const mapDispatchToProps = (dispatch) => {
	return {
		handleSetUser: (user) => dispatch(setUser(user)),
	}
}

export default connect(null, mapDispatchToProps)(EditProfileForm);
