import { Dropdown } from '@trussworks/react-uswds';

function StateSelector(props) {
    const statesList = props.statesList;
    const stringContent = props.stringContent
    
    return (
        <>
        <Dropdown 
            id="state" 
            className={props.classes}
            name="input-dropdown" 
            value={props.state} 
            aria-describedby={props.ariaDescribedBy}
            onChange={props.saveState} 
            disabled={props.disabled} 
            // required={true}
            aria-required={true}
            onBlur={props.onBlur}
        >
        <option value="">{stringContent.select}</option>
            {statesList.map(
            state => <option key={state} value={state}>{state}</option>
        )}
        </Dropdown>
        </>
    );
}

export default StateSelector;