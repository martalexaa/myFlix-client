import { useState, useEffect } from "react";
import { MovieCard } from '../movie-card/movie-card';
import { UpdateForm } from './update-form';

  export const ProfileView = ({ user, movies }) => {

    const storedUser = JSON.parse(localStorage.getItem('user'));
    const [userData, setUserData] = useState({});

useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);
  
//The code below defines two constants favMovies and favMoviesList. favMovies is assigned the value of userData.
//FavoriteMovies if it exists, or an empty array [] if it does not exist (using the "nullish coalescing operator" ??). 
//favMoviesList is then assigned a filtered list of movies from movies where the movie's id is included in favMovies. 
//If favMovies has a length of zero (favMovies.length !== 0), favMoviesList is assigned an empty array [].
  const favMovies = userData.FavoriteMovies ?? [];
  const favMoviesList = favMovies && favMovies.length !== 0 ? movies.filter((m) => favMovies.includes(m.id)) : [];

    
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
                      </div>
                    ))}
                  </>
                )}
           <br/>
        <UpdateForm />
      </div>
      </>
    );
  };
 




