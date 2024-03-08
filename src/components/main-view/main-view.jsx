import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

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

  return (
    <Row>
      <Row className="justify-content-md-center">
        {!user ? (
          <Col md={4}>
            <LoginView
              onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
              }}
            />
            <br />
            <hr />
            <SignupView />
          </Col>
        ) : selectedMovie ? (
          <Col md={8}>
            <MovieView
              key={movies.id}
              movie={selectedMovie}
              onBackClick={() => setSelectedMovie(null)}
            />
            <Row>
              <Col className="mb-5">
                <hr />
                <h3> SimilarMovies </h3>
                <Row>
                  {movies
                    .filter((movie) => {
                      return (
                        movie.id !== selectedMovie.id &&
                        movie.genre.some((genre) =>
                          selectedMovie.genre.includes(genre)
                        )
                      );
                    })
                    .map((movie) => (
                      <Col key={movie.id} md={4}>
                        <MovieCard
                          // key={movie.id}
                          movie={movie}
                          onMovieClick={(newSelectedMovie) => {
                            setSelectedMovie(newSelectedMovie);
                          }}
                        />
                      </Col>
                    ))}
                </Row>
              </Col>
            </Row>
          </Col>
        ) : movies.length === 0 ? (
          <div>The list is empty!</div>
        ) : (
          <>
            {movies.map((movie) => (
              <Col className="mb-5" key={movie.id} md={3}>
                <MovieCard
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                  }}
                />
              </Col>
            ))}
            <Button
              onClick={() => {
                setUser(null);
                setToken(null);
                localStorage.clear();
              }}
            >
              Logout
            </Button>
          </>
        )}
      </Row>
    </Row>
  );
};
