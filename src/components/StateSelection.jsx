import { useState, useEffect } from 'react'
import { Dropdown } from '@trussworks/react-uswds';
import { checkForErrors } from './HelperFunctions/ValidateField';
import NextButton from './NextButton';
import { getFieldError, getFieldLabel } from './HelperFunctions/fieldParser';
import DOMPurify from "dompurify";

function StateSelection(props) {
    const content = props.content;
    const navContent = props.navContent;
    const statesList = props.statesList;
    const fields = props.fieldContent;

    const [handleErrors, setHandleErrors] = useState({
        state_selected: false
    });

    if (content && navContent) {
        const introContent = content.find(item => item.uuid === "e3461b9a-e0b1-4157-ad4a-13f3835a101c");
        const introContentBody = DOMPurify.sanitize(introContent.body);
        const introContentBodyParts = introContentBody.split('@state_selector');
        return (
        <>
            <h1>{introContent.title}</h1>
            <div className="usa-prose" dangerouslySetInnerHTML= {{__html: introContentBodyParts[0]}}/>

            <form onSubmit={(e) => {props.handleSubmit(e), props.handleNext()}}>
            <div className="grid-row padding-y-2">
                <div className="tablet:grid-col-1">
                    <h4>{getFieldLabel(fields, "7231330d-523b-4e22-b282-b9f98ee20ef2")}</h4>
                </div>

                <div className="tablet:grid-col-4">
                    <div className={handleErrors.state_selected ? 'error-container' : ''}>
                        <Dropdown
                            id="state-dropdown"
                            className="margin-top-2"
                            name="input-dropdown"
                            value={props.state}
                            required={true}
                            onChange={e => {
                                props.getSelectedState(e.target.value)
                            }}
                            onBlur={(e) => setHandleErrors({ state_selected: checkForErrors(e, 'check state selection') })}
                            >
                            <option value="">{"Select your state or territory"}</option>
                            {statesList.map(
                            state => <option key={state} value={state}>{state}</option>
                        )}
                        </Dropdown>
                        {handleErrors.state_selected &&
                            <span id="state-dropdown-error" role="alert" className='error-text'>
                                {getFieldError(fields, "7231330d-523b-4e22-b282-b9f98ee20ef2")}
                            </span>
                        }
                    </div>
                </div>
            </div>
            <div className="usa-prose" dangerouslySetInnerHTML= {{__html: introContentBodyParts[1]}}/>

            <NextButton type={'submit'} text={navContent.next.next}/>

            </form>
        </>
        );
    }
}

export default StateSelection;