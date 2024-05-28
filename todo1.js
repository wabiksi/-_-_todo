const input = document.querySelector("input");
const addButton = document.querySelector(".add-butt");
const todosHtml = document.querySelector(".todos");
let todosJson = JSON.parse(localStorage.getItem("todos")) || [];
const delall = document.querySelector(".delete-all");
const filters = document.querySelectorAll(".filter");
let filter = '';

showTodos();

function getTodoHtml(todo, index) {
    if (filter && filter !== todo.status) {
        return '';
    }
    let checked = todo.status === "completed" ? "checked" : "";
    return `
    <li class="todo">
        <label for="${index}">
            <input id="${index}" type="checkbox" ${checked} onclick="updateStatus(this)">
            <span class="${checked}">${todo.name}</span>
        </label>
        <button class="edit-btn" data-index="${index}" onclick="edit(this)"><i class="fa fa-pencil"></i></button>
        <button class="del-btn" data-index="${index}" onclick="remove(this)"><i class="fa fa-times"></i></button>
    </li>`;
}

function showTodos() {
    if (todosJson.length === 0) {
        todosHtml.innerHTML = '';
    } else {
        todosHtml.innerHTML = todosJson.map(getTodoHtml).join('');
    }
}

function addTodo(todo) {
    input.value = "";
    todosJson.unshift({ name: todo, status: "pending" });
    localStorage.setItem("todos", JSON.stringify(todosJson));
    showTodos();
}

input.addEventListener("keyup", e => {
    let todo = input.value.trim();
    if (!todo || e.key !== "Enter") {
        return;
    }
    addTodo(todo);
});

addButton.addEventListener("click", () => {
    let todo = input.value.trim();
    if (!todo) {
        return;
    }
    addTodo(todo);
});

function updateStatus(todo) {
    let todoName = todo.parentElement.lastElementChild;
    if (todo.checked) {
        todoName.classList.add("checked");
        todosJson[todo.id].status = "completed";
    } else {
        todoName.classList.remove("checked");
        todosJson[todo.id].status = "pending";
    }
    localStorage.setItem("todos", JSON.stringify(todosJson));
    showTodos();
}

function remove(todo) {
    const index = todo.dataset.index;
    todosJson.splice(index, 1);
    showTodos();
    localStorage.setItem("todos", JSON.stringify(todosJson));
}

filters.forEach(function(el) {
    el.addEventListener("click", (e) => {
        filters.forEach(tag => tag.classList.remove('active'));
        el.classList.add('active');
        filter = e.target.dataset.filter;
        showTodos();
    });
});

delall.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all todos?")) {
        todosJson = [];
        localStorage.setItem("todos", JSON.stringify(todosJson));
        showTodos();
    }
});
function edit(button) {
    const index = button.dataset.index;
    const todo = todosJson[index];
    const newName = prompt("Edit todo:", todo.name);
    if (newName !== null) { // Check if the user canceled the prompt
        todosJson[index].name = newName.trim();
        localStorage.setItem("todos", JSON.stringify(todosJson));
        showTodos();
    }
}


