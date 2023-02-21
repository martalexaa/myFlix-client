import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/user";
import { setToken } from '../../redux/reducers/token';

import { MoviesFilter } from '../movies-filter/movies-filter';
import Col from 'react-bootstrap/Col';

export const NavigationBar = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const onLoggedOut = () => {
    dispatch(setUser(null));
    dispatch(setToken(null));
    localStorage.clear();
  };

  return (
    <Navbar 
    expand='md'
    bg='light'
    variant='light'
    sticky='top'
    className='mb-4 py-3' >
      <Container>
        <Navbar.Brand as={Link} to="/" className='h2'>
          Movies App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  Profile
              </Nav.Link>
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
              </>
            )}
          </Nav>  
          <Col md={3}>
                <MoviesFilter />
              </Col> 
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};