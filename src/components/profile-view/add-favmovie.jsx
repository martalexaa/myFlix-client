import React from 'react';
import Button from "react-bootstrap/Button";

export const addFavMovie = ({ user, movies }) => {

    const storedToken = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem('user'));

    const favoriteMovies = user.FavoriteMovies.map( favMovie => (
        movies.find(movie => (movie._id === favMovie))
    ));

    const handleAddFavMovie = (movieId) => {

    }


return (
    <>
    <Button variant='primary'> Add to favorites </Button>
    </>
)
}