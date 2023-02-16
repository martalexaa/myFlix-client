// back-end endpoint to update user data app.put('/users/:Username')

import React from "react";
import {useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const UpdateForm = ({ token, user }) => {

  const origUsername = {...user}; //original user's username (before update)


  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);


    const handleSubmit = (event) => {
      event.preventDefault();
      const data = {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      };
    
      console.log(data);
      
      fetch(
        `https://martalexa-myflix.onrender.com/users/${origUsername.Username}`,
      {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert('Something went wrong');
        }
      })
      .then((updatedUser) => {
        if(!updatedUser) return;
        localStorage.setItem("user", JSON.stringify(updatedUser));
        alert("user info updated");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

        return (
          <>
          <Form onSubmit={handleSubmit}>
            <h3>Update my data</h3>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength="3" 
            />
          </Form.Group>
    
          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBirthday">
            <Form.Label>Birthday:</Form.Label>
            <Form.Control
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
            />
          </Form.Group>

          <br />

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
       </>
      );
    };