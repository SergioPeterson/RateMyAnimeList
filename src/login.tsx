import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { useAction } from "convex/react";
import { api } from "../convex/_generated/api";
// Import the UserDataDisplay component
import UserDataDisplay from './content.tsx';
import "./login.css";
import {parse } from '../convex/userinfo.ts'

const Login = () => {
  const [username, setUsername] = useState<string>('');
  // State to determine if UserDataDisplay should be shown
  const [showUserDataDisplay, setShowUserDataDisplay] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    setError(null); // Clear the error when user types
  }

  const performGetUserData = useAction(api.Api_call.getUserData);

  const saveUsername = () => {
    if (!username.trim()) { // Check if username is empty or just spaces
      setError("Please enter a username.");
      return;
    }
    console.log(username);
    const dataPromise = Promise.resolve(performGetUserData({username: username, offset: 0}));
    dataPromise.then((data) => {
      console.log(data);
      if (data.hasOwnProperty("error")) {
        setShowUserDataDisplay(false);
        setError("Invalid username.");
        return;
      }
      parse(username);
    });
    // After saving the username, set the state to show UserDataDisplay
    setShowUserDataDisplay(true);
  }

  // If the state is true, render the UserDataDisplay component
  if (showUserDataDisplay) {
    return <UserDataDisplay/>;
  }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="text-center">
        <p className="mb-4">Hi, I am an AI trained to evaluate anime taste. To get started, I’ll need to see your MAL account. I’m just gonna look at what you watch and your ratings. I won’t post or change anything.</p>
        
        <input 
          type="text"
          placeholder="Enter MAL Username"
          className="form-control mb-2"
          value={username}
          onChange={handleInputChange}
        />
        {error && <div className="text-danger mb-2">{error}</div>}
        
        <button className="btn btn-primary mt-2" onClick={saveUsername}>Save Username</button>
      </div>
    </div>
  );
}

const LoadingPage = () => {
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogin(true);
    }, 500); 

    return () => clearTimeout(timer);
  }, []);

  if (showLogin) {
    return <Login />;
  }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div>
        <div className="spinner-border text-primary" role="status">
          {/* <span className="sr-only">Loading...</span> */}
        </div>
        <p className="mt-2 text-center">Loading...</p>
      </div>
    </div>
  );
}

export default LoadingPage;
