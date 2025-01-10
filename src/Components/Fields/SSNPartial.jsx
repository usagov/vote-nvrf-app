import React from "react";
import FieldContainer from 'Components/FieldContainer';
import {getField} from "Utils/fieldParser";

function SSNPartial(props) {
  const uuid = "1e030197-52e7-426e-923c-b67ef521ae3b";
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
      maxLength: 4,
      minLength: 4,
      check: 'check value length',
    }} saveFieldData={props.saveFieldData} fieldData={props.fieldData}/>
  )
}

export default SSNPartial;