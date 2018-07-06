const employeeFunctions = require("./employeeModule");
var id_2_answer = employeeFunctions.lookupByID(2);
id_2_answer.firstName = 'Mary'
console.log(employeeFunctions.lookupByID(2))