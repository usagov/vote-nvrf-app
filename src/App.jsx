import {useState, useEffect} from 'react'
import Eligibility from 'Views/Eligibility.jsx';
import PathSelection from 'Views/PathSelection.jsx';
import MultiStepForm from 'Views/MultiStepForm.jsx';
import {fetchData, fetchStateData, sanitizeDOM} from 'Utils/JsonHelper.jsx';
import {HelmetProvider} from "react-helmet-async";
import loadPdf from './Utils/pdfLoader';
import {Alert} from "@trussworks/react-uswds";
import './VoteError.css';
import './VoteTouchpoints.css';


const currentStateId = document.getElementById('root').getAttribute('data-stateId');
const returnPath = document.getElementById('root').getAttribute('data-returnPath');

function App() {
  const [states, setStates] = useState('');
  const [content, setContent] = useState('');
  const [cards, setCards] = useState('');
  const [fieldContent, setFieldContent] = useState('');
  const [stringContent, setStringContent] = useState('');
  const [stateData, setStateData] = useState('');

  const [error, setError] = useState(null);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [form, setForm] = useState(null);

  useEffect(() => {
    loadPdf().then(({pdfDoc, form}) => {
      setPdfDoc(pdfDoc);
      setForm(form);
    }).catch(() => setError(true));
  }, []);

  useEffect(() => {
    fetchStateData(currentStateId, setStateData, setError);
    fetchData("states.json", setStates, setError);
    fetchData("pages.json", setContent, setError);
    fetchData("cards.json", setCards, setError);
    fetchData("fields.json", setFieldContent, setError);
    fetchData("strings.json", setStringContent, setError);
  }, []);

  const [step, setStep] = useState(1);
  const [registrationPath, setRegistrationPath] = useState('');
  const [formStep, setFormStep] = useState(1);

  const scrollToTop = document.getElementById('scroll-to-top');

  //Confirm eligibility checkbox controls
  const [hasConfirmed, setHasConfirmed] = useState(null);
  const confirmCheckbox = (checkStatus) => {
    setHasConfirmed(checkStatus);
  }

  const setStepFocus = () => {
    scrollToTop.focus();
    scrollToTop.scrollIntoView({behavior: "instant"});
  }

  const handleNext = () => {
    step != 3 && setStep(step + 1);
    setStepFocus();
  }

  const handlePrev = () => {
    step != 1 && setStep(step - 1);
    setStepFocus();
    if (step === 2) {
      // reset eligibility requirement selections for when user has gone back after completing it and changed state selection
      setHasConfirmed(null)
    }
  }

  const getRegPath = (pathSelection) => {
    setRegistrationPath(pathSelection)
  };

  const getFormStep = (step) => {
    formStep === 4 ? null : setFormStep(step + 1);
  };

  // If the fetch for content or pdf fails display an error message.
  if (error) {
    return <div>
      <Alert type="error" heading="Error" headingLevel="h1">
        <p>The form filler tool failed to load.</p>
      </Alert>
      <p>
        <button className={'usa-button'}
                onClick={() => window.location.reload()}>Try loading the tool
          again
        </button>
      </p>
      <p>If you were unable to use our form filler tool, <a
        href="https://touchpoints.app.cloud.gov/touchpoints/c169d3b2/submit"
        target="_blank">submit feedback</a>.</p>
    </div>;
  }
  // Only render the markup if the data is loaded.
  if (stateData && cards && content && fieldContent && stringContent) {
    // Get string content
    const strings = stringContent.find(item => item.uuid === "6f8bb721-f017-4fcc-a826-dfc93c6759b7");
    const lastUpdatedSanitized = sanitizeDOM(stateData[0].nvrf_last_updated_date);

    const steps = strings.step.reduce((acc, item) => {
      acc[item.step_id] = {
        label: item.step_label,
        back_button_label: item.back_button_label,
        next_button_label: item.next_button_label
      }
      return acc;
    }, {});

    // Get NVRF footer card
    const cardFooter = cards.find(item => item.uuid === "5922e06c-ac2f-475d-ab10-abfdeb65de43");

    const statesList = []
    for (let i = 0; i < states.length; i++) {
      let stateName = states[i].name;
      statesList.push(stateName);
    }

    return (
      <main>
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
                stateData={stateData[0]}
                content={content}
                step={steps.eligibility}
                fieldContent={fieldContent}
                hasConfirmed={hasConfirmed}
                confirmCheckbox={confirmCheckbox}
                returnPath={returnPath}
              />}
            {step === 2 &&
              <PathSelection
                handleNext={handleNext}
                handlePrev={handlePrev}
                stateData={stateData[0]}
                content={content}
                cards={cards}
                registrationPath={registrationPath}
                getRegPath={getRegPath}
                step={steps.reg_options}
                getFormStep={getFormStep}
              />}
            {step === 3 &&
              <MultiStepForm
                handlePrev={handlePrev}
                statesList={statesList}
                stateData={stateData[0]}
                content={content}
                fieldContent={fieldContent}
                registrationPath={registrationPath}
                getFormStep={getFormStep}
                strings={strings}
                steps={steps}
                pdfDoc={pdfDoc}
                form={form}
              />}

            {step >= 1 &&
              <div className="text-base margin-top-5 maxw-tablet margin-x-auto">
                {cardFooter && (
                  <div
                    dangerouslySetInnerHTML={{__html: sanitizeDOM(cardFooter.body.replace("@state_name", stateData[0].name).replace("@date", lastUpdatedSanitized))}}></div>
                )}
              </div>
            }
          </section>
        </HelmetProvider>
      </main>
    )
  }
}

export default App;