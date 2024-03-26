import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m.id === movieId);

  // Find similar movies based on genre
  const similarMovies = movies.filter((m) => {
    return m.id !== movie.id && m.genre.includes(movie.genre);
  });

  return (
    <div>
      <div>
        <img height={300} src={movie.image} />
      </div>
      <div>
        <h4>{movie.title}</h4>
      </div>
      <div>
        <p>{movie.description}</p>
      </div>
      <div>
        <h6>Genre: {movie.genre}</h6>
      </div>
      <div>
        <h6>Director: {movie.director}</h6>
      </div>

      <Link to={`/`}>
        <Button className="back-button"> Back </Button>
      </Link>

      <Col className="mb-5">
        <hr />
        <h3 className="title"> Similar movies </h3>
        <Row>
          {similarMovies.map((movie) => (
            <Col key={movie.id} xs={6} sm={6} md={6}>
              <MovieCard movie={movie} />
            </Col>
          ))}
        </Row>
      </Col>
    </div>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      genre: PropTypes.arrayOf(
        PropTypes.shape({
          Name: PropTypes.string.isRequired,
        })
      ).isRequired,
      director: PropTypes.string.isRequired,
    })
  ).isRequired,
};
