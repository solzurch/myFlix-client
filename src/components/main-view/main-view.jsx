import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SingupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://pelis-api-8f563354313a.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            image: movie.imgPath,
            title: movie.title,
            genre: movie.genre ? movie.genre.Name : "Unknown Genre",
            description: movie.description,
            director: movie.director ? movie.director.Name : "Unknown Director",
          };
        });

        localStorage.setItem("movies", JSON.stringify(moviesFromApi));
        setMovies(moviesFromApi);
      });
  }, [token]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setQuery(query);

    const storedMovies = JSON.parse(localStorage.getItem("movies"));

    //Filter movies by title and genre
    const filteredMovies = storedMovies.filter((movie) => {
      // Check if the movie's title or genre includes the search query
      return (
        movie.title.toLowerCase().includes(query.toLowerCase()) ||
        movie.genre.some((genre) =>
          genre.toLowerCase().includes(query.toLowerCase())
        )
      );
    });

    //Update the state with the filtered movies
    setMovies(filteredMovies);
  };

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        query={query}
        handleSearch={handleSearch}
        movies={movies}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />
      <br />
      <Row className="justify-content-center">
        <Routes>
          <Route
            path="/users"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={4}>
                    <SingupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={4}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <Row className="justify-content-center">
                <Col sm={12} md={9} lg={7}>
                  {user ? (
                    <ProfileView
                      token={token}
                      user={user}
                      movies={movies}
                      onSubmit={(user) => setUser(user)}
                    />
                  ) : (
                    <Navigate to="/login" />
                  )}
                </Col>
              </Row>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col> The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-5" key={movie.id} sm={6} md={4} lg={3}>
                        <MovieCard
                          isFavorite={user.FavoriteMovies.includes(movie.title)}
                          movie={movie}
                        />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
