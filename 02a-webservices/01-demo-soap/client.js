const soap = require('soap');
const url = 'http://localhost:8000/soap?wsdl';

// Create client
soap.createClient(url, function (err, client) {
    if (err){
        throw err;
    }
    const args = {
        owner: "id1:12:34:56:out42"
    };
    // call the service
    client.GetTodo(args, function (err, res) {
        if (err)
            throw err;
        // print the service returned result
        console.log(res);
    });
});