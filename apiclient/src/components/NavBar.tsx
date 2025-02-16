import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "font-awesome/css/font-awesome.min.css";
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as apifunctions from "../apifunctions/functions";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import imageLogo from "../assets/appLogo.png";

interface NavBarProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>;
  originates: string;
  routes: { path: string; name: string }[];
  isLoggedIn: boolean | null;
}

const NavBar: React.FC<NavBarProps> = (props) => {
  const [open, setOpen] = useState(false); // Manages collapse state
  const [profile, setProfile] = useState<any>(null); // Stores profile data
  const [isToggleVisible, setIsToggleVisible] = useState(false); // Tracks toggle button visibility
  const navigate = useNavigate();
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (props.isLoggedIn) {
        try {
          // Simulating API response
          const data = {
            displayName: "John Doe",
            email: "Joe@joe.org",
            comment: "HII",
            firstName: "John",
            lastName: "Doe",
          };
  
          setProfile(data); // Update state
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      }
    };
  
    fetchProfile();
  }, [props.isLoggedIn]);

  // Function to check if the toggle button (hamburger) is visible
  const checkToggleVisibility = () => {
    setIsToggleVisible(window.innerWidth < 992); // Bootstrap lg breakpoint is 992px
  };

  // Run check on mount and window resize
  useEffect(() => {
    checkToggleVisibility(); // Initial check
    window.addEventListener("resize", checkToggleVisibility);
    return () => window.removeEventListener("resize", checkToggleVisibility);
  }, []);

  const handleLogout = async () => {
    try {
      await apifunctions.fetchLogout();
      if (props.setIsLoggedIn) props.setIsLoggedIn(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <Navbar expand="sm" bg="dark" variant="dark" style={{ padding: "0.5rem" }}>
      {/* Logo */}
      <Navbar.Brand as={Link} to="/">
        <img
          src={imageLogo}
          alt="Brand Logo"
          style={{ height: "30px", width: "auto", borderRadius: "6px" }}
        />
      </Navbar.Brand>

       {(isToggleVisible && profile?.displayName) && (
        <div className="text-white d-lg-none">
          <span>{profile.displayName}</span> 
 
        </div>
      )}
      {/* Navbar toggle button (hamburger menu) */}
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        ref={toggleRef}
        onClick={() => setOpen(!open)}
      />

     

      {/* Navbar collapse content */}
      <Navbar.Collapse id="basic-navbar-nav" in={open}>
        <Nav className="me-auto">
          {props.routes.map((route) => (
            <Nav.Link as={Link} to={route.path} key={route.path} className="text-white">
              {route.name}
            </Nav.Link>
          ))}
        </Nav>

        {/* User/Logout or Login button */}
        <Nav>
          {props.originates === "private" ? (
            <NavDropdown title="User" id="user-dropdown" align="end">
              <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as="button" onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Button variant="primary" onClick={() => navigate("/login")} className="text-white">
              Login
            </Button>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
