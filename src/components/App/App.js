import React, { useEffect } from "react";
import './App.scss';
import { Route, Routes, matchPath, BrowserRouter } from "react-router-dom";
import Home from "../Home/Home";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import Persons from "../Persons/Persons";
import Profile from "../Profile/Profile";
import PersonPage from "../PersonPage/PersonPage";
import '../../firebase';
import { connect } from "react-redux";
import {
    clearUser,
    setUser,
    setCurrentMovie,
    clearCurrentMoviePage,
    clearCurrentPersonPage,
    setCurrentPersonPage
} from "../../actions";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Menu from "../Menu/Menu";
import TopBanner from "../TopBanner/TopBanner";
import MoviePage from "../MoviePage/MoviePage";
import FavoriteMovies from "../FavoriteMovies/FavoriteMovies";
import { useLocation } from "react-router";
import handleChooseCurrentMoviePage from "../../functions/setCurrentMoviePage";
import getCurrentPersonPage from "../../functions/getCurrentPersonPage";

const App = (props) => {

    const { handleSetCurrentMoviePage, handleClearCurrentMoviePage, handleSetCurrentPersonPage, handleClearCurrentPersonPage, handleSetUser, handleClearUser } = props;

    const history = useNavigate();

    const auth = getAuth();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                handleSetUser(user);
                history('/');
            } else {
                history('/login');
                handleClearUser();
            }
        });
    }, [onAuthStateChanged]);


    /////////////////////////////////////////////////// - set current movie page when click back button

    const location = useLocation();

    useEffect(() => {

        const match = matchPath({ path: '/movie/:id' }, location.pathname);

        if (match) {
            handleChooseCurrentMoviePage(match.params, handleClearCurrentMoviePage).then((data) => {handleSetCurrentMoviePage(data)})
        }
    }, [location]);

    useEffect(() => {

        const match = matchPath({ path: '/person/:personID' }, location.pathname);

        if (match) {
            getCurrentPersonPage(match.params.personID, handleClearCurrentPersonPage).then((data) => {handleSetCurrentPersonPage(data)});
        }
    }, [location]);

    return (
        <div className="content-wrapper">
            <Menu auth={auth} />
            <TopBanner />
            <div className="content">
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/favorite-movies" element={<FavoriteMovies />} />
                    <Route path="/persons" element={<Persons />} />
                    <Route path="/profile" element={<Profile user={props.currentUser} />} />
                    <Route path={"/movie/:id"} element={<MoviePage />} />
                    <Route path={"/person/:personID"} element={<PersonPage />} />
                </Routes>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    currentMoviePage: state.currentMoviePage,
})

const mapDispatchToProps = (dispatch) => {
    return {
        handleSetCurrentMoviePage: (selectedMovie) => dispatch(setCurrentMovie(selectedMovie)),
        handleClearCurrentMoviePage: () => dispatch(clearCurrentMoviePage()),
        handleSetCurrentPersonPage: (selectedPerson) => dispatch(setCurrentPersonPage(selectedPerson)),
        handleClearCurrentPersonPage: () => dispatch(clearCurrentPersonPage()),
        handleSetUser: (user) => dispatch(setUser(user)),
        handleClearUser: () => dispatch(clearUser()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);