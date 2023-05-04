import {useState} from "react";
import { Button, Form, Row, Col, Container, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/user";
import { setToken } from "../../redux/reducers/token";
import { Welcome } from "../welcome/welcome";

export const LoginView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState(""); 
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

        const handleSubmit = (event) => {event.preventDefault(); // prevent reloading the entire page
        const data = { 
          Username: username, 
          Password: password 
        };

        setLoading(true);

        fetch("https://martalexa-myflix.onrender.com/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Login response: ", data);
            if (data.user) {
              localStorage.setItem("user", JSON.stringify(data.user));
              localStorage.setItem("token", data.token);
              dispatch(setUser(data.user));
              dispatch(setToken(data.token));
            } else {
              alert("No such user");
            }
          })
          .catch((e) => {
            alert("Something went wrong");
          })
          .finally(() => setLoading(false)); // stop loading animation
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
              pattern="^[A-Za-z0-9 .,'\-!?%&]+$"
              title="Username should contain at least 3 characters: only contain letters, numbers and special characters"
              placeholder="Enter your username"
            />
          </Form.Group>
    
          <Form.Group controlId="formPassword" className='mt-3'>
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

          <Row className="text-end">
          <Col>
            {loading ? ( // show loading animation while data is being loaded
              <Button variant="primary" disabled className="mt-3">
                <Spinner animation="border" size="sm" /> Loading...
              </Button>
            ) : (
              <Button variant="primary" type="submit" className="mt-3">
                Log in
              </Button>
            )}
          </Col>
        </Row>
        </Form>
       </Container> 
       </>
      );
    };