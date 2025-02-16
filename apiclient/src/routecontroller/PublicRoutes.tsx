import React from 'react'
import {BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import NavBar from '../components/NavBar'
import LoginPage from '../routes/LoginPage';
import Welcome from '../routes/Welcome';
import About from '../routes/About';
import Design from '../routes/Design';
import NotFound from '../routes/NotFound';
interface RouteProps {
    isLoggedIn: boolean | null;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>;
  }

const appStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
};

const contentStyle: React.CSSProperties = {
    flexGrow: 1,
    overflowY: "auto",
};

const PublicRoutes: React.FC<RouteProps> = (props) => {
    const publicRoutes = [
      { path: '/', name: 'Home' },
      { path: '/about', name: 'About' },
      { path: '/design', name: 'Design' }
    ];
  
    return (
      <Router>
        <div style={appStyle}>
          <NavBar
            isLoggedIn={props.isLoggedIn}
            setIsLoggedIn={props.setIsLoggedIn}
            originates="public"
            routes={publicRoutes}
          />
          <div style={contentStyle}>
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/design" element={<Design />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </Router>
    );
  };
  export default PublicRoutes