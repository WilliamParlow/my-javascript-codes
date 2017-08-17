
// Convert a binary number to decimal
function binaryToDecimal() {

  decimalString = 0;

  function buildDecimalVal(len) {

    if (len <= 0) {
      return;

    } else {

      if (binaryVal.charAt(len - 1) == 1) {
        decimalString += Math.pow(2, len - 1)
      }

      buildDecimalVal(len - 1);
    }

  }

  let binaryVal = String(userInput.value).split('').reverse().join('');

  if (binaryVal == 0) {
    decimalDiv.value = 0;

    return;

  } else {
    len = binaryVal.length;
    buildDecimalVal(len);

    decimalDiv.value = decimalString;

  }

  return decimalString;

}


// Convert a binary number to decimal
function binaryToOcta() {

  decimalString = binaryToDecimal();
  decimalToOctal(decimalString);

}


// Convert a binary number to decimal
function binaryToHexa() {

  decimalString = binaryToDecimal();
  decimalToHexa(decimalString);

}


