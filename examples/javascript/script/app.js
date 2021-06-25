'use strict';

// Variáveis 
const getTasks = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
const setTasks = (tasks) => localStorage.setItem('todoList', JSON.stringify(tasks));
let tasks = getTasks();


// Eventos
document.getElementById('newTodo').addEventListener('keypress', insertTask);
document.getElementById('todoList').addEventListener('click', clickItem);
document.getElementById('toggle-all').addEventListener('click', toggleAll);
document.getElementById('clearCompleted').addEventListener('click', clearAll);


//Funções

// Aparecer o footer e o botao de marcar todos so quando tiver tasks
function hide (){
    const main = document.querySelector('.main');
    const footer = document.querySelector('.footer');

    if (tasks.length === 0) {
        main.classList.add('hidden');
        footer.classList.add('hidden');
    } else {
        main.classList.remove('hidden');
        footer.classList.remove('hidden');
    }
}

hide();

// criar a estrutura da task
function createItem(task,status,index) {
    const item = document.createElement('li');
    item.classList.add('todo-item');
    item.innerHTML = `
        
        <input type="checkbox" class="toggle" name="items" ${status} data-index=${index}>
        <label for="">${task}</label>
        <button class="destroy" data-index=${index}></button>
        
    `
    document.getElementById('todoList').appendChild(item);
}

// Apagar tasks repetidas
function clearTasks( ) {
    const todoList = document.getElementById('todoList');
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
}

// Renderizar a pagina por baixo dos panos
function render () {
    clearTasks();
    tasks.forEach((item, index) => createItem(item.task, item.status, index));
    if (tasks.length === 1){
        todoCount.innerHTML = `${tasks.length} item left`
        
    }else{
        todoCount.innerHTML = `${tasks.length} items left`
    }
}

// Inserir task
function insertTask(event) {
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

// Identificar index do elemento
function clickItem (event){
    const element = event.target;
    const index = element.dataset.index;
    if (element.type === 'submit') {
        removeItem(index);
    } else if (element.type === 'checkbox') {
        updateStatus(index);
        if (element.checked === true && !element.classList.contains('completed')){
            element.classList.add('completed')
            

        }else{
            element.classList.remove('completed')
        }
        
        
    }
}

// Remover task
function removeItem (index) {
    tasks.splice(index, 1);
    setTasks(tasks);
    render();
    hide();
}

// Alterar status da task
function updateStatus (index){
    tasks[index].status = tasks[index].status === '' ? 'checked' : '';
    setTasks(tasks);  
    
}

// Excluir todas tasks
function clearAll(){

    let checkboxes = document.getElementsByName('items');
    
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].classList.contains('completed')){
            tasks.splice(checkboxes[i],1)
            
        }
    }
    setTasks(tasks);
    render();
    hide();
}


// Marcar todas tasks
function toggleAll(){
    let checkboxes = document.getElementsByName('items');
    
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i] != this){
            checkboxes[i].checked = this.checked;
        }
        
        if (checkboxes[i].checked === true){
            tasks[i].status = 'checked'
            checkboxes[i].classList.add('completed')
            setTasks(tasks);
            todoCount.innerHTML = `0 items left`
        }else{
            tasks[i].status = ''
            checkboxes[i].classList.remove('completed')
            setTasks(tasks);
            todoCount.innerHTML = `${tasks.length} items left`
        }
    }
}


render();