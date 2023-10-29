import 'bootstrap/dist/css/bootstrap.min.css';

const content = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="text-center">
        <p className="mb-4">Loading your anime watch list... this might take a minute or two. If nothing loads in 3 minutes try again later... Analyzing your watch history ... lol omg okay hold on  Do you really like to (Lowest rated show name)?</p>
        <button className="btn btn-primary">Yes</button>
        <button className="btn btn-primary">No</button>
      </div>
    </div>
  );
}

export default content;