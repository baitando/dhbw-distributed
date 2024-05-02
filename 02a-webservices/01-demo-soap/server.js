var soap = require('soap');
const http = require("http");
var serviceObject = {
    TodoService: {
        TodoPort: {
            GetTodo: function(args) {
                return {
                    title: 1
                };
            },
        }
    }
};

var xml = require('fs').readFileSync('test.wsdl', 'utf8');
var express = require('express');
var app = express();
var port = 8000;
app.listen(port, function () {
    console.log('Listening on port ' + port);
    var wsdl_path = "/soap";
    soap.listen(app, wsdl_path, serviceObject, xml);
    console.log("Check http://localhost:" + port + wsdl_path +"?wsdl to see if the service is working");
});