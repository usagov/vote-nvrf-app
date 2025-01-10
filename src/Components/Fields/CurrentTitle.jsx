import React from "react";
import FieldContainer from 'Components/FieldContainer';
import {getField} from "Utils/fieldParser";

function CurrentTitle(props) {
  const uuid = "86a544cd-cfe9-456a-b634-176a37a38d6d";
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
      error_msg: field.error_msg,
      help_text: field.help_text,
      value: props.fieldData[field.nvrf_id],
    }} saveFieldData={props.saveFieldData} fieldData={props.fieldData}
      stringContent={props.stringContent}/>
  )
}

export default CurrentTitle;

