import React from "react";
import FieldContainer from 'Components/FieldContainer';
import {getField} from "Utils/fieldParser";

function DriversLicenseNumber(props) {
  const uuid = "acd7f272-7a37-43f0-b51a-c78daf31e5fd";
  const field = getField(props.fieldContent, uuid);
  const stateField = getField(props.stateData.nvrf_fields, field.uuid);

  return (
    <FieldContainer
      fieldType={'text'} inputData={{
      id: field.nvrf_id,
      dataTest: 'driverId',
      label: field.label,
      required: stateField.required,
      error_msg: field.error_msg,
      help_text: field.help_text,
    }} saveFieldData={props.saveFieldData} fieldData={props.fieldData}/>
  )
}

export default DriversLicenseNumber;