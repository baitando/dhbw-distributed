
function init() {
  loadTodos();
}

function handleSubmit() {
  const input = document.getElementById("todoInput");
  const text = input.value.trim();
  if (text.length !== 0) {
    console.log(text);
    addTodo(text);
    input.value = "";
    input.focus();
  }
  saveTodos();
  return false;
}

function addTodo(text) {
  const list = document.getElementById("todoList");
  const id = Date.now().toString();
  const li = document.createElement("li");
  li.className = "list-group-item d-flex align-items-center justify-content-between";
  li.dataset.id = id;

  const left = document.createElement("div");
  left.className = "d-flex align-items-center";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "form-check-input me-2";

  const span = document.createElement("span");
  span.innerText = text;

  checkbox.onchange = function () {
    deleteTodo(id);
    li.remove();
  };

  left.appendChild(checkbox);
  left.appendChild(span);
  li.appendChild(left);
  list.appendChild(li);
}

function saveTodos() {
  const todos = [];
  const items = document.querySelectorAll("#todoList li");
  for (let i = 0; i < items.length; i++) {
    const span = items[i].querySelector("span");
    const id = items[i].dataset.id;
    todos.push({ id: id, text: span.innerText });
  }
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
  document.getElementById("todoList").innerHTML = "";
  const json = localStorage.getItem("todos");
  if (json !== null) {
    const todos = JSON.parse(json);
    for (let i = 0; i < todos.length; i++) {
      addTodo(todos[i].text, todos[i].checked);
    }
  }
}

function deleteTodo(id) {
  const json = localStorage.getItem("todos");
  if (json !== null) {
    const todos = JSON.parse(json);
    const updated = todos.filter(t => t.id !== id);
    localStorage.setItem("todos", JSON.stringify(updated));
  }
}
