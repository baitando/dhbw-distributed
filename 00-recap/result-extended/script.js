// Konstante für die Basis-URL und API-Schlüssel
const API_BASE_URL = "https://dhbw-web-simpletodo.azurewebsites.net/api/todos";
const API_KEY = "rehmanna";

// Hilfsfunktion für API-Header
function createHeaders(additionalHeaders = {}) {
  return {
    "x-api-key": API_KEY,
    ...additionalHeaders,
  };
}

// Initialisierung
function init() {
  fetchTodos();
}

// Event-Handler für das Absenden
function handleSubmit() {
  const input = document.getElementById("todoInput");
  const text = input.value.trim();
  if (text.length === 0) return false;

  createTodo(text);
  input.value = "";
  input.focus();
  return false;
}

// Todos abrufen und anzeigen
function fetchTodos() {
  fetch(API_BASE_URL, { headers: createHeaders() })
      .then((res) => res.json())
      .then((todos) => renderTodos(todos));
}

// Neues Todo erstellen
function createTodo(text) {
  fetch(API_BASE_URL, {
    method: "POST",
    headers: createHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({ text }),
  })
      .then((res) => fetchTodos());
}

// Todo löschen
function deleteTodo(id, todoElement) {
  fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
    headers: createHeaders(),
  }).then(() => todoElement.remove());
}

// Unterstützung für das Rendern von mehreren Todos
function renderTodos(todos) {
  const list =
      document.getElementById("todoList");
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  todos.forEach(renderTodo);
}

// Einzelnes Todo rendern
function renderTodo(todo) {
  const list = document.getElementById("todoList");
  const li = document.createElement("li");
  li.className = "list-group-item d-flex align-items-center justify-content-between";

  const left = document.createElement("div");
  left.className = "d-flex align-items-center";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "form-check-input me-2";
  checkbox.checked = todo.checked;

  const span = document.createElement("span");
  span.innerText = todo.text;
  if (todo.checked) span.classList.add("done");

  // Checkbox-Event
  checkbox.onchange = function () {
    deleteTodo(todo.id, li);
  };

  left.appendChild(checkbox);
  left.appendChild(span);
  li.appendChild(left);
  list.appendChild(li);
}