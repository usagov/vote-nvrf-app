import FieldContainer from 'Components/FieldContainer';
import {getField} from "Utils/fieldParser";

function CurrentApartmentNumber(props) {
  const uuid = "deba9b54-68ad-4ef1-8fb5-ee34e4ab8a49";
  const field = getField(props.fieldContent, uuid);
  const stateField = getField(props.stateData.nvrf_fields, field.uuid);

  return (
    <FieldContainer
      fieldType={'text'} inputData={{
      id: field.nvrf_id,
      dataTest: 'aptNumber',
      required: stateField.required,
      label: field.label,
      error_msg: field.error_msg,
      help_text: field.help_text,
    }} saveFieldData={props.saveFieldData} fieldData={props.fieldData}/>
  )
}

export default CurrentApartmentNumber;