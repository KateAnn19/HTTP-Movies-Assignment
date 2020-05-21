import React from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

function MovieList({ movies, setMovieList, getMovieList }) {
  return (
    <div className="movie-list">
      {
        movies.map(movie => (
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            <MovieCard id={movie.id} setMovieList={setMovieList} getMovieList={getMovieList} movie={movie} />
          </Link>
        ))
      }
    </div>
  );
}

export default MovieList;
