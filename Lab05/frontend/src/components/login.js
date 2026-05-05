import React, { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';

function Login(props) {
  const [name, setName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    props.login({
      id: `user-${Date.now()}`,
      name: name.trim() || 'Guest'
    });

    props.history.push('/movies');
  };

  return (
    <Row className="justify-content-center">
      <Col lg={6} xl={5}>
        <Card className="login-panel p-3 p-md-4">
          <Card.Body>
            <Card.Title as="h2" className="mb-3">
              Login
            </Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>User name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Enter your name"
                />
              </Form.Group>
              <Button type="submit" variant="dark">
                Login
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default Login;