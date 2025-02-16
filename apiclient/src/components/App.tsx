//React and State
import React, { useState, useEffect } from "react";
//Navigation
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// API Functions
import * as apifunctions from '../apifunctions/functions';

// Route Controllers
import SplashScreen from "../routes/SplashScreen";
import PrivateRoutes from "../routecontroller/PrivateRoutes";
import PublicRoutes from "../routecontroller/PublicRoutes";

// App Component
const App: React.FC = () => {
  // null is used to indicate that we are loading
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const splashScreenTimer = 1000;
  useEffect(() => {
    const checkLoginStatus = async () => {
      setIsLoggedIn(await apifunctions.fetchStatus());
    };
  
    const timeout = setTimeout(() => {
      checkLoginStatus();
    }, splashScreenTimer);
  
    return () => clearTimeout(timeout); // Cleanup in case the component unmounts
  }, []);

  
  if (isLoggedIn === true) return (<PrivateRoutes isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />);
  if (isLoggedIn === false) return (<PublicRoutes isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />);
  return <SplashScreen />;
};
    

export default App;