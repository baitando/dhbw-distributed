const express = require('express');
const fs = require('fs');
const crypto = require('crypto');

const app = express();

const filePath = 'data.json';

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('yaml').parse(fs.readFileSync('./spec/todo.yaml', 'utf8'));
app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/*
    TODO #1 Server starten und testen

    1. Starten Sie den Server über den Befehl 'npm run dev'. Im Falle der lokalen Ausführung stellen Sie bitte sicher,
       dass Port 8080 frei ist.
    2. Rufen Sie die URL http://localhost:8080/health im Browser auf. Wenn alles funktioniert, sollten Sie den
       Status des Servers mit 'up' angegeben sehen.
    3. Ändern Sie nun den Status im Code von 'up' auf 'running' und speichern Sie die Datei. Beobachten Sie, wie der
       Server automatisch neu startet. Verifizieren Sie die Wirksamkeit der Änderung, indem Sie die Seite im Browser
       neu laden.
    4. Machen Sie sich nun vertraut mit den Dateien 'package.json' und 'src/server.js'. Sehen Sie sich insbesondere an,
       wie das Grundgeruest der Anwendung aufgebaut ist, wie der Server gestartet wird und wie der Endpunkt
       implementiert ist.
 */

app.get('/health', (req, res) => {
    const healthStatus = {
        status: "up"
    };
    res.json(healthStatus);
});

/*
    TODO #3 Alle Tasks aus Datei zurueckgeben, wenn Pfad /tasks entspricht und HTTP-Methode GET ist

    1. Registrieren Sie einen neuen Handler für die HTTP-Methode GET und binden Sie diesen an den Pfad '/tasks'.
    2. Im Handler laden Sie alle Tasks unter Verwendung der vorher implementierten Funktion 'getAllTasks'. Die Funktion
       liefert ein Javascript-Objekt, konkret ein Array.
    3. Geben Sie die geladenen Daten als JSON-String im Response-Body des Aufrufs zurueck. Achten Sie darauf, dass der
       HTTP-Status mit '200' gesetzt wird und der 'Content-Type' als 'application/json' angegeben ist.
    4. Rufen Sie im Browser nun 'http://localhost:8080/tasks' auf. Sie sollten nun die Daten im JSON-Format sehen.
    5. Das Grundgeruest der Anwendung liefert bereits eine konfigurierte Swagger UI. Oeffnen Sie diese im Browser ueber
       die Adresse 'http://localhost:8080/swagger-ui'. Sie koennen nun die Swagger UI nutzen, um einen weiteren Test zur
       Abfrage aller Tasks durchzufuehren.
 */


/*
    TODO #5 Einen speziellen Task zurueckgeben, wenn Pfad /tasks/<taskId> und HTTP-Methode GET ist

    1. Registrieren Sie einen neuen Handler für die HTTP-Methode GET und binden Sie diesen an den Pfad '/tasks/:taskId'.
    2. Im Handler fragen Sie den Wert des Pfad-Parameters 'taskId' ab. Verwenden Sie diesen Wert als Parameter fuer die
       Abfrage des Tasks ueber die vorher implementierte Funktion 'loadTaskById'. Die Funktion liefert ein Javascript-
       Objekt, falls ein Task mit der gegebenen ID existiert, und 'undefined', falls es diesen Task nicht gibt.
    3. Falls der Task existiert, geben Sie die geladenen Daten als JSON-String im Response-Body des Aufrufs zurueck.
       Achten Sie darauf, dass der HTTP-Status mit '200' gesetzt wird und der 'Content-Type' als 'application/json'
       angegeben ist.
    4. Falls der Task nicht existiert, liefern Sie den HTTP-Statuscode 404.
    5. Testen Sie den neu implementierten Endpunkt nun mit Hilfe der Swagger UI.

 */


/*
  TODO #7 Eine neuen speziellen Task hinzufuegen, wenn Pfad /tasks und HTTP-Methode POST ist

    1. Registrieren Sie einen neuen Handler für die HTTP-Methode POST und binden Sie diesen an den Pfad '/tasks'.
    2. Im Handler fragen Sie den Inhalt des Request Body ab. Valdieren Sie die uebergebenen Daten nun mit Hilfe der
       bereitgestellten Funktion 'validateTask'.
    3. Sofern die Validierung aus Punkt 2. erfolgreich ist, erhalten Sie den Wert 'true' als Ergebnis. In diesem Fall erzeugen Sie
       mit Hilfe der bereitgestellten Funktion 'generateId' eine neue ID und weisen diese dem uebergebenen Task zu.
       Speichern Sie den neuen Eintrag nun ueber die vorher implementierte Funktion 'addTask', an die Sie den
       anzulegenden Task als Parameter uebergeben.
    4. Setzen Sie den HTTP-Statuscode auf '201' und setzen Sie den Header 'Location' auf die URL des neuen Eintrags. Die
       URL beginnt mit 'http://localhost:8080/tasks/' und wird um die ID des neuen Eintrags ergaenzt. Schliessen Sie
       die Anfrage ab.
    4. Falls die Validierung aus Punkt 2. fehlschlaegt, erhalten Sie den Wert 'false' als Ergebnis. In diesem Fall setzen Sie den
       HTTP-Status auf 400 und schliessen die Anfrage ab.
 */


app.listen(8080, () => {
    console.log("Serving request");
});

function generateId() {
    return crypto.randomUUID();
}

function validateTask(task) {
    return task &&
        !task.id &&
        task.title &&
        task.notes &&
        task.due &&
        task.responsible;
}

/*
    TODO #2 Implementieren Sie die Funktion 'getAllTasks', die keinen Parameter benötigt.

    1. Laden Sie den Inhalt der Datei 'data.json' mit Hilfe des Moduls 'fs', sofern die Datei existiert. Verwenden Sie
       fuer den Dateinamen stets die weiter oben definiert Konstante 'filePath'.
    2. Gehen Sie davon aus, dass der Inhalt der Datei (sofern Sie existiert) valides JSON ist. Erzeugen Sie aus dem
       geladenen Dateiinhalt ein Javascript-Objekt. Nutzen Sie dazu das bereits bekannte Objekt JSON.
    3. Falls die Datei 'data.json' nicht existiert, geben Sie ein leeres Array an den Aufrufer zurueck.
 */


/*
    TODO #4 Implementieren Sie die Funktion 'getTaskById', die den Parameter 'taskId' erwartet

    1. Falls der Wert des Parameters nicht numerisch ist, geben Sie den Wert 'undefined' zurueck.
    2. Falls der Wert numerisch ist, fragen Sie alle Tasks ueber die Funktion 'getAllTasks' ab. Die Funktion liefert ein
       Array. Durchsuchen Sie dieses und geben Sie den Eintrag mit der ID aus dem Parameter zurueck. Falls Sie keinen
       Eintrag mit dieser ID finden, geben Sie 'undefined' zurueck.
 */


/*
  TODO #6 Implementieren Sie die Funktion 'addTask', die den Parameter 'task' erwartet

  1. Fragen Sie alle vorhandenen Tasks mit Hilfe der Funktion 'getAllTasks' ab. Die Funktion liefert ein Array.
  2. Fuegen Sie dem Array mit allen bereits vorhandenen Tasks nun den Task aus dem Parameter hinzu.
  3. Speichern Sie die ergaenzte Liste nun in der Datei 'data.json' im JSON-Format ab, indem Sie den Inhalt der Datei
     ueberschreiben.
 */

