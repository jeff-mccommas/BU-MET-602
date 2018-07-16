var express = require('express');
var bodyParser = require("body-parser");
var handlebars = require('express-handlebars');
var app = express();
var employeeModule = require("./employeeModule");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// static resources
app.use(express.static(__dirname + '/public'));

// setup handlebars view engine
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
// GET request to the homepage
app.get('/', function(req, res) {
	res.render('home');
});

app.get('/id/:id', function(req, res) {
	var responseData = employeeModule.lookupByID(parseInt(req.params.id));
	res.format({'application/json': function() {
		res.json(responseData);
	},

	'application/xml': function() {
		var employeesXml = 
			'<?xml version="1.0"?>\n' +
			' <employee id="' + responseData.id + '">' + 
					'<firstName>' + responseData.firstName + '</firstName>'+
					'<lastName>' + responseData.lastName + '</lastName>'+
					 '</employee>' + '\n';
		res.type('application/xml');
		res.send(employeesXml);
	},
	'text/html': function() {
		res.render("employee", {data: responseData, id: req.params.id});
		
	},
	'default': function() {
		res.status(404);
		res.send("<b>404 - Not Found</b>");
	}
});
});
app.get('/lastName/:name', function(req, res) {
	var responseData = employeeModule.lookupByLastName(req.params.name);
	res.format({'application/json': function() {
			res.json(responseData);
		},

		'application/xml': function() {
			var employeesXml = 
				'<?xml version="1.0"?>\n<employees>\n' +
				responseData.map(function(employee){
						return ' <employee id="' + employee.id + '">' + 
						'<firstName>' + employee.firstName + '</firstName>'+
						'<lastName>' + employee.lastName + '</lastName>'+
						 '</employee>';
					}).join('\n') + '\n</employees>\n';
			res.type('application/xml');
			res.send(employeesXml);
		},

		'text/html': function() {
			res.render("employeeList", {data: responseData, lastname: req.params.name});
			
		},

		'default': function() {
			res.status(404);
			res.send("<b>404 - Not Found</b>");
		}
	});
});
app.get('/addEmployee', function(req, res) {
	res.render('newEmployee');
});
app.post('/addEmployee', function(req, res) {
	var responseData = employeeModule.addEmployee(req.body.firstName, req.body.lastName);
	res.redirect("/lastName/" + req.body.lastName);
});

app.use(function(req, res) {
	res.type('text/html');
	res.status(404);
	res.send("<b>404 - Not Found</b>");
});

app.listen(3000, function(){
  console.log('http://localhost:3000');
});

