import { useState, useEffect } from "react";
import { MovieCard } from '../movie-card/movie-card';
import { UpdateForm } from './update-form';
import { DeleteUser } from './delete-user';
import Button from "react-bootstrap/Button";

  export const ProfileView = ({ user, movies }) => {

    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    const [userData, setUserData] = useState({});

useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);
  

  const favMovies = userData.FavoriteMovies ?? [];
  const favMoviesList = favMovies && favMovies.length !== 0 ? movies.filter((m) => favMovies.includes(m.id)) : [];


  const addFavoriteMovie = async() => {
    const favoriteMovie =  await fetch( `https://martalexa-myflix.onrender.com/users/${userData.Username}/movies/${movie.id}`,
    {      method: 'POST',
           headers: {
              Authorization: `Bearer ${storedToken}`,
                             'Content-Type': 'application/json',
    }
  })
    const response = await favoriteMovie.json()
    setUserFavoriteMovies(response.FavoriteMovies)
    if(response) {
      localStorage.setItem('user', JSON.stringify(response));
      alert('Successfully added')
      window.location.reload();
    } else {
      alert('Something went wrong')
    }
  }
  
  const deleteFavoriteMovie = async() => {
    const favoriteMovie =  await fetch( `https://martalexa-myflix.onrender.com/users/${userData.Username}/movies/${movie.id}`,
    {      method: 'DELETE',
           headers: {
              Authorization: `Bearer ${storedToken}`,
                             'Content-Type': 'application/json',
    }
  })
    const response = await favoriteMovie.json()
    if(response) {
      localStorage.setItem('user', JSON.stringify(response));
      alert('Successfully deleted')
      window.location.reload();
    } else {
      alert('Something went wrong')
    }
  }

    
    return (
        <>
      <div>
    <h2>My profile</h2>
      </div>
      <div>
        <p>Username: {userData.Username}</p>
        <p>Email: {userData.Email} </p>
        <p>Birthday: {userData.Birthday}</p>
        <br />
        <h3>My Favorite Movies: </h3>
        
        {favMoviesList.length === 0 ? (
                  <div>The list is empty!</div>
                ) : (
                  <>
                    {favMoviesList.map((movie) => (
                      <div key={movie.id}>
                        <MovieCard movie={movie}  user={user}/>
                        <Button variant='primary' onClick={() => deleteFavoriteMovie}> Not Favorite </Button>
                      </div>
                    ))}
                  </>
                )}
           <br/>
        <UpdateForm storedToken={storedToken} storedUser={storedUser}/>
        <DeleteUser storedToken={storedToken} storedUser={storedUser}/>
      </div>
      </>
    );
  };
 




