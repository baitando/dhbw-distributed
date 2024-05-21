const express = require('express');
const fs = require('fs');
const crypto = require('crypto');

const app = express();

const filePath = 'data.json';

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('yaml').parse(fs.readFileSync('./spec/todo.yaml', 'utf8'));
app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());

app.get('/health', (req, res) => {
    const healthStatus = {
        status: "running"
    };
    res.json(healthStatus);
});

app.get('/tasks', (req, res) => {
    res.json(getAllTasks());
});

app.get('/tasks/:taskId', (req, res) => {
    const taskId = req.params['taskId'];
    console.log(`Get task for ID '${taskId}'`)

    const task = getTaskById(taskId);
    if (task) {
        res.json(task);
    } else {
        res.status(404);
        res.send();
    }
});

app.post('/tasks', (req, res) => {
    console.log(`Create task`)
    const task = req.body;
    console.log(task);
    if (validateTask(task)) {
        task.id = generateId();
        addTask(task);

        res.setHeader('Location', getRecordUrl(req, task.id));
        res.status(201);
        res.send();
    } else {
        res.status(400);
        res.send();
    }
});

/*
  TODO Unterstuetzung Pre-Flight request, d.h. fuegen Sie eine Route fuer HTTP OPTIONS und Pfad /* hinzu

  1. Registrieren Sie die Route.
  2. Setzen Sie die CORS-Header.
     - Access-Control-Allow-Origin: *
     - Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE
     - Access-Control-Allow-Headers: X-Api-Key,Content-Type,Accept
  3. Setzen Sie nun zusaetzlich auch in allen anderen Routen die CORS-Header.
 */


app.listen(8080, () => {
    console.log("Serving request");
});

function generateId() {
    return crypto.randomUUID();
}

function validateTask(task) {
    return task &&
        task.title &&
        task.notes &&
        task.due &&
        task.responsible;
}

function getRecordUrl(req, recordId) {
    return `${req.protocol}://${req.header('host')}/records/${recordId}`;
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
    if (fs.existsSync(filePath)) {
        console.debug('File exists');
        return fs.readFileSync(filePath);
    }
}

function getTaskById(id) {
    const tasks = getAllTasks();
    for (let task of tasks.items) {
        if (task.id === id) {
            return task;
        }
    }
}

function addTask(task) {
    const tasks = getAllTasks();
    tasks.items.push(task);
    saveAllTasks(tasks);
}

function saveAllTasks(tasks) {
    writeToFile(JSON.stringify(tasks));
}

function writeToFile(data) {
    return fs.writeFileSync(filePath, data);
}