import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function home() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="text-center">
        <h1 className="mb-4">How bad is your anime taste?</h1>
        <p className="mb-4">Our sophisticated A.I. Model judges  your  ‘amazing’ taste in anime </p>
        <button className="btn btn-primary">Find Out</button>
      </div>
    </div>
  );
}

export default home;