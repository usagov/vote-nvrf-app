import React from "react";
import FieldContainer from 'Components/FieldContainer';
import {getField} from "Utils/fieldParser";

function CurrentFirstName(props) {
  const uuid = "b7bdae35-e4be-4827-ae11-75d9c3e33bf0";
  const field = getField(props.fieldContent, uuid);
  const stateField = getField(props.stateData.nvrf_fields, field.uuid);

  return (
    <FieldContainer
      fieldType={'text'} inputData={{
      id: field.nvrf_id,
      dataTest: 'firstName',
      required: stateField.required,
      label: field.label,
      error_msg: field.error_msg,
      help_text: field.help_text,
    }} saveFieldData={props.saveFieldData} fieldData={props.fieldData}/>
  )
}

export default CurrentFirstName;