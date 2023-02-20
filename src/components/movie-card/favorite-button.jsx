//add the new fav movie to the favmovie array stored in localstorage then...
//add a new movie to user's favorite movies array in the API: app.post('/users/:Username/movies/:MovieID') 
//delete a new movie to user's favorite movies array: app.delete('/users/:Username/movies/:MovieID')

import React from "react";
import Button from "react-bootstrap/Button";


export const FavoriteButton = ({ movie, user, token}) => {

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
  .then((updatedUser) => {
    if(!updatedUser) return;
    localStorage.setItem("user", JSON.stringify(updatedUser));
    alert("Successfully added to favorites");
    window.location.reload();
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
  .then((updatedUser) => {
    if(!updatedUser) return;
    localStorage.setItem("user", JSON.stringify(updatedUser));
    alert("Successfully deleted from favorites")
    window.location.reload();
})
};
  
    return (
        <>
        <Button variant='primary' onClick={addFavoriteMovie} > Favorite </Button>
        <Button variant='primary' onClick={deleteFavoriteMovie}> Not Favorite </Button>
        </>
    )}
