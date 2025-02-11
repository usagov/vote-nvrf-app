import {Checkbox, Form, Fieldset} from '@trussworks/react-uswds';
import NextButton from "Components/Buttons/NextButton";
import {getFieldLabel, getFieldError} from 'Utils/fieldParser';
import {renderToStaticMarkup} from "react-dom/server";
import {sanitizeDOM} from "Utils/JsonHelper";
import {focusError, toggleError} from 'Utils/ValidateField';

function Eligibility(props) {
  let content = props.content;
  const stateContent = props.stateData;
  const step = props.step;
  const fields = props.fieldContent;
  const returnPath = props.returnPath;

  content = content.find(item => item.uuid === "94eab1c9-8343-4747-94b4-08732a175614");
  const eligibility = fields.find(item => item.uuid === "39fc63ad-ed5a-4ad5-98d3-aa236c96c61c");
  const contentBody = sanitizeDOM(content.body);
  const contentBodyParts = contentBody.split("@reg_confirm_eligibility");
  const eligibilityInstructions = sanitizeDOM(eligibility.instructions);

  //Analytics values - do not change or translate
  const analyticsLabels = {
    eligibilityTitle: "Before you get started page",
  }

  const mailDeadline = () => (
    <ul>
      <li
        dangerouslySetInnerHTML={{__html: stateContent.postmarked_mail_deadline || stateContent.received_mail_deadline}}/>
    </ul>
  );

  return (
    <>
      {returnPath && (
        <a href={returnPath}
           className={'usa-button usa-button--outline maxw-mobile-lg width-full tablet:width-auto'}>
          <span>{step.back_button_label}</span>
        </a>
      )
      }
      <div className={'margin-top-5 maxw-tablet margin-x-auto'}>
        <h1>{content.title.replace("@state_name", stateContent.name)}</h1>

        <div className={'margin-top-5'} dangerouslySetInnerHTML={{
          __html: contentBodyParts[0].replace("@state_name", stateContent.name)
            .replace("@reg_eligibility_desc", stateContent.reg_eligibility_desc)
        }}/>

        <Form id="eligibility" autoComplete="off" className={'margin-top-2'}
              style={{maxWidth: 'none'}}
              onSubmit={(e) => {
                e.preventDefault(), props.handleNext(),
                  dataLayer.push({
                    'NVRF_page_title': analyticsLabels.eligibilityTitle,
                    'event': 'NVRF_STEP_SUBMIT'
                  })
              }}>
          <div className="input-parent" data-test="checkBox">
            <Fieldset className="fieldset"
                      onBlur={(e) => toggleError(e, !props.hasConfirmed)}>
              <legend className={'margin-top-1'}>
                <strong>{eligibility.name}</strong>
              </legend>
              <Checkbox
                id="eligibility-checkbox"
                name="eligibility-checkbox"
                value="eligibility-checkbox"
                label={getFieldLabel(fields, "39fc63ad-ed5a-4ad5-98d3-aa236c96c61c")}
                aria-required="true"
                aria-describedby="eligibility-checkbox_error"
                required={true}
                defaultChecked={props.hasConfirmed}
                onChange={(e) => props.confirmCheckbox(e.target.checked)}
                onInvalid={(e) => e.target.setCustomValidity(' ')}
                onInput={(e) => e.target.setCustomValidity('')}
              />
              <span id="eligibility-checkbox_error" role="alert"
                    className='vote-error-text' data-test="errorText">
                        {getFieldError(fields, "39fc63ad-ed5a-4ad5-98d3-aa236c96c61c")}
                    </span>
            </Fieldset>
          </div>
          <div className={'margin-top-2'}
               dangerouslySetInnerHTML={{__html: eligibilityInstructions}}/>


          <div className={'margin-top-5'} dangerouslySetInnerHTML=
            {{__html: contentBodyParts[1].replace("@state_name", stateContent.name).replace("@mail_deadline", renderToStaticMarkup(mailDeadline()))}}/>

          <NextButton type={'submit'}
                      onClick={(e) => focusError('eligibility')}
                      text={step.next_button_label}/>
        </Form>
      </div>
    </>
  );
}

export default Eligibility;