//add the new fav movie to the favmovie array stored in localstorage then...
//add a new movie to user's favorite movies array in the API: app.post('/users/:Username/movies/:MovieID') 
//delete a new movie to user's favorite movies array: app.delete('/users/:Username/movies/:MovieID')

import React from "react";
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button"
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/reducers/user';

export const FavoriteButton = ({ movie }) => {

  const user = useSelector((state) => state.user.user);
  const token = localStorage.getItem('token');

  const dispatch = useDispatch();

  const isFavorite = user.FavoriteMovies.find(
    (favMovieId) => favMovieId === movie.id
  );

const addFavoriteMovie = () => {
  fetch( `https://martalexa-myflix.onrender.com/users/${user.Username}/movies/${movie.id}`,
  {      method: 'POST',
         headers: {
            Authorization: `Bearer ${token}`,
                           'Content-Type': 'application/json',
  }
})


  .then ((response) => {
  if (response.ok) {
    return response.json();
  } else {
    alert('Something went wrong')
  }
})
  .then((data) => {
    if(!data) return;
    dispatch(setUser(data));
    alert("Successfully added to favorites");
})
};


const deleteFavoriteMovie = () => {
  fetch( `https://martalexa-myflix.onrender.com/users/${user.Username}/movies/${movie.id}`,
  {      method: 'DELETE',
         headers: {
            Authorization: `Bearer ${token}`,
                           'Content-Type': 'application/json',
  }
})
.then ((response) => {
  if (response.ok) {
    return response.json();
  } else {
    alert('Something went wrong')
  }
})
  .then((data) => {
    if(!data) return;
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
        <>
            <Button variant="secondary" size='sm' 
      onClick={() => toggleFavorite()}
    >
      {isFavorite ? 'Delete from favorites' : 'Add to favorites'}
    </Button>
        </>
    )}
