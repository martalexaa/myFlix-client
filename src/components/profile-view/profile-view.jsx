import { MovieCard } from '../movie-card/movie-card';
import { UpdateForm } from './update-form';
import { DeleteUser } from './delete-user';
import { Card, Row, Col } from "react-bootstrap";

  export const ProfileView = ({ user, movies, token }) => {

  const favMovies = user.FavoriteMovies ?? [];
  const favMoviesList = favMovies && favMovies.length !== 0 ? movies.filter((m) => favMovies.includes(m.id)) : [];

    
    return (
        <>
    <div className='text-center h1 mb-4' >My Profile</div>
    <Card>
    <div className='text-start h2 mb-4'>My Data</div>
      <Card.Text>Username: {user.Username}</Card.Text>
      <Card.Text>Email: {user.Email} </Card.Text>
      <Card.Text>Birthday: {user.Birthday}</Card.Text>
    </Card>

    <br />
    
    <UpdateForm token={token} user={user}/>

    <br />

    <DeleteUser token={token} user={user}/>

    <br />
        
     <Row>
      <div className='text-start h2 mb-4'>My Favorite Movies: </div>
      {favMoviesList.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {favMoviesList.map((movie) => (
                      <Col md={4} className='mb-4' key={movie.id}>
                        <MovieCard movie={movie}  user={user} token={token} />
                      </Col>
                    ))}
                  </>
                )}
     </Row>

      </>
    );
  };