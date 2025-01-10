import React from "react";
import FieldContainer from 'Components/FieldContainer';
import {getField} from "Utils/fieldParser";

function SSNFull(props) {
  const uuid = "fe8cf91e-f872-4ed7-848c-09c99a7d83c8";
  const field = getField(props.fieldContent, uuid);
  const stateField = getField(props.stateData.nvrf_fields, field.uuid);

  return (
    <FieldContainer
      fieldType={'text'} inputData={{
      id: field.nvrf_id,
      dataTest: 'ssn',
      label: field.label,
      required: stateField.required,
      error_msg: field.error_msg,
      help_text: field.help_text,
      type: 'numeric',
      inputMode: 'number',
      maxLength: 9,
      minLength: 9,
      check: 'check value length',
    }} saveFieldData={props.saveFieldData} fieldData={props.fieldData}/>
  )
}

export default SSNFull;