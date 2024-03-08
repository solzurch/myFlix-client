import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://pelis-api-8f563354313a.herokuapp.com/movies"),
      {
        headers: { Authorization: `Bearer ${token}` },
      }
        .then((response) => response.json())
        .then((data) => {
          const moviesFromApi = data.map((movie) => {
            return {
              id: movie._id,
              title: movie.Title,
              imagePath: movie.Image,
              genre: movie.Genre,
              description: movie.Description,
              director: movie.Director,
            };
          });

          setMovies(moviesFromApi);
        });
  }, [token]);

  if (!user) {
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        or
        <SingupView />
      </>
    );
  }

  if (selectedMovie) {
    let similarMovies = movies.filter((movie) => {
      return (
        movie.id !== selectedMovie.id &&
        movie.genre.some((genre) => selectedMovie.genre.includes(genre))
      );
    });
    return (
      <>
        <MovieView
          key={movies.id}
          movie={selectedMovie}
          onBackClick={() => {
            setSelectedMovie(null);
          }}
        />
        <hr />
        <h2> Similar Movies </h2>
        {similarMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        ))}
      </>
    );
  }

  if (movies.length === 0) {
    return;
    <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
      <button
        onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      >
        Logout
      </button>
    </div>
  );
};
