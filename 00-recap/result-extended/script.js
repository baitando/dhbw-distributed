function init() {
  loadTodos();
}

function handleSubmit() {
  const input = document.getElementById("todoInput");
  const text = input.value.trim();
  if (text.length !== 0) {
    console.log(text);
    createTodo(text);
    input.value = "";
    input.focus();
  }
  return false;
}

function createTodo(text) {
  fetch("https://dhbw-web-simpletodo.azurewebsites.net/api/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "rehmanna"
    },
    body: JSON.stringify({ text: text })
  })
      .then(response => response.json())
      .then(todo => {
        addTodo(todo.id, todo.text);
      });
}

function addTodo(id, text) {
  const list = document.getElementById("todoList");
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

function loadTodos() {
  document.getElementById("todoList").innerHTML = "";
  fetch("https://dhbw-web-simpletodo.azurewebsites.net/api/todos", {
    headers: {
      "x-api-key": "rehmanna"
    }
  })
      .then(response => response.json())
      .then(todos => {
        for (let i = 0; i < todos.length; i++) {
          addTodo(todos[i].id, todos[i].text);
        }
      });
}

function deleteTodo(id) {
  fetch(`https://dhbw-web-simpletodo.azurewebsites.net/api/todos/${id}`, {
    method: "DELETE",
    headers: {
      "x-api-key": "rehmanna"
    }
  });
}