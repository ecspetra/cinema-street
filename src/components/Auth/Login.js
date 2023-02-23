import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import Input from "../Input/Input";
import { handleChangeInputValue } from "../../functions/handleChangeInputValue";
import Error from "../Error/Error";
import Button from "../Button/Button";
import Title from "../Title/Title";
import Loader from "../Loader/Loader";

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
        <>
            <Title className="auth-form-title" title={"Login to Cinema Street"} />
            <div className="auth-form">
                <form className="auth-form__content" onSubmit={handleSubmit}>
                    <div className="auth-form__fields">
                        <div className="auth-form__field">
                            <label className="auth-form__label" htmlFor="email">Enter your email</label>
                            <Input inputRef={emailInputRef} id="email" isValid={!emailError.isShowError} errorText={emailError.emailErrorText} onChangeFunction={() => {handleChangeInputValue(emailInputRef, setEmailError)}} />
                        </div>
                        <div className="auth-form__field">
                            <label className="auth-form__label" htmlFor="password">Enter your password</label>
                            <Input inputRef={passwordInputRef} id="password" type="password" isValid={!passwordError.isShowError} errorText={passwordError.passwordErrorText} onChangeFunction={() => {handleChangeInputValue(passwordInputRef, setPasswordError)}} />
                        </div>
                    </div>
                    <Button buttonType={"submit"} context={'filled'} className="auth-form__button">Log in</Button>
                    <div className="auth-form__footer">
                        <p className="auth-form__footer-text">Don't have an account?</p>
                        <Link className="auth-form__footer-link" to="/register">Register</Link>
                    </div>
                    {
                        isLoading && <Loader>Loading</Loader>
                    }
                    {
                        formError.isShowError && <Error>{formError.formErrorText}</Error>
                    }
                </form>
            </div>
        </>
    )
}

export default Login;