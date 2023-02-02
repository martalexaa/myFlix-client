import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./movie-card.scss";

export const MovieCard = ({ movie }) => {
    return (
      <Card bg="dark" text="white" className="h-100">
        <Card.Img variant="top" src={movie.image}/>
          <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>directed by {movie.director}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="link">Open</Button>
        </Link>
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
  };