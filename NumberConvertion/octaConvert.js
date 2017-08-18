// Transform Octal value to Decimal
function octaToDecimal() {
  
    decimalString = 0;
  
    function buidDecimalString(index) {
  
      if (index < 0) {
        return;
  
      } else {
        let valIndice = len - index;
        decimalString += Number(decimalValue.charAt(valIndice) * Math.pow(8, index));
        buidDecimalString(index - 1);
      }
  
    }
  
    let decimalValue = String(userInput.value);
  
    if (decimalValue == 0) {
      decimalDiv.value = '';
      return;
       
    } else {
      len = decimalValue.length - 1;
      buidDecimalString(len);
  
      decimalDiv.value = decimalString;
    }

    return decimalString;
  
}


// Transform Octal value to Binary
function octaToBinary() {

  binaryString = octaToDecimal();
  decimalToBinary(binaryString);

}

// Transform Octal value to Hexadecimal
function octaToHexa() {

  hexaString = octaToDecimal();
  decimalToHexa(hexaString);

}