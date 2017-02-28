var http = require('http');
var express = require("express");
var RED = require("node-red");


// Create an Express app
var app = express();

// Add a simple route for static content served from 'public'
app.use("/",express.static("public"));

// Create a server
var server = http.createServer(app);

// Create the settings object - see default settings.js file for other options
var settings = {
		nodesDir:process.env.OPENSHIFT_DATA_DIR,
    httpAdminRoot:"/",
    httpNodeRoot: "/api",
		userDir: process.env.OPENSHIFT_DATA_DIR,
		adminAuth: {
			 type: "credentials",
				users: [{
						username: "Masoud",
						password: "$2a$08$d/wxc5geBzndNMiObBqaj.sgVxH.9SvCDMg/3xrcVg8VwkPuoTCli",
						permissions: "*"
				}]
		},
    uiPort: 8080,
    functionGlobalContext: { }    // enables global context
};

// Initialise the runtime with a server and settings
RED.init(server,settings);

// Serve the editor UI from /red
app.use(settings.httpAdminRoot,RED.httpAdmin);

// Serve the http nodes UI from /api
app.use(settings.httpNodeRoot,RED.httpNode);

server.listen(8080);

// Start the runtime
RED.start();
