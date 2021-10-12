// Import Dependencies
var express = require("express");
var app = express();
var apiRoutes = require('./routes/api');
var morgan = require('morgan');

// Middleware
app.use(express.urlencoded({
    extended: true
}));

app.use(morgan('tiny'));

app.use(express.json());

// Endpoints (commands)
app.use('/api', apiRoutes);

// Serve Out App
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening on ", host, port);
});