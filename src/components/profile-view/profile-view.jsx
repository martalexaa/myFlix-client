import { useState, useEffect } from "react";
import { MovieCard } from '../movie-card/movie-card';


  export const ProfileView = ({ user, movies }) => {
    const [userData, setUserData] = useState({});

useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);
  

  const favMovies = userData.FavoriteMovies;
  const favMoviesList = movies.filter((m) => favMovies.includes(m.id));

    
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

        <h3>Update my data:</h3>
      </div>
      </>
    );
  };
 




