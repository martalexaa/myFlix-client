//add the new fav movie to the favmovie array stored in localstorage then...
//add a new movie to user's favorite movies array in the API: app.post('/users/:Username/movies/:MovieID') 
//delete a new movie to user's favorite movies array: app.delete('/users/:Username/movies/:MovieID')
import React from "react";
import Button from "react-bootstrap/Button";

export const FavoriteButton = ({ movie, user, token}) => {

const addFavoriteMovie = async() => {
  const favoriteMovie =  await fetch( `https://martalexa-myflix.onrender.com/users/${user.Username}/movies/${movie.id}`,
  {      method: 'POST',
         headers: {
            Authorization: `Bearer ${token}`,
                           'Content-Type': 'application/json',
  }
})
  const response = favoriteMovie.json()
  console.log(favoriteMovie)
  if(response) {
    localStorage.setItem('user', JSON.stringify(response));
    alert('Successfully added')
  } else {
    alert('Something went wrong')
  }
}

const deleteFavoriteMovie = async() => {
  const favoriteMovie =  await fetch( `https://martalexa-myflix.onrender.com/users/${user.Username}/movies/${movie.id}`,
  {      method: 'DELETE',
         headers: {
            Authorization: `Bearer ${token}`,
                           'Content-Type': 'application/json',
  }
})
  const response = await favoriteMovie.json()
  if(response) {
    localStorage.setItem('user', JSON.stringify(response));
    alert('Successfully deleted')
  } else {
    alert('Something went wrong')
  }
}
  
    return (
        <>
        <Button variant='primary' onClick={addFavoriteMovie} > Favorite </Button>
        <Button variant='primary' onClick={deleteFavoriteMovie}> Not Favorite </Button>
        </>
    )}
