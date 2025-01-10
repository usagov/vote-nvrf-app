import React from "react";
import FieldContainer from 'Components/FieldContainer';
import {getField} from "Utils/fieldParser";

function RaceEthnicity(props) {
  const uuid = "2bfff6c6-6782-4b14-ac45-642efd278f6a";
  const field = getField(props.fieldContent, uuid);
  const stateField = getField(props.stateData.nvrf_fields, field.uuid);
  return (
    <FieldContainer
      fieldType={'select'} inputData={{
      id: field.nvrf_id,
      dataTest: 'select',
      required: stateField.required,
      label: field.label,
      options: field.options,
      value: props.fieldData[field.nvrf_id],
      error_msg: field.error_msg,
    }} saveFieldData={props.saveFieldData} fieldData={props.fieldData}
      stringContent={props.stringContent}/>
  )
}

export default RaceEthnicity;