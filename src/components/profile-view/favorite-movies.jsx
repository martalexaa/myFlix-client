import { MovieCard } from '../movie-card/movie-card';
import { Col } from "react-bootstrap";
import { useSelector } from 'react-redux';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';

export const FavoriteMovies = () => {
  const user = useSelector((state) => state.user.user);
  const movies = useSelector((state) => state.movies.list);
  const token = useSelector((state) => state.token.token);

  const favoriteMovies = user.FavoriteMovies ?? [];
  const favoriteMoviesList = favoriteMovies?.length ? movies.filter((movie) => favoriteMovies.includes(movie.id)) : [];

  return (
    <>
      <h3 className='text-start mb-4 pt-5 mt-5'>Your Favorites: </h3>
      <Splide options={{
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
              <SplideSlide md={4} className='mb-4' key={movie.id} style={{ maxHeight: '600px' }}>
                <MovieCard movie={movie} user={user} token={token} />
              </SplideSlide>
            ))}
          </>
        )}
      </Splide >
    </>
  )
};