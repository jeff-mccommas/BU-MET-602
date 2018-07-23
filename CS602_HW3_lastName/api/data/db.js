/*global console, require, module, process, express */
var mongoose = require("mongoose");
var credentials = require("./credentials.js");
var dburl = 'mongodb://' + credentials.username + ':' + credentials.password + '@' + credentials.host + ':' + credentials.port + '/' + credentials.database;
var retry = null;
var connection = mongoose.connect(dburl);
var EmployeeRef = require('../data/employee.model.js');
var Employee = EmployeeRef.getModel(connection);
// CONNECTION EVENTS
function createInitialEmployees() {
    // Create only if not already created.
    Employee
        .find()
        .exec(function(err, employees) {
            if (err) {
                console.log("Error connecting employees collection");
            } else {
                if (employees.length === 0) {
                    var employee = new Employee({
                        firstName: "John",
                        lastName: "Smith"
                    });
                    employee.save(employee, function (err, employeeObj) {
                        console.log("Saved", employeeObj.firstName)
                    });
                    employee = new Employee({
                        firstName: "Jane",
                        lastName: "Smith"
                    });
                    employee.save(employee, function (err, employeeObj) {
                        console.log("Saved", employeeObj.firstName)
                    });
                    employee = new Employee({
                        firstName: "John",
                        lastName: "Doe"
                    }); 
                    employee.save(employee, function (err, employeeObj) {
                        console.log("Saved", employeeObj.firstName)
                    });
                }
            }
        });
}
mongoose.connection.on("connected", function () {
    "use strict";
    console.log("Mongoose connected to " + dburl);
    createInitialEmployees(); 
});

mongoose.connection.on("error", function (err) {
    "use strict";
    console.log("Mongoose connection error: " + err);
});
mongoose.connection.on("disconnected", function () {
    "use strict";
    console.log("Mongoose disconnected");
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
function gracefulShutdown(msg, callback) {
    "use strict";
    mongoose.connection.close(function () {
        console.log("Mongoose disconnected through " + msg);
        callback();
    });
}

// For nodemon restarts
process.once("SIGUSR2", function () {
    gracefulShutdown("nodemon restart", function () {
        process.kill(process.pid, "SIGUSR2");
    });
});
// For app termination
process.on("SIGINT", function() {
    gracefulShutdown("App termination (SIGINT)", function () {
        process.exit(0);
    });
});
// For Heroku app termination
process.on("SIGTERM", function () {
    gracefulShutdown("App termination (SIGTERM)", function () {
        process.exit(0);
    });
});