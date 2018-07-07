
var colors = require("colors");
var testdata = [{
    id: 1,
    firstName: "John",
    lastName: "Smith"
}, {
    id: 2,
    firstName: "Jane",
    lastName: "Smith"
}, {
    id: 3,
    firstName: "John",
    lastName: "Doe"
}];
var EmployeeEmitter = require("./EmployeeEmitter");
const employeeModule = new EmployeeEmitter(testdata);
employeeModule.on('lookupByLastName', function (args) {
    console.log('Event lookupByLastName raised!' .blue,
    	args .blue);
});
employeeModule.on('lookupByID', function (args) {
    console.log('Event lookupByID raised!' .blue,
    	args);
});
employeeModule.on('addEmployee', function (args) {
    console.log('Event addEmployee raised!' .blue,
    	args.join(" ") .blue);
});
console.log("Lookup by last name(Smith)" .red);

console.log(employeeModule.lookupByLastName("Smith"));
console.log("\n");
console.log("Adding employee William Smith" .red);
employeeModule.addEmployee("William", "Smith")
console.log("\n");
console.log("Lookup by last name(Smith)" .red);
console.log(employeeModule.lookupByLastName("Smith"));
console.log("\n");
console.log("Lookup by id (2)" .red);
var output = employeeModule.lookupByID(2);
console.log(output);
