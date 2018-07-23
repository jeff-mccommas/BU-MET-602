/*global console, require, module, express */
var express = require("express");
var router = express.Router();

var ctrlEmployee = require("../controllers/employee.controllers.js");
router.get('/', function(req, res, next) {
    res.redirect('/employee');
  });
router
    .route("/employee")
    .get(ctrlEmployee.employeeGetAll);
router
    .route("/addEmployee")
    .get(ctrlEmployee.renderAddEmployee)
    .post(ctrlEmployee.employeeAddOne);
router
    .route("/editEmployee/:employeeId")
    .get(ctrlEmployee.renderEditEmployee)
    .post(ctrlEmployee.employeeUpdateOne);

router
    .route("/employee/:employeeId")
    .get(ctrlEmployee.employeeGetOne);
router
    .route("/employeedelete/:employeeId")
    .get(ctrlEmployee.employeeDeleteOne);


module.exports = router;