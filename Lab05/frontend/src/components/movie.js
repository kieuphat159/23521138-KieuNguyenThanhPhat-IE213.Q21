import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import moment from 'moment';
import MovieDataService from '../services/movies';

function Movie(props) {
  const [movie, setMovie] = useState({
    _id: null,
    title: '',
    rated: '',
    plot: '',
    poster: '',
    reviews: []
  });

  const getMovie = (id) => {
    MovieDataService.get(id)
      .then((response) => {
        setMovie(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getMovie(props.match.params.id);
  }, [props.match.params.id]);

  const handleDelete = (review) => {
    if (!props.user) {
      return;
    }

    const reviewId = review._id || review.review_id || review.id;

    MovieDataService.deleteReview({
      review_id: reviewId,
      user_id: props.user.id
    })
      .then(() => {
        getMovie(props.match.params.id);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const poster = movie.poster ? `${movie.poster}/100px250` : 'https://via.placeholder.com/300x450?text=No+Poster';

  return (
    <div className="movie-panel p-4">
      <Row className="g-4">
        <Col md={4} lg={3}>
          <img className="img-fluid rounded-4 shadow-sm" src={poster} alt={movie.title} />
        </Col>
        <Col md={8} lg={9}>
          <Card className="border-0 shadow-sm mb-4">
            <Card.Header as="h3" className="bg-white border-0 pt-3 px-3">
              {movie.title}
            </Card.Header>
            <Card.Body>
              <Card.Text className="text-muted">Rated: {movie.rated || 'N/A'}</Card.Text>
              <Card.Text>{movie.plot}</Card.Text>
              {props.user && (
                <Link
                  to={{
                    pathname: `/movies/${props.match.params.id}/review`
                  }}
                  className="btn btn-primary"
                >
                  Add Review
                </Link>
              )}
            </Card.Body>
          </Card>

          <h2 className="mb-3">Reviews</h2>
          {(movie.reviews || []).length === 0 && (
            <p className="text-muted">No reviews have been posted for this movie yet.</p>
          )}

          {(movie.reviews || []).map((review, index) => {
            const canEdit = props.user && review.user_id === props.user.id;
            const reviewText = review.review || review.text || '';
            const reviewDate = review.date ? moment(review.date).format('Do MMMM YYYY') : 'Unknown date';

            return (
              <div className="review-item" key={review._id || review.review_id || index}>
                <div className="review-meta">
                  <strong>{review.name || 'Anonymous'}</strong> reviewed on {reviewDate}
                </div>
                <p className="mb-2">{reviewText}</p>
                {canEdit && (
                  <Row className="g-2">
                    <Col xs="auto">
                      <Link
                        to={{
                          pathname: `/movies/${props.match.params.id}/review`,
                          state: { currentReview: review }
                        }}
                        className="btn btn-link p-0"
                      >
                        Edit
                      </Link>
                    </Col>
                    <Col xs="auto">
                      <Button variant="link" className="p-0" onClick={() => handleDelete(review)}>
                        Delete
                      </Button>
                    </Col>
                  </Row>
                )}
              </div>
            );
          })}
        </Col>
      </Row>
    </div>
  );
}

export default Movie;