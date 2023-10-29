import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import Login from './login'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';




const Loading = () => {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     navigate('/login');
  //   }, 5000); // Change 5000 (5 seconds) to desired delay

  //   return () => clearTimeout(timer); // Clean up the timer on unmount
  // }, [navigate]);

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div>
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p className="mt-2 text-center">Loading...</p>
      </div>
    </div>
  );
}






const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loading />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default Loading;















