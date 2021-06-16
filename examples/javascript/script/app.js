'use strict';

const getTasks = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
const setTasks = (tasks) => localStorage.setItem('todoList', JSON.stringify(tasks));
let tasks = getTasks();
let main = document.querySelector('.main');
let footer = document.querySelector('.footer');

const hide = () => {
    if (tasks.length === 0) {
        main.classList.add('hidden');
        footer.classList.add('hidden');
    } else {
        main.classList.remove('hidden');
        footer.classList.remove('hidden');
    }
}

hide();

const createItem = (task, status, index) => {
    const item = document.createElement('li');
    item.classList.add('todo-item');
    item.innerHTML = `
        
        <input type="checkbox" class="toggle" name="items" ${status} data-index=${index}>
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
    if (tasks.length === 1){
        todoCount.innerHTML = `${tasks.length} item left`
        
    }else{
        todoCount.innerHTML = `${tasks.length} items left`
    }
    document.getElementById('toggle-all').addEventListener('click',function toggle(){
        var checkboxes = document.getElementsByName('items');
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i] != this){
                checkboxes[i].checked = this.checked;
            }
            console.log(checkboxes[i])
            if (checkboxes[i].checked === true){
                tasks[i].status = 'checked'
                setTasks(tasks);
                todoCount.innerHTML = `0 items left`
            }else{
                tasks[i].status = ''
                setTasks(tasks);
                todoCount.innerHTML = `${tasks.length} items left`
            }
            
    }

          
    })
}

const insertItem = (event) => {
    const key = event.key;
    const task = event.target.value;
    if (key === 'Enter') {
        tasks.push({ 'task': task, 'status': '' });
        setTasks(tasks);
        render();
        hide();
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




const doubleClick = (event) =>{
    const element = event.target
    
    element.innerHTML = `
        <li>
        <input  id="newTodo"  autofocus>
        </li>
    `
}

document.getElementById('newTodo').addEventListener('keypress', insertItem);
document.getElementById('todoList').addEventListener('click', clickItem);

document.getElementById('todoList').addEventListener('dblclick', doubleClick );

render();