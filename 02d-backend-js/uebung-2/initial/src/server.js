const express = require('express');
const fs = require('fs');
const crypto = require('crypto');

const app = express();

app.use(express.json());

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500);
    res.send();
});

/*
  TODO #1 Implementierung fuer HTTP-Methode GET und Pfad /tasks mit Rueckgabe aller Eintraege
 */

/*
  TODO #2 Implementierung fuer HTTP-Methode GET und Pfad /tasks/<task-id> mit Rueckgabe eines spezifischen Eintrags
 */

/*
  TODO #3 Implementierung fuer HTTP-Methode POST und Pfad /tasks zur Anlage eines neuen Eintrags
 */

app.listen(8080, () => {
    console.log("Serving request");
});

function validateTask(task) {
    return task &&
        !task.id &&
        task.title &&
        task.notes &&
        task.due &&
        task.responsible;
}

function createTask(task) {
    const tasks = getAllTasks();
    tasks.items.push(task);
    saveAllTasks(tasks);
}

function saveAllTasks(tasks) {
    writeToFile(JSON.stringify(tasks));
}

function getAllTasks() {
    const fileContent = readFromFile();

    if (fileContent) {
        return JSON.parse(fileContent.toString());
    } else {
        return {
            items: []
        };
    }
}

function getTaskById(id) {
    const tasks = getAllTasks();
    for (let task of tasks.items) {
        if (task.id === id) {
            return task;
        }
    }
    return undefined;
}

function readFromFile() {
    if (fs.existsSync('data.json')) {
        console.debug('File exists');
        return fs.readFileSync('data.json');
    }

    return undefined;
}

function writeToFile(data) {
    return fs.writeFileSync('data.json', data);
}