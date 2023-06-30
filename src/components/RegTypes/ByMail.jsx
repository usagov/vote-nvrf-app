import { Button, Radio } from '@trussworks/react-uswds';

function ByMail(props) {

    return (
        <>
        <h1>Here’s what you need to know about voting in {props.state}</h1>
        <h2>Eligibility requirements</h2>
        <p>To register in {props.state} you must:</p>
        <ul style={{ listStyleType:'disc' }}>
            <li>be a citizen of the United States</li>
            <li>be a resident of {props.state} and the municipality in which you want to vote</li>
            <li>be at least 17 years old (you must be 18 years old to vote) </li>
        </ul>

        <h2>Voter registration deadlines</h2>
        <ul style={{ listStyleType:'disc' }}>
            <li>Register by mail deadline: Must be received 21 days before Election Day</li>
            <li>In person registration deadline: Available up to and including on Election Day</li>
        </ul>

        <h2>Mail-in registration form</h2>
        <p>Online registration is currently not available. {props.state} residents may fill out the National Voter Registration Form here on Vote.gov, then print and mail in your application.</p> 
        
        <p>I am a U.S citizen </p>
        <form>
        <Radio id="yes-citizen" name="input-radio" label="Yes" onClick={e => props.handleRadio(e.target.id)}/>
        <Radio id="no-citizen" name="input-radio" label="No" onClick={e => props.handleRadio(e.target.id)} />            
        </form>

        I will be at least 18 years old by any election 
        <form>
        <Radio id="yes-age" name="input-radio" label="Yes" onClick={e => props.handleRadio(e.target.id)} />
        <Radio id="no-age" name="input-radio" label="No" onClick={e => props.handleRadio(e.target.id)} />            
        </form>

        <div className="button-container" style={{ margin:'20px' }}>
            <Button type="button" onClick={props.handleNext} disabled={props.buttonDisabled ? false : true}>
            Start your mail-in registration on Vote.gov
            </Button>
        </div>
        </>
    );
}

export default ByMail;