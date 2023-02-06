// endpoint app.delete("/users/:id/:movieTitle")

import React from 'react';
import Button from "react-bootstrap/Button";

export const deleteFavMovie = ({ user, movies }) => {

    const storedToken = localStorage.getItem("token");
    
    const storedUser = JSON.parse(localStorage.getItem('user'));

    const favoriteMovies = user.FavoriteMovies.map( favMovie => (
        movies.find(movie => (movie._id === favMovie))
    ));

    const handleDeleteFavMovie = (movieId) => {

        fetch(
            `https://martalexa-myflix.onrender.com/users/${storedUser._id}/${movie.title}`,
            {
              method: 'DELETE',
              headers: {
                Authorization: `Bearer ${storedToken}`,
                'Content-Type': 'application/json',
              },
            }
          )
            .then((response) => {
              if (response.ok) {
                alert('Movie successfully deleted from favorites');
                localStorage.clear();
                window.location.reload();
              } else {
                alert('Something went wrong');
              }
            })
            .catch((e) => console.log(e));
    };
  

    return (
        <>
        <Button variant='primary'> Delete from favorites </Button>
        </>
    )
}