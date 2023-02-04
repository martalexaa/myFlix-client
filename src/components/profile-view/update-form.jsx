import React from "react";
import {useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const UpdateForm = ({ }) => {

  const storedToken = localStorage.getItem("token");
  const [token] = useState(storedToken ? storedToken : null);
  const storedUser = localStorage.getItem("user");
  const [setUser] = useState(storedUser ? storedUser : null);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const updateUser = (event) => {
      event.preventDefault();
    
      const data = {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      };
    
      console.log(data);
    
      fetch(`https://martalexa-myflix.onrender.com/${username}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
        .then(updateUser => updateUser.json())
        .then(response => {
          console.log(response);
          if (response) {
            localStorage.clear();
            window.location.reload();
            alert("Account successfully updated");
          } else {
            alert("Something went wrong");
          }
        })
        .catch(error => {
          console.log(error);
        });
    };    

        return (
          <Form onSubmit={updateUser}>
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

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      );
    };