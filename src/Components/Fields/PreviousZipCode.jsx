import React from "react";
import FieldContainer from 'Components/FieldContainer';
import {getField} from "Utils/fieldParser";

function PreviousZipCode(props) {
  const uuid = "49a90983-1925-438f-8271-88f39bf19bf1";
  const field = getField(props.fieldContent, uuid);
  const stateField = getField(props.stateData.nvrf_fields, field.uuid);

  return (
    <FieldContainer
      fieldType={'text'} inputData={{
      id: field.nvrf_id,
      dataTest: 'prevZip',
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

export default PreviousZipCode;