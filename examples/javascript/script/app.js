'use strict';

const getTasks = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
const setTasks = (tasks) => localStorage.setItem('todoList', JSON.stringify(tasks));

const getCount = () => JSON.parse(localStorage.getItem('count')) ?? [];
const setCount = (count) => localStorage.setItem('count',JSON.stringify(count));
let count = getCount();
let tasks = getTasks();
let todoCount = document.getElementById('todoCount')
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
        count.push({'count': tasks.length})
        setCount(count)
        countTasks(count);
        hide();
        render();
        event.target.value = '';
    }
}

const countTasks = (count) => {
    if(tasks.length === 1){
        todoCount.innerHTML = `
            <span> ${count[0].count} item left</span>
        `;
    }else{
        for (let i = 0; i <tasks.length; i++){

            todoCount.innerHTML = `
                <span> ${count[i].count} items left</span>
            `;
        }
    }
}

const removeItem = (index) => {
    tasks.splice(index, 1);
    setTasks(tasks);

    count.splice(index,1);
    countTasks(count)
    setCount(count);
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

const doubleClick = (event) =>{
    const element = event.target
    
    element.innerHTML = `
        <li class="editing">
        <input class='editing' id="newTodo"  autofocus>
        </li>
    `
}

document.getElementById('newTodo').addEventListener('keypress', insertItem);

document.getElementById('todoList').addEventListener('click', clickItem);
document.getElementById('todoList').addEventListener('dblclick', doubleClick )

render();