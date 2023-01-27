import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  //fetch movies from the database
  useEffect(() => {
    fetch("https://martalexa-myflix.onrender.com/movies")
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
      });
  }, []);

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

      <button onClick={() => { setUser(null); }}>Logout</button>
    </div>
  );
};