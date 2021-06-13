'use strict';


const getTasks = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
const setTasks = (tasks) => localStorage.setItem('todoList', JSON.stringify(tasks));

const createItem = (task, status, index) => {
    const item = document.createElement('li');
    item.classList.add('todo-item');
    item.innerHTML = `
        
        <input type="checkbox" class="toggle" ${status} data-index=${index}>
        <label for="">${task}</label>
        <button class="destroy" data-index=${index}></button>
        
    `
    document.getElementById('todoList').appendChild(item);
}

const clearTasks = () => {
    const todoList = document.getElementById('todoList');
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
}

const render = () => {
    clearTasks();
    const tasks = getTasks();
    tasks.forEach((item, index) => createItem(item.task, item.status, index));
}

const insertItem = (event) => {
    const key = event.key;
    const task = event.target.value;
    if (key === 'Enter') {
        const tasks = getTasks();
        tasks.push({ 'task': task, 'status': '' });
        setTasks(tasks);
        render();
        event.target.value = '';
    }
}

const removeItem = (index) => {
    const tasks = getTasks();
    tasks.splice(index, 1);
    setTasks(tasks);
    render();
}

const updateStatus = (index) => {
    const tasks = getTasks();
    tasks[index].status = tasks[index].status === '' ? 'checked' : '';
    setTasks(tasks);
    render();
}

const clickItem = (event) => {
    const element = event.target;
    if (element.type === 'submit') {
        const index = element.dataset.index;
        removeItem(index);
    } else if (element.type === 'checkbox') {
        const index = element.dataset.index;
        updateStatus(index);
    }
}

document.getElementById('newTodo').addEventListener('keypress', insertItem);
document.getElementById('todoList').addEventListener('click', clickItem);

render();