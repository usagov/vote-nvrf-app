import { Label, TextInput, Button } from '@trussworks/react-uswds';
import content from "../../data/registration-form.json";
import { restrictType } from './ValidateField';

function PoliticalParty(props){
    const stateFieldRequirements = props.stateData.fields_required;
    const stateFieldVisible = props.stateData.fields_visible;
    const stateInstructions = props.stateData.state_field_instructions;

    const partyVisible = stateFieldVisible.party;
    const partyReq = stateFieldRequirements.party

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
            <div>
                <Label htmlFor="political-party">Choice of party</Label>
                <TextInput 
                    id="political-party" 
                    name="political party" 
                    value={props.fieldData.party_choice} 
                    onChange={props.saveFieldData('party_choice')} 
                    onKeyDown={(e) => restrictType(e, 'letters')}
                    type="text" 
                    autoComplete="off" 
                    required={partyReq}/>
            </div>
        )}

        <Button type="submit">
            Confirm your information
        </Button>
        </>
    );
}

export default PoliticalParty;