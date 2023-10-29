import React, { useEffect, useState } from 'react';
import FinalPage from './finalpage';
import "./content.css";

interface UserData {
  [key: string]: any;
}

const UserDataDisplay: React.FC = () => {
  const [showFMKChoices, setShowFMKChoices] = useState(false);
  const [showAnimeConQuestion, setShowAnimeConQuestion] = useState(false);
  const [showFinalScore, setShowFinalScore] = useState(false);
  const [data, setData] = useState<UserData | null>(null);
  const [showLowestRatedQuestion, setShowLowestRatedQuestion] = useState(true);
  const [showUOkayQuestion, setShowUOkayQuestion] = useState(false);
  const [showYesIronicComponent, setShowYesIronicComponent] = useState(false);
  const [showYesOkComponent, setShowYesOkComponent] = useState(false);
  const [showNoOkComponent, setShowNoOkComponent] = useState(false);
  const [character1Choice, setCharacter1Choice] = useState<string | null>(null);
  const [character2Choice, setCharacter2Choice] = useState<string | null>(null);
  const [character3Choice, setCharacter3Choice] = useState<string | null>(null);
  const [showFinalPage, setShowFinalPage] = useState(false); // New state for showing the FinalPage
  const [showHighRatedOnHoldQuestion, setShowHighRatedOnHoldQuestion] = useState(false);
  const [didWatchHighRatedPart, setDidWatchHighRatedPart] = useState<boolean | null>(null);
  
  useEffect(() => {
    if (showFinalScore) {
      setTimeout(() => {
        setShowFinalPage(true);
      }, 3000); // Wait for 3 seconds
    }
  }, [showFinalScore]);

  useEffect(() => {
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

    const intervalId = setInterval(fetchUserData, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const handleHighRatedOnHoldResponse = (response: boolean) => {
    setDidWatchHighRatedPart(response);
    setShowFinalScore(true)
   };

   
  const handleYesFirst = () => {
    setShowYesIronicComponent(true);
    setShowUOkayQuestion(true);
  };

  const handleNoFirst = () => {
    setShowUOkayQuestion(true);
  };

  const handleYesUOkay = () => {
    setShowYesOkComponent(true);
    setShowFMKChoices(true);
  };

  const handleNoUOkay = () => {
    setShowNoOkComponent(true);
    setShowFMKChoices(true);
  };


  const handleFMKChoiceForCharacter1 = (choice: string) => {
    if (!character1Choice) {
      setCharacter1Choice(choice);
      if (choice && character2Choice && character3Choice) {
        setShowAnimeConQuestion(true);
      }
    }
};

const handleFMKChoiceForCharacter2 = (choice: string) => {
    if (!character2Choice) {
      setCharacter2Choice(choice);
      if (character1Choice && choice && character3Choice) {
        setShowAnimeConQuestion(true);
      }
    }

};

const handleFMKChoiceForCharacter3 = (choice: string) => {
    if (!character3Choice) {
      setCharacter3Choice(choice);
      if (character1Choice && character2Choice && choice) {
        setShowAnimeConQuestion(true);
      }
    }

};

  const handleAnimeConAnswer = () => {
    setShowHighRatedOnHoldQuestion(true);
  };



  if (!data) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p className="mt-2 text-center">Loading...</p>
      </div>
    );
  }

  if (showFinalPage) {
      return <FinalPage />;
    }

  return (
    <div>
       {showLowestRatedQuestion && (
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
          <button id="yes_first" onClick={handleYesFirst}>Yes</button>
          <button id="no_first" onClick={handleNoFirst}>No</button>
        </div>
      )}

      {showYesIronicComponent && (
        <div>
          <p className="mb-4">Like Ironically?</p>
        </div>
      )}

      {showUOkayQuestion && (
        <div>
          <p>
            Cool . . .
            <br />
            <br />
            Seeing a lot of . . .
            <br />
            <br />
            Finding a lot of . . .
            <br />
            <br />
            Like a lot . . .
            <br />
            <br />
            U okay?
          </p>  
          <button onClick={handleYesUOkay}>Yea why?</button>
          <button onClick={handleNoUOkay}>Not really</button>
        </div>
      )}

      {showYesOkComponent && (
        <div>
          <p className="mb-4">no reason...</p>
        </div>
      )}

      {showNoOkComponent && (
        <div>
          <p className="mb-4">listen im just a </p>
        </div>
      )}

      {showFMKChoices && (
        <div>
          <p className="mb-4">of course . . . <br /> now quick choose Fuck Marry Kill</p>
          <div>
            {/* <img src="./character1.png" alt="character1" /> */}
            <button onClick={() => handleFMKChoiceForCharacter1('Fuck')}>Fuck</button>
            <button onClick={() => handleFMKChoiceForCharacter1('Marry')}>Marry</button>
            <button onClick={() => handleFMKChoiceForCharacter1('Kill')}>Kill</button>
          </div>
          <div>
            {/* <img src="./character2.png" alt="character2" /> */}
            <button onClick={() => handleFMKChoiceForCharacter2('Fuck')}>Fuck</button>
            <button onClick={() => handleFMKChoiceForCharacter2('Marry')}>Marry</button>
            <button onClick={() => handleFMKChoiceForCharacter2('Kill')}>Kill</button>
          </div>
          <div>
            {/* <img src="./character3.png" alt="character3" /> */}
            <button onClick={() => handleFMKChoiceForCharacter3('Fuck')}>Fuck</button>
            <button onClick={() => handleFMKChoiceForCharacter3('Marry')}>Marry</button>
            <button onClick={() => handleFMKChoiceForCharacter3('Kill')}>Kill</button>
          </div>
        </div>
      )}

      {showAnimeConQuestion && (
        <div>
          <p>Oh you <br />Have you been to anime con?</p>
          <button onClick={handleAnimeConAnswer}>Yea</button>
          <button onClick={handleAnimeConAnswer}>No</button>
        </div>
      )}

      {showHighRatedOnHoldQuestion && (
          <div>
              <p>clearly <br />You should really finish {data['Highest rated on hold'] ? data['Highest rated on hold'].toString() : '(highest rated on hold)'} you know... <br/>Did you get to the part where (spoil something about show with LLM)?</p>
              <button onClick={() => handleHighRatedOnHoldResponse(true)}>Yea</button>
              <button onClick={() => handleHighRatedOnHoldResponse(false)}>No</button>
          </div>
      )}

      {didWatchHighRatedPart === true && (
          <div>
              <p>And that didn’t keep you watching? Wow</p>
          </div>
      )}

      {didWatchHighRatedPart === false && (
          <div>
              <p>Oh... my bad...</p>
          </div>
      )}


      {showFinalScore && (
        <div>
          <p>Well this is interesting <br /> let's get to your final score</p>
        </div>
      )}
    </div>
  );
}

export default UserDataDisplay;
