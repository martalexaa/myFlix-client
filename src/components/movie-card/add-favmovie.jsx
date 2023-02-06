//add a new movie to user's favorite movies array: app.post('/users/:Username/movies/:MovieID') 

import React from 'react';
import Button from "react-bootstrap/Button";

export const AddFavMovie = ({  }) => {

    const handleAddFavMovie = (movieId) => {

        
    const storedToken = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem('user'));

        fetch(
            `https://martalexa-myflix.onrender.com/users/${storedUser._id}/${movieId}`,
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
                const updatedUser = response.data;
                alert('Movie successfully added to favorites');
                localStorage.setItem('user', JSON.stringify(updatedUser));
                window.location.reload();
              } else {
                alert('Something went wrong');
              }
            })
            .catch((e) => console.log(e));
    };
    return (
        <>
        <Button variant='primary' onClick={() => handleAddFavMovie(movieId)}> Add to favorites </Button>
        </>
    )}
