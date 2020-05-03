import React from "react";
var Fontawsome = require("react-fontawesome");

function MovieList(props) {
  const movieClicked = (movie) => (eve) => {
    props.movieClicked(movie);
  };
  const movieDelete = (movie) => (eve) => {
    fetch(`${process.env.REACT_APP_API_URL}/api/movies/${movie.id}/`, {
      method: "DELETE",
      headers: {
        content_type: "application/json",
        Authorization: `Token ${this.props.token}`,
      },
    })
      .then((resp) => props.movieDelete(movie))
      .catch((error) => console.log(error));
  };
  const movieEdit = (movie) => (eve) => {
    props.editClicked(movie);
  };
  const newMovie = () => {
    props.newMovie();
  };
  return (
    <div>
      {props.movies.map((movie) => {
        return (
          <div key={movie.id} className="movie_item">
            <h3 onClick={movieClicked(movie)}>{movie.title}</h3>
            <Fontawsome name="edit" onClick={movieEdit(movie)} />
            <Fontawsome name="trash" onClick={movieDelete(movie)} />
          </div>
        );
      })}
      <button onClick={newMovie}>ADD NEW</button>
    </div>
  );
}
export default MovieList;
