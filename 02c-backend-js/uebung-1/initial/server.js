const http = require("http");

/*
TODO #1 Daten fuer die Rueckgabe definieren

Definieren Sie hier statische Beispieldaten, die spaeter bei der Abfrage der Liste aller Eintraege als Ergebnis
geliefert wird. Als Inspiration koennen Sie die Swagger UI der vorhandenen REST API aufrufen und darueber einen
Aufruf durchfuehren und sich das Ergebnis ansehen. Sie finden Sie unter der folgenden URL:
https://editor.swagger.io/?url=https://raw.githubusercontent.com/baitando/dhbw-web/master/02d_apis/uebung-1/initial/todo.yaml
a) Definieren Sie ein Array.
b) Fuegen Sie in diesem Array mehrere Tasks-Eintraege ein. Jeder Task-Eintrag ist ein eigenes Objekt.
 */
const responseData = {

};

http
    .createServer(function (req, res) {
        console.log("Serving request");

        /*
        TODO #2 Vorab definierte Daten zuerueckgeben, wenn Pfad /tasks entspricht und Methode GET ist

        a) Erstellen Sie eine Bedinungspruefung mit if und else. Pruefen Sie im if, ob der Pfad '/tasks' mit der HTTP-
           Methode 'GET' aufgerufen wurde. Die tatsaechlichen Werte des konkreten Aufrufs koennen Sie ueber die
           Attribute des Parameters req ermitteln.
        b) Falls die Bedingung zutrifft (d.h. im if-Teil) setzen Sie ueber die Methoden des Parameters res die Antwort.
           Setzen Sie den Header 'Content-Type' auf den Wert 'application/json', den HTTP-Status auf 200 und schreiben
           Sie die JSON-Repraesentation des Wertes von responseData in den HTTP-Body.
        c) Falls die Bedingung nicht zutrifft (d.h. im else-Teil) setzen Sie den HTTP-Status auf 404.
        d) Testen Sie nun den if-Zweig durch einen Aufruf in Ihrem Browser. Rufen Sie den Pfad /tasks auf. Beachten Sie,
           dass im Falle Code Sandbox trotz Port 8080 des gestarteten Servers der Aufruf ueber das Internet per Standard
           HTTPS-Port 443 erfolgt. Sehen Sie sich den Aufruf und die Antwort auch in den Entwicklerwerkzeugen Ihres
           Browsers an.
        e) Testen Sie nun den else-Zweig durch einen weiteren Aufruf in Ihrem Browser. Rufen Sie dazu z.B. den Pfad
           /gibtsnicht auf. Sehen Sie sich den Aufruf und die Antwort auch in den Entwicklerwerkzeugen Ihres Browsers
           an.
         */

    })
    .listen(8080); //the server object listens on port 8080
console.log("Server up and running");