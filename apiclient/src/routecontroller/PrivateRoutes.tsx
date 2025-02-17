import React from 'react'
import {BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Dashboard from '../routes/Dashboard'
import Profile from '../routes/Profile'
import Admin from '../routes/Admin'
import Demo from '../routes/Demo'
import About from '../routes/About'
import Design from '../routes/Design'

const appStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  };
  
  const contentStyle: React.CSSProperties = {
    flexGrow: 1,
    overflowY: "auto",
  };

  interface RouteProps {
    isLoggedIn: boolean | null;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>;
  }

  const PrivateRoutes: React.FC<RouteProps> = (props) => {
    const privateRoutes = [
      { path: '/', name: 'Dashboard' },
      { path: '/demo', name: 'Demo' },
      { path: '/about', name: 'About Me' },
      { path: '/design', name: 'Design' },
      { path: '/admin', name: 'Admin' }
    ];
  
    return (
      <Router>
        <div style={appStyle}>
          <NavBar
            setIsLoggedIn={props.setIsLoggedIn}
            isLoggedIn={props.isLoggedIn}
            originates="private"
            routes={privateRoutes}
          />
          <div style={contentStyle}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about" element={<About />} />
              <Route path="/design" element={<Design />} />
              <Route path="/demo" element={<Demo />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </div>
        </div>
      </Router>
    );
  };


export default PrivateRoutes


