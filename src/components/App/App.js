import React, {useEffect, useRef, useState} from "react";
import './App.scss';
import {Route, Routes, matchPath, BrowserRouter} from "react-router-dom";
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
    setPersons,
    setGenres,
    removeFromFavouriteMovies,
    setCurrentMovieInfo,
    setCurrentMovieCredits,
    setCurrentMovieImages,
    setCurrentMovieReviews,
    setCurrentMovieSimilar,
    clearCurrentMoviePage, setCurrentPersonPage, clearCurrentPersonPage, setUpcomingMovies
} from "../../actions";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Menu from "../Menu/Menu";
import TopBanner from "../TopBanner/TopBanner";
import MoviePage from "../MoviePage/MoviePage";
import FavouriteMovies from "../FavouriteMovies/FavouriteMovies";
import { database } from "../../firebase";
import {getDatabase, ref, push, set, onValue, remove} from "firebase/database";
import {useLocation} from "react-router";
import axios from 'axios';

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

    const handleSetUpcomingMovies = (movies) => {
        dispatch(setUpcomingMovies(movies));
    }

    const handleSetGenres = (genres) => {
        dispatch(setGenres(genres));
    }

    const handleSetFavouriteMovies = (selectedMovie) => {
        dispatch(setFavouriteMovies(selectedMovie));
    }

    const handleRemoveFromFavouriteMovies = (selectedMovie, key) => {
        dispatch(removeFromFavouriteMovies(selectedMovie));
        removeMovieFromMyCollection(key);
    }

    const handleSetCurrentMoviePage = (selectedMovie) => {
        handleClearCurrentMoviePage();
        getCurrentMoviePage(selectedMovie);
    }

    const handleSetPersons = (movies) => {
        dispatch(setPersons(movies));
    }

    const handleSetCurrentPersonPage = (selectedPerson) => {
        dispatch(setCurrentPersonPage(selectedPerson));
    }

    const handleClearCurrentPersonPage = () => {
        dispatch(clearCurrentPersonPage());
    }

    const handleClearCurrentMoviePage = () => {
        dispatch(clearCurrentMoviePage());
    }

    const getCurrentMoviePage = (selectedMovie) => {
        console.log(selectedMovie.id);
        fetch('https://api.themoviedb.org/3/movie/' + selectedMovie.id + '?api_key=1fdbb7205b3bf878ede960ab5c9bc7ce')
            .then(response => response.json())
            .then(data => {
                dispatch(setCurrentMovieInfo(data));
            });
        fetch('https://api.themoviedb.org/3/movie/' + selectedMovie.id + '/credits?api_key=1fdbb7205b3bf878ede960ab5c9bc7ce')
            .then(response => response.json())
            .then(data => {
                dispatch(setCurrentMovieCredits(data));
            });
        fetch('https://api.themoviedb.org/3/movie/' + selectedMovie.id + '/images?api_key=1fdbb7205b3bf878ede960ab5c9bc7ce')
            .then(response => response.json())
            .then(data => {
                dispatch(setCurrentMovieImages(data));
            });
        fetch('https://api.themoviedb.org/3/movie/' + selectedMovie.id + '/reviews?api_key=1fdbb7205b3bf878ede960ab5c9bc7ce')
            .then(response => response.json())
            .then(data => {
                dispatch(setCurrentMovieReviews(data));
            });
        fetch('https://api.themoviedb.org/3/movie/' + selectedMovie.id + '/similar?api_key=1fdbb7205b3bf878ede960ab5c9bc7ce')
            .then(response => response.json())
            .then(data => {
                dispatch(setCurrentMovieSimilar(data));
            });
    }

    const getGenres = () => {
        fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=1fdbb7205b3bf878ede960ab5c9bc7ce')
            .then(response => response.json())
            .then(data => {
                handleSetGenres(data);
            });
    }

    // const getMovies = () => {
    //     fetch('https://api.themoviedb.org/3/discover/movie?api_key=1fdbb7205b3bf878ede960ab5c9bc7ce')
    //         .then(response => response.json())
    //         .then(data => {
    //             handleSetMovies(data.results);
    //         });
    // }

    // const [pageNumber, setPageNumber] = useState(1);



    // const getMovies = () => {
    //
    //     let pageNumber = 1;
    //
    //     for (pageNumber; pageNumber < 4; pageNumber++) {
    //
    //         console.log(pageNumber);
    //
    //         fetch('https://api.themoviedb.org/3/discover/movie?api_key=1fdbb7205b3bf878ede960ab5c9bc7ce' + '&page=' + pageNumber)
    //             .then(response => response.json()).then(data => {
    //                 handleSetMovies(data.results);
    //             });
    //     }
    // }

    const getUpcomingMovies = () => {
        fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=1fdbb7205b3bf878ede960ab5c9bc7ce')
            .then(response => response.json())
            .then(data => {
                handleSetUpcomingMovies(data.results);
            });
    }

    const getPersons = () => {
        fetch('https://api.themoviedb.org/3/person/popular/?api_key=1fdbb7205b3bf878ede960ab5c9bc7ce')
            .then(response => response.json())
            .then(data => {
                handleSetPersons(data.results);
            });
    }

    const getCurrentPersonInfo = (selectedPerson) => {
        handleClearCurrentPersonPage();
        fetch('https://api.themoviedb.org/3/person/' + selectedPerson + '?api_key=1fdbb7205b3bf878ede960ab5c9bc7ce')
            .then(response => response.json())
            .then(data => {
                handleSetCurrentPersonPage(data);
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
                genre_ids: selectedMovie.genre_ids ?? selectedMovie.genres.map((genre) => {
                    return genre.id;
                }),
            },
        }).then(() => {
            console.log("Movie saved");
        })
    }

    const removeMovieFromMyCollection = (key) => {
        const dbRef = ref(database, "/movies/" + key);
        remove(dbRef).then(() => console.log("Movie removed"));
    }

    const addMovieToMyCollection = (selectedMovie) => {
        postMoviesToDataBase(selectedMovie);
        getMyMoviesFromDatabase();
    }

    useEffect(() => {
        getMyMoviesFromDatabase();
        getGenres();
        getUpcomingMovies();
        getPersons();
    }, []);

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
            handleSetCurrentMoviePage(match.params);
        }
    }, [location]);

    useEffect(() => {

        const match = matchPath({ path: '/person/:personID' }, location.pathname);

        if (match) {
            getCurrentPersonInfo(match.params.personID);
        }
    }, [location]);

    ///////////////////////////////////////////////////


    ////////////////////////////////////////////////////////////////////////////////////////

    const [currentResultsPage, setCurrentResultsPage] = useState(1);
    const [prevResultsPage, setPrevResultsPage] = useState(0);
    const [wasLastList, setWasLastList] = useState(false);
    const [isMovieListLoading, setIsMovieListLoading] = useState(false);

    const getMovies = async () => {
        setIsMovieListLoading(true);
        const response = await axios.get(
            'https://api.themoviedb.org/3/discover/movie?api_key=1fdbb7205b3bf878ede960ab5c9bc7ce' + '&page=' + currentResultsPage
        );
        if (!response.data.results.length) {
            setWasLastList(true);
            return;
        }
        setPrevResultsPage(currentResultsPage);
        setCurrentResultsPage(currentResultsPage + 1);
        handleSetMovies(response.data.results);
        setIsMovieListLoading(false);
    };

    useEffect(() => {
        if (!wasLastList && prevResultsPage !== currentResultsPage) {
            getMovies();
            console.log('useEffect runs');
        }
    }, []);

    ////////////////////////////////////////////////////////////////////////////////////////

    return (
        <div className="content-wrapper">
            <Menu auth={auth} />
            <TopBanner />
            <div className="content">
                <Routes>
                    <Route exact path="/" element={<Home getMovies={getMovies} isMovieListLoading={isMovieListLoading} movies={props.movies} upcomingMovies={props.upcomingMovies} genres={props.genres} favouriteMovies={props.favouriteMovies} handleRemoveFromFavouriteMovies={handleRemoveFromFavouriteMovies} addMovieToMyCollection={addMovieToMyCollection} handleSetCurrentMoviePage={handleSetCurrentMoviePage} />} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/favourite-movies" element={<FavouriteMovies favouriteMovies={props.favouriteMovies} genres={props.genres} handleRemoveFromFavouriteMovies={handleRemoveFromFavouriteMovies} handleSetCurrentMoviePage={handleSetCurrentMoviePage} />} />
                    <Route path="/actors" element={<Actors persons={props.persons.uploadedPersons} getCurrentPersonInfo={getCurrentPersonInfo} />} />
                    <Route path="/genres" element={<Genres/>} />
                    <Route path="/profile" element={<Profile user={props.currentUser} />} />
                    <Route path={props.currentMoviePage.currentMovieInfo && "/movie/:id"} element={<MoviePage getCurrentPersonInfo={getCurrentPersonInfo} handleSetCurrentMoviePage={handleSetCurrentMoviePage} handleClearCurrentMoviePage={handleClearCurrentMoviePage} currentMoviePage={props.currentMoviePage} favouriteMovies={props.favouriteMovies} genres={props.genres} addMovieToMyCollection={addMovieToMyCollection} handleRemoveFromFavouriteMovies={handleRemoveFromFavouriteMovies} />} />
                    <Route path={props.persons.currentPersonInfo && "/person/:personID"} element={<ActorPage persons={props.persons} />} />
                </Routes>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    movies: state.movies.uploadedMovies,
    upcomingMovies: state.upcomingMovies.upcomingMovies,
    favouriteMovies: state.favouriteMovies.favouriteMovies,
    currentMoviePage: state.currentMoviePage,
    persons: state.persons,
    genres: state.genres.uploadedGenres,
})

export default connect(mapStateToProps, { setPersons, setMovies, setUpcomingMovies, setFavouriteMovies, setUser, clearUser, setGenres, removeFromFavouriteMovies, setCurrentMovieInfo, setCurrentMovieCredits, setCurrentMovieImages, setCurrentMovieReviews, setCurrentMovieSimilar, clearCurrentMoviePage, setCurrentPersonPage, clearCurrentPersonPage })(App);