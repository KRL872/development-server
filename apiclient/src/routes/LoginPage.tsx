import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faDiscord,
  faAndroid,
  faTwitter,
  faFacebook,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import logo from "../assets/logo.png";

const providers = [
  { name: "BigRobot", icon: faAndroid, provider: "local", class: "success" },
  { name: "Google", icon: faGoogle, provider: "google", class: "danger" },
  { name: "Discord", icon: faDiscord, provider: "discord", class: "primary" },
  { name: "Twitter", icon: faTwitter, provider: "twitter", class: "info" },
  { name: "Facebook", icon: faFacebook, provider: "facebook", class: "primary" },
  { name: "GitHub", icon: faGithub, provider: "github", class: "dark" },
  { name: "Other1", icon: "🔑", provider: "other1", class: "warning" },
  { name: "Other2", icon: "🔑", provider: "other2", class: "secondary" },
];

const LoginPage: React.FC = () => {
  const handleLogin = (provider: string) => {
    window.location.href = `http://bigrobot.ca:3000/auth/${provider}`;
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center bg-light" style={{ minHeight: "100vh" }}>
      <Card className="shadow-lg rounded-4 border-0 overflow-hidden" style={{ width: "24rem" }}>
        <Card.Header className="bg-light p-2 text-center">
          <img src={logo} alt="BigRobot Logo" className="mx-auto" style={{ width: "200px" }} />
        </Card.Header>

        <Card.Body className="p-4">
          <h4 className="mb-3 text-center text-muted">Choose a login method</h4>

          <Row className="g-3 mb-4">
            {providers.map(({ name, icon, provider, class: btnClass }, index) => (
              <Col xs={6} key={index}>
                <Button
                  variant={btnClass}
                  className="w-100 d-flex align-items-center justify-content-start py-3 shadow-lg"
                  onClick={() => handleLogin(provider)}
                  style={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    paddingLeft: "15px",
                    paddingRight: "15px",
                    backgroundColor: `var(--bs-${btnClass})`,
                    borderColor: `var(--bs-${btnClass})`,
                  }}
                >
                  <span className="d-flex align-items-center justify-content-center" style={{ width: "24px" }}>
                    {typeof icon === "string" ? icon : <FontAwesomeIcon icon={icon} />}
                  </span>
                  <span className="mx-auto">{name}</span>
                </Button>
              </Col>
            ))}
          </Row>

          <div className="border-top pt-3 text-center">
            <p className="mb-2 text-muted small">
              By continuing, you agree to our <a href="#" className="text-decoration-none">Terms of Service</a> and <a href="#" className="text-decoration-none">Privacy Policy</a>
            </p>
            <p className="mb-0 text-muted">
              Need help? <a href="#" className="text-decoration-none fw-bold">Contact Support</a>
            </p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginPage;