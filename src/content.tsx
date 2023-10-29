import React, { useEffect, useState } from 'react';
import "./content.css";
interface UserData {
  [key: string]: any;
}

const UserDataDisplay: React.FC = () => {
  const [data, setData] = useState<UserData | null>(null);
  const [appendedContent, setAppendedContent] = useState<string | null>(null);
  const [clickedButtonID, setClickedButtonID] = useState<string | null>(null);
  
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


  const handleYesClick = (id: string) => {
    setClickedButtonID(id);
    if (id === "yes_first") {
      setAppendedContent("first_yes");
    } else if (id === "Yes_1") {
      setAppendedContent("second_Yes");
    }else if (id === "...") {
      setAppendedContent("...");
    }else if (id === "...") {
      setAppendedContent("...");
    }else if (id === "...") {
      setAppendedContent("...");
    }
  }



  const handleNoClick = (id: string) => {
    setClickedButtonID(id);
    if (id === "no_first") {
      setAppendedContent("first_No");
    } else if (id === "No_Ironically") {
      setAppendedContent("second_No");
    } else if (id === "...") {
      setAppendedContent("...");
    }else if (id === "...") {
      setAppendedContent("...");
    }else if (id === "...") {
      setAppendedContent("...");
    }
  }



/**
 * 
 * First Condition
 * 
 */
  const first_yes = () => (
    <div>
      <p className="mb-4">first_yes</p>
      <button id='Yes_1' onClick={() => handleYesClick("Yes_1")}>Yes</button>
      <button id='No_1' onClick={() => handleNoClick("No_1")}>No</button>
    </div>
  );

  const first_No = () => (
    <div>
      <p className="mb-4">first_No</p>
      <button id='Yes_2' onClick={() => handleYesClick("Yes_2")}>Yes</button>
      <button id='No_2' onClick={() => handleNoClick("No_2")}>No</button>
    </div>
  );




/**
 * 
 * Second Condition
 * 
 */
  const second_yes = () => (
    <div>
      <p className="mb-4">second_yes</p>
      <button id='Yes_3' onClick={() => handleYesClick("Yes_3")}>Yes</button>
      <button id='No_3' onClick={() => handleNoClick("No_3")}>No</button>
    </div>
  );

  const second_No = () => (
    <div>
      <p className="mb-4">second_No</p>
      <button id='Yes_4' onClick={() => handleYesClick("Yes_4")}>Yes</button>
      <button id='No_4' onClick={() => handleNoClick("No_4")}>No</button>
    </div>
  );



/**
 * 
 * Theird Condition
 * 
 */
const theird_yes = () => (
  <div>
    <p className="mb-4">theird_yes</p>
    <button id='...' onClick={() => handleYesClick(" ... ")}>Yes</button>
    <button id='...' onClick={() => handleNoClick(" ... ")}>No</button>
  </div>
);

const theird_No = () => (
  <div>
    <p className="mb-4">theird_No</p>
    <button id=' ... ' onClick={() => handleYesClick(" ... ")}>Yes</button>
    <button id=' ... ' onClick={() => handleNoClick(" ... ")}>No</button>
  </div>
);


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
      <button id="yes_first" onClick={() => handleYesClick("yes_first")}>Yes</button>
      <button id="no_first" onClick={() => handleNoClick("no_first")}>No</button>
      {appendedContent === "first_yes" && first_yes()}
      {appendedContent === "first_No" && first_No()}
      {/* ... render other content based on appendedContent value ... */}
    </div>
  );
}

export default UserDataDisplay;
