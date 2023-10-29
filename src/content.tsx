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
  const [selectedButtonLowestRated, setSelectedButtonLowestRated] = useState<string | null>(null);
  const [selectedButtonUOkay, setSelectedButtonUOkay] = useState<string | null>(null);
  const [selectedButtonFMK1, setSelectedButtonFMK1] = useState<string | null>(null);
  const [selectedButtonFMK2, setSelectedButtonFMK2] = useState<string | null>(null);
  const [selectedButtonFMK3, setSelectedButtonFMK3] = useState<string | null>(null);
  const [selectedButtonAnimeCon, setSelectedButtonAnimeCon] = useState<string | null>(null);
  const [selectedButtonHighRatedOnHold, setSelectedButtonHighRatedOnHold] = useState<string | null>(null);



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
          {/* <span className="sr-only">Loading...</span> */}
        </div>
        <p className="mt-2 text-center">Loading...</p>
      </div>
    );
  }

  if (showFinalPage) {
      return <FinalPage />;
    }

    return (
      <div className="content">
  
          {showLowestRatedQuestion && (
              <div className="question-container">
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
                  <div className="button-group">
                      <button  
                          className={selectedButtonLowestRated === 'yes_first' ? 'button-selected' : (selectedButtonLowestRated ? 'button-unselected' : 'button-normal')} 
                          onClick={() => { setSelectedButtonLowestRated('yes_first'); handleYesFirst(); }}>
                          Yes
                      </button>
                      <button 
                          className={selectedButtonLowestRated === 'no_first' ? 'button-selected' : (selectedButtonLowestRated ? 'button-unselected' : 'button-normal')} 
                          onClick={() => { setSelectedButtonLowestRated('no_first'); handleNoFirst(); }}>
                          No
                      </button>
                  </div>
              </div>
          )}
  
          {showYesIronicComponent && (
              <div className="question-container">
                  <p className="mb-4">Like Ironically?</p>
              </div>
          )}
  
          {showUOkayQuestion && (
              <div className="">
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
                  <div className="button-group">
                      <button 
                          className={selectedButtonUOkay === 'yes_uokay' ? 'button-selected' : (selectedButtonUOkay ? 'button-unselected' : 'button-normal')} 
                          onClick={() => { setSelectedButtonUOkay('yes_uokay'); handleYesUOkay(); }}>
                          Yea why?
                      </button>
                      <button 
                          className={selectedButtonUOkay === 'no_uokay' ? 'button-selected' : (selectedButtonUOkay ? 'button-unselected' : 'button-normal')} 
                          onClick={() => { setSelectedButtonUOkay('no_uokay'); handleNoUOkay(); }}>
                          Not really
                      </button>
                  </div>
              </div>
          )}{showYesOkComponent && (
            <div className="question-container">
                <p className="mb-4">no reason...</p>
            </div>
        )}

        {showNoOkComponent && (
            <div className="question-container">
                <p className="mb-4">listen im just a </p>
            </div>
        )}

        {showFMKChoices && (
            <div className="">
                <p className="mb-4">of course . . . <br /> now quick choose Fuck Marry Kill</p>
                <div className="fmk-container">

                    <div>
                        {/* <img src="./character1.png" alt="character1" /> */}
                        <button 
                          className={selectedButtonFMK1 === 'fuck1' ? 'button-selected' : (selectedButtonFMK1 ? 'button-unselected' : 'button-normal')} 
                          onClick={() => { setSelectedButtonFMK1('fuck1'); handleFMKChoiceForCharacter1('Fuck'); }}>
                            Fuck
                        </button>
                        <button 
                          className={selectedButtonFMK1 === 'marry1' ? 'button-selected' : (selectedButtonFMK1 ? 'button-unselected' : 'button-normal')} 
                          onClick={() => { setSelectedButtonFMK1('marry1'); handleFMKChoiceForCharacter1('Marry'); }}>
                            Marry
                        </button>
                        <button 
                          className={selectedButtonFMK1 === 'kill1' ? 'button-selected' : (selectedButtonFMK1 ? 'button-unselected' : 'button-normal')} 
                          onClick={() => { setSelectedButtonFMK1('kill1'); handleFMKChoiceForCharacter1('Kill'); }}>
                            Kill
                        </button>
                    </div>

                    <div>
                        {/* <img src="./character2.png" alt="character2" /> */}
                        <button 
                          className={selectedButtonFMK2 === 'fuck2' ? 'button-selected' : (selectedButtonFMK2 ? 'button-unselected' : 'button-normal')} 
                          onClick={() => { setSelectedButtonFMK2('fuck2'); handleFMKChoiceForCharacter2('Fuck'); }}>
                            Fuck
                        </button>            
                        <button 
                          className={selectedButtonFMK2 === 'marry2' ? 'button-selected' : (selectedButtonFMK2 ? 'button-unselected' : 'button-normal')} 
                          onClick={() => { setSelectedButtonFMK2('marry2'); handleFMKChoiceForCharacter2('Marry'); }}>
                            Marry
                        </button>            
                        <button 
                          className={selectedButtonFMK2 === 'kill2' ? 'button-selected' : (selectedButtonFMK2 ? 'button-unselected' : 'button-normal')} 
                          onClick={() => { setSelectedButtonFMK2('kill2'); handleFMKChoiceForCharacter2('Kill'); }}>
                            Kill
                        </button>
                    </div>

                    <div>
                        {/* <img src="./character3.png" alt="character3" /> */}
                        <button 
                          className={selectedButtonFMK3 === 'fuck3' ? 'button-selected' : (selectedButtonFMK3 ? 'button-unselected' : 'button-normal')} 
                          onClick={() => { setSelectedButtonFMK3('fuck3'); handleFMKChoiceForCharacter3('Fuck'); }}>
                            Fuck
                        </button>
                        <button 
                          className={selectedButtonFMK3 === 'marry3' ? 'button-selected' : (selectedButtonFMK3 ? 'button-unselected' : 'button-normal')} 
                          onClick={() => { setSelectedButtonFMK3('marry3'); handleFMKChoiceForCharacter3('Marry'); }}>
                            Marry
                        </button>
                        <button 
                          className={selectedButtonFMK3 === 'kill3' ? 'button-selected' : (selectedButtonFMK3 ? 'button-unselected' : 'button-normal')} 
                          onClick={() => { setSelectedButtonFMK3('kill3'); handleFMKChoiceForCharacter3('Kill'); }}>
                            Kill
                        </button>
                    </div>

                </div>
            </div>
        )}


          {showAnimeConQuestion && (
              <div className="question-container">
                  <p>Oh you <br />Have you been to anime con?</p>
                  <div className="button-group"> 
                      <button 
                          className={selectedButtonAnimeCon === 'yes_animecon' ? 'button-selected' : (selectedButtonAnimeCon ? 'button-unselected' : 'button-normal')} 
                          onClick={() => { setSelectedButtonAnimeCon('yes_animecon'); handleAnimeConAnswer(); }}>
                          Yea
                      </button>
                      <button 
                          className={selectedButtonAnimeCon === 'no_animecon' ? 'button-selected' : (selectedButtonAnimeCon ? 'button-unselected' : 'button-normal')} 
                          onClick={() => { setSelectedButtonAnimeCon('no_animecon'); handleAnimeConAnswer(); }}>
                          No
                      </button>
                  </div>
              </div>
          )}

          {showHighRatedOnHoldQuestion && (
              <div className="question-container">
                  <p>clearly <br />You should really finish {data['Highest rated on hold'] ? data['Highest rated on hold'].toString() : '(highest rated on hold)'} you know... <br/>Did you get to the part where (spoil something about show with LLM)?</p>
                  <div className="button-group"> 
                      <button 
                          className={selectedButtonHighRatedOnHold === 'yes_highrated' ? 'button-selected' : (selectedButtonHighRatedOnHold ? 'button-unselected' : 'button-normal')} 
                          onClick={() => { setSelectedButtonHighRatedOnHold('yes_highrated'); handleHighRatedOnHoldResponse(true); }}>
                          Yea
                      </button>
                      <button 
                          className={selectedButtonHighRatedOnHold === 'no_highrated' ? 'button-selected' : (selectedButtonHighRatedOnHold ? 'button-unselected' : 'button-normal')} 
                          onClick={() => { setSelectedButtonHighRatedOnHold('no_highrated'); handleHighRatedOnHoldResponse(false); }}>
                          No
                      </button>
                  </div>
              </div>
          )}


        {didWatchHighRatedPart === true && (
            <div className="question-container">
                <p>And that didn’t keep you watching? Wow</p>
            </div>
        )}

        {didWatchHighRatedPart === false && (
            <div className="question-container">
                <p>Oh... my bad...</p>
            </div>
        )}

        {showFinalScore && (
            <div className="question-container">
                <p>Well this is interesting <br /> let's get to your final score</p>
            </div>
        )}

    </div>
);
}

export default UserDataDisplay;
