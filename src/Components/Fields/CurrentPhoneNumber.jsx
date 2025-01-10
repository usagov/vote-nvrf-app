import React from "react";
import FieldContainer from 'Components/FieldContainer';
import {getField} from "Utils/fieldParser";

function CurrentPhoneNumber(props) {
  const uuid = "2d61b54a-e568-410f-825a-0ca82dfd3f63";
  const field = getField(props.fieldContent, uuid);
  const stateField = getField(props.stateData.nvrf_fields, field.uuid);

  return (
    <FieldContainer
      fieldType={'text'} inputData={{
      id: field.nvrf_id,
      dataTest: 'phoneNumber',
      required: stateField.required,
      label: field.label,
      error_msg: field.error_msg,
      help_text: field.help_text,
      type: 'tel',
      maxLength: 14,
      minLength: 14,
      check: 'check value length',
    }} saveFieldData={props.saveFieldData} fieldData={props.fieldData}/>
  )
}

export default CurrentPhoneNumber;