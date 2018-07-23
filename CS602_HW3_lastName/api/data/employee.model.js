
/*global console, require, module, express */
// var mongoose = require("mongoose");

// var employeeSchema = new mongoose.Schema({
//     firstName: {
//         type: String,
//         required: true
//     },
//     lastName: {
//         type: String,
//         required: true
//     }
// });

// mongoose.model("Employee", employeeSchema);

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var employeeSchema = new Schema({
	firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
});

module.exports = {
	getModel: function getModel(connection) {
		return connection.model("Employee", 
        employeeSchema);
	}
}
