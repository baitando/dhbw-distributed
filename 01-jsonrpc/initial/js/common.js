/**
 * Load stored tasks from local storage, if some are stored there.
 *
 * @returns {*[]|any} Stored tasks from local storage or empty array, if no tasks were present.
 */
function loadStoredTasks() {
    return fetch(`https://dhbw-web-todo.azurewebsites.net/api/jsonrpc`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "jsonrpc": "2.0",
            "method": "getAllTasks",
            "params": {
                "owner": "588016c2-8673-404a-ba8d-0219795a5ccd"
            },
            "id": 0
        })
    });
}

/**
 * Store tasks in the local storage.
 *
 * @param tasks Tasks to store.
 */
function storeTasks(tasks) {
    if (tasks) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
        console.debug(`Count of stored tasks: ${tasks.length}`);
    } else {
        console.error("No tasks to store");
    }
}
