import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import MoviesList from './components/movies-list';
import Movie from './components/movie';
import AddReview from './components/add-review';
import Login from './components/login';

function App() {
  const [user, setUser] = React.useState(null);

  async function login(userObj = null) {
    setUser(userObj);
  }

  async function logout() {
    setUser(null);
  }

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Movie Reviews</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link to={'/movies'}>Movies</Link>
            </Nav.Link>
            <Nav.Link>
              {user ? (
                <a onClick={logout} href="#">Logout ({user.name})</a>
              ) : (
                <Link to={'/login'}>Login</Link>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div className="container mt-4">
        <Switch>
          <Route exact path={["/", "/movies"]} component={MoviesList} />
          <Route path="/movies/:id/review" render={(props) => (
            <AddReview {...props} user={user} />
          )} />
          <Route path="/movies/:id" render={(props) => (
            <Movie {...props} user={user} />
          )} />
          <Route path="/login" render={(props) => (
            <Login {...props} login={login} />
          )} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
