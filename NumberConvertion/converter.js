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
  }

  // User input event binding
  userInput.oninput = function () {

    switch (basePrefix) {

      case 'dec':
        decimalToBinary();
        decimalToOctal();
        decimalToHexa();
        decimalDiv.value = userInput.value;
        break;

      case 'oct':
        break;

      case 'hex':
        break;

      case 'bin':
        
        break;

    }

    userInput.focus;

  }

})()