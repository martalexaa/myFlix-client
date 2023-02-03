import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

export const MovieView = ({ movies }) => {

  const { movieId } = useParams();

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
          <Button>Love it</Button>
      </Card.Footer>

      </Card>
    );
  };
  