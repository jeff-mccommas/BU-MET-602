const us = require('underscore')
var data = [
    {id:1, firstName:'John', lastName:'Smith'},
    {id:2, firstName:'Jane', lastName:'Smith'},
    {id:3, firstName:'John', lastName:'Doe'},
];
exports.lookupByID = function (given_id) {
    var found_id = us.findWhere(data, {id:given_id});
    return found_id;
    console.log(found_id)
};
exports.lookupByLastName = function (given_lastName) {
    var found_lastName = us.findWhere(data, {id:given_lastName});
    return found_lastName;
    console.log(found_lastName)
};
// exports.addEmployee = function (given_id) {
//     var found_id = us.findWhere(data, {id:given_id});
//     return found_id
