import { useState } from "react";
import { Button, Form, Row, Col, Spinner } from "react-bootstrap"
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import { Welcome } from "../welcome/welcome";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    setLoading(true);

    fetch("https://martalexa-myflix.onrender.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          alert("Signup successful");
          navigate("/login");
        } else {
          alert("Signup failed");
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
    <Welcome />
    <Container>
      <Form onSubmit={handleSubmit}>
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
            {loading ? ( // show loading animation while data is being loaded
              <Button variant="primary" disabled className="mt-3">
                <Spinner animation="border" size="sm" /> Loading...
              </Button>
            ) : (
              <Button variant="primary" type="submit" className="mt-3">
                Sign up
              </Button>
            )}
          </Col>
        </Row>
      </Form>
    </Container>
    </>
  )
};