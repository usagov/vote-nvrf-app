import { Form } from '@trussworks/react-uswds';
import React, { useState } from "react";
import ProgressBar from './ProgressBar';
import PersonalInfo from "./FormSections/PersonalInfo";
import Addresses from "./FormSections/Addresses"
import content from "../data/registration-form.json";
import Identification from './FormSections/Identification';
import Confirmation from './FormSections/Confirmation';
import Delivery from "./FormSections/Delivery";
import PoliticalParty from './FormSections/PoliticalParty';
import { phoneFormat, dayFormat } from './HelperFunctions/ValidateField';
import BackButton from './BackButton'
import NextButton from './NextButton';

function MultiStepForm(props) {
    //Field data controls
    const [fieldData, setFieldData] = useState({
        title:'', first_name: '', middle_name: '', last_name: '', suffix:'',
        prev_name_check: false, prev_title:'', prev_first_name: '', prev_middle_name: '', prev_last_name: '', prev_suffix:'',
        date_of_birth_month:'', date_of_birth_day:'', date_of_birth_year:'', phone_number:'',race:'',
        street_address:'', apt_num:'', city:'', state:'', zip_code:'',
        prev_address_check: false, prev_street_address:'', prev_apt_num:'', prev_city:'', prev_state:'', prev_zip_code:'',
        mail_address_check: false, mail_street_address:'', mail_apt_num:'', mail_city:'', mail_state:'', mail_zip_code:'',
        id_number:'', id_issue_date_month:'', id_issue_date_day:'', id_issue_date_year:'', id_expire_date_month:'', id_expire_date_day:'', id_expire_date_year:'',
        party_choice:'',
        email_address:'', sms_alert_phone_number:''});

    const saveFieldData = (name) => {
        const day_names = ['date_of_birth_day', 'id_issue_date_day', 'id_expire_date_day' ]
        
        return (event) => {
        if (name === 'phone_number') {
            setFieldData({ ...fieldData, [name]: phoneFormat(event.target.value) });
        } else if (day_names.includes(name)) {
            setFieldData({ ...fieldData, [name]: dayFormat(event.target.value) });
        } else {
            setFieldData({ ...fieldData, [name]: event.target.value });
        }
        };
    };

    //Multiple step NVRF controls
    const [step, setStep] = useState(1);
    const handleNext = () => {
        step != 6 && setStep(step + 1);
        step != 6 && document.getElementById('scroll-to-top').scrollIntoView();
      }

    const handlePrev = () => {
        console.log('click handleprev', step)
        step != 1 && setStep(step - 1);
        document.getElementById('scroll-to-top').scrollIntoView();

        step === 1 && props.handlePrev();
    }

    const handleSubmit = (e) => {
        e.preventDefault(e);
    }

    //Email and Print controls
    const [deliveryButtonSelected, setDeliveryButtonSelected] = useState('email')

    const handleClickDeliveryButton = (deliveryType) => {
        if (deliveryType === 'email') {
            setDeliveryButtonSelected('email')
        } else if (deliveryType === 'print') {
            setDeliveryButtonSelected('print')
        }
    }

    //Form Sections controls//
        //Personal Info
    const [previousName, setPreviousName] = useState(false);
    const onChangePreviousName = (e) => {
        setPreviousName(e.target.checked);
    }

        //Addresses
    const [hasNoAddress, setHasNoAddress] = useState(false);
    const hasNoAddressCheckbox = (e) => {
        setHasNoAddress(e.target.checked);
        //clear any address form data when check is true
        e.target.checked && setFieldData({
            ...fieldData,
            street_address:'', apt_num:'', city:'', state:'', zip_code:'',
            prev_address_check: false, prev_street_address:'', prev_apt_num:'', prev_city:'', prev_state:'', prev_zip_code:'',
            mail_address_check: false, mail_street_address:'', mail_apt_num:'', mail_city:'', mail_state:'', mail_zip_code:''
        })
    }

    const [hasPreviousAddress, setHasPreviousAddress] = useState(false);
    const onChangePreviousAddressCheckbox = (e) => {
        setHasPreviousAddress(e.target.checked);
    }

    const [previousAddress, setPreviousAddress] = useState("");
    const onChangePreviousAddress = (e) => {
        setPreviousAddress(e.target.value);
    }

    const [hasMailAddress, setHasMailAddress] = useState(false);
    const onChangeMailAddressCheckbox = (e) => {
        setHasMailAddress(e.target.checked);
    }

    const [mailAddress, setMailAddress] = useState("");
    const onChangeMailAddress = (e) => {
        setMailAddress(e.target.value);
    }

        //Identification
    const [idType, setIdType] = useState('')
    const saveIdType = (e) => {
        setIdType(e.target.value)
        e.target.value === 'none' ? 
            setFieldData({ 
                ...fieldData, 
                id_number: 'none', 
                id_issue_date_month:'', 
                id_issue_date_day:'', 
                id_issue_date_year:'', 
                id_expire_date_month:'', 
                id_expire_date_day:'', 
                id_expire_date_year:'' 
            }) 
            : 
            setFieldData({ ...fieldData, id_number: '' });
    }

        //Acknowledgment field controls
        const [hasAcknowledged, setHasAcknowledged] = useState(null);
        const [error, setError] = useState(null)
        const acknowledgeCheckbox = (checkStatus) => {
            setHasAcknowledged(checkStatus);
            setError(!checkStatus);
        }
    
        const checkboxValid = () => {
            (hasAcknowledged === null) && setError(true);
        }

    const backButtonText = (step) => {
        switch (step) {
        case 1:
            return content.back_btn.reg_options;
        case 2:
            return content.back_btn.personal_info;
        case 3:
            return content.back_btn.address_location;
        case 4:
            return content.back_btn.identification;
        case 5:
            return content.back_btn.edit_info;
        case 6:
            return 'back to ???';
        }
    }

    const nextButtonText = (step) => {
        switch (step) {
            case 1:
                return content.next_btn.address_location;
            case 2:
                return content.next_btn.identification;
            case 3:
                return content.next_btn.political_party;
            case 4:
                return content.next_btn.confirm_info;
            case 5:
                return content.next_btn.confirm_continue;
        }
    }

    return (
        <>
        {/* go back on step one exits form to last step */}
        <BackButton type={'button'} onClick={handlePrev} text={backButtonText(step)}/>
      
        <ProgressBar step={step}/>
        {step < 5 &&
        <div>
            <h1>{content.main_heading}: {props.stateData.name}</h1>
            <p><strong>{content.reminder}</strong>{content.reminder_text}</p>
        </div>
        }

        <Form autoComplete="off" style={{ maxWidth:'none' }} onSubmit={(e) => {handleSubmit(e), handleNext()}}>
            {step === 1 &&
                <PersonalInfo
                state={props.state}
                stateData={props.stateData}
                fieldData={fieldData}
                saveFieldData = {saveFieldData}
                registrationPath={props.registrationPath}
                previousName={previousName}
                onChangePreviousName={onChangePreviousName}
                handlePrev={props.handlePrev}
                />
            }
            {step === 2 &&
                <Addresses
                state={props.state}
                stateData={props.stateData}
                fieldData={fieldData}
                saveFieldData = {saveFieldData}
                registrationPath={props.registrationPath}
                handlePrev={handlePrev}
                hasNoAddress={hasNoAddress}
                hasNoAddressCheckbox={hasNoAddressCheckbox}
                hasPreviousAddress={hasPreviousAddress}
                onChangePreviousAddressCheckbox={onChangePreviousAddressCheckbox}
                previousAddress={previousAddress}
                onChangePreviousAddress={onChangePreviousAddress}
                hasMailAddress={hasMailAddress}
                onChangeMailAddressCheckbox={onChangeMailAddressCheckbox}
                mailAddress={mailAddress}
                onChangeMailAddress={onChangeMailAddress}
                />
            }
            {step === 3 &&
                <Identification
                state={props.state}
                stateData={props.stateData}
                fieldData={fieldData}
                saveFieldData = {saveFieldData}
                registrationPath={props.registrationPath}
                handlePrev={handlePrev}
                saveIdType={saveIdType}
                idType={idType}/>
            }
            {step === 4 &&
                <PoliticalParty
                state={props.state}
                stateData={props.stateData}
                fieldData={fieldData}
                saveFieldData = {saveFieldData}
                registrationPath={props.registrationPath}
                handlePrev={handlePrev}/>
            }
            {step === 5 &&
                <Confirmation
                state={props.state}
                stateData={props.stateData}
                fieldData={fieldData}
                saveFieldData = {saveFieldData}
                registrationPath={props.registrationPath}
                handlePrev={handlePrev}
                handleGoBackSteps={handleGoBackSteps}
                hasAcknowledged={hasAcknowledged}
                error={error}
                acknowledgeCheckbox={acknowledgeCheckbox}
                checkboxValid={checkboxValid}
                />
            }
            {step === 6 &&
                <Delivery
                state={props.state}
                stateData={props.stateData}
                fieldData={fieldData}
                saveFieldData = {saveFieldData}
                registrationPath={props.registrationPath}
                handlePrev={handlePrev}
                deliveryButtonSelected = {deliveryButtonSelected}
                handleClickDeliveryButton = {handleClickDeliveryButton}
                />
            }

        {step != 6 && <NextButton type={'submit'} onClick={step === 5 ? () => checkboxValid() : undefined} text={nextButtonText(step)}/>}
        </Form>
        </>
    );
}

export default MultiStepForm;