import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { useSelector } from 'react-redux';

export const MovieView = () => {

  const movies = useSelector((state) => state.movies.list);

  const { movieId } = useParams();  //the useParams hook extracts the movieId from the URL parameters (from the MainView: Route path="/movies/:movieId")

  const movie = movies.find((m) => m.id === movieId);

    return (
      <Card bg="dark" text="white" style={{ width: "62rem" }}>

        <Card.Header><h2>{movie.title}</h2></Card.Header>
      
        <Card.Img src={movie.image} />
      
        <Card.Body>

          <Card.Text> Director: {movie.director}</Card.Text>

          <Card.Text>Description: {movie.description}</Card.Text>

          <Card.Text>Genre:{movie.genre} ({movie.genre_description})</Card.Text>

        </Card.Body>

        <Card.Footer>
          <Link to={`/`}><button className="back-button">Back</button></Link>
      </Card.Footer>

      </Card>
    );
  };
  