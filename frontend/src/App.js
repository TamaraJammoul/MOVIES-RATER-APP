import React, { Component } from "react";
import "./App.css";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/Movie-details";
import MovieEdit from "./components/Movie-form";
import { withCookies } from "react-cookie";

var Fontawsome = require("react-fontawesome");

class App extends Component {
  state = {
    movies: [],
    selectedMovie: null,
    editedmovie: null,
    token: this.props.cookies.get("mr_token"),
  };
  componentDidMount() {
    if (this.state.token) {
      fetch(`${process.env.REACT_APP_API_URL}/api/movies/`, {
        method: "GET",
        headers: {
          Authorization: `Token ${this.state.token}`,
        },
      })
        .then((resp) => resp.json())
        .then((resp) => this.setState({ movies: resp }))
        .catch((error) => console.log(error));
    } else {
      window.location.href = "/";
    }
  }
  loadmovie = (movie) => {
    this.setState({ selectedMovie: movie, editedmovie: null });
  };
  movieDelete = (selmovie) => {
    const movies = this.state.movies.filter(
      (movie) => movie.id !== selmovie.id
    );
    this.setState({ movies: movies, selectedMovie: null });
  };
  editClicked = (movie) => {
    this.setState({ editedmovie: movie });
  };
  newMovie = () => {
    this.setState({ editedmovie: { title: "", description: "" } });
  };
  cancelForm = () => {
    this.setState({ editedmovie: null });
  };
  addMoviw = (movie) => {
    this.setState({ movies: [...this.state.movies, movie] });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>
            <span>
              <Fontawsome name="film" />
            </span>
            Movie Rater
          </h1>
          <div className="layout">
            <MovieList
              movies={this.state.movies}
              movieClicked={this.loadmovie}
              movieDelete={this.movieDelete}
              editClicked={this.editClicked}
              newMovie={this.newMovie}
              token={this.state.token}
            />
            <div>
              {!this.state.editedmovie ? (
                <MovieDetails
                  movie={this.state.selectedMovie}
                  updateMovie={this.loadmovie}
                  token={this.state.token}
                />
              ) : (
                <MovieEdit
                  movie={this.state.editedmovie}
                  cancelForm={this.cancelForm}
                  newMovie={this.addMovie}
                  editedMovie={this.loadmovie}
                  token={this.state.token}
                />
              )}
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default withCookies(App);
