import { Button, Card } from "react-bootstrap";

export const MovieView = ({ movie, onBackClick }) => {
    return (
      <Card bg="dark" text="white" style={{ width: "62rem" }}>

        <Card.Header><h2>{movie.title}</h2></Card.Header>
      
        <Card.Img src={movie.image} />
      
        <Card.Body>

          <Card.Text> Director: {movie.director}</Card.Text>

          <Card.Text>Description: {movie.description}</Card.Text>

          <Card.Text>Genre:{movie.genre} ({movie.genre_description})</Card.Text>

        </Card.Body>

        <Card.Footer><Button variant="primary" onClick={onBackClick}>Back</Button></Card.Footer>

      </Card>
    );
  };
  