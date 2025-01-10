import React from "react";
import FieldContainer from 'Components/FieldContainer';
import {getField} from "Utils/fieldParser";

function CurrentZipCode(props) {
  const uuid = "cdb06542-0cbd-4aa3-897f-83377b8d65e5";
  const field = getField(props.fieldContent, uuid);
  const stateField = getField(props.stateData.nvrf_fields, field.uuid);

  return (
    <FieldContainer
      fieldType={'text'} inputData={{
      id: field.nvrf_id,
      dataTest: 'zip',
      required: stateField.required,
      label: field.label,
      minLength: 5,
      maxLength: 5,
      inputMode: 'number',
      error_msg: field.error_msg,
      help_text: field.help_text,
    }} saveFieldData={props.saveFieldData} fieldData={props.fieldData}/>
  )
}

export default CurrentZipCode;