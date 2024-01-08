import { useState } from 'react'
import { Dropdown } from '@trussworks/react-uswds';
import { checkForErrors } from './HelperFunctions/ValidateField';
import NextButton from './NextButton';
import { getFieldError, getFieldLabel } from './HelperFunctions/fieldParser';
import DOMPurify from "dompurify";
import FieldContainer from './FieldContainer';

function StateSelection(props) {
    const content = props.content;
    const navContent = props.navContent;
    const statesList = props.statesList;
    const fields = props.fieldContent;

    const introContent = content.find(item => item.uuid === "e3461b9a-e0b1-4157-ad4a-13f3835a101c");
    const introContentBody = DOMPurify.sanitize(introContent.body);
    const introContentBodyParts = introContentBody.split('@state_selector');

    const [handleErrors, setHandleErrors] = useState({
        state_selected: false
    });

    const stateSelectionField = 
        <Dropdown
            id="state-dropdown"
            name="input-dropdown"
            aria-describedby="state-dropdown-error"
            value={props.state}
            required={true}
            onChange={e => {
                props.getSelectedState(e.target.value)
            }}
            onBlur={(e) => setHandleErrors({ state_selected: checkForErrors(e, 'check state selection') })}>
            <option value="">{"Select your state or territory"}</option>
            {statesList.map(
                state => <option key={state} value={state}>{state}</option>
            )}
        </Dropdown>

    return (
        <>
            <h1>{introContent.title}</h1>
            <div className="usa-prose" dangerouslySetInnerHTML= {{__html: introContentBodyParts[0]}}/>

            <form onSubmit={(e) => {props.handleSubmit(e), props.handleNext()}}>
                <div className="grid-row padding-top-3 flex-align-center">
                    <div className="grid-col-auto margin-right-2">
                        <h4 className={'margin-0'}>{getFieldLabel(fields, "7231330d-523b-4e22-b282-b9f98ee20ef2")}</h4>
                    </div>
                    <div className="grid-col">
                        <FieldContainer 
                          inputField={stateSelectionField}
                          htmlFor="state-dropdown"
                          classes={'maxw-mobile'}
                          showError={handleErrors.state_selected}
                          errorId={"state-dropdown-error"}
                          errorMsg={getFieldError(fields, "7231330d-523b-4e22-b282-b9f98ee20ef2")}
                        />
                    </div>
                </div>
                <div className="usa-prose" dangerouslySetInnerHTML= {{__html: introContentBodyParts[1]}}/>

                <NextButton type={'submit'} text={navContent.next.reg_options}/>

            </form>
        </>
    );
}

export default StateSelection;