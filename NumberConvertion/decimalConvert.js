

// Tranform Decimal value to binary String
function decimalToBinary(externalVal = undefined) {

  function buildBinString(value) {

    if (value <= 0) {
      return;

    } else {
      let pot = Math.floor(Math.log2(value));
      binaryString = binaryString.replaceAt((len - pot - 1), '1');
      buildBinString(value - Math.pow(2, pot));
    }

  }

  let decimalValue = (externalVal) ? Number(externalVal) : Number(userInput.value);

  if (decimalValue == 0) {
    binaryDiv.value = 0;

  } else {
    binaryString = "";

    len = Math.ceil(Math.log2(decimalValue));

    for (let i = 0; i < len; i++) {
      binaryString = binaryString.concat("0");
    }

    buildBinString(decimalValue);

    binaryDiv.value = binaryString;


  }

}



// Transform decimal value to Octal value
function decimalToOctal(externalVal = undefined) {

  octalString = "";

  function buildOctalString(value) {

    if (value < 8) {
      octalString += value;
      return;

    } else {
      let result = Math.trunc(Number(value) / 8);
      let rest = Math.trunc(Number(value) % 8);
      octalString += rest;
      buildOctalString(result);
    }

  }

  let decimalValue = (externalVal) ? String(externalVal) : String(userInput.value);

  if (decimalValue == 0) {
    octaDiv.value = 0;
    return;

  } else {

    buildOctalString(decimalValue);

    octaDiv.value = octalString.split('').reverse().join('');
  }

}




// Transform decimal to Hexa value
function decimalToHexa(externalVal = undefined) {

  hexaString = '';

  function buildHexaString(value) {

    if (value <= 15) {
      let rest = Math.round(Math.ceil(value % 16));
      hexaString = hexaString.concat(hexaVals[`${rest}`]);
      return;

    } else {
      let rest = Math.round(Math.ceil(value % 16));
      hexaString = hexaString.concat(hexaVals[`${rest}`]);
      buildHexaString(Math.trunc(value / 16));
    }

  }

  let decimalValue = (externalVal) ? Number(externalVal) : Number(userInput.value);

  if (decimalValue <= 0) {
    hexaDiv.value = 0;
    return;

  } else {
    buildHexaString(decimalValue);
    hexaString = hexaString.split('').reverse().join('');
    hexaDiv.value = hexaString;
  }

}