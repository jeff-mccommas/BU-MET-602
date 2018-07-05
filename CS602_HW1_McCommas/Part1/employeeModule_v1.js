
var data = [
    {id: 1,FirstName:' John',LastName: 'Smith'},
    {id: 2,FirstName:'Jane',LastName:' Smith'},
    {id: 3, FirstName:"John",LastName:" Doe"}

]

module.exports.setFirstName =
    (value) => {
        data.firstName = value;
    };

module.exports.getFirstName =
    () => {


    };
console.log('hello')


exports.setLastName =
    (value) => {
        data.lastName = value;
    };

exports.getLastName =
    () => {
        return data.lastName;
    };

