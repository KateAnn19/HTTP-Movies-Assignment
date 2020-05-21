import React from 'react';
import axios from 'axios';
import { useHistory, useParams, useLocation } from "react-router-dom";

const MovieCard = props => {
  const { title, director, metascore, stars, id} = props.movie;
  const { setMovieList, getMovieList} = props;
  const { push } = useHistory();
  let location = useLocation();
  console.log(location.pathname);

  const deleteItem = e => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
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
    <div className="movie-card">
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}
      {location.pathname == '/' ? <button onClick={deleteItem}>Delete</button> : null}
    </div>
  );
};

export default MovieCard;
