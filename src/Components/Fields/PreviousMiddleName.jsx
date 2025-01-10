import React from "react";
import FieldContainer from 'Components/FieldContainer';
import {getField} from "Utils/fieldParser";

function PreviousMiddleName(props) {
  const uuid = "a4919026-91ac-4e05-a75f-e2df479abd76";
  const field = getField(props.fieldContent, uuid);
  const stateField = getField(props.stateData.nvrf_fields, field.uuid);

  return (
    <FieldContainer
      fieldType={'text'} inputData={{
      id: field.nvrf_id,
      dataTest: 'prevMiddleName',
      required: stateField.required,
      label: field.label,
      error_msg: field.error_msg,
      help_text: field.help_text,
    }} saveFieldData={props.saveFieldData} fieldData={props.fieldData}/>
  )
}

export default PreviousMiddleName;