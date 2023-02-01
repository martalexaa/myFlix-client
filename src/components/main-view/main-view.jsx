import { useState, useEffect } from "react";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  //fetch movies from the database
  useEffect(() => {

    if(!token) {
      return;
    }

    fetch("https://martalexa-myflix.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })

      .then((response) => response.json())
      .then((data) => { 
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.Title,
            image: movie.ImagePath,
            description: movie.Description,
            director: movie.Director.Name,
            genre: movie.Genre.Name,
            genre_description: movie.Genre.Description
          };
        });
        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  //by passing bearer authorization in the header of your HTTP requests, you can make authenticated requests to your API

   //if the user is not logged in, display LoginView or SignupView
   if (!user) {
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        or
        <SignupView />
      </>
    );
  }

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

//if there is no movie in the list, show "the list is empty", if there are movies loaded from the database, show the movie cards(name with click function and key)
  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }
  return (
    <>
    <h3>Movies</h3>
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
          />
        ))}
      </div>
      <button onClick={() => { setUser(null); setToken(null); localStorage.clear() }}>Logout</button>
    </>
  );
};