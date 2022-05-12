async function run() {
    /*
       TODO #2 Aufruf von 'createApiKey' und Behandlung des Ergebnisses des Aufrufs

       a) Rufen Sie zunaechst 'createApiKey' auf und behandeln Sie das Ergebnis des Promise mittels then() und catch().
          Nutzen Sie Pfeilfunktionen im then-Block. Fuer die Aufloesung benoetingen Sie 2x then(). Geben Sie den API-Key
          auf der Konsole aus.
       b) Stellen Sie nun auf async/await um und speichern Sie den API-Key in der Konstanten 'apiKey'. Fuer die
          Aufloesung benoetigen Sie 2x await. Geben Sie den API-Key auf der Konsole aus.
     */
    createApiKey()
        .then(response => response.json())
        .then(data => console.log(data.apiKey))
        .catch(error => console.error(error))

    try {
        const response = await createApiKey();
        const data = await response.json();
        const apiKey = data['apiKey'];
        console.log(apiKey);
    } catch(error) {

        console.error(error);
    }

        /*
            TODO #4 Task ueber Konstruktor 'Task' erzeugen und ausgeben

            Erzeugen Sie einen neuen Task ueber den Konstruktur mit beliebigen Werten fuer die Parameter und speichern
            Sie ihn in der Konstanten 'task'. Geben Sie Wert von 'task' auf der Konsole aus.
         */

        /*
            TODO #6 Task ueber 'createTask' speichern

            Nutzen Sie async/await um den Task 'task' zu speichern. Nutzen Sie den zuvor angelegten API-Key. Geben Sie
            eine Meldung auf der Konsole aus, sobald die Operation abgeschlossen ist.
         */

        /*
            TODO #8 Alle Tasks ueber 'getAllTasks' abfragen und ausgeben

            Nutzen Sie async/await um eine Liste aller Tasks abzuholen. Geben Sie anschließend alle Eintraege auf der
            Konsole aus.
         */
}

function showApiKey(maja) {
    console.log(maja.apiKey);
}

/*
  TODO #1 Funktion 'createApiKey' erstellen

  Legen Sie eine neue Funktion an, die keinen Parameter erwartet. Senden Sie einen HTTP-Aufruf via fecht an die
  bekannte  REST API, um einen neuen API Key zu erstellen. Die Spezifikation koennen Sie ueber den Link unten oeffnen:
  https://editor.swagger.io/?url=https://raw.githubusercontent.com/baitando/dhbw-web/master/02d_apis/uebung-1/initial/todo.yaml

  Die Rueckgabe der Funktion soll ein Promise sein.

  HTTP-Methode: POST
  URL: https://dhbw-web-todo.azurewebsites.net/api/apps
  Header:
    - Accept: application/json
 */
function createApiKey() {
    return fetch('https://dhbw-web-todo.azurewebsites.net/api/apps', {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        }
    });
}

/*
  TODO #3 Konstruktor 'Task' erstellen

  Erstellen Sie den Konstruktor 'Task'. Als Parameter erwarten Sie die 'title', 'notes', 'due' und 'responsible'. Diese
  Werte setzen Sie fuer die gleichnamigen Attribute des Objekts.
 */

/*
  TODO #5 Funktion 'createTask' erstellen

  Legen Sie eine neue Funktion an, die einen Parameter 'task' und einen weiteren Parameter 'apiKey' erwartet.
  Senden Sie einen HTTP-Aufruf via fetch an die bekannte  REST API, um einen neuen API Key zu erstellen. Die
  Spezifikation koennen Sie ueber den Link unten oeffnen:
  https://editor.swagger.io/?url=https://raw.githubusercontent.com/baitando/dhbw-web/master/02d_apis/uebung-1/initial/todo.yaml

  Die Rueckgabe der Funktion soll ein Promise sein.

  HTTP-Methode: POST
  URL: https://dhbw-web-todo.azurewebsites.net/api/tasks
  Header:
    - Content-Type: application/json
    - X-Api-Key: <Wert Parameter 'apiKey'>
  Body: JSON-Repraesentation des Parameters 'task'
 */

/*
  TODO #7 Funktion 'getAllTasks' erstellen

  Legen Sie eine neue Funktion an, die den Parameter 'apiKey' erwartet. Senden Sie einen HTTP-Aufruf via fetch an
  die bekannte  REST API, um einen neuen API Key zu erstellen. Die Spezifikation koennen Sie ueber den Link unten oeffnen:
  https://editor.swagger.io/?url=https://raw.githubusercontent.com/baitando/dhbw-web/master/02d_apis/uebung-1/initial/todo.yaml

  Die Rueckgabe der Funktion soll ein Promise sein.

  HTTP-Methode: GET
  URL: https://dhbw-web-todo.azurewebsites.net/api/tasks
  Header:
    - Accept: application/json
    - X-Api-Key: <Wert Parameter 'apiKey'>
 */