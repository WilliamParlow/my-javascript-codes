// Transform a hexadecimal number to decimal
function hexaToDecimal() {

  decimalString = 0;

  function buildDecimalString(index) {

    if (index < 0) {
      return;

    } else {
      let value = Number(Object.keys(hexaVals).find(key => hexaVals[key] == decimalValue.charAt(len - index)));
      console.log(`${value} * 16^${index}`)
      decimalString += Number(value * Math.pow(16, index));
      buildDecimalString(index - 1);
    }

  }

  let decimalValue = String(userInput.value);

  if (decimalValue == 0) {
    decimalDiv.value = ''
    return;

  } else {
    len = decimalValue.length - 1;
    buildDecimalString(len);

    decimalDiv.value = decimalString;
  }

  return decimalString;

}

// Transform a hexadecimal number to binary
function hexaToBinary() {

  binaryString = hexaToDecimal();
  decimalToBinary(binaryString);

}

// Transform a hexadecimal number to octal
function hexaToOctal() {

  octalString = hexaToDecimal();
  decimalToOctal(octalString);

}