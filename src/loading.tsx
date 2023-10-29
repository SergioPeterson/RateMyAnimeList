import 'bootstrap/dist/css/bootstrap.min.css';

const LoadingPage = () => {
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

export default LoadingPage;
