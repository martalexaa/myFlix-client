import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { setMovies } from "../../redux/reducers/movies";
import { setUser } from '../../redux/reducers/user';

import { MoviesList } from "../movies-list/movies-list";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view"

import { Row, Button, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  //const storedUser = JSON.parse(localStorage.getItem("user"));
  //const storedToken = localStorage.getItem("token");
  //const [user, setUser] = useState(storedUser? storedUser : null);
  //const [token, setToken] = useState(storedToken? storedToken : null);
  //const [movies, setMovies] = useState([]);


  const movies = useSelector((state) => state.movies.list);
  const user = useSelector((state) => state.user.user);
  const token = useSelector(
    (state) => state.token.token || localStorage.getItem('token')
  );

  const dispatch = useDispatch();

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
        const moviesFromApi = data.map((doc) => {
          return {
            id: doc._id,
            title: doc.Title,
            description: doc.Description,
            genre: {
              name: doc.Genre.Name,
              description: doc.Genre.Description,
            },
            director: {
              name: doc.Director.Name,
              bio: doc.Director.Bio,
              birth: doc.Director.Birth,
              death: doc.Director.Death,
            },
            image: doc.ImagePath,
          };
        });
        dispatch(setMovies(moviesFromApi));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);


   return (
    <BrowserRouter>
      <NavigationBar />

    <Row className="justify-content-md-center"> 

    <Routes>

    <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView />
                  </Col>
                )}
              </>
            }
          />

         <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <ProfileView user={user} movies={movies} token={token} />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/"
            element={
              <>{!user ? <Navigate to='/login' replace /> : <MoviesList />}</>
            }
          />
     
     </Routes>
     </Row>
    </BrowserRouter>
 );
};