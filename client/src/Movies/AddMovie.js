import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const initialMovie = {
  title: "",
  director: "",
  metascore: "",
  stars: "",
};

const AddMovieForm = (props) => {
  const [movie, setMovie] = useState(initialMovie);
  const [star, setStar] = useState("");
  const { push } = useHistory();

  const changeHandler = (ev) => {
    ev.persist();
    setMovie({
      ...movie,
      [ev.target.name]: ev.target.value,
    });
  };

  const handleSubmit = (e) => {
    console.log(movie.director);
    console.log(star);
    e.preventDefault();
    let newMovie = {
      director: movie.director,
      metascore: movie.metascore,
      title: movie.title,
      id: movie.id,
      stars: movie.stars.split(',')
    };
    // make a PUT request to edit the item
    axios
      .post(`http://localhost:5000/api/movies/`, newMovie) //{
      .then((res) => {
        console.log("THIS IS INSIDE HANDLE SUBMIT", res);
        console.log(res.data);
        props.setMovieList(res.data);
        props.getMovieList();
        //needs to be res.data because res is has many other fields
        setTimeout(function () {
          push(`/`);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h2>Add Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="Title"
          value={movie.title}
        />
        <div className="baseline" />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="Director"
          value={movie.director}
        />
        <div className="baseline" />

        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="Metascore"
          value={movie.metascore}
        />
        <div className="baseline" />

        <textarea
          type="text"
          name="stars"
          value={movie.stars}
          onChange={(e) => {
            setMovie({
                ...movie,
                [e.target.name]: e.target.value,
              });
            // [e.target.name] = e.target.value;
            console.log(movie)
            // console.log(star)
            // setStar(star.split(","));
          }}
        >
          Actors
        </textarea>
        <div className="baseline" />
        <button className="md-button form-button">Add Movie</button>
      </form>
    </div>
  );
};

export default AddMovieForm;
