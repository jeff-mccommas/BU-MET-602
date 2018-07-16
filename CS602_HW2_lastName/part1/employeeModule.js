const us = require("underscore");
var data = [{
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
var maxId = us.max(us.pluck(data, "id"));
function getUserObj(firstName, lastName) {
  //returning new employee object
  return {
      id: ++maxId, //Incrementting current maxId by 1
      firstName: firstName,
      lastName: lastName
  };
}

module.exports = {
    // Need EmployeeId to look for
    lookupByID: id => us.findWhere(data, {id: id}),
    // Need Employees lastName to look for
    lookupByLastName: lastname => us.where(data, {lastName: lastname}),
    //Need firstName and lastName of employee to add it to employees array
    addEmployee: (firstName, lastName) => {
        //If firstName and lastName is provided then push it to Employees i.e. data array
        if (firstName && lastName) {
          data.push(getUserObj(firstName, lastName));
        }
        return maxId;
    }
 };
