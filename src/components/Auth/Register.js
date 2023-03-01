import React, { useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import Input from "../Input/Input";
import { handleChangeInputValue } from "../../functions/handleChangeInputValue";
import Button from "../Button/Button";
import Title from "../Title/Title";
import {clearUser, setUser} from "../../actions";
import {connect} from "react-redux";
import { saveUserToLocalStorage } from "../../functions/userLocalStorageManager";
import UserContext from "../UserContext/UserContext";

const Register = (props) => {

    const { handleSetUser, handleClearUser } = props;

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

    const { setCurrentUser } = useContext(UserContext);

    const handleSubmit = (event) => {
        event.preventDefault();

        const isPasswordCorrect = isPasswordValid();
        const isEmailCorrect = isEmailValid();
        const isUserNameCorrect = isUserNameValid();

        if (isPasswordCorrect && isEmailCorrect && isUserNameCorrect) {
            setIsLoading(true);
            createUserWithEmailAndPassword(auth, emailInputRef.current.value, passwordInputRef.current.value)
                .then(() => {
                    updateProfile(auth.currentUser, {
                        displayName: usernameInputRef.current.value,
                        photoURL: `https://api.dicebear.com/5.x/thumbs/svg?seed=${usernameInputRef.current.value}`,
                    })
                        .then(() => {
                            const userToSave = {
                                userID: auth.currentUser.uid,
                                name: auth.currentUser.displayName,
                                email: auth.currentUser.email,
                                avatar: auth.currentUser.photoURL,
                                country: "No information yet",
                                dateOfBirth: "No information yet",
                                biography: "No information yet",
                            }
                            set(ref(database, 'users/' + auth.currentUser.uid), userToSave).then(() => {
                                saveUserToLocalStorage(userToSave);
                                setCurrentUser(userToSave);
                                handleSetUser(userToSave);
                                setIsLoading(false);
                            })
                        })

                })
        }
    }

    return (
        <>
            <Title className="auth-form-title" title={"Register to Cinema Street"} />
            <div className="auth-form">
                <form className="auth-form__content" onSubmit={handleSubmit}>
                    <div className="auth-form__fields">
                        <div className="auth-form__field">
                            <label className="auth-form__label" htmlFor="username">Enter your name</label>
                            <Input inputRef={usernameInputRef} id="username" isValid={!usernameError.isShowError} errorText={usernameError.usernameErrorText} onChangeFunction={() => {handleChangeInputValue(usernameInputRef, setUsernameError)}} />
                        </div>
                        <div className="auth-form__field">
                            <label className="auth-form__label" htmlFor="email">Enter your email</label>
                            <Input inputRef={emailInputRef} id="email" isValid={!emailError.isShowError} errorText={emailError.emailErrorText} onChangeFunction={() => {handleChangeInputValue(emailInputRef, setEmailError)}} />
                        </div>
                        <div className="auth-form__field">
                            <label className="auth-form__label" htmlFor="password">Enter your password</label>
                            <Input inputRef={passwordInputRef} id="password" isValid={!passwordError.isShowError} errorText={passwordError.passwordErrorText} onChangeFunction={() => {handleChangeInputValue(passwordInputRef, setPasswordError)}} />
                        </div>
                    </div>
                    <Button buttonType={"submit"} context={'filled'} className="registration-form__button">Submit</Button>
                    <div className="auth-form__footer">
                        <p className="auth-form__footer-text">Already a user?</p>
                        <Link className="auth-form__footer-link" to="/login">Login</Link>
                    </div>
                    {
                        isLoading && <div>Loading...</div>
                    }
                </form>
            </div>
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleSetUser: (user) => dispatch(setUser(user)),
        handleClearUser: () => dispatch(clearUser()),
    }
}

export default connect(null, mapDispatchToProps)(Register);