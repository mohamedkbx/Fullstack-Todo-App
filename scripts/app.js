// selectors
const addButton = document.querySelector(".todo__button");
const inputElement = document.querySelector(".todo__input");
const todoList = document.querySelector(".todo-list");
const filterOptions = document.querySelector(".filter-todo");

// Event Listeners
document.addEventListener("DOMContentLoaded", getTodo);
addButton.addEventListener("click", addTodo);
todoList.addEventListener("click", handleTodoActions); // Changed to handle all actions here
filterOptions.addEventListener("click", filterTodo);

// Functions

// Add a new Todo item
// Select the notification div
const notification = document.getElementById("notification");

// Add a new Todo item
function addTodo(event) {
  event.preventDefault();

  // todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // todo item
  const newTodo = document.createElement("li");
  if (!inputElement.value) return;
  newTodo.innerText = inputElement.value;
  newTodo.classList.add("todo__item");
  todoDiv.appendChild(newTodo);

  // Save to localStorage
  saveLocalTodo(inputElement.value);

  // Check mark button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class ='fas fa-check'></i>`;
  completedButton.classList.add("complete__button");
  todoDiv.appendChild(completedButton);

  // Trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = `<i class ='fas fa-trash'></i>`;
  trashButton.classList.add("trash__button");
  todoDiv.appendChild(trashButton);

  // Edit button
  const editButton = document.createElement("button");
  editButton.innerHTML = `<i class ='fas fa-edit'></i>`;
  editButton.classList.add("edit__button");
  todoDiv.appendChild(editButton);

  // Append the todo to the list
  todoList.appendChild(todoDiv);

  // Clear input
  inputElement.value = "";
  inputElement.focus();

  // Show the notification
  showNotification();

  // Hide notification after 3 seconds
  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}

// Show notification
function showNotification() {
  notification.classList.add("show");
}

// Handle Todo actions (edit, complete, delete)
function handleTodoActions(e) {
  const item = e.target;
  const todo = item.parentElement;

  if (item.classList.contains("trash__button")) {
    // Handle delete
    todo.classList.add("fall");
    removeLocalTodo(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  if (item.classList.contains("complete__button")) {
    // Handle complete
    todo.classList.toggle("completed");
  }

  if (item.classList.contains("edit__button")) {
    // Handle edit
    const todoText = todo.querySelector(".todo__item");

    // Create input field with current todo text
    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.value = todoText.innerText;
    inputField.classList.add("edit-input");

    // Replace todo text with input field
    todo.replaceChild(inputField, todoText);

    // Change the edit button to save button
    item.innerHTML = `<i class='fas fa-save'></i>`;
    item.classList.remove("edit__button");
    item.classList.add("save__button");

    // Add event listener for the save button
    item.addEventListener("click", function () {
      saveUpdatedTodo(todo, inputField.value);
    });
  }
}

// Save updated todo
function saveUpdatedTodo(todo, newText) {
  // Replace input with the updated text
  const newTodo = document.createElement("li");
  newTodo.innerText = newText;
  newTodo.classList.add("todo__item");

  const inputField = todo.querySelector(".edit-input");
  todo.replaceChild(newTodo, inputField);

  // Update the todo in localStorage
  updateLocalTodo(todo, newText);
}

// Update localStorage with the updated todo
function updateLocalTodo(todo, newText) {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  const oldText = todo.querySelector(".edit-input").getAttribute("value");

  // Find the index of the old todo and replace it with the new text
  const todoIndex = todos.indexOf(oldText);
  if (todoIndex > -1) {
    todos[todoIndex] = newText;
  }

  // Save the updated todos back to localStorage
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Filter Todos
function filterTodo(e) {
  const todos = todoList.childNodes;

  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (todo.classList.contains("completed")) {
          todo.style.display = "none";
        } else {
          todo.style.display = "flex";
        }
        break;
    }
  });
}

// Save Todo to localStorage
function saveLocalTodo(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Get Todos from localStorage and render them
function getTodo() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach((todo) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo__item");
    todoDiv.appendChild(newTodo);

    const controls = document.createElement("div");
    controls.classList.add("todo__controls");
    // Check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class ='fas fa-check'></i>`;
    completedButton.classList.add("complete__button");
    todoDiv.appendChild(completedButton);

    // Trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class ='fas fa-trash'></i>`;
    trashButton.classList.add("trash__button");
    todoDiv.appendChild(trashButton);

    // Edit button
    const editButton = document.createElement("button");
    editButton.innerHTML = `<i class ='fas fa-edit'></i>`;
    editButton.classList.add("edit__button");
    todoDiv.appendChild(editButton);

    todoList.appendChild(todoDiv);
  });
}

// Remove Todo from localStorage
function removeLocalTodo(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
