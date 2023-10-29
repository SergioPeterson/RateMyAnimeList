import React, { useEffect, useState } from 'react';
import "./content.css";

interface UserData {
  [key: string]: any;
}

const Yes1 = () => {
    return (
      <div>
      <p className="mb-4">Like Ironically? </p>
      </div>
    );
}

const No1 = () => {
    return (
      <p className="mb-4">No</p> 
      );
}

const UserDataDisplay: React.FC = () => {
  const [data, setData] = useState<UserData | null>(null);
  const [appendedContent, setAppendedContent] = useState<('YES' | 'NO') | null>(null);
  const [selectedButton, setSelectedButton] = useState<('YES' | 'NO') | null>(null);


  useEffect(() => {
    // Function to fetch user data
    const fetchUserData = async () => {
      try {
        const response = await fetch('../convex/userData.json');
        if (response.ok) {
          const jsonData: UserData = await response.json();
          setData(jsonData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Call the fetch function periodically (e.g., every 5 seconds)
    const intervalId = setInterval(fetchUserData, 2000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Handle button clicks
  const handleYesClick = () => {
    
    setAppendedContent('YES');
    setSelectedButton('YES');
  }
  const handleNoClick = () => {
    setAppendedContent('NO');
    setSelectedButton('NO');
  }

  if (!data) {
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

  return (
    <div>
    <p>
      Loading your anime watch list... this might take a minute or two. If nothing loads in 3 minutes try again later...
      <br />
      <br />
      Analyzing your watch history ...
      <br />
      <br />
      lol
      <br />
      <br />
      omg
      <br />
      <br />
      okay hold on 
      <br />
      <br />
      Do you really like to {data['Lowest rated'] ? data['Lowest rated'].toString() : '(Lowest rated)'}?
    </p>  
      <button 
        className={`yes ${selectedButton === 'YES' ? 'selected' : ''}`}
        onClick={handleYesClick}
        disabled={selectedButton !== null}
      >
        Yes
      </button>
      <button 
        className={`no ${selectedButton === 'NO' ? 'selected' : ''}`}
        onClick={handleNoClick}
        disabled={selectedButton !== null}
      >
        No
      </button>

      {appendedContent === 'YES' && <Yes1 />}
      {appendedContent === 'NO' && <No1 />}
    </div>
  );
}

export default UserDataDisplay;