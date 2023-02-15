import React, { useState } from 'react';
import Input from "../Input/Input";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";
import './assets/index.scss';

const ImageInput = (props) => {

	const { setNewImageFunction } = props;

	const [percent, setPercent] = useState(0);

	const storage = getStorage();
	const auth = getAuth();

	const uploadImage = (event) => {
		const file = event.target.files[0];
		const storageRef = ref(storage, `files/${file.name}`);
		const uploadTask = uploadBytesResumable(storageRef, file);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const percent = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				setPercent(percent);
			},
			(error) => console.log(error),
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((url) => {
					setNewImageFunction(url);
					updateProfile(auth.currentUser, {
						photoURL: url,
					}).then(() => {
						// Profile updated!
						// ...
					});
				});
			}
		);
	}

	return (
		<div className="image-input">
			<label className="image-input__label" htmlFor="upload-avatar">Upload avatar</label>
			<Input className="image-input__input" type={"file"} id="upload-avatar" isValid={true} onChangeFunction={(event) => {uploadImage(event)}} />
		</div>
	)
}

export default ImageInput;