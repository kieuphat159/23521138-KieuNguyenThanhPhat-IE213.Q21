import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import MovieDataService from '../services/movies';

function AddReview(props) {
  const currentReview = props.location && props.location.state ? props.location.state.currentReview : null;

  const [name, setName] = useState(currentReview ? currentReview.name || '' : '');
  const [rating, setRating] = useState(currentReview ? currentReview.rating || 5 : 5);
  const [review, setReview] = useState(currentReview ? currentReview.review || currentReview.text || '' : '');

  useEffect(() => {
    if (!props.user) {
      props.history.push('/login');
    }
  }, [props.user, props.history]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      movie_id: props.match.params.id,
      user_id: props.user ? props.user.id : '',
      name: name || (props.user ? props.user.name : 'Anonymous'),
      review,
      rating: Number(rating),
      date: new Date()
    };

    const request = currentReview && (currentReview._id || currentReview.review_id)
      ? MovieDataService.updateReview({ ...payload, review_id: currentReview._id || currentReview.review_id })
      : MovieDataService.createReview(payload);

    request
      .then(() => {
        props.history.push(`/movies/${props.match.params.id}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Row className="justify-content-center">
      <Col lg={8} xl={7}>
        <Card className="login-panel p-3 p-md-4">
          <Card.Body>
            <Card.Title as="h2" className="mb-3">
              {currentReview ? 'Edit Review' : 'Add Review'}
            </Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your name"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Rating</Form.Label>
                <Form.Control
                  as="select"
                  value={rating}
                  onChange={(event) => setRating(event.target.value)}
                >
                  {[5, 4, 3, 2, 1].map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Review</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  value={review}
                  onChange={(event) => setReview(event.target.value)}
                  placeholder="Write your thoughts here"
                />
              </Form.Group>

              <Button type="submit" variant="primary">
                {currentReview ? 'Update Review' : 'Submit Review'}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default AddReview;