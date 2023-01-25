import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
      <div
        onClick={() => {
          onMovieClick(movie);
        }}
      >
        {movie.title}
      </div>
    );
  };

MovieCard.propTypes = {
    movie: PropTypes.shape({
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      director: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      genre: PropTypes.shape({
        name: PropTypes.string,
        genre_description: PropTypes.string
      })
    }).isRequired,
    onBookClick: PropTypes.func.isRequired
  };