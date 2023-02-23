import React, { useEffect } from "react";
import './assets/common.scss';
import './assets/index.scss';
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
    setCurrentPersonPage, setProfilePage, clearProfilePage, clearFriends
} from "../../actions";
import Menu from "../Menu/Menu";
import TopBanner from "../TopBanner/TopBanner";
import MoviePage from "../MoviePage/MoviePage";
import FavoriteMovies from "../FavoriteMovies/FavoriteMovies";
import { useLocation } from "react-router";
import handleChooseCurrentMoviePage from "../../functions/setCurrentMoviePage";
import getCurrentPersonPage from "../../functions/getCurrentPersonPage";
import useAuthListener from "../../functions/useAuthListener";
import UserContext from '../UserContext/UserContext';
import {getCurrentUserFromDatabase} from "../../functions/getCurrentUserFromDatabase";
import {handleChooseProfilePage} from "../../functions/handleChooseProfilePage";

const App = (props) => {

    const { handleSetCurrentMoviePage, handleClearFriends, handleClearProfilePage, handleSetProfilePage, handleClearCurrentMoviePage, handleSetCurrentPersonPage, handleClearCurrentPersonPage, handleSetUser, handleClearUser } = props;

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

    useEffect(() => {

        const match = matchPath({ path: '/profile/:profileID' }, location.pathname);

        if (match) {
            handleChooseProfilePage(match.params.profileID, handleClearProfilePage, handleClearFriends, handleSetProfilePage)
        }
    }, [location]);

    const { currentUser } = useAuthListener(handleSetUser, handleClearUser);

    const getContent = () => {
        if (currentUser === null) {
            return (
                <>
                    <TopBanner />
                    <div className="app__content">
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </Routes>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <Menu />
                    <TopBanner />
                    <div className="app__content">
                        <Routes>
                            <Route exact path="/" element={<Home />} />
                            <Route path="/favorite-movies" element={<FavoriteMovies />} />
                            <Route path="/persons" element={<Persons />} />
                            <Route path="/profile/:profileID" element={<Profile />} />
                            <Route path={"/movie/:id"} element={<MoviePage />} />
                            <Route path={"/person/:personID"} element={<PersonPage />} />
                        </Routes>
                    </div>
                </>
            )
        }
    }

    return (
        <UserContext.Provider value={{ currentUser }}>
            <div className="app">
                {getContent()}
            </div>
        </UserContext.Provider>
    );
}

const mapStateToProps = state => ({
    currentMoviePage: state.currentMoviePage,
})

const mapDispatchToProps = (dispatch) => {
    return {
        handleSetProfilePage: (userInfo) => dispatch(setProfilePage(userInfo)),
        handleClearProfilePage: () => dispatch(clearProfilePage()),
        handleSetCurrentMoviePage: (selectedMovie) => dispatch(setCurrentMovie(selectedMovie)),
        handleClearCurrentMoviePage: () => dispatch(clearCurrentMoviePage()),
        handleSetCurrentPersonPage: (selectedPerson) => dispatch(setCurrentPersonPage(selectedPerson)),
        handleClearCurrentPersonPage: () => dispatch(clearCurrentPersonPage()),
        handleSetUser: (user) => dispatch(setUser(user)),
        handleClearUser: () => dispatch(clearUser()),
        handleClearFriends: () => dispatch(clearFriends()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);