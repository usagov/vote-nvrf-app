import { useState, useEffect } from 'react'
import { Dropdown } from '@trussworks/react-uswds';
import { checkForErrors } from './HelperFunctions/ValidateField';
import NextButton from './NextButton';
import DOMPurify from "dompurify";

function StateSelection(props) {
    const content = props.content;
    const navContent = props.navContent;

    const statesList = []
    for (let i = 0; i < props.states.length; i++) {
        let stateName = props.states[i].name;
        statesList.push(stateName);
    };

    const [handleErrors, setHandleErrors] = useState({
        state_selected: false
    });

    if (content && navContent) {
        const introContent = content.find(item => item.uuid === "e3461b9a-e0b1-4157-ad4a-13f3835a101c");
        const introContentBody = DOMPurify.sanitize(introContent.body);
        return (
        <>
            <h1>{introContent.title}</h1>
            <div className="usa-prose" dangerouslySetInnerHTML= {{__html: introContentBody}}/>

            <form onSubmit={(e) => {props.handleSubmit(e), props.handleNext()}}>

            <div className="grid-row padding-top-3 flex-align-center">
                <div className="grid-col-auto margin-right-2">
                    <h4 className={'margin-0'}>{"I live in: "}</h4>
                </div>

                <div className="grid-col">
                    <div className={handleErrors.state_selected ? 'error-container maxw-mobile' : 'maxw-mobile'}>
                        <Dropdown
                            id="state-dropdown"
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
                                {content.error_state_dropdown}
                            </span>
                        }
                    </div>
                </div>
            </div>

            <NextButton type={'submit'} text={navContent.next.next}/>

            </form>
        </>
        );
    }
}

export default StateSelection;