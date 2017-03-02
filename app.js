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
		userDir: process.env.OPENSHIFT_DATA_DIR,
		nodesDir: process.env.OPENSHIFT_DATA_DIR,
		flowFile: "Flows.json",
    httpAdminRoot:"/",
    httpNodeRoot: "/api",
		adminAuth: {
			 type: "credentials",
				users: [{
						username: "Masoud",
						password: "$2a$08$0NAscLH2.JnFmpB8YsG5UOPCnjMsLorMakB0vWfpB.BfpUdcjqs.u",
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
