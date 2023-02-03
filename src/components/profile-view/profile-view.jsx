import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";


  export const ProfileView = ({ user, movies}) => {
    const storedToken = localStorage.getItem("token");
    const [token] = useState(storedToken ? storedToken : null);

   // const storedUser = localStorage.getItem("user");
   // const [user, setUser] = useState(storedUser? storedUser : null);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [favoriteMovies, setFavoriteMovies] = useState([]);
  
    const getUser = (token) => {    
        fetch(`https://martalexa-myflix.onrender.com/users/${user.Username}`, {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
    .then(response => response.json())
    .then((data) => {
      setUsername(data.Username);
      setEmail(data.Email);
      setBirthday(data.Birthday);
      setFavoriteMovies(data.FavoriteMovies)
    })
  }
  
  useEffect(()=> {
    getUser(token);
  },[])

  // favMovies is a new array containing only the movies from the movies array that are also present in the user.FavoriteMovies array
  let favMoviesList = movies.filter(m => user.FavoriteMovies.includes(m._id))
  console.log(favoriteMovies);


    
    return (
        <>
      <div>
    <h2>My profile</h2>
      </div>
      <div>
        <p>Username: {username}</p>
        <p>Email: {email} </p>
        <p>Birthday: {birthday}</p>
        <br />
        <h3>My Favorite Movies</h3>

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
 




