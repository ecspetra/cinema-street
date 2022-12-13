import React, { useEffect } from "react";
import './App.scss';
import { Route, Routes, matchPath, BrowserRouter } from "react-router-dom";
import Home from "../Home/Home";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import Actors from "../Actors/Actors";
import Genres from "../Genres/Genres";
import Profile from "../Profile/Profile";
import ActorPage from "../ActorPage/ActorPage";
import { useDispatch } from "react-redux";
import '../../firebase';
import { connect } from "react-redux";
import {
    clearUser,
    setUser,
    setMovies,
    setFavoriteMovies,
    setCurrentPersonPage,
    clearCurrentPersonPage,
    setUpcomingMovies,
    clearMovies,
    setCurrentMovie,
    clearCurrentMoviePage
} from "../../actions";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Menu from "../Menu/Menu";
import TopBanner from "../TopBanner/TopBanner";
import MoviePage from "../MoviePage/MoviePage";
import FavoriteMovies from "../FavoriteMovies/FavoriteMovies";
import { useLocation } from "react-router";
import { API_KEY } from "../../functions/linksToFetch";
import handleChooseCurrentMoviePage from "../../functions/setCurrentMoviePage";
import axios from "axios";
import getCurrentPersonPage from "../../functions/getCurrentPersonPage";

const App = (props) => {

    const { handleSetCurrentMoviePage, handleClearCurrentMoviePage, handleSetCurrentPersonPage, handleClearCurrentPersonPage } = props;

    const dispatch = useDispatch();

    const history = useNavigate();

    const auth = getAuth();

    const handleSetUser = (user) => {
        dispatch(setUser(user));
    }

    const handleClearUser = () => {
        dispatch(clearUser());
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                handleSetUser(user);
                history('/');
            }
            else {
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
            handleChooseCurrentMoviePage(match.params, handleSetCurrentMoviePage, handleClearCurrentMoviePage)
        }
    }, [location]);

    useEffect(() => {

        const match = matchPath({ path: '/person/:personID' }, location.pathname);

        if (match) {
            getCurrentPersonPage(match.params.personID, handleSetCurrentPersonPage, handleClearCurrentPersonPage);
        }
    }, [location]);

    return (
        <div className="content-wrapper">
            <Menu auth={auth} />
            <TopBanner />
            <div className="content">
                <Routes>
                    <Route exact path="/" element={<Home favoriteMovies={props.favoriteMovies} />} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/favorite-movies" element={<FavoriteMovies />} />
                    <Route path="/actors" element={<Actors />} />
                    <Route path="/genres" element={<Genres/>} />
                    <Route path="/profile" element={<Profile user={props.currentUser} />} />
                    <Route path={"/movie/:id"} element={<MoviePage />} />
                    <Route path={"/person/:personID"} element={<ActorPage />} />
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
        setMovies,
        setUpcomingMovies,
        setFavoriteMovies,
        setUser,
        clearUser,
        setCurrentPersonPage,
        clearCurrentPersonPage,
        clearMovies
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);