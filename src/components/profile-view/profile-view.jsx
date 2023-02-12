import { useState, useEffect } from "react";
import { MovieCard } from '../movie-card/movie-card';
import { UpdateForm } from './update-form';
import { DeleteUser } from './delete-user';
import Button from "react-bootstrap/Button";

  export const ProfileView = ({ user, movies, token }) => {

    //const storedToken = localStorage.getItem("token");
    //const storedUser = localStorage.getItem("user");
    //const [userData, setUserData] = useState({});

// useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUserData(JSON.parse(storedUser));
//     }
//   }, []);
  

  const favMovies = user.FavoriteMovies ?? [];
  const favMoviesList = favMovies && favMovies.length !== 0 ? movies.filter((m) => favMovies.includes(m.id)) : [];


    
    return (
        <>
      <div>
    <h2>My profile</h2>
      </div>
      <div>
        <p>Username: {user.Username}</p>
        <p>Email: {user.Email} </p>
        <p>Birthday: {user.Birthday}</p>
        <br />
        <h3>My Favorite Movies: </h3>
        
        {favMoviesList.length === 0 ? (
                  <div>The list is empty!</div>
                ) : (
                  <>
                    {favMoviesList.map((movie) => (
                      <div key={movie.id}>
                        <MovieCard movie={movie}  user={user} token={token} />
                      </div>
                    ))}
                  </>
                )}
           <br/>
        <UpdateForm token={token} user={user}/>
        <DeleteUser token={token} user={user}/>
      </div>
      </>
    );
  };
 




