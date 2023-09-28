import { Button, Fieldset, Checkbox, Label } from '@trussworks/react-uswds';
import data from "../../data/state-selection.json";
import reactStringReplace from 'react-string-replace';

function EligibilityCheckboxes(props) {
    const content = data;
    const onlineContent = data.online;

    const downloadForm = reactStringReplace(content.download_form, '%link%', (match, i) => (
        <a href={props.downloadForm}>{content.download_form_link.replace("%state_name%", props.stateName)}</a>
      ));
      
    return (
        <>
        <form onSubmit={() => {props.handleNext()}}>
        <Fieldset legend="Eligibilty" legendStyle="srOnly">
            <div tabIndex={0} className={props.checkboxes.checkboxesValid && 'error-container'}>            
            <Label htmlFor="eligibility-error" id="eligibility-error">
                {content.heading_confirm}
            </Label>
                <div tabIndex={0} onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) props.checkBoxValues(); }}>
                    <Checkbox
                        id="citizen-checkbox"
                        name="eligibility-checkbox"
                        value="citizen-checkbox"
                        label={content.citizen_required}
                        aria-required="true"
                        required={true}
                        tabIndex={0}
                        checked={props.checkboxes.citizen}
                        onChange={(e) => props.handleCheckbox(e.target.checked, 'citizen', 0)}
                    />              
                    <Checkbox
                        id="age"
                        name="eligibility-checkbox"
                        value="age-checkbox"
                        label={content.age_required}
                        aria-required="true"
                        required={true}
                        tabIndex={0}
                        checked={props.checkboxes.age}
                        onChange={(e) => props.handleCheckbox(e.target.checked, 'age', 1)}
                    />
                </div>
            {props.checkboxes.checkboxesValid && 
                <span id="eligibility-error" rol="alert" className='error-text'>
                    Both boxes must be checked to continue.
                </span>
            }  
            </div>
        </Fieldset>

        <p>If you did not check all boxes above, do not continue with registration on Vote.gov.</p>

        <div className="button-container" style={{ margin:'20px' }}>
            <Button onClick={() => props.checkBoxValues()} type="submit">
            {onlineContent.start_button}
            </Button>
        </div>
        </form>

        <p>{downloadForm}</p>
        </>
    );
}

export default EligibilityCheckboxes;