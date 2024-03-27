import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";

export const MovieCard = ({ movie, updateUser }) => {
  const storedToken = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (storedUser) {
      setIsFavorite(storedUser.FavoriteMovies.includes(movie.id));
    }
  }, [storedUser]);

  const addToFavorites = () => {
    fetch(
      `https://pelis-api-8f563354313a.herokuapp.com/users/${storedUser.Username}/movies/${movie.id}`,
      {
        method: "POST",
        // body: JSON.stringify(favoriteMoviesData),
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add movie to favorites.");
        }
        alert("Movie added to favorites successfully!");
        return response.json();
      })
      .then((user) => {
        if (user) {
          updateUser(user);
          setIsFavorite(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const removeFromFavorites = () => {
    fetch(
      `https://pelis-api-8f563354313a.herokuapp.com/users/${storedUser.Username}/movies/${movie.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to remove movie from favorites.");
        }
        alert("Movie removed from favorites successfully!");
        return response.json();
      })
      .then((user) => {
        if (user) {
          updateUser(user);
          setIsFavorite(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Link
        className="link-card"
        to={`/movies/${encodeURIComponent(movie.id)}`}
      >
        <Card>
          <Card.Img variant="top" src={movie.image} />
          <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>{movie.genre.name}</Card.Text>
          </Card.Body>
        </Card>
      </Link>
      <Card>
        {isFavorite ? (
          <Button variant="warning" onClick={removeFromFavorites}>
            Remove from favorites
          </Button>
        ) : (
          <Button variant="primary" onClick={addToFavorites}>
            Add to favorites
          </Button>
        )}
      </Card>
    </>
  );
};

MovieCard.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    genre: PropTypes.arrayOf(PropTypes.string).isRequired, // Update this line
    id: PropTypes.string.isRequired,
  }).isRequired,
};
