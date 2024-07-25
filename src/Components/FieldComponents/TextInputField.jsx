import React from "react";
import { TextInput } from '@trussworks/react-uswds';
import { checkForErrors, toggleError } from 'Utils/ValidateField';

function TextInputField({ inputData, saveFieldData, fieldData }){
    return (
        <TextInput
        data-test={inputData.dataTest}
        id={inputData.id}
        className="radius-md"
        aria-describedby={inputData.describedby || `${inputData.id}` + '_error'}
        name={inputData.id}
        type="text"
        autoComplete="off"
        required={parseInt(inputData.required)}
        minLength={inputData.minLength}
        maxLength={inputData.maxLength}
        value={fieldData[inputData.id]}
        onChange={saveFieldData(inputData.id)}
        onBlur={(e) => toggleError(e, checkForErrors(e, inputData.check || 'check value exists'))}
        onInvalid={(e) => {e.target.setCustomValidity(' '), inputData.pointToError && inputData.pointToError()}}
        onInput={(e) => {e.target.setCustomValidity(''), inputData.pointToHint && inputData.pointToHint()}}
        />
    )
}

export default TextInputField;