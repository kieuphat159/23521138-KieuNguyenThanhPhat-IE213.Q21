import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import MovieDataService from '../services/movies';

function MoviesList() {
  const [movies, setMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchRating, setSearchRating] = useState('All Ratings');
  const [ratings, setRatings] = useState(['All Ratings']);

  useEffect(() => {
    retrieveMovies();
    retrieveRatings();
  }, []);

  const retrieveMovies = () => {
    MovieDataService.getAll()
      .then((response) => {
        setMovies(response.data.movies || []);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const retrieveRatings = () => {
    MovieDataService.getRatings()
      .then((response) => {
        const values = Array.isArray(response.data) ? response.data : [];
        setRatings(['All Ratings', ...values]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const find = (query, by) => {
    MovieDataService.find(query, by)
      .then((response) => {
        setMovies(response.data.movies || []);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const findByTitle = () => {
    find(searchTitle, 'title');
  };

  const findByRating = () => {
    if (searchRating === 'All Ratings') {
      retrieveMovies();
      return;
    }

    find(searchRating, 'rated');
  };

  const onChangeSearchTitle = (event) => {
    setSearchTitle(event.target.value);
  };

  const onChangeSearchRating = (event) => {
    setSearchRating(event.target.value);
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-eyebrow">Lab 05</div>
        <h1 className="hero-title">Movie Reviews connected to backend</h1>
        <p className="hero-copy">
          Browse movies, filter by title or rating, then open a movie to read, edit, or delete
          reviews through the API built in the previous labs.
        </p>
      </div>

      <div className="toolbar">
        <Row className="g-3 align-items-end">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Search by title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Type a movie title"
                value={searchTitle}
                onChange={onChangeSearchTitle}
              />
            </Form.Group>
            <Button className="mt-3" variant="primary" onClick={findByTitle}>
              Search
            </Button>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Search by rating</Form.Label>
              <Form.Control as="select" value={searchRating} onChange={onChangeSearchRating}>
                {ratings.map((rating) => (
                  <option key={rating} value={rating}>
                    {rating}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button className="mt-3" variant="outline-primary" onClick={findByRating}>
              Filter
            </Button>
          </Col>
        </Row>
      </div>

      <Row className="g-4">
        {movies.map((movie) => {
          const movieId = movie._id || movie.id;
          const poster = movie.poster ? `${movie.poster}/100px180` : 'https://via.placeholder.com/300x180?text=No+Image';

          return (
            <Col key={movieId} md={6} lg={4}>
              <Card className="movie-card">
                <Card.Img variant="top" src={poster} alt={movie.title} />
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Text className="text-muted">Rating: {movie.rated || 'N/A'}</Card.Text>
                  <Card.Text>{movie.plot}</Card.Text>
                  <Link to={`/movies/${movieId}`} className="btn btn-dark mt-auto">
                    View Reviews
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default MoviesList;