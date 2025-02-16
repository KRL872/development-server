import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import robot404 from "../assets/robot404.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const NotFound: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/"); // Redirect to home after 3 seconds
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, [navigate]);

  return (
    <Container
      fluid
      style={{
        backgroundImage: `url(${robot404})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "white",
      }}
    >
      <Row className="text-center">
        <Col>
          <Card className="bg-transparent border-0 text-white">
            <Card.Body>
              <h2 className="mb-3">Oops! Page Not Found</h2>
              <p>You will be redirected to the homepage in 3 seconds...</p>
              <button
                onClick={() => navigate("/")} // Allow immediate redirection on button click
                className="btn btn-primary mt-3"
              >
                Go to Home Now
              </button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
