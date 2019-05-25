
const app = require('./app');
const http = require('http');


// let env = process.env.NODE_ENV || 'development';
// console.log(`Server is running in ${env} mode`);
//This portion of code is required only for SSL/HTTPs requests to handle
const port = normalizePort(app.get("port") || '3000');
app.set('port', port);


const server = http.createServer(app).listen(app.get("port"), function () {
    console.log('http server is running at http://localhost:' + app.get("port"));
});

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }
    var bind = typeof app.get("port") === "string"
        ? "Pipe " + app.get("port")
        : "Port " + app.get("port");

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "ENOENT":
            console.error(bind + "directory not found");
            // process.exit(1);
            process.exit(error.code);
            break;
        case "ECONNREFUSED":
            console.error(bind + "connection refused by target");
            process.exit(error.code);
            break;
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(error.code);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(error.code);
            break;
        case "ETIMEDOUT":
            console.error(bind + "is taking so much time to response");
            process.exit(error.code);
        default:
            console.log("fired error")
            throw error;
    }
}
module.exports = server;