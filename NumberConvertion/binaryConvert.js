
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
    decimalDiv.value = ''

    return;

  } else {
    len = binaryVal.length;
    buildDecimalVal(len);

    decimalDiv.value = decimalString;

  }

  return decimalString;

}


// Convert a binary number to Octal
function binaryToOcta() {

  octalString = binaryToDecimal();
  decimalToOctal(octalString);

}


// Convert a binary number to Hexadecimal
function binaryToHexa() {

  hexaString = binaryToDecimal();
  decimalToHexa(hexaString);

}


