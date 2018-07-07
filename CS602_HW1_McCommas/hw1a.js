
var colors = require("colors");
var employeeModule = require("./employeeModule_v1");
console.log("Lookup by last name(Smith) \n" .red, employeeModule.lookupByLastName("Smith"));
console.log("\n");
console.log("Adding employee William Smith \n" .red);
employeeModule.addEmployee("William", "Smith")
console.log("Lookup by last name(Smith) \n" .red, employeeModule.lookupByLastName("Smith"));
console.log("\n");
console.log("Lookup by id (2)" .red);
var output = employeeModule.lookupByID(2);
console.log(output);
console.log("\n");
console.log("Changing first name..." .red);
output.firstName = "Marry";
console.log("\n");
output = employeeModule.lookupByID(2);
console.log("Lookup by id (2) \n" .red, output);
console.log("\n");
console.log("Lookup by last name(Smith) \n" .red, employeeModule.lookupByLastName("Smith"));
