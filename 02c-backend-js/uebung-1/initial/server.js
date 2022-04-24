var http = require("http");

var data = {
    // TODO #1 Daten fuer die Rueckgabe definieren
};

http
    .createServer(function (req, res) {
        console.log("Serving request");

        // TODO #4 CORS-Header setzen
        // * Header Access-Control-Allo-Origin auf * setzen
        // * Header Access-Control-Allow-Headers auf * setzen

        // TODO #5 Wenn Methode OPTIONS ist, 200 OK als Ergebnis
        // * Status auf 200 setzen
        // * Ergebnis zurueckgeben

        // TODO #2 Vorab definierte Daten zuerueckgeben, wenn Pfad /tasks entspricht und Methode GET ist
        // * Header Content-Type auf application/json setzen
        // * Status auf 200 setzen
        // * Daten aus dem Javascript-Objekt in JSON umwandeln und in die Ausgabe schreiben
        // * Ergebnis zurueck geben

        // TODO #3 In allen anderen Faellen 404 Not Found als Ergebnis
        // * Status auf 404 setzen
        // * Ergebnis zurueckgeben

    })
    .listen(8080); //the server object listens on port 8080
console.log("Serving up and running");