import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useSelector } from 'react-redux';

export const MovieView = () => {

  const movies = useSelector((state) => state.movies.list);

  const { movieId } = useParams();  //the useParams hook extracts the movieId from the URL parameters (from the MainView: Route path="/movies/:movieId")

  const movie = movies.find((m) => m.id === movieId);

    return (
      <Row className='d-flex flex-row-reverse p-3' >
       <Col md={5} className='text-center text-md-end'>
        <img src={movie.image} alt="movie poster" className='img-fluid h-100 w-auto movie-view-img' />
        </Col>

        <Col>
          <div className="h2 h3-sm" > Title: {movie.title} </div>

          <div className="h4 h5-sm text-muted"> Director: {movie.director.name}</div>

          <div className='mt-md-5 mb-4'>
          <div className='text-decoration-underline mb-2'>
                  Description:{' '}
                </div>
                <span>{movie.description}</span>
              </div>

              <div className='mt-md-5 mb-4'>
          <div className='text-decoration-underline mb-2'>
                  Genre:{' '}
                </div>
                <span>{movie.genre.name} ({movie.genre.description})</span>
              </div>

          <Link to={`/`}>
            <Button variant="btn btn-outline-secondary">
                Back
            </Button></Link>

        </Col>
      </Row>
    );
  };
  