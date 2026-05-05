import React, { useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import MoviesList from './components/movies-list';
import Movie from './components/movie';
import AddReview from './components/add-review';
import Login from './components/login';

function App() {
  const [user, setUser] = useState(null);

  const login = (userObj = null) => {
    setUser(userObj);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <div className="AppShell">
      <Navbar bg="light" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/movies">
            Movie Reviews
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <Nav className="ms-auto align-items-lg-center gap-lg-2">
              <Nav.Link as={Link} to="/movies">
                Movies
              </Nav.Link>
              {user ? (
                <Nav.Link as="button" className="button-link" onClick={logout}>
                  Logout {user.name}
                </Nav.Link>
              ) : (
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="py-4 py-lg-5">
        <Switch>
          <Route exact path={['/', '/movies']} component={MoviesList} />
          <Route
            path="/movies/:id/review"
            render={(props) => <AddReview {...props} user={user} />}
          />
          <Route
            path="/movies/:id"
            render={(props) => <Movie {...props} user={user} />}
          />
          <Route
            path="/login"
            render={(props) => <Login {...props} login={login} />}
          />
        </Switch>
      </Container>
    </div>
  );
}

export default App;