import React from "react";
import FieldsetContainer from 'Components/FieldsetContainer';
import {getField} from "Utils/fieldParser";

function CurrentDateOfBirth(props) {
  const uuid = "d31b2a64-36a9-4bc6-a9d1-e68d2be8c211";
  const field = getField(props.fieldContent, uuid);
  const stateField = getField(props.stateData.nvrf_fields, field.uuid);

  //Get month, day, year field data
  const uuid2 = "48149e7a-d049-4ab6-b7ed-4b3708016015";
  const field_month = getField(props.fieldContent, uuid2);
  const uuid3 = "40d2cc5b-24ca-4193-8b8f-f11d80e9cbe9";
  const field_day = getField(props.fieldContent, uuid3);
  const uuid4 = "b632e45d-6317-4d2d-94c5-b130ad50e027";
  const field_year = getField(props.fieldContent, uuid4);

  return (
    stateField && <FieldsetContainer
      fieldType={'date'} inputData={{
      id: field.nvrf_id,
      dataTest: 'dob',
      required: stateField.required,
      label: field.label,
      stringContent: props.stringContent,
      error_msg: field.error_msg,
      help_text: field.help_text,
      field_month: field_month,
      field_day: field_day,
      field_year: field_year,
    }} saveFieldData={props.saveFieldData} fieldData={props.fieldData}
      dateFormat={props.dateFormat}/>
  )
}

export default CurrentDateOfBirth;