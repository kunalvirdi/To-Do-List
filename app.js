// Defining Varibales of UI
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const inputTask = document.querySelector('#task');
const filter = document.querySelector('#filter');

//Load all the event listener
loadEventListeners();

function loadEventListeners() {

    document.addEventListener('DOMContentLoaded',getTasks);
    //Event Listener for adding a task 
    form.addEventListener('submit', addTask);

    //Event listerner for removing a task..
    taskList.addEventListener('click', removeTask);

    //Clear all Tasks
    clearBtn.addEventListener('click', clear);
    
    //Filter
    filter.addEventListener('keyup', filterTasks);
}

function addTask(e) {
    if (inputTask.value === '') {
        alert('Enter Task!');
    } else {
        //Creating List item
        const li = document.createElement('li');

        //Adding class
        li.className = 'collection-item';

        //Adding Text to list
        li.appendChild(document.createTextNode(inputTask.value));

        //Creating delete Icon
        const a = document.createElement('a');
        a.className = 'delete-item secondary-content';
        a.innerHTML = '<i class="fa fa-times"></i>';
        a.style.cursor = 'pointer';
        
        li.appendChild(a);
        //Appending list to parent
        taskList.appendChild(li);
        console.log(taskList);

        //Set task in LS
        setTasksInLocalStorage(inputTask.value);

        inputTask.value = '';
    }
    e.preventDefault();
}

function setTasksInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm(`Are you sure to delete ${e.target.parentElement.parentElement.firstChild.textContent}?`)) {
            e.target.parentElement.parentElement.remove();
        }
    }

    //remove task from local storage
    removeTaskFromLocalStorage( e.target.parentElement.parentElement);
}

function removeTaskFromLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (t, i) {
        if (task.textContent === t) {
            tasks.splice(i, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function clear() {
    if (confirm('Are you sure to delete all the ?')) {
      taskList.innerHTML = '';
    }

    clearLocalStroage();
}

function clearLocalStroage() {
    localStorage.clear();
}



function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text)!=-1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
            
        }
    })
}


function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task) {
        //Creating List item
        const li = document.createElement('li');

        //Adding class
        li.className = 'collection-item';

        //Adding Text to list
        li.appendChild(document.createTextNode(task));

        //Creating delete Icon
        const a = document.createElement('a');
        a.className = 'delete-item secondary-content';
        a.innerHTML = '<i class="fa fa-times"></i>';
        a.style.cursor = 'pointer';
        
        li.appendChild(a);
        //Appending list to parent
        taskList.appendChild(li);
    })
}