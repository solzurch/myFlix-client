import { Button, Row, Col } from "react-bootstrap";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies, isFavorite, addFav, removeFav }) => {
  const { movieId } = useParams();
  const movie = movies.find((movie) => movie.id === movieId);
  const add = () => addFav(movie.id);
  const remove = () => removeFav(movie.id);
  const navigate = useNavigate();

  return (
    <>
      <Row className="mt-3 movieView">
        <Col>
          {isFavorite.includes(movie) ? (
            <Button
              onClick={remove}
              style={{ backgroundColor: "transparent", border: "none" }}
            >
              <div className="favorited mt-4">
                <FaHeart />
              </div>
            </Button>
          ) : (
            <Button
              type="submit"
              onClick={add}
              style={{ backgroundColor: "transparent", border: "none" }}
            >
              <div className="notFavorited mt-4"> </div>
            </Button>
          )}
          <img src={movie.image} className="w-100" />
        </Col>
        <Col md={7} className="mt-3">
          <div className="movieTitle mb-3 mt-3">
            <span className="h2">
              {movie.title} ({movie.year})
            </span>
          </div>
          <div>
            <span className="h6">Genre: </span>
            <span>{movie.genre.Name}</span>
          </div>
          <div className="mt-1">
            <span className="h6">Director: </span>
            <span>{movie.director.Name}</span>
          </div>
          <div className="mt-1">
            <span className="h6">Description: </span>
            <span>{movie.description}</span>
          </div>
          <div className="mt-1">
            <span className="h6">Featured: </span>
            <span>{movie.featured}</span>
          </div>
        </Col>
      </Row>
      <Row className="mb-5">
        <Button
          className="mt-3 w-100 primaryButton"
          variant="primary"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </Row>
    </>
  );
};
