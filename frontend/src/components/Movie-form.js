import React, { Component } from "react";
class MovieEdit extends Component {
  state = {
    editMovie: this.props.movie,
  };
  cancelClicked = () => {
    this.props.cancelForm();
  };
  inputChanged = (event) => {
    let movie = this.state.editMovie;
    movie[event.target.name] = event.target.value;
    this.setState({ editMovie: movie });
  };
  saveClicked = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/movies/`, {
      method: "POST",
      headers: {
        content_type: "application/json",
        Authorization: `Token ${this.props.token}`,
      },
      body: JSON.stringify(this.state.editMovie),
    })
      .then((resp) => resp.json())
      .then((resp) => this.props.newMovie(resp))
      .catch((error) => console.log(error));
  };
  updateClicked = () => {
    fetch(
      `${process.env.REACT_APP_API_URL}/api/movies/${this.props.movie.id}/`,
      {
        method: "PUT",
        headers: {
          content_type: "application/json",
          Authorization: `Token ${this.props.token}`,
        },
        body: JSON.stringify(this.state.editMovie),
      }
    )
      .then((resp) => resp.json())
      .then((resp) => this.props.editedMovie(resp))
      .catch((error) => console.log(error));
  };
  render() {
    const isValide =
      this.state.editedMovie.title.length === 0 ||
      this.state.editedMovie.description.length === 0;
    return (
      <>
        <span>Title</span>
        <br />
        <input
          type="text"
          name="title"
          value={this.props.movie.title}
          onChange={this.inputChanged}
        />
        <br />
        <span>Description</span>
        <br />
        <textarea
          name="description"
          value={this.props.movie.description}
          onChange={this.inputChanged}
        />
        <br />
        {this.props.movie.id ? (
          <button onClick={this.updateClicked} disabled={isValide}>
            Update
          </button>
        ) : (
          <button onClick={this.saveClicked} disabled={isValide}>
            Save
          </button>
        )}
        &nbsp;
        <button onClick={this.cancelClicked}>Cancel</button>
      </>
    );
  }
}

export default MovieEdit;
