const EventEmitter = require('events').EventEmitter;
const us = require("underscore");
class EmployeeEmitter extends EventEmitter {
    constructor(args) {
        super();
        this.data = args;
        this.maxId = us.max(us.pluck(this.data, "id"));
    }
}

EmployeeEmitter.prototype.lookupByID = function(id) {
    this.emit('lookupByID', id);
    return us.findWhere(this.data, {
        id: id
    });
};
EmployeeEmitter.prototype.lookupByLastName = function(lastname) {
    this.emit('lookupByLastName', lastname);
    return us.where(this.data, {
        lastName: lastname
    });
};
EmployeeEmitter.prototype.addEmployee = function(firstName, lastName) {
    this.emit('addEmployee', [firstName, lastName]);
    //If firstName and lastName is provided then push it to Employees i.e. data array
    if (firstName && lastName) {
        this.data.push({
            id: ++this.maxId, //Incrementting current maxId by 1
            firstName: firstName,
            lastName: lastName
        });
    }
};
module.exports = EmployeeEmitter;
