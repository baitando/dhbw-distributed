/**
 * Load stored tasks from local storage, if some are stored there.
 *
 * @returns {*[]|any} Stored tasks from local storage or empty array, if no tasks were present.
 */
function loadStoredTasks() {
    return fetch(`${getServiceBaseUrl()}/tasks`, {
        headers: {
            'Accept': 'application/json',
            'X-Api-key': 'ahirsch'
        }
    });
}

function getServiceBaseUrl() {
    var serviceBaseUrl = localStorage.getItem('serviceBaseUrl');
    if(!serviceBaseUrl) {
        serviceBaseUrl = 'https://dhbw-web-todo.azurewebsites.net/api';
        console.log('Falling back to default service base URL');
    }
    console.log(`Using service base URL ${serviceBaseUrl}`);
    return serviceBaseUrl;
}