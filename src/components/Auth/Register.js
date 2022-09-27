import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import md5 from 'md5';
import { getDatabase, ref, set } from "firebase/database";

const Register = () => {

    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [formError, setFormError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const database = getDatabase();
    const auth = getAuth();

    useEffect(() => {
        console.log(formError);
    }, [formError]);

    const handleUserNameChange = (event) => {
        setUserName(event.target.value);
    }

    const handleUserEmailChange = (event) => {
        setUserEmail(event.target.value);
    }

    const handleUserPasswordChange = (event) => {
        setUserPassword(event.target.value);
    }

    const isFormEmpty = (userName, userEmail, userPassword) => {
        return !userName.length || !userEmail.length || !userPassword.length;
    }

    const isPasswordValid = (userPassword) => {
        if (userPassword.length < 10 || userPassword.length > 20) {
            return false;
        } else {
            return true;
        }
    }

    const isFormValid = () => {
        if (isFormEmpty(userName, userEmail, userPassword)) {
            setFormError('Form is empty');
            return false;
        } else if (!isPasswordValid(userPassword)) {
            setFormError('Password is invalid');
            return false;
        } else {
            return true;
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isFormValid()) {
            setIsLoading(true);
            createUserWithEmailAndPassword(auth, userEmail, userPassword)
                .then((currentUser) => {
                    console.log(auth.currentUser);
                    updateProfile(auth.currentUser, {
                        displayName: userName,
                        photoURL: `http://gravatar.com/avatar/${md5(currentUser.user.email)}?d=identicon`,
                    })
                        .then(() => {
                            set(ref(database, 'users/' + auth.currentUser.uid), {
                                name: auth.currentUser.displayName,
                                avatar: auth.currentUser.photoURL
                            }).then(() => {
                                console.log("User saved");
                                setIsLoading(false);
                            })
                        })
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                });
            setFormError('');
        }
    }

    return (
        <div className="registration-form">
            <form className="registration-form__content" onSubmit={handleSubmit}>
                <div className="registration-form__text-wrap">
                    <h1 className="registration-form__title">Register to Cinema field</h1>
                    <p className="registration-form__text">Please fill in the fields to enter</p>
                </div>
                <div className="registration-form__field">
                    <label className="registration-form__label" htmlFor="username">Enter your name</label>
                    <input className="registration-form__input" id="username" type="text" value={userName} onChange={handleUserNameChange} />
                </div>
                <div className="registration-form__field">
                    <label className="registration-form__label" htmlFor="email">Enter your email</label>
                    <input className="registration-form__input" id="email" type="text" value={userEmail} onChange={handleUserEmailChange} />
                </div>
                <div className="registration-form__field">
                    <label className="registration-form__label" htmlFor="password">Enter your password</label>
                    <input className="registration-form__input" id="password" type="text" value={userPassword} onChange={handleUserPasswordChange} />
                </div>
                <button type="submit">Submit</button>
                <div>
                    Already a user?
                    <Link to="/login">Login</Link>
                </div>
                <div>
                    <Link to="/">Continue exploring</Link>
                </div>
                {
                    isLoading && <div>Loading...</div>
                }
                <p>{formError}</p>
            </form>
        </div>
    )
}

export default Register;