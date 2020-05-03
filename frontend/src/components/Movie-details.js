import React, { Component } from "react";
var Fontawsome = require("react-fontawesome");
class MovieDetail extends Component {
  state = {
    highlighted: -1,
  };
  highLightRate = (high) => (evt) => {
    this.ListeningStateChangedEvent({
      highlighted: high,
    });
  };
  rateClicked = (star) => (evt) => {
    fetch(
      `${process.env.REACT_APP_API_URL}/api/movies/${this.props.movie.id}/rate_movie/`,
      {
        method: "POST",
        headers: {
          content_type: "application/json",
          Authorization: `Token ${this.props.token}`,
        },
        body: JSON.stringify({ stars: star + 1 }),
      }
    )
      .then((resp) => resp.json())
      .then((resp) => this.getDetail())
      .catch((error) => console.log(error));
  };
  getDetail = () => {
    fetch(
      `${process.env.REACT_APP_API_URL}/api/movies/${this.props.movie.id}/`,
      {
        method: "GET",
        headers: {
          content_type: "application/json",
          Authorization: `Token ${this.props.token}`,
        },
      }
    )
      .then((resp) => resp.json())
      .then((resp) => this.props.updateMovie(resp))
      .catch((error) => console.log(error));
  };
  render() {
    const mov = this.props.movie;

    return (
      <>
        {mov ? (
          <div>
            <h3>mov.title</h3>
            <Fontawsome
              name="star"
              className={mov.avg_rating > 0 ? "orange" : ""}
            />
            <Fontawsome
              name="star"
              className={mov.avg_rating > 1 ? "orange" : ""}
            />
            <Fontawsome
              name="star"
              className={mov.avg_rating > 2 ? "orange" : ""}
            />
            <Fontawsome
              name="star"
              className={mov.avg_rating > 3 ? "orange" : ""}
            />
            <Fontawsome
              name="star"
              className={mov.avg_rating > 4 ? "orange" : ""}
            />
            ({mov.no_of_rating})<h3>this.props.movie.description</h3>
          </div>
        ) : null}
        <div className="rate_container">
          <h2>Rate it!</h2>
          {[...Array(5)].map((e, i) => {
            return (
              <Fontawsome
                name="star"
                key={i}
                className={this.state.highlighted > i - 1 ? "purple" : ""}
                onMouseEnter={this.highLightRate(i)}
                onMouseLeave={this.highLightRate(-1)}
                onClick={this.rateClicked(i)}
              />
            );
          })}
        </div>
      </>
    );
  }
}

export default MovieDetail;
