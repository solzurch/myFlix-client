import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";

export const MovieCard = ({ movie, isFavorite, addFav, removeFav }) => {
  const add = () => addFav(movie.id);
  const remove = () => removeFav(movie.id);

  return (
    <>
      <Card className="h-100 moviecard">
        <Card.Body className="justify-content-md-center cardBody">
          <Card.Text>
            {isFavorite.includes(movie) ? (
              <Button onClick={remove} className="primaryButton mt-2">
                <p>
                  <FaHeart color="darkred" />
                </p>
              </Button>
            ) : (
              <Button onClick={add} className="primaryButton mt-2"></Button>
            )}
            <span> </span>
            <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
              <Button variant="primary" className="primaryButton mt-2">
                INFO
              </Button>
            </Link>
          </Card.Text>
        </Card.Body>
        <Card.Img variant="top" src={movie.image} className="moviePoster" />
      </Card>
    </>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
