import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword} from "firebase/auth";
import md5 from 'md5';
import { getDatabase, ref, set } from "firebase/database";
import Input from "../Input/Input";
import { handleChangeInputValue } from "../../functions/handleChangeInputValue";
import Button from "../Button/Button";
import Title from "../Title/Title";

const Register = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [usernameError, setUsernameError] = useState({
        usernameErrorText: '',
        isShowError: false,
    });
    const [emailError, setEmailError] = useState({
        emailErrorText: '',
        isShowError: false,
    });
    const [passwordError, setPasswordError] = useState({
        passwordErrorText: '',
        isShowError: false,
    });

    const minPasswordLength = 8;
    const maxPasswordLength = 20;
    const usernameInputRef = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const database = getDatabase();
    const auth = getAuth();

    const isUserNameValid = () => {
        if (usernameInputRef.current.value.length) {
            return true;
        } else {
            setUsernameError({usernameErrorText: 'Name shouldn\'t be empty', isShowError: true});
            return false;
        }
    }

    const isPasswordValid = () => {
        if (passwordInputRef.current.value.length > minPasswordLength && passwordInputRef.current.value.length < maxPasswordLength) {
            return true;
        } else {
            setPasswordError({passwordErrorText: 'Password must contain 8-20 characters', isShowError: true});
            return false;
        }
    }

    const isEmailValid = () => {

        let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!emailInputRef.current.value.length) {
            setEmailError({emailErrorText: 'Email shouldn\'t be empty', isShowError: true});
            return false;
        } else if (!regEmail.test(emailInputRef.current.value)) {
            setEmailError({emailErrorText: 'Please enter valid email', isShowError: true});
            return false;
        } else {
            return true;
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const isPasswordCorrect = isPasswordValid();
        const isEmailCorrect = isEmailValid();
        const isUserNameCorrect = isUserNameValid();

        if (isPasswordCorrect && isEmailCorrect && isUserNameCorrect) {
            setIsLoading(true);
            createUserWithEmailAndPassword(auth, emailInputRef.current.value, passwordInputRef.current.value)
                .then((currentUser) => {
                    updateProfile(auth.currentUser, {
                        displayName: usernameInputRef.current.value,
                        photoURL: `http://gravatar.com/avatar/${md5(currentUser.user.email)}?d=identicon`,
                    })
                        .then(() => {
                            set(ref(database, 'users/' + auth.currentUser.uid),  {
                                name: auth.currentUser.displayName,
                                email: auth.currentUser.email,
                                avatar: auth.currentUser.photoURL,
                                country: "No information yet",
                                dateOfBirth: "No information yet",
                                biography: "No information yet",
                            }).then(() => {
                                setIsLoading(false);
                            })
                        })
                })
        }
    }

    return (
        <div className="registration-form">
            <form className="registration-form__content" onSubmit={handleSubmit}>
                <div className="registration-form__text-wrap">
                    <Title className="registration-form__title" title={"Register to Cinema street"} />
                    <p className="registration-form__text">Please fill in the fields to enter</p>
                </div>
                <div className="registration-form__field">
                    <label className="registration-form__label" htmlFor="username">Enter your name</label>
                    <Input inputRef={usernameInputRef} id="username" isValid={!usernameError.isShowError} errorText={usernameError.usernameErrorText} onChangeFunction={() => {handleChangeInputValue(usernameInputRef, setUsernameError)}} />
                </div>
                <div className="registration-form__field">
                    <label className="registration-form__label" htmlFor="email">Enter your email</label>
                    <Input inputRef={emailInputRef} id="email" isValid={!emailError.isShowError} errorText={emailError.emailErrorText} onChangeFunction={() => {handleChangeInputValue(emailInputRef, setEmailError)}} />
                </div>
                <div className="registration-form__field">
                    <label className="registration-form__label" htmlFor="password">Enter your password</label>
                    <Input inputRef={passwordInputRef} id="password" isValid={!passwordError.isShowError} errorText={passwordError.passwordErrorText} onChangeFunction={() => {handleChangeInputValue(passwordInputRef, setPasswordError)}} />
                </div>
                <Button buttonType={"submit"} context={'filled'} className="registration-form__button">Submit</Button>
                <div className="registration-form__footer">
                    Already a user?
                    <Link to="/login">Login</Link>
                </div>
                {
                    isLoading && <div>Loading...</div>
                }
            </form>
        </div>
    )
}

export default Register;