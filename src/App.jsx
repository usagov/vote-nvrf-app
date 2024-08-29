import { useState, useEffect } from 'react'
import Eligibility from 'Views/Eligibility.jsx';
import PathSelection from 'Views/PathSelection.jsx';
import MultiStepForm from 'Views/MultiStepForm.jsx';
import {fetchData, fetchStaticData, sanitizeDOM} from 'Utils/JsonHelper.jsx';
import { HelmetProvider } from "react-helmet-async";
import {getFieldValue} from "Utils/fieldParser.jsx";

const currentStateId = document.getElementById('root').getAttribute('data-stateId');
const returnPath = document.getElementById('root').getAttribute('data-returnPath');
const privacyPath = document.getElementById('root').getAttribute('data-privacyPath');

function App() {
  const [states, setStates] = useState('');
  const [content, setContent] = useState('');
  const [navContent, setNavContent] = useState('');
  const [cards, setCards] = useState('');
  const [fieldContent, setFieldContent] = useState('')
  const [stringContent, setStringContent] = useState('')

  useEffect(() => {
    fetchData("states.json", setStates);
    fetchData("pages.json", setContent);
    fetchData("cards.json", setCards);
    fetchData("fields.json", setFieldContent);
    fetchStaticData("navigation.json", setNavContent);
    fetchStaticData("strings.json", setStringContent)
  }, []);

  useEffect(() => {
    getSelectedState(currentStateId);
  }, [states]);

  const [step, setStep] = useState(1);
  const [selectedState, setSelectedState] = useState('');
  const [stateData, setStateData] = useState('');
  const [registrationPath, setRegistrationPath] = useState('');
  const [formStep, setFormStep] = useState(1);

  const lastUpdatedSanitized = sanitizeDOM(stateData.nvrf_last_updated_date);
  const lastUpdatedText = (stringContent.lastUpdated);
  const scrollToTop = document.getElementById('scroll-to-top');

  //Confirm eligibility checkbox controls
  const [hasConfirmed, setHasConfirmed] = useState(null);
  const confirmCheckbox = (checkStatus) => {
      setHasConfirmed(checkStatus);
  }

  const setStepFocus = () => {
    scrollToTop.focus();
    scrollToTop.scrollIntoView({ behavior: "instant"});
  }

  const handleNext = () => {
    step != 3 && setStep(step + 1);
    setStepFocus();
  }

  const handlePrev = () => {
    step != 1 && setStep(step - 1);
    setStepFocus();
  }

  const getSelectedState = (selectedState) => {
    if (selectedState != "") {
      for (var i = 0; i < states.length; i++){
        if (states[i].abbrev == selectedState.toLowerCase()){
          setSelectedState(states[i].name);
          setStateData(states[i]);
        }
      }
    } else {
      setStateData('')
    }
    // reset eligibility requirement selections for when user has gone back after completing it and changed state selection
    setHasConfirmed(null)
  }


  const getRegPath = (pathSelection) => {
    setRegistrationPath(pathSelection)
  };

  const getFormStep = (step) => {
    formStep === 4 ? null : setFormStep(step + 1);
  };

  // Only render the markup if the data is loaded.
  if (states && cards && content && navContent && fieldContent && stringContent) {
    // Get NVRF footer card
    const cardFooter = cards.find(item => item.uuid === "5922e06c-ac2f-475d-ab10-abfdeb65de43");

    const statesList = []
    for (let i = 0; i < states.length; i++) {
      let stateName = states[i].name;
      statesList.push(stateName);
    }

    return (
        <HelmetProvider>
          <section>
            <a name="scroll-to-top"
               id="scroll-to-top"
               tabIndex={-1}
               style={{
                 outline: "0 none",
                 display: "block",
                 scrollMargin: "20px"
               }}
            ></a>
            {step === 1 &&
                <Eligibility
                    handleNext={handleNext}
                    handlePrev={handlePrev}
                    state={selectedState}
                    stateData={stateData}
                    content={content}
                    navContent={navContent}
                    stringContent={stringContent}
                    fieldContent={fieldContent}
                    hasConfirmed={hasConfirmed}
                    confirmCheckbox={confirmCheckbox}
                    returnPath={returnPath}
                />}
            {step === 2 &&
                <PathSelection
                    handleNext={handleNext}
                    handlePrev={handlePrev}
                    stateData={stateData}
                    content={content}
                    navContent={navContent}
                    cards={cards}
                    registrationPath={registrationPath}
                    getRegPath={getRegPath}
                    stringContent={stringContent}
                    getFormStep={getFormStep}
                />}
            {step === 3 &&
                <MultiStepForm
                    handlePrev={handlePrev}
                    statesList={statesList}
                    state={selectedState}
                    stateData={stateData}
                    content={content}
                    navContent={navContent}
                    fieldContent={fieldContent}
                    registrationPath={registrationPath}
                    getFormStep={getFormStep}
                    stringContent={stringContent}
                />}

              {step >= 1 &&
                <div className="text-base margin-top-5 maxw-tablet margin-x-auto">
                  <p>
                    {lastUpdatedText.replace("@state_name", stateData.name)}
                    <span dangerouslySetInnerHTML={{__html: lastUpdatedSanitized}}/>
                  </p>
                  {cardFooter && (
                      <div dangerouslySetInnerHTML={{__html: sanitizeDOM(cardFooter.body)}}></div>
                  )}
                </div>
              }
          </section>
        </HelmetProvider>
    )
  }
}

export default App;