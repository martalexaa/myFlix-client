//add a new movie to user's favorite movies array: app.post('/users/:Username/movies/:MovieID') 
//delete a new movie to user's favorite movies array: app.delete('/users/:Username/movies/:MovieID')

import React from 'react';
import Button from "react-bootstrap/Button";

export const FavoriteButton = ({ movie }) => {

  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  const favMovies = userData.FavoriteMovies ?? [];
  const currentlyAFavorite = favMovies && favMovies.length !== 0 ? movies.filter((m) => favMovies.includes(m.id)) : [];

  let requestOptions = {
    method: '',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const toggleFavorite = () => {

    if (!token) return;

    if (currentlyAFavorite) {
      requestOptions.method = 'DELETE';
      resultAlert = `${movie.title} is deleted from the list of favorites`;
    } else {
      requestOptions.method = 'POST';
      resultAlert = `${movie.title} is added to the list of favorites`;
    }  

        fetch( `https://martalexa-myflix.onrender.com/users/${user.username}/movies/${movie.id}`, requestOptions )
            .then((response) => response.json())
            .then((data) => {
              setUser(data);
              localStorage.setItem('user', JSON.stringify(data));
              alert('Successfully added to/deleted from favorites')
              window.location.reload();
            })
            .catch((e) => {
              alert('Something went wrong');
            });
        };

    return (
        <>
        <Button variant='primary' onClick={() => toggleFavorite()}> Favorite/Not favorite </Button>
        </>
    )}
