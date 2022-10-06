import React, { useEffect, useState } from "react";
import './App.scss';
import { Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import Actors from "../Actors/Actors";
import Genres from "../Genres/Genres";
import Profile from "../Profile/Profile";
import { useDispatch } from "react-redux";
import '../../firebase';
import { connect } from "react-redux";
import {
    clearUser,
    setUser,
    setMovies,
    setFavouriteMovies,
    setPersons,
    setGenres,
    removeFromFavouriteMovies, setCurrentMoviePage
} from "../../actions";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Menu from "../Menu/Menu";
import TopBanner from "../TopBanner/TopBanner";
import MoviePage from "../MoviePage/MoviePage";
import FavouriteMovies from "../FavouriteMovies/FavouriteMovies";
import { database } from "../../firebase";
import {getDatabase, ref, push, set, onValue, remove} from "firebase/database";
import favouriteMovies from "../FavouriteMovies/FavouriteMovies";

const App = (props) => {

    const dispatch = useDispatch();

    const history = useNavigate();

    const auth = getAuth();

    const handleSetUser = (user) => {
        dispatch(setUser(user));
    }

    const handleClearUser = () => {
        dispatch(clearUser());
    }

    const handleSetMovies = (movies) => {
        dispatch(setMovies(movies));
    }

    const handleSetGenres = (genres) => {
        dispatch(setGenres(genres));
    }

    const handleSetFavouriteMovies = (selectedMovie) => {
        dispatch(setFavouriteMovies(selectedMovie));
    }

    const handleRemoveFromFavouriteMovies = (selectedMovie) => {
        dispatch(removeFromFavouriteMovies(selectedMovie));
        removeMovieFromMyCollection(selectedMovie);
    }

    const handleSetCurrentMoviePage = (selectedMovie) => {
        dispatch(setCurrentMoviePage(selectedMovie));
    }

    const handleSetPersons = (movies) => {
        dispatch(setPersons(movies));
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

    const getGenres = () => {
        fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=1fdbb7205b3bf878ede960ab5c9bc7ce')
            .then(response => response.json())
            .then(data => {
                handleSetGenres(data);
            });
    }

    const getMovies = () => {
        fetch('https://api.themoviedb.org/3/discover/movie?api_key=1fdbb7205b3bf878ede960ab5c9bc7ce')
            .then(response => response.json())
            .then(data => {
                handleSetMovies(data.results);
            });
    }

    const getPersons = () => {
        fetch('https://api.themoviedb.org/3/person/popular/?api_key=1fdbb7205b3bf878ede960ab5c9bc7ce')
            .then(response => response.json())
            .then(data => {
                handleSetPersons(data.results);
            });
    }

    const getMyMoviesFromDatabase = () => {
        onValue(postListRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const favouriteMovie = {
                    key: childSnapshot.key,
                    data: childSnapshot.val(),
                }
                handleSetFavouriteMovies(favouriteMovie);
            });
        });
    }

    useEffect(() => {
        getMyMoviesFromDatabase();
        getGenres();
        getMovies();
        getPersons();
    }, []);

    ///////////////////////////////////////////////////

    const database = getDatabase();
    const postListRef = ref(database, 'movies');
    const newPostRef = push(postListRef);

    const postMoviesToDataBase = (selectedMovie) => {
        set(newPostRef, {
            movie: {
                poster_path: 'https://image.tmdb.org/t/p/w440_and_h660_face' + selectedMovie.poster_path,
                title: selectedMovie.title,
                id: selectedMovie.id,
                vote_average: selectedMovie.vote_average,
                genre_ids: selectedMovie.genre_ids,
            },
        }).then(() => {
            console.log("Movie saved");
        })
    }

    const removeMovieFromMyCollection = (selectedMovie) => {
        const dbRef = ref(database, "/movies/" + selectedMovie.key);
        remove(dbRef).then(() => console.log("Movie removed"));
    }

    const addMovieToMyCollection = (selectedMovie) => {
        if (props.favouriteMovies && props.favouriteMovies.find(movie => movie.data.movie.id === selectedMovie.id)) {
            alert('You already have this movie');
        } else {
            postMoviesToDataBase(selectedMovie);
            getMyMoviesFromDatabase();
        }
    }

    return (
        <div className="content-wrapper">
            <Menu auth={auth} />
            <TopBanner />
            <div className="content">
                <Routes>
                    <Route exact path="/" element={<Home movies={props.movies} genres={props.genres} addMovieToMyCollection={addMovieToMyCollection} handleSetCurrentMoviePage={handleSetCurrentMoviePage} />} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/favourite-movies" element={<FavouriteMovies favouriteMovies={props.favouriteMovies} genres={props.genres} handleRemoveFromFavouriteMovies={handleRemoveFromFavouriteMovies} handleSetCurrentMoviePage={handleSetCurrentMoviePage} />} />
                    <Route path="/actors" element={<Actors persons={props.persons}/>} />
                    <Route path="/genres" element={<Genres/>} />
                    <Route path="/profile" element={<Profile user={props.currentUser} />} />
                    <Route path={props.currentMoviePage && '/movie' + '/' + props.currentMoviePage.id} element={<MoviePage movies={props.movies} currentMoviePage={props.currentMoviePage} />} />
                </Routes>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    movies: state.movies.uploadedMovies,
    favouriteMovies: state.favouriteMovies.favouriteMovies,
    currentMoviePage: state.currentMoviePage.currentMoviePage,
    persons: state.persons.uploadedPersons,
    genres: state.genres.uploadedGenres,
})

export default connect(mapStateToProps, { setPersons, setMovies, setFavouriteMovies, setUser, clearUser, setGenres, removeFromFavouriteMovies, setCurrentMoviePage })(App);