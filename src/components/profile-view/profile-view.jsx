import { useState, useEffect } from "react";


  export const ProfileView = ( ) => {
    const [userData, setUserData] = useState({});

useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  //let favMoviesList = movies.filter((m) => userData.FavoriteMovies.includes(m.id));

    
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
        <h3>My Favorite Movies: {userData.FavoriteMovies} </h3>
        <h3>Update my data:</h3>
      </div>
      </>
    );
  };
 




