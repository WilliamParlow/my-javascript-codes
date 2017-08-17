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
      octaDiv.value = 0;
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

  decimalString = octaToDecimal();
  decimalToBinary(decimalString);

}

// Transform Octal value to Hexadecimal
function octaToHexa() {

  decimalString = octaToDecimal();
  decimalToHexa(decimalString);

}