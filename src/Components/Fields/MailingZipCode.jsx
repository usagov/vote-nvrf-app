import React from "react";
import FieldContainer from 'Components/FieldContainer';
import {getField} from "Utils/fieldParser";

function MailingZipCode(props) {
  const uuid = "c4f9c0cb-2a25-4f1d-a93a-b06a19656cfe";
  const field = getField(props.fieldContent, uuid);
  const stateField = getField(props.stateData.nvrf_fields, field.uuid);

  return (
    <FieldContainer
      fieldType={'text'} inputData={{
      id: field.nvrf_id,
      dataTest: 'mailZip',
      required: stateField.required,
      label: field.label,
      minLength: 5,
      maxLength: 5,
      inputType: 'number',
      error_msg: field.error_msg,
      help_text: field.help_text,
    }} saveFieldData={props.saveFieldData} fieldData={props.fieldData}/>
  )
}

export default MailingZipCode;