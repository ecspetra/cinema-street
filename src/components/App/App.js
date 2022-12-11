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
    setFavouriteMovies,
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
import FavouriteMovies from "../FavouriteMovies/FavouriteMovies";
import { useLocation } from "react-router";
import { API_KEY } from "../../functions/linksToFetch";
import handleChooseCurrentMoviePage from "../../functions/setCurrentMoviePage";
import axios from "axios";

const App = (props) => {

    const { currentUser, currentMoviePage, handleSetCurrentMoviePage, handleClearCurrentMoviePage } = props;

    const dispatch = useDispatch();

    const history = useNavigate();

    const auth = getAuth();

    const handleSetUser = (user) => {
        dispatch(setUser(user));
    }

    const handleClearUser = () => {
        dispatch(clearUser());
    }



    const handleSetCurrentPersonPage = (selectedPerson) => {
        dispatch(setCurrentPersonPage(selectedPerson));
    }

    const handleClearCurrentPersonPage = () => {
        dispatch(clearCurrentPersonPage());
    }







    const getCurrentPersonInfo = async (selectedPerson) => {
        handleClearCurrentPersonPage();

        const response = await axios.get(
            'https://api.themoviedb.org/3/person/' + selectedPerson + '?api_key=' + API_KEY
        );

        handleSetCurrentPersonPage(response.data);
    }

    ///////////////////////////////////////////////////





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
            getCurrentPersonInfo(match.params.personID);
        }
    }, [location]);

    return (
        <div className="content-wrapper">
            <Menu auth={auth} />
            <TopBanner />
            <div className="content">
                <Routes>
                    <Route exact path="/" element={<Home favouriteMovies={props.favouriteMovies} />} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/favourite-movies" element={<FavouriteMovies />} />
                    <Route path="/actors" element={<Actors />} />
                    <Route path="/genres" element={<Genres/>} />
                    <Route path="/profile" element={<Profile user={props.currentUser} />} />
                    <Route path={"/movie/:id"} element={<MoviePage getCurrentPersonInfo={getCurrentPersonInfo} />} />
                    <Route path={props.persons.currentPersonInfo && "/person/:personID"} element={<ActorPage persons={props.persons} />} />
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
        setMovies,
        setUpcomingMovies,
        setFavouriteMovies,
        setUser,
        clearUser,
        setCurrentPersonPage,
        clearCurrentPersonPage,
        clearMovies
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);