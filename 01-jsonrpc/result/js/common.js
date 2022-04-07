/**
 * Load stored tasks from local storage, if some are stored there.
 *
 * @returns {*[]|any} Stored tasks from local storage or empty array, if no tasks were present.
 */
function loadStoredTasks() {
    return fetch(`https://dhbw-web-todo.azurewebsites.net/api/jsonrpc`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json-rpc',
            'Accept': 'application/json-rpc'
        },
        body: JSON.stringify({
            "jsonrpc": "2.0",
            "method": "getAllTasks",
            "params": {
                "owner": "ahirsch"
            },
            "id": 0
        })
    });
}
