import React from "react";
import {useState} from "react";
import { Button, Form } from "react-bootstrap";

import { useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/user";
import { setToken } from "../../redux/reducers/token";

export const LoginView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState(""); 
    const dispatch = useDispatch();

        const handleSubmit = (event) => {event.preventDefault(); // prevent reloading the entire page
        const data = { 
          Username: username, 
          Password: password 
        };


        fetch("https://martalexa-myflix.onrender.com/login", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json" 
          },
          body: JSON.stringify(data) // response with JSON object
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Login response: ", data);
            if (data.user) {
              localStorage.setItem("user", JSON.stringify(data.user)); // save user and token in local storage to stay logged in
              localStorage.setItem("token", data.token);
              dispatch(setUser(data.user));
              dispatch(setToken(data.token));

            } else {
              alert("No such user");
            }
          })
          .catch((e) => {
            alert("Something went wrong");
          });
        };


        return (
          <Form onSubmit={handleSubmit}>
            <h3>Log in</h3>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength="3" 
              pattern="^[A-Za-z0-9 .,'\-!?%&]+$"
              title="Username should contain at least 3 characters: only contain letters, numbers and special characters"
              placeholder="Enter your username"
            />
          </Form.Group>
    
          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              pattern="^[A-Za-z0-9 .,'\-!?%&]+$"
              title="Password may only contain letters, numbers and special characters"
              placeholder="Enter your password"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      );
    };