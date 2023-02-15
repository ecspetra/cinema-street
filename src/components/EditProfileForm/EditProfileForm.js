import React, { useState, useRef, useContext, useEffect } from "react";
import { handleChangeInputValue } from "../../functions/handleChangeInputValue";
import Button from "../Button/Button";
import Input from "../Input/Input";
import UserContext from "../UserContext/UserContext";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { getAuth, updateProfile } from "firebase/auth";
import CalendarInput from "../CalendarInput/CalendarInput";
import './assets/index.scss';

const EditProfileForm = (props) => {

	const { setIsEditState, userInfo } = props;

	const [dateOfBirthValue, setDateOfBirthValue] = useState("Unset");

	const nameInputRef = useRef();
	const countryInputRef = useRef();
	const biographyInputRef = useRef();

	const { currentUser } = useContext(UserContext);

	const database = getDatabase();
	const postListRef = ref(database, 'users');
	const auth = getAuth();

	const [nameError, setNameError] = useState({
		nameErrorText: '',
		isShowError: false,
	});

	const handleCancelButtonClick = () => {
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
		countryInputValue: '',
		dateOfBirth: '',
		biography: '',
	}

	useEffect(() => {
		fieldsValues = {
			countryInputValue: countryInputRef.current.value,
			dateOfBirth: dateOfBirthValue,
			biographyValue: biographyInputRef.current.value,
		}
	}, [countryInputRef, dateOfBirthValue, biographyInputRef]);

	const handleSubmitEditProfile = (event) => {

		event.preventDefault();

		const isNameInputValid = checkIfNameInputValid();

		if (isNameInputValid) {

			updateProfile(auth.currentUser, {
				displayName: nameInputRef.current.value,
			}).then(() => {
				// Profile updated!
				// ...
			});

			onValue(postListRef, (snapshot) => {
				snapshot.forEach((childSnapshot) => {

					const userFromDatabase = {
						key: childSnapshot.key,
						data: childSnapshot.val(),
					}

					if (userFromDatabase.key === currentUser.uid) {

						const userRef = ref(database, "/users/" + userFromDatabase.key);

						set(userRef, {
							name: nameInputRef.current.value,
							email: userFromDatabase.data.email,
							avatar: userFromDatabase.data.avatar,
							country: fieldsValues.countryInputValue !== '' ? fieldsValues.countryInputValue : "Unset",
							dateOfBirth: fieldsValues.dateOfBirth,
							biography: fieldsValues.biographyValue !== '' ? fieldsValues.biographyValue : "Unset",
						});
					}
				});
			});

			setIsEditState(false);
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
				<Input inputRef={nameInputRef} id="name" defaultValue={currentUser.displayName} isValid={!nameError.isShowError} errorText={nameError.nameErrorText} onChangeFunction={() => {handleChangeInputValue(nameInputRef, setNameError)}} />
			</div>
			<div className="edit-profile-form__field">
				<label className="edit-profile-form__label" htmlFor="country">Choose your country</label>
				<Input inputRef={countryInputRef} id="country" isValid={true} defaultValue={userInfo.data.country} />
			</div>
			<CalendarInput className="edit-profile-form__field" handleSetDateInputValue={handleSetDateInputValue} inputDefaultValue={userInfo.data.dateOfBirth}/>
			<div className="edit-profile-form__field">
				<label className="edit-profile-form__label" htmlFor="biography">Enter your additional information</label>
				<textarea ref={biographyInputRef} className="edit-profile-form__textarea" id="biography" defaultValue={userInfo.data.biography} />
			</div>
			<div className="edit-profile-form__buttons-wrap">
				<Button context={'cancel'} buttonOnClickFunction={() => {handleCancelButtonClick()}}>Cancel</Button>
				<Button context={'filled'} buttonType={"submit"}>Save changes</Button>
			</div>
		</form>
	)
}

export default EditProfileForm;