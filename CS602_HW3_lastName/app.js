/*jslint browser:true */
/*global console, require, module, __dirname, server, express */
require("./api/data/db.js");
var express = require("express");
var cors = require("cors");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var handlebars = require('express-handlebars');
var routes = require("./api/routes");
// setup handlebars view engine
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
// Define the port to run on
app.set("port", 3000);
app.use(function (req, res, next) {
    "use strict";
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// Add middleware to console log every request
app.use(cors())
app.use(function (req, res, next) {
    "use strict";
    console.log(req.method, req.url);
    next();
});

// Set static directory before defining routes
app.use(express.static(path.join(__dirname, "public")));
app.use("/node_modules", express.static(__dirname + "/node_modules"));
// app.use("/fonts", express.static(__dirname + "/fonts"));

// Enable parsing of posted forms
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Add some routing
app.use("/", routes);

// Listen for requests
var server = app.listen(app.get("port"), function () {
    var port = server.address().port;
    console.log("Server running on port " + port);
});