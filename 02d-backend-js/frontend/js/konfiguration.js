/**
 * Initialize the page. Will provide a form to create a new task, if no ID is provided as query parameter. If
 * an ID is provided as query parameter, an edit form will be shown.
 */
function initialize() {
    console.debug("Initializing config page")

    setValueById('baseurl', getServiceBaseUrl());
}

/**
 * Safely set the value of an element identified by its ID.
 *
 * @param id The ID of the element to search for.
 * @param value The value to set.
 */
function setValueById(id, value) {
    var element = document.getElementById(id);
    if (element) {
        element.value = value;
    } else {
        console.error(`Element with ID does not exist: ${id}`);
    }
}

/**
 * Save the data contained in the form.
 */
function save() {
    var serviceBaseUrl = getInputValueById('baseurl');
    localStorage.setItem('serviceBaseUrl', serviceBaseUrl);
    location.href = 'index.html';
}

function reset() {
    var serviceBaseUrl = getInputValueById('baseurl');
    localStorage.removeItem('serviceBaseUrl');
    location.href = 'index.html';
}

/**
 * Search for an HTML input element by its ID and return the value.
 *
 * @param id The ID of the HTML input element.
 * @returns {undefined|*} The value of the HTML input element, if one with the given ID exists.
 */
function getInputValueById(id) {
    if (id) {
        var input = document.getElementById(id);
        if (input) {
            return input.value;
        } else {
            console.error(`Input with ID not found: ${id}`);
            return undefined;
        }
    }

    console.error("No ID provided");
    return undefined;
}
