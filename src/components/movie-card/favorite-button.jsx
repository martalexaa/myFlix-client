import Button from "react-bootstrap/Button"
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../redux/reducers/user';
import { BsSuitHeartFill, BsSuitHeart } from 'react-icons/bs';

export const FavoriteButton = ({ movie }) => {

  const user = useSelector((state) => state.user.user);
  const token = useSelector(
    (state) => state.token.token || localStorage.getItem('token')
  );
  const dispatch = useDispatch();

  const isFavorite = user.FavoriteMovies.find(
    (favMovieId) => favMovieId === movie.id
  );

  const addFavoriteMovie = () => {
    fetch(`https://martalexa-myflix.onrender.com/users/${user.Username}/movies/${movie.id}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      })


      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert('Something went wrong')
        }
      })
      .then((data) => {
        if (!data) return;
        dispatch(setUser(data));
        alert("Successfully added to favorites");
      })
  };


  const deleteFavoriteMovie = () => {
    fetch(`https://martalexa-myflix.onrender.com/users/${user.Username}/movies/${movie.id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert('Something went wrong')
        }
      })
      .then((data) => {
        if (!data) return;
        dispatch(setUser(data));
        alert("Successfully deleted from favorites")
      })
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      deleteFavoriteMovie();
    } else {
      addFavoriteMovie();
    }
  };

  return (
    <Button variant="danger"
      onClick={() => toggleFavorite()}
    >
      {isFavorite ? <BsSuitHeartFill  /> : <BsSuitHeart />}
    </Button>
  )
}
