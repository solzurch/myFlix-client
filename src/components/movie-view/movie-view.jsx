import PropTypes from "prop-types";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img height={300} src={movie.imagePath} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director.Name}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre.Name}</span>
      </div>
      <div>
        <span>Featured: </span>
        <span>{movie.featured}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genre: PropTypes.array,
    director: PropTypes.string,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
