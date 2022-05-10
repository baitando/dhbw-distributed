var http = require("http");

var data = {
    items: [
        {
            id: "task-1",
            title: "Meine erste Aufgabe",
            notes: "Das ist die erste Aufgabe",
            due: "2022-04-30",
            responsible: "Max Mustermann"
        },
        {
            id: "task-2",
            title: "Das ist die zweite Aufgabe",
            notes: "Einfache eine weitere Aufgabe",
            due: "2022-05-02",
            responsible: "Leander Lotterfeld"
        }
    ]
};

http
    .createServer(function (req, res) {
        console.log("Serving request");

        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "*");

        if (req.method === 'OPTIONS') {
            res.writeHead(200);
            res.end();
        } else if (req.url === "/tasks" && req.method === "GET") {
            res.setHeader("Content-Type", "application/json");
            res.writeHead(200);
            res.write(JSON.stringify(data));
            res.end();
        } else {
            res.writeHead(404);
            res.end();
        }
    })
    .listen(8080);
console.log("Serving up and running");