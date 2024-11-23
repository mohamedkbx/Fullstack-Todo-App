// selectors
const addButton = document.querySelector(".todo__button");
const inputElement = document.querySelector(".todo__input");
const todoList = document.querySelector(".todo-list");
const filterOptions = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodo);
addButton.addEventListener("click", addTodo);
todoList.addEventListener("click", removeCheeck);
filterOptions.addEventListener("click", filterTodo);
//functions

function addTodo(event) {
  event.preventDefault();
  // todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  const newTodo = document.createElement("li");
  if (!inputElement.value) return;
  newTodo.innerText = inputElement.value;
  newTodo.classList.add("todo__item");
  todoDiv.appendChild(newTodo);

  saveLocalTodo(inputElement.value);
  //check mark button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class ='fas fa-check'></i>`;
  completedButton.classList.add("complete__button");

  todoDiv.appendChild(completedButton);
  //trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = `<i class ='fas fa-trash'></i>`;
  trashButton.classList.add("trash__button");
  todoDiv.appendChild(trashButton);

  todoList.appendChild(todoDiv);

  //clear input
  inputElement.value = "";
  inputElement.focus();
}

function removeCheeck(e) {
  const item = e.target;

  //delete
  if (item.classList[0] === "trash__button") {
    const todo = item.parentElement;

    todo.classList.add("fall");
    removeLocalTodo(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  //check
  if (item.classList[0] === "complete__button") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

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

function getTodo() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  // render ui
  todos.forEach((todo) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");

    newTodo.innerText = todo;
    newTodo.classList.add("todo__item");
    todoDiv.appendChild(newTodo);
    // In the getTodo function
    const editButton = document.createElement("button");
    editButton.innerHTML = `<i class ='fas fa-edit'></i>`;
    editButton.classList.add("edit__button");
    todoDiv.appendChild(editButton);
    //check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class ='fas fa-check'></i>`;
    completedButton.classList.add("complete__button");

    todoDiv.appendChild(completedButton);
    //trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class ='fas fa-trash'></i>`;
    trashButton.classList.add("trash__button");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
  });
}

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
