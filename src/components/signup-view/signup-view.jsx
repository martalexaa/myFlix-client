import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleSubmit = (event) => {event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch("https://martalexa-myflix.onrender.com/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(data)
        }).then((response) => {
            if(response.ok) {
            alert("Signup successful");
        } else {
            alert("Signup failed")
        }
    });
  };

  return (
    <Container>
    <Form onSubmit={handleSubmit}>
        <h3>Sign up</h3>
    <Form.Group controlId="formUsername" className='mt-3'>
      <Form.Label>Username:</Form.Label>
      <Form.Control
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        minLength="3" 
      />
    </Form.Group>

    <Form.Group controlId="formPassword" className='mt-3'>
      <Form.Label>Password:</Form.Label>
      <Form.Control
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </Form.Group>

    <Form.Group controlId="formemail" className='mt-3'>
      <Form.Label>Email:</Form.Label>
      <Form.Control
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </Form.Group>

    <Form.Group controlId="formbirthday" className='mt-3'>
      <Form.Label>Birthday:</Form.Label>
      <Form.Control
        type="date"
        value={birthday}
        onChange={(e) => setBirthday(e.target.value)}
        required
      />
    </Form.Group>
   <Row className='text-end'>
    <Col>
        <Button variant="primary" type="submit" className='mt-3'>
      Submit
    </Button>
    </Col>
    </Row>
  </Form>
  </Container>
  )};