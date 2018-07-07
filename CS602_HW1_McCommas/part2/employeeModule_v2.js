const employeeFunctions = require("./employeeModule");
var id_2_answer = employeeFunctions.lookupByID(2);
id_2_answer.firstName = 'Mary'
console.log(employeeFunctions.lookupByID(2))
var path = require('path');

var input = __filename;

console.log(path.dirname(input));

console.log(path.basename(input));

console.log(path.extname(input));