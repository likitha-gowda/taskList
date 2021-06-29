// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {

    //DOM Load event
    document.addEventListener('DOMContentLoaded',getTasks);
  //add task
  form.addEventListener('submit', addTask);

  //Remove task event
  taskList.addEventListener('click',removeTask);

  //clear task event
  clearBtn.addEventListener('click',clearTasks);

  //filter tasks events
  filter.addEventListener('keyup',filterTask);
}

//Get task from LS 
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
  
    tasks.forEach(function(task){
      // Create li element
      const li = document.createElement('li');
      // Add class
      li.className = 'collection-item';
      // Create text node and append to li
      li.appendChild(document.createTextNode(task));
      // Create new link element
      const link = document.createElement('a');
      // Add class
      link.className = 'delete-item secondary-content';
      // Add icon html
      link.innerHTML = '<i class="fa fa-times title="delete task"></i>';
      // Append the link to li
      li.appendChild(link);
  
      // Append li to ul
      taskList.appendChild(li);
    });
  }

  // Add Task
function addTask(e) {
  if(taskInput.value === '') {
    alert('Add a task');
  }

  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="fas fa-times" title="delete task"></i>';
  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  //Store in local storage
  storeTaskInLocalStorage(taskInput.value);

  
  // Clear input
  taskInput.value = '';

  e.preventDefault();
}

//store task
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];

    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

//remove task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure??')){
        e.target.parentElement.parentElement.remove();

        //remove task from LS
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}
//Remove from LS
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];

    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task,index){
        if(taskItem.textContent===task){
            tasks.splice(index,1);
        }

    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
     
}

//Clear Tasks
function clearTasks(e){
    // taskList.innerHTML='';

    //Faster  than above one
    while(taskList.firstChild){//if there exists any tasks
        taskList.removeChild(taskList.firstChild);
    }

    //clear task from ls
    clearTaskFromLocalStorage();
}

//Clear task from local storage
function clearTaskFromLocalStorage(){
    localStorage.clear();
}
//Filter tasks
function filterTask(e){
      const text=e.target.value.toLowerCase();
      document.querySelectorAll('.collection-item').forEach
      (function(task){
          const item=task.firstChild.textContent;
          if(item.toLowerCase().indexOf(text)!=-1){
            task.style.display='block';
          }else{
            task.style.display='none';
          }
      });//to get all the task list
}


  
