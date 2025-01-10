import React from "react";
import FieldContainer from 'Components/FieldContainer';
import {getField} from "Utils/fieldParser";

function CurrentAddressState(props) {
  const uuid = "fe3a2a1d-34bd-472b-a843-3fa0635c4f40";
  const field = getField(props.fieldContent, uuid);
  const stateField = getField(props.stateData.nvrf_fields, field.uuid);
  const options = props.statesList.map(state => ({key: state, value: state}));

  return (
    <FieldContainer
      fieldType={'select'} inputData={{
      id: field.nvrf_id,
      dataTest: 'select',
      required: stateField.required,
      label: field.label,
      disabled: true,
      options: options,
      value: props.stateData.name,
      error_msg: field.error_msg,
      help_text: field.help_text,
    }} saveFieldData={props.saveFieldData} fieldData={props.fieldData}
      stringContent={props.stringContent}/>
  )
}

export default CurrentAddressState;