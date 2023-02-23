import React, { useState } from 'react';
import Input from "../Input/Input";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import './assets/index.scss';

const ImageInput = (props) => {

	const { setNewImageFunction, setImagePreview } = props;

	const [percent, setPercent] = useState(0);

	const storage = getStorage();

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
					setImagePreview(url);
				});

				// getDownloadURL(uploadTask.snapshot.ref).then((url) => {
				// 	setNewImageFunction(url);
				// 	updateProfile(auth.currentUser, {
				// 		photoURL: url,
				// 	}).then(() => {
				// 		// Profile updated!
				// 		// ...
				// 	});
				// });
			}
		);
	}

	return (
		<>
			<div className="image-input">
				<label className="image-input__label" htmlFor="upload-avatar">Upload image</label>
				<Input className="image-input__input" type={"file"} id="upload-avatar" isValid={true} onChangeFunction={(event) => {uploadImage(event)}} />
			</div>
			{
				percent !== 0 && (
					<div className="image-input-loader">
						<div className="image-input-loader__wrap">
							<div className="image-input-loader__progressbar" style={{width: `${percent}` + '%'}} />
						</div>
						<div className="image-input-loader__progress">
							{
								percent === 100 && <p className="image-input-loader__text">Image loaded</p>
							}
							{
								percent !== 100 && percent !== 0 && <p className="image-input-loader__text">{percent + '%'}</p>
							}
						</div>
					</div>
				)
			}
		</>
	)
}

export default ImageInput;