import React from 'react';
import { Container, Row, Col, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Design: React.FC = () => {
  return (
    <Container fluid>
      {/* Header Section */}
      <Row className="text-center mb-4">
        <Col>
          <h1 className="display-4">System Overview</h1>
          <p className="lead">API Server and Client Architecture</p>
        </Col>
      </Row>

      {/* API Server Section */}
      <Row className="mb-5 justify-content-center">
        <Col  md={10} lg={10} xl={10} className="mx-auto">
          <Card>
            <Card.Header className="bg-primary text-white">The API Server (Primary Focus)</Card.Header>
            <ListGroup variant="flush">
              <ListGroupItem>
                <strong>System:</strong> Uses Node.js with Typescript
              </ListGroupItem>
              <ListGroupItem>
                <strong>Connections:</strong>
                <ul>
                  <li>Uses Express.js</li>
                  <li>Parses JSON, Cookies, and URL-encoded data</li>
                  <li>Initiates CORS for cross-origin access</li>
                </ul>
              </ListGroupItem>
              <ListGroupItem>
                <strong>Database:</strong>
                <ul>
                  <li>Uses a custom Controller</li>
                  <li>Handles everything with a Query and QueryResult interface</li>
                  <li>Supports multiple strategies and databases simultaneously</li>
                </ul>
              </ListGroupItem>
              <ListGroupItem>
                <strong>Authentication:</strong>
                <ul>
                  <li>Uses Express-Sessions for session persistence</li>
                  <li>Uses Passport.js for authentication with different strategies</li>
                  <li>Manages user session and authentication cookies</li>
                </ul>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>

      {/* API Client Section */}
      <Row className="mb-5 justify-content-center">
        <Col  className="mx-auto">
          <Card>
            <Card.Header className="bg-success text-white">API Client (Frontend)</Card.Header>
            <ListGroup variant="flush">
              <ListGroupItem>
                <strong>System:</strong> Uses React and Bootstrap
              </ListGroupItem>
              <ListGroupItem>
                <strong>Layout:</strong>
                <ul>
                  <li><strong>isLoggedIn: null</strong> → Program is Loading, Show <code>&lt;SplashScreen /&gt;</code></li>
                  <li><strong>isLoggedIn: false</strong> → No User is Logged In, Show <code>&lt;PublicRoutes /&gt;</code></li>
                  <li><strong>isLoggedIn: true</strong> → User is Logged In, Show <code>&lt;PrivateRoutes /&gt;</code></li>
                </ul>
              </ListGroupItem>
              <ListGroupItem>
                <strong>Components:</strong>
                <ul>
                  <li><code>&lt;SplashScreen /&gt;</code> → A loading screen that can be delayed or fade out</li>
                  <li><code>&lt;PublicRoutes /&gt;</code> → Contains a full-screen <strong>navbar</strong> and route-driven content</li>
                  <li><code>&lt;PrivateRoutes /&gt;</code> → Similar to public routes but includes protected content and profile dropdown</li>
                </ul>
              </ListGroupItem>
              <ListGroupItem>
                <strong>Public Routes:</strong>
                <ul>
                  <li>/ → <code>&lt;Welcome /&gt;</code></li>
                  <li>/design → <code>&lt;Design /&gt;</code></li>
                  <li>/about → <code>&lt;About /&gt;</code></li>
                  <li>/login → <code>&lt;LoginPage /&gt;</code></li>
                </ul>
              </ListGroupItem>
              <ListGroupItem>
                <strong>Private Routes:</strong>
                <ul>
                  <li>/ → <code>&lt;Dashboard /&gt;</code></li>
                  <li>/profile → <code>&lt;Profile /&gt;</code></li>
                  <li>/demo → <code>&lt;Demo /&gt;</code> (CRUD for product models)</li>
                  <li>/admin → <code>&lt;Admin /&gt;</code> (Only accessible to high-level users)</li>
                </ul>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>

      {/* Footer Section */}
      <Row className="text-center">
        <Col>
          <p> - Kristopher Lancaster</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Design;
