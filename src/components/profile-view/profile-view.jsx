import { MovieCard } from '../movie-card/movie-card';
import { UpdateForm } from './update-form';
import { DeleteUser } from './delete-user';
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

  export const ProfileView = () => {


    const user = useSelector((state) => state.user.user);
    const token = localStorage.getItem('token');
    const movies = useSelector((state) => state.movies.list);
  

  const favMovies = user.FavoriteMovies ?? [];
  const favMoviesList = favMovies && favMovies.length !== 0 ? movies.filter((m) => favMovies.includes(m.id)) : [];

    
    return (
        <>
    <div className='text-center h1 mb-4' >My Profile</div>
    <Container>
    <div className='text-start h2 mb-4'>My Data</div>
      <p className="mb-3" >Username: {user.Username}</p>
      <p className="mb-3">Email: {user.Email} </p>
      <p className="mb-5">Birthday: {user.Birthday}</p>
    </Container>

    <br />
    
    <UpdateForm />

    <br />

    <DeleteUser />

    <br />
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