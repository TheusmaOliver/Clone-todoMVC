'use strict';

const getTasks = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
const setTasks = (tasks) => localStorage.setItem('todoList', JSON.stringify(tasks));
let tasks = getTasks();
let markAll = document.querySelector('.main');
let footer = document.querySelector('.footer');

const hide = () => {
    if (tasks.length === 0) {
        markAll.classList.add('hidden');
        footer.classList.add('hidden');
    } else {
        markAll.classList.remove('hidden');
        footer.classList.remove('hidden');
    }
}

hide();

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
    tasks.forEach((item, index) => createItem(item.task, item.status, index));
}

const insertItem = (event) => {
    const key = event.key;
    const task = event.target.value;
    if (key === 'Enter') {
        tasks.push({ 'task': task, 'status': '' });
        setTasks(tasks);
        hide();
        render();
        event.target.value = '';
    }
}



const removeItem = (index) => {
    tasks.splice(index, 1);
    setTasks(tasks);
    render();
    hide();
}

const updateStatus = (index) => {
    tasks[index].status = tasks[index].status === '' ? 'checked' : '';
    setTasks(tasks);
    render();
}

const clickItem = (event) => {
    const element = event.target;
    const index = element.dataset.index;
    if (element.type === 'submit') {
        removeItem(index);
    } else if (element.type === 'checkbox') {
        updateStatus(index);
    }

}

document.getElementById('newTodo').addEventListener('keypress', insertItem);

document.getElementById('todoList').addEventListener('click', clickItem);

render();