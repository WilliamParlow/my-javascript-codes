

// Tranform Decimal value to binary String
function decimalToBinary(externalVal=undefined) {

  function buildBinString(value) {

    if (value <= 0) {
      return;

    } else {
      let pot = Math.floor(Math.log2(value));
      binaryString = binaryString.replaceAt((len - pot - 1), '1');
      buildBinString(value - Math.pow(2, pot));
    }

  }

  let decimalValue = (externalVal) ? externalVal : Number(userInput.value);

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
function decimalToOctal(externalVal=undefined) {

  octalString = 0;

  function buildOctalString(index) {

    if (index < 0) {
      return;

    } else {
      let valIndice = len - index;
      octalString += Number(decimalValue.charAt(valIndice) * Math.pow(8, index));
      buildOctalString(index - 1);
    }

  }

  let decimalValue = (externalVal) ? String(externalVal) : String(userInput.value);

  if (decimalValue == 0) {
    octaDiv.value = 0;
    return;
     
  } else {
    len = decimalValue.length - 1;
    buildOctalString(len);

    octaDiv.value = octalString;
  }

}




// Transform decimal to Hexa value
function decimalToHexa(externalVal=undefined) {

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

  let decimalValue = (externalVal) ? externalVal : Number(userInput.value);

  if (decimalValue <= 0) {
    hexaDiv.value = 0;
    return;

  } else {
    buildHexaString(decimalValue);
    hexaString = hexaString.split('').reverse().join('');
    hexaDiv.value = hexaString;
  }

}