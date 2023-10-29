import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import LoadingPage from './login';

const HomePage = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="text-center">
        <h1 className="mb-4">How bad is your anime taste?</h1>
        <p className="mb-4">Our sophisticated A.I. Model judges  your  ‘amazing’ taste in anime </p>
        <Link to='./loading' className="btn btn-primary" >Find Out</Link>
      </div>
    </div>
  );
}



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/loading" element={<LoadingPage />} />
      </Routes>
    </Router>
  );
}




export default App;




