import React, { useState, useEffect } from "react";
import { Route, useLocation } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import MovieForm from './Movies/MovieForm';
import axios from 'axios';


const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const location = useLocation();
  

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList getMovieList={getMovieList} setMovieList={setMovieList} movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie getMovieList={getMovieList} movies={movieList} addToSavedList={addToSavedList} />
      </Route>
      <Route path="/update-movie/:id">
        <MovieForm getMovieList={getMovieList} setMovieList={setMovieList}/>
      </Route>
    </>
  );
};

export default App;
