import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import "./favorite-movies.scss";

export const FavoriteMovies = ({ favoriteMovies, updateUser }) => {
  return (
    <Col className="mb-5">
      <h3 className="title">List of favorite movies</h3>
      <Row>
        {favoriteMovies.map((movie) => (
          <Col key={movie._id} md={3}>
            <Link to={`/movies/${movie._id}`} />
            <MovieCard key={movie._id} updateUser={updateUser} movie={movie} />
          </Col>
        ))}
      </Row>
    </Col>
  );
};
FavoriteMovies.propTypes = {
  favoriteMovies: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
};
