import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


const Dashboard: React.FC = () => {
  return (
    <Container fluid style={{ padding: "2rem" }}>
      <Row>
        <Col>
          <Card className="bg-light shadow-sm">
            <Card.Body>
              <Card.Title as="h3">Welcome to the Dashboard!</Card.Title>
              <Card.Text>
                This is the main content area.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
