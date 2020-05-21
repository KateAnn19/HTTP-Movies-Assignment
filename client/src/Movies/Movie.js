import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory, useLocation } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, getMovieList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const{push} = useHistory();
  

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const deleteItem = e => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${params.id}`)
      .then(res => {
        console.log(res)
        //setMovieList(res);
        getMovieList();
        setTimeout(function () {
          push(`/`);
        }, 2000);
        
        // res.data ==> just the id
        // const newItems = props.items.filter(v => `${v.id}` !== res.data)
        // props.setItems(newItems)
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <button onClick={() => push(`/update-movie/${params.id}`)}>Edit Movie</button>
      <button onClick={deleteItem}>DELETE</button>
    </div>
  );
}

export default Movie;
