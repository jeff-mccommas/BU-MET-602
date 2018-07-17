const net = require('net');
var colors = require("colors");
var employeeModule = require("./employeeModule");
// Keep track of client connections
const clients = [];

const server = net.createServer(
	(socket) => {
        //Whenever new
        console.log("Client connection..." .red);
        function writeDataToSocket(value) {
            socket.write(value);
        }
        clients.push(socket);

        socket.on("end", () => {
            console.log("Client disconnected..." .red);
            var index = clients.indexOf(socket);
            console.log(index);
            if (index != -1) {
                clients.splice(index, 1);
            }
        });

        socket.on("data", (data) => {
            var receivedCommand = data.toString();
            console.log("...Received" .blue, receivedCommand .blue);
            receivedCommand = receivedCommand.split(" ");
            switch (receivedCommand[0]) {
            case "lookupByLastName":
                writeDataToSocket(JSON.stringify(employeeModule.lookupByLastName(receivedCommand[1])));
                break;
            case "addEmployee":
                writeDataToSocket(employeeModule.addEmployee(receivedCommand[1], receivedCommand[2]).toString());
                break;
            case "lookupById":
                var response = employeeModule.lookupByID(parseInt(receivedCommand[1]));
                if (!response) {
                    response = "No Data Found!!";
                }
                 writeDataToSocket(JSON.stringify(response));
                break;
            case "bye":
                writeDataToSocket("Invalid request");
                break; 
             default:
                writeDataToSocket("Invalid request");       
            }
        });
	});

server.listen(3000, function() {
	console.log("Listening for connections: 3000" .white);
});
















