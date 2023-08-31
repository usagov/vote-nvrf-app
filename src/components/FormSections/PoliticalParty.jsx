import React, { useState } from "react";
import { Label, TextInput, Button } from '@trussworks/react-uswds';
import content from "../../data/registration-form.json";
import { restrictType, checkForErrors } from '../HelperFunctions/ValidateField';
import validationStyles from "../../styles/ValidationStyles.module.css";

function PoliticalParty(props){
    const stateFieldRequirements = props.stateData.fields_required;
    const stateFieldVisible = props.stateData.fields_visible;
    const stateInstructions = props.stateData.state_field_instructions;

    const partyVisible = stateFieldVisible.party;
    const partyReq = stateFieldRequirements.party

    const [handleErrors, setHandleErrors] = useState({ 
        party_choice: false
    })

    return (
        <>
        <Button
            type="button"
            onClick={props.handlePrev}>
            Back to identification
        </Button>
        <h2>{content.political_party_heading}</h2>
        <div className="usa-alert usa-alert--info">
            <div className="usa-alert__body">
                <p>{content.party_text}</p>
                <p>{stateInstructions.party_text}</p>
            </div>
        </div>

        {partyVisible && (
            <div className={validationStyles[(partyReq && handleErrors.party_choice) && 'error-container']}>
                <Label htmlFor="political-party">
                Choice of party{partyReq && <span className={validationStyles['required-text']}>*</span>}
                <TextInput 
                    id="political-party"
                    aria-describedby="party-chioce-error" 
                    name="political party" 
                    value={props.fieldData.party_choice} 
                    type="text" 
                    autoComplete="off" 
                    required={partyReq}
                    onChange={props.saveFieldData('party_choice')} 
                    onKeyDown={(e) => restrictType(e, 'letters')}
                    onBlur={(e) => setHandleErrors({ ...handleErrors, party_choice: checkForErrors(e, 'check value exists') })}
                />
                {(partyReq && handleErrors.party_choice) && 
                    <span id="party-chioce-error" role="alert" className={validationStyles['error-text']}>
                        Choice of party must be filled out.
                    </span>
                }
                </Label>
            </div>
        )}

        <Button type="submit">
            Confirm your information
        </Button>
        </>
    );
}

export default PoliticalParty;