/**
 * GLOBAL VARS
 */

let binaryDiv = document.getElementById('binary'),
  octaDiv = document.getElementById('octa'),
  hexaDiv = document.getElementById('hexa'),
  decimalDiv = document.getElementById('dec'),
  changeBaseField = document.getElementById('changeBaseField'),
  userInput = document.getElementById('userInput');

let basePrefix = changeBaseField.value;
let regExp = {"oct": /^[0-7]*$/, "dec": /^[0-9]*$/, "hex": /^[a-fA-F0-9]*$/, "bin": /^[0-1]*$/};

let hexaVals = { "0": 0, "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": "A", "11": "B", "12": "C", "13": "D", "14": "E", "15": "F" };

let binaryString;
let octalString;
let hexaString;
let decimalString;

let len;


/**
 * INIT FUNCTION
 */

(function () {

  // Add a char replace to String Object
  String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
  }

  /* Field events binding */

  // User select base event binding
  changeBaseField.onchange = function () {
    basePrefix = this.value;
    document.querySelectorAll('input').forEach(el => el.value = '')
    userInput.focus();
  }

  // User input event binding
  userInput.oninput = function () {

    validateUserInput(this);

    switch (basePrefix) {

      case 'dec':
        decimalToBinary();
        decimalToOctal();
        decimalToHexa();
        decimalDiv.value = userInput.value;
        break;

      case 'oct':
        octaToDecimal();
        octaToBinary();
        octaToHexa();
        octaDiv.value = userInput.value;
        break;

      case 'hex':
        hexaDiv.value = userInput.value;
        break;

      case 'bin':
        binaryToDecimal();
        binaryToHexa();
        binaryToOcta();
        binaryDiv.value = userInput.value;
        break;

    }

    userInput.focus();

  }

  function validateUserInput(input) {

    if (regExp[basePrefix].test(input.value)) {
      input.value = input.value.toUpperCase();

    } else {
      input.value = input.value.substr(0, input.value.length - 1, '');

    }

  }

})()