import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

import "./movie-card.scss";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
      <Card bg="dark" text="white" className="h-100" onClick={() => onMovieClick(movie)}>
        <Card.Img variant="top" src={movie.image}/>
          <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>directed by {movie.director}</Card.Text>
       <Button onClick={() => onMovieClick(movie)} variant="primary">
        Open
          </Button>
        </Card.Body>
      </Card>
    );
  };

MovieCard.propTypes = {
    movie: PropTypes.shape({
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      director: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
  };