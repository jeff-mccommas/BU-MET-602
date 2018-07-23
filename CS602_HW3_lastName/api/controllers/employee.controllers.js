/*global console, require, module, express */
var mongoose = require("mongoose");
var Employee = mongoose.model("Employee");

module.exports.employeeGetAll = function(req, res) {
    "use strict";
    console.log("GET the employee");
    Employee
        .find()
        .exec(function(err, employees) {
            if (err) {
                console.log("Error finding contacts");
                res
                    .status(500)
                    .json(err);
            } else {
                console.log("Found contacts", employees.length);
                    res.render("employeeList", {data: employees});
            }
        });
};

module.exports.employeeGetOne = function(req, res) {
    "use strict";
    var id = req.params.employeeId;

    console.log("GET employeeId", id);

    Employee
        .findById(id)
        .exec(function(err, doc) {
            var response = {
                status: 200,
                message: doc
            };
            if (err) {
                console.log("Error finding contact");
                response.status = 500;
                response.message = err;
            } else if (!doc) {
                console.log("ContactId not found in database", id);
                response.status = 404;
                response.message = {
                    "message": "Contact ID not found " + id
                };
            }
            res.render("employee", {data: doc, id: req.params.employeeId});
        });

};

module.exports.employeeAddOne = function(req, res) {
    "use strict";
    console.log("POST new Employee");
    var employeeCreateObj = {
        firstName: req.body.firstName,
        lastName: req.body.lastName
    };
    Employee
        .create(employeeCreateObj, function(err, contact) {
            if (err) {
                console.log("Error creating employee");
                res
                    .status(400)
                    .json(err);
            } else {
                console.log("employee created!", contact);
                    res.redirect("/employee/" + contact._id);
            }
        });

};


module.exports.employeeUpdateOne = function(req, res) {
    var employeeId = req.params.employeeId;
    Employee.update({
        _id: employeeId
    }, {
        $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName
        }
    }, function(err, emp) {
        if (err) {
            res
                .status(404)
                .json(err);
        } else {
            console.log("Employee updates, id:", employeeId);
            res.redirect("/employee");
        }
    });
};
module.exports.employeeDeleteOne = function(req, res) {
    "use strict";
    var employeeId = req.params.employeeId;
    Employee
        .findByIdAndRemove(employeeId)
        .exec(function(err) {
            if (err) {
                res
                    .status(404)
                    .json(err);
            } else {
                console.log("Employee deleted, id:", employeeId);
                res.redirect("/employee");
            }
        });
};
module.exports.renderAddEmployee = function (req, res) {
    "use strict";
    console.log("asdasdasds");
    res.render('newEmployee');
};
module.exports.renderEditEmployee = function (req, res) {
    "use strict";
    var id = req.params.employeeId;
    Employee
        .findById(id)
        .exec(function(err, doc) {
            var response = {
                status: 200,
                message: doc
            };
            if (err) {
                console.log("Error finding contact");
                response.status = 500;
                response.message = err;
            } else if (!doc) {
                console.log("ContactId not found in database", id);
                response.status = 404;
                response.message = {
                    "message": "Contact ID not found " + id
                };
            }
            res.render("editEmployee", {data: doc, id: req.params.employeeId});
        });
};