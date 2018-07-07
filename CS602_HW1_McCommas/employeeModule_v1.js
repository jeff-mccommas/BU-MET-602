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
function getUserObj(firstName, lastName) {
  //returning new employee object
  return {
      id: ++maxId, //Incrementting current maxId by 1
      firstName: firstName,
      lastName: lastName
  };
}
//Calculating maxId of employee initially
var maxId = Math.max.apply(Math,data.map(function(o){return o.id;}));

module.exports = {
    // Need EmployeeId to look for
    lookupByID: id => {
        "use strict";
        //By default result is undefined
        var result;
        if (id) {
            data.filter(function (item) {
                //Matching item.id
                if (item.id === id) {
                    result = item;
                }
            });
        }
        return result;
    },
    // Need Employees lastName to look for
    lookupByLastName: lastname => {
        "use strict";
        //By default result is empty array
        var result = [];
        if (lastname) {
            data.filter(item => {
                //Matching item.lastname and pushing it to result
                if (item.lastName === lastname) {
                    result.push(item);
                }
            });
        }
        return result;
    },
    //Need firstName and lastName of employee to add it to employees array
    addEmployee: (firstName, lastName) => {
        //If firstName and lastName is provided then push it to Employees i.e. data array
        if (firstName && lastName) {
          data.push(getUserObj(firstName, lastName));
        }
    }
 };
