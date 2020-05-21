import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const initialMovie = {
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

const UpdateForm = (props) => {
  const [movie, setMovie] = useState(initialMovie);
  const[star, setStar] = useState([]);
  
  const { push } = useHistory();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(function (res) {
        console.log(id)
        console.log(res)
        setMovie({director: res.data.director, metascore: res.data.metascore, title: res.data.title, id: res.data.id});
        setStar(res.data.stars);
      })
      .catch((err) => console.log(err));
  }, [id]);

  // axios.get(`http://localhost:3333/itemById:/${props.match.params.id}`)  ====> one way to go to item
  //route match hook
  //params hook ==========> these all accomplish the same goal

  const changeHandler = (ev) => {
    ev.persist();
    setMovie({
      ...movie,
      [ev.target.name]: ev.target.value,
    });
  
  };

  const handleSubmit = (e) => {
    console.log(movie.director)
    console.log(star)
    e.preventDefault();
    let newMovie = {
      director: movie.director, 
      metascore: movie.metascore, 
      title: movie.title,
      id: movie.id,
      stars: star
    }
    // make a PUT request to edit the item
    axios
      .put(`http://localhost:5000/api/movies/${id}`, newMovie) //{
      .then((res) => {
        console.log("THIS IS INSIDE HANDLE SUBMIT", res);
        console.log(res.data);
        props.setMovieList(res.data);
        props.getMovieList();
        //needs to be res.data because res is has many other fields
        setTimeout(function () {
          push(`/movies/${id}`);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h2>Update Movie</h2>
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
        {star.map((s, i) => (
          <>
            <input
              key={i}
              type="text"
              name="star"
              value={s}
              onChange={e => 
            {
              star[i]= e.target.value
              setStar([...star])
            }}
            />
            
          </>
        ))}
        <div className="baseline" />
        {/* <div className="baseline" /> */}

        <button className="md-button form-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateForm;
