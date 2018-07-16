const net = require("net");
var colors = require("colors");
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
const readMessage = (client) => {
    rl.question("\nEnter Command: ",  (line) => {
            client.write(line);
            if (line == "bye") {
                client.end();
            }
    });
};

const client = net.connect({port:3000},
	() => {
        console.log("Connected to server" .white);
        readMessage(client);
	});

client.on('end', () => {
	console.log("Client disconnected...");
});
client.on('error', () => {
	readMessage(client);
});

client.on('data', data => {
    console.log("...Received:" .blue, data.toString() .blue);
    readMessage(client);
});
