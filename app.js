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
						username: "admin",
						password: "$2a$08$YprfdCCn.jl5D5WOfbqxMeq3hqGHwWIF1tg7dTV9YiBIAtg4Rkjxm",
						permissions: "*"
				}]
		},
	uiHost: process.env.OPENSHIFT_NODEJS_IP,
    uiPort: process.env.OPENSHIFT_NODEJS_PORT,
    functionGlobalContext: { }    // enables global context
};


if (typeof settings.uiPort       === "undefined") {
            //  Log errors on OpenShift but continue w/ 8000 
            console.warn('No OPENSHIFT_NODEJS_PORT var, using 8080');
			settings.uiPort       = "8080";
        };

if (typeof settings.uiHost === "undefined") {
            //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
            //  allows us to run/test the app locally.
            console.warn('No OPENSHIFT_NODEJS_IP var, using 0.0.0.0');
			settings.uiHost = "0.0.0.0";
        };


  if (typeof settings.userDir === "undefined") {
            console.warn('No OPENSHIFT_DATA_DIR var, using ./');
            settings.userDir = "./";
        };

// Initialise the runtime with a server and settings
RED.init(server,settings);

// Serve the editor UI from /red
app.use(settings.httpAdminRoot,RED.httpAdmin);

// Serve the http nodes UI from /api
app.use(settings.httpNodeRoot,RED.httpNode);

server.listen(settings.uiPort, settings.uiHost, function () {
  console.log( "Listening on " + settings.uiHost + ", port " + settings.uiPort )
});

// Start the runtime
RED.start();
