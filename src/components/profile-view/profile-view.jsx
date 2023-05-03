import { MovieCard } from '../movie-card/movie-card';
import { UpdateForm } from './update-form';
import { DeleteUser } from './delete-user';
import { ProfileImage } from './profile-image';
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';

export const ProfileView = () => {

  const user = useSelector((state) => state.user.user);
  const movies = useSelector((state) => state.movies.list);
  const token = useSelector((state) => state.token.token);


  const favoriteMovies = user.FavoriteMovies ?? [];
  const favoriteMoviesList = favoriteMovies?.length ? movies.filter((movie) => favoriteMovies.includes(movie.id)) : [];


  return (
    <>
      <div className='text-center h1 mb-4' >Hello {user.Username}!</div>

      <div className='row pt-5' style={{width: '100%', padding: 0, margin: 0}}>
        <div className='col-lg-4'>
          <ProfileImage />
        </div>
        <div className='col-lg-6'>
          <UpdateForm />
        </div>
      </div>

      <h3 className='text-start mb-4 pt-5 mt-5'>Your Favorite Movies: </h3>
      <Splide  options={{ 
                            perPage: 2,
                            arrows: true,
                            pagination: false,
                            drag: "free",
                            gap: "1.5rem"
                         }}>
        {favoriteMoviesList.length === 0 ? (
          <Col>The list is empty!</Col>
        ) : (
          <>
            {favoriteMoviesList.map((movie) => (
              <SplideSlide md={4} className='mb-4' key={movie.id} style={{maxHeight: '600px'}}>
                <MovieCard movie={movie} user={user} token={token} />
              </SplideSlide>
            ))}
          </>
        )}
      </Splide >

      <DeleteUser />

    </>
  );
};