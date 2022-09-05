import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import './firebase';
import { createStore } from "redux";
import {Provider, connect} from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { setUser } from "./actions";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import rootReducer from "./reducers";

import { useDispatch } from "react-redux";

const store = createStore(rootReducer, composeWithDevTools());

const Root = (props) => {

    const dispatch = useDispatch();

    const history = useNavigate();

    const auth = getAuth();

    const handleSetUser = (user) => {
        dispatch(setUser(user));
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                handleSetUser(user);
                history('/');
            }
        });
    }, [onAuthStateChanged]);

    return (
        <Routes>
            <Route exact path="/" element={<App/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
        </Routes>
    );
}

export default connect(null, { setUser })(Root);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <Root />
        </BrowserRouter>
    </Provider>
);
reportWebVitals();
