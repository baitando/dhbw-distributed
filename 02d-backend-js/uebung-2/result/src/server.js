const http = require('http');
const express = require('express');
const url = require('url');
const fs = require('fs');
const crypto = require("crypto");

/*
  TODO #1 Ersetzen Sie den existierenden Code durch Express.js

  a) Erzeugen Sie eine neue App.
  b) Registrieren Sie eine Route fuer den bereits vorhandenen Aufruf, d.h. HTTP-Methode GET und Pfad /tasks. Das
     Ergebnis beim Aufrufer soll identisch mit dem vorherigen mit dem Node.js HTTP-Server sein.
  c) Starten Sie den Server auf Port 8080 und geben Sie eine Meldung auf der Konsole aus, sobald der Server bereit ist.
 */
const app = express();

app.get('/tasks', (req, res) => {
    headers(req, res);
    res.status(200);
    res.contentType('application/json');
    res.json(getAllTasks());
    res.send();
});

/*
  TODO #3 Fuegen Sie eine Route fuer HTTP GET und Pfad /tasks/<taskId> hinzu

  a) Registrieren Sie die Route. Beruecksichtigen Sie den Pfad-Parameter.
  b) Ermitteln Sie die Task-ID, die Sie vorher als Pfad-Parameter in der URL definiert hatten. Speicher Sie die ID in
     der Konstante 'taskId'. Geben Sie den Wert auf der Konsole aus.
  c) Nutzen Sie die Funktion 'getTaskById'. Uebergeben sie die den Wert von 'taskId' als Parameter und speichern Sie
     das Ergebnis in der Konstante 'task'.
  d) Falls der Task gefunden wurde, ist der HTTP-Statuscode 200 und es wird der Task an den Aufrufer geschickt.
  e) Falls der Task nicht gefunden wurde, ist der HTTP-Statuscode 404.
 */
app.get('/tasks/:taskId', (req, res) => {
    const taskId = req.params['taskId'];
    console.log(`Get task for ID '${taskId}'`)

    const task = getTaskById(taskId);
    headers(req, res);
    if (task) {
        res.status(200);
        res.json(task);
    } else {
        res.status(404);
        res.send();
    }
});

/*
  TODO #7 Registrieren Sie die Middleware fuer das Parsen von JSON
 */
app.use(express.json());

/*
  TODO #8 Fuegen Sie eine Route fuer HTTP POST und Pfad /tasks hinzu

  a) Registrieren Sie die Route.
  b) Ermitteln Sie den Inhalt von req.body und speichern Sie das Ergebnis in der Konstante 'task'. Geben Sie den Wert
     von 'task' auf der Konsole aus.
  c) Validieren Sie den erhaltenen Task.
  d) Falls der Task nicht valide ist, senden Sie HTTP-Statuscode 400 an den Aufrufer.
  e) Falls der Task valide ist, erzeugen Sie eine ID für den Task. Rufen Sie dann 'createTask' mit dem Task auf. Setzen
     Sie den HTTP-Statuscode 201. Setzen Sie den Header 'Location' auf die URL zum neu angelegten Task.
 */
app.post('/tasks', (req, res) => {
    console.log(`Create task`)
    const task = req.body;
    console.log(task);
    headers(req, res);
    if (validateTask(task)) {
        task.id = crypto.randomUUID();
        createTask(task);

        res.setHeader('Location', `http://localhost:8080/tasks/${task.id}`);
        res.status(201);
        res.send();
    } else {
        res.status(400);
        res.send();
    }
});

/*
  TODO #9 Unterstuetzung Pre-Flight request, d.h. fuegen Sie eine Route fuer HTTP OPTIONS und Pfad /* hinzu

  a) Registrieren Sie die Route.
  b) Setzen Sie die CORS-Header.
     - Access-Control-Allow-Origin: *
     - Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE
     - Access-Control-Allow-Headers: X-Api-Key,Content-Type,Accept
  c) Setzen Sie den HTTP-Statuscode auf 200.
  d) Setzen Sie nun zusaetzlich auch in allen anderen Routen die CORS-Header.
 */
app.options('/*', (req, res) => {
    headers(req, res);
    res.status(200);
    res.send();
});

app.listen(8080, () => {
    console.log("Serving request");
});

function headers(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Api-Key,Content-Type,Accept');
}

/*
  TODO #2 Implementieren Sie die Funktion 'getTaskById' mit der 'taskId' als Parameter

  a) Erstellen Sie die Funktion mit dem Parameter.
  b) Nutzen Sie die Funktion 'getAllTasks' um alle Tasks abzufragen.
  c) Suchen Sie in der Liste aller Tasks nach dem Eintrag mit der gesuchten ID. Falls es den Eintrag gibt, geben Sie
     diesen Aufrufer zurueck. Falls nicht, ist das Ergebnis undefined.
 */
function getTaskById(id) {
    const tasks = getAllTasks();
    for (let task of tasks.items) {
        if (task.id === id) {
            return task;
        }
    }
}

/*
  TODO #4 Implementieren Sie die Funktion 'writeToFile' mit einem Parameter 'data'.

  Die Funktion soll den Wert von 'data' in die Datei 'data.json' schreiben.
 */
function writeToFile(data) {
    return fs.writeFileSync('data.json', data);
}

/*
  TODO #5 Implementieren Sie die Funktion 'saveAllTasks' mit dem Parameter 'tasks'

  a) Erzeugen Sie aus dem Parameter 'tasks' die String-Repraesentation.
  b) Rufen Sie 'writeToFile' mit dem Wert aus a) auf.
 */
function saveAllTasks(tasks) {
    writeToFile(JSON.stringify(tasks));
}

/*
  TODO #6 Implementieren Sie die Funktion 'createTask' mit dem Parameter 'task'.

  a) Fragen Sie alle vorhandenen Tasks mit 'getAllTasks' auf.
  b) Fuegen Sie der Liste aus a) den Wert von 'task' hinzu.
  c) Rufen Sie 'saveAllTasks' mit dem Ergebnis von b) auf.
 */
function createTask(task) {
    const tasks = getAllTasks();
    tasks.items.push(task);
    saveAllTasks(tasks);
}

function validateTask(task) {
    return task &&
        !task.id &&
        task.title &&
        task.notes &&
        task.due &&
        task.responsible;
}

function getAllTasks() {
    const fileContent = loadDataFromFile();

    if (fileContent) {
        return JSON.parse(fileContent.toString());
    } else {
        return {
            items: []
        };
    }
}

function loadDataFromFile() {
    if (fs.existsSync('data.json')) {
        console.debug('File exists');
        return fs.readFileSync('data.json');
    }
}