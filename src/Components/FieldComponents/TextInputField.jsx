import React from "react";
import { TextInput } from '@trussworks/react-uswds';
import { restrictType, checkForErrors, toggleError } from 'Utils/ValidateField';

function TextInputField({ inputData, saveFieldData, fieldData }){
    return (
        <TextInput
        data-test={inputData.dataTest}
        id={inputData.id}
        className="radius-md"
        aria-describedby={`${inputData.id}` + '_error'}
        name={inputData.id}
        type="text"
        autoComplete="off"
        required={parseInt(inputData.required)}
        minLength={inputData.minLength}
        maxLength={inputData.maxLength}
        inputMode="numeric"
        value={fieldData[inputData.id]}
        onChange={saveFieldData(inputData.id)}
        onKeyDown={(e) => restrictType(e, inputData.inputType)}
        onBlur={(e) => toggleError(e, checkForErrors(e, 'check value exists'))}
        onInvalid={(e) => e.target.setCustomValidity(' ')}
        onInput={(e) => e.target.setCustomValidity('')}
        />
    )
}

export default TextInputField;