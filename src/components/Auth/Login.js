import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import Input from "../Input/Input";
import { handleChangeInputValue } from "../../functions/handleChangeInputValue";
import Error from "../Error/Error";
import Button from "../Button/Button";

const Login = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [formError, setFormError] = useState({
        formErrorText: '',
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

    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const auth = getAuth();

    const checkIfEmailIsValid = () => {
        if (emailInputRef.current.value.length) {
            return true;
        } else {
            setEmailError({emailErrorText: 'Email shouldn`t be empty', isShowError: true});
            return false;
        }
    }

    const checkIfPasswordIsValid = () => {
        if (passwordInputRef.current.value.length) {
            return true;
        } else {
            setPasswordError({passwordErrorText: 'Password shouldn`t be empty', isShowError: true});
            return false;
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        setIsLoading(true);

        const isEmailIsValid = checkIfEmailIsValid();
        const isPasswordIsValid = checkIfPasswordIsValid();

        if (isEmailIsValid && isPasswordIsValid) {
            signInWithEmailAndPassword(auth, emailInputRef.current.value, passwordInputRef.current.value)
                .then(() => {
                }).catch((error) => {
                setFormError({formErrorText: error.toString(), isShowError: true})
            });
        }

        setIsLoading(false);
    }

    return (
        <div className="login-form">
            <form className="login-form__content" onSubmit={handleSubmit}>
                <div className="login-form__text-wrap">
                    <h1 className="login-form__title">Login to Cinema street</h1>
                    <p className="login-form__text">Please enter your data</p>
                </div>
                <div className="login-form__field">
                    <label className="login-form__label" htmlFor="email">Enter your email</label>
                    <Input inputRef={emailInputRef} id="email" isValid={!emailError.isShowError} errorText={emailError.emailErrorText} onChangeFunction={() => {handleChangeInputValue(emailInputRef, setEmailError)}} />
                </div>
                <div className="login-form__field">
                    <label className="login-form__label" htmlFor="password">Enter your password</label>
                    <Input inputRef={passwordInputRef} id="password" type="password" isValid={!passwordError.isShowError} errorText={passwordError.passwordErrorText} onChangeFunction={() => {handleChangeInputValue(passwordInputRef, setPasswordError)}} />
                </div>
                <Button buttonType={"submit"} context={'filled'} className="login-form__button">Log in</Button>
                <div className="login-form__field">
                    Don't have an account?
                    <Link to="/register">Register</Link>
                </div>
                {
                    isLoading && <div>Loading...</div>
                }
                {
                    formError.isShowError && <Error>{formError.formErrorText}</Error>
                }
            </form>
        </div>
    )
}

export default Login;