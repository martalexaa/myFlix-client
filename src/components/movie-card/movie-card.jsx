import PropTypes from "prop-types";
import { Button, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FavoriteButton } from "./favorite-button";

export const MovieCard = ({ movie }) => {
  return (
    <Card bg="light" className="shadow" style={{height: '600px'}}>
      <Row className='h-50'>
        <Col className='h-100 text-center mt-3'>
          <Card.Img
            variant="top"
            src={movie.image}
            className='img-fluid w-auto movie-card-img'
            style={{ height: '100%' }} />
        </Col>
      </Row>

      <Card.Body className='d-flex flex-column'>
        <Card.Title className='mt-5'>{movie.title}</Card.Title>
        <Card.Text className='mt-3 text-muted font-italic'>{movie.genre.name}</Card.Text>
        <Card.Text className='mt-3 text-muted'>Directed by {movie.director.name}</Card.Text>

        <Row className='d-flex flex-row justify-content-between align-items-baseline mt-auto'>
          <Col className='text-start'>
            <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
              <Button variant="btn btn-outline-secondary" className='mt-auto'>Open</Button>
            </Link>
          </Col>
          <Col className='text-end'>
            <FavoriteButton className='mt-auto' movie={movie} />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};
