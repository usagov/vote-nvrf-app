import React from "react";
import { Label } from '@trussworks/react-uswds';
import TextInputField from './FieldComponents/TextInputField';
import SelectField from './FieldComponents/SelectField';

function FieldContainer({ fieldType, inputData, saveFieldData, fieldData }) {
  function renderField(fieldType) {
    switch (fieldType) {
      case 'text':
        return <TextInputField
          inputData={inputData}
          saveFieldData={saveFieldData}
          fieldData={fieldData} />;
      case 'select':
        return <SelectField
          inputData={inputData}
          saveFieldData={saveFieldData}
          fieldData={fieldData} />;
    }
  };

  return (
    <>
      <div className="input-parent">
        <Label className="text-bold" htmlFor={inputData.id}>
          {inputData.label}{(inputData.required === "1") && <span>*</span>}
        </Label>
        <span className="usa-hint" id={`${inputData.id} + '-hint'`}>
          {inputData.help_text}
        </span>
        {renderField(fieldType)}
        <span id={`${inputData.id}` + '_error'} role="alert" className={'error-text'} data-test="errorText">
          {inputData.error_msg}
        </span>
      </div>
    </>
  )
}

export default FieldContainer;