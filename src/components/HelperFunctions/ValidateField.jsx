export const jumpTo = (e, nextId) => {
  const isNumber = /^[0-9]$/i.test(e.key)
  if (isNumber) {
    if (e.target.value.length == e.target.maxLength) {
      document.getElementById(nextId).focus();
    }
  }
}

export const restrictType = (e, requiredType) => {
  let allowKeys = ['Backspace', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'Tab']
  let letters = /^[A-Za-z\s]*$/;

  if (allowKeys.includes(e.key)) {
    return;
  } else if (requiredType === 'letters' && !e.key.match(letters) ) {
    e.preventDefault();
    return;
  } else if (requiredType === 'number' && isNaN(e.key)) {
    e.preventDefault();
    return;
  }
}

export const dateFormat = (e, name, setFieldData, fieldData) => {
  if (e.target.value.length === 1 ) {
    let newValue = 0 + e.target.value;
  setFieldData({ ...fieldData, [name]: newValue })
  } else if (e.target.value.length === 0 ) {
  setFieldData({ ...fieldData, [name]: '' })
  } else {
      return
  }
}

export const phoneFormat=(input)=>{//returns (###) ###-####
    input = input.replace(/\D/g,'');
    var size = input.length;
    if (size>0) {input="("+input}
    if (size>3) {input=input.slice(0,4)+") "+input.slice(4,11)}
    if (size>6) {input=input.slice(0,9)+"-" +input.slice(9)}
    return input;
}

export const dayFormat = (input) => {
  var date = new Date('Jan' + input + ', 2023');
  var dateDoubleDigit = String(date.getDate()).padStart(2, '0');
  return dateDoubleDigit;
}

export const checkForErrors=(e, requirement)=> {
  switch (requirement) {
    case 'check value exists':
      if (e.target.value) {
        return false
      } else {
        return true
      }

    case 'check value length':
      if (e.target.value.length === e.target.maxLength) {
        return false
      } else {
        return true
      }

    case 'check state selection':
      if (e.target.value === '') {
        return true
      } else {
        return false
      }

    default:
      return
  }
}