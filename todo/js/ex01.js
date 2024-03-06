var form = document.querySelector('form');
var inputEl = form.querySelector('input');
var todoItems = document.querySelector('.todoItems');
var dataTodo = [];

form.addEventListener('submit', function (e) {
    e.preventDefault();
    var value = inputEl.value.trim();

    if (value === '') {
        return false;
    }

    var totoItem = createTodo(value);

    todoItems.append(totoItem);
    // Xóa value input
    inputEl.value = '';
    inputEl.focus();
    saveData();
});

function createTodo(todo) {
    // Tạo item
    var itemTodo = document.createElement('div');
    itemTodo.classList.add('item-todo');
    Object.assign(itemTodo.style, {
        marginTop: "10px",
        display: "flex",
        color: "white",
        gap: "10px",
        padding: "8px 10px",
        alignItems: "center",
        backgroundColor: "#8758ff"
    })
    var contentTodo = document.createElement('div');
    contentTodo.classList.add('data');
    Object.assign(contentTodo.style, {
        flex: 1,
    })
    contentTodo.innerText = todo;
    var actionTodo = createActionToDo();
    itemTodo.append(contentTodo, actionTodo);
    return itemTodo;
}


function createActionToDo() {
    var actionEl = document.createElement('div');

    var removeBtn = document.createElement('button');
    removeBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    styleButton(removeBtn);

    var editBtn = document.createElement('button');
    editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    styleButton(editBtn);

    actionEl.append(editBtn, removeBtn);

    removeBtn = removeBtn


    removeBtn.addEventListener('click', function () {
        let parentElement = this.closest('.item-todo');
        parentElement.remove();
        saveData();
    })

    editBtn.addEventListener('click', function () {
        let parentElement = this.closest('.item-todo');
        var value = parentElement.querySelector('.data').innerText;
        parentElement.innerHTML = form.innerHTML;
        var buttonUpdate = parentElement.querySelector('button');
        var inputUpdate = parentElement.querySelector('input');
        buttonUpdate.innerText = "Update";
        inputUpdate.placeholder = "Update task";
        inputUpdate.value = value;
        inputUpdate.focus();
        inputUpdate.addEventListener('keydown', function (e) {
            if (e.which === 13) {
                updateTask();
            }
            saveData();
        })
        buttonUpdate.addEventListener('click', function () {
            updateTask();
        })

        function updateTask() {
            var valueNew = inputUpdate.value.trim();
            if (valueNew === '') {
                return false;
            }
            var todoItem = createTodo(valueNew);
            parentElement.parentElement.insertBefore(todoItem, parentElement);
            parentElement.remove();
            saveData();
        }
    })

    return actionEl;
}

function styleButton(button) {
    Object.assign(button.style, {
        borderRadius: "10px",
        backgroundColor: "#8758ff",
        color: "white",
        border: "none",
        padding: "10px",
        cursor: "pointer"
    })
}

function renderData() {
    var oldTodo = localStorage.getItem('TODO') ? JSON.parse(localStorage.getItem('TODO')) : [];
    if (oldTodo.length) {
        oldTodo.forEach(function (todo) {
            var itemTodo = createTodo(todo);
            todoItems.append(itemTodo);
        })
    }
}

function saveData() {
    var listTodoItem = todoItems.querySelectorAll('.item-todo');
    dataTodo = Array.from(listTodoItem).map(function (todo) {
        var text = '';
        if (todo.querySelector('.data')) {
            text = todo.querySelector('.data').innerText;
        } else {
            text = todo.querySelector('input').value;
        }
        return text;
    })
    localStorage.setItem('TODO', JSON.stringify(dataTodo));
}

renderData();