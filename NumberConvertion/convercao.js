/**
 * GLOBAL VARS
 */

var binaryDiv = document.getElementById('binary'),
  octaDiv = document.getElementById('octa'),
  hexaDiv = document.getElementById('hexa'),
  decimalDiv = document.getElementById('dec'),
  changeBaseField = document.getElementById('changeBaseField'),
  userInput = document.getElementById('userInput');

var basePrefix = changeBaseField.value;




/**
 * INIT FUNCTION
 */

(function() {

  /* Field events binding */ 

  // User select base event binding
  changeBaseField.onchange = function() {
    basePrefix = this.value;
  }

  // User input event binding


})()