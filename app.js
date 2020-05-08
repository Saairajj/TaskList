// Create UI Variabless

const taskList = document.querySelector('.collection');
const form = document.querySelector('#form-task');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInp = document.querySelector('#task');

// Call the event listener function
loadEventListener();

// Load all the event Listener
function loadEventListener(){
  form.addEventListener('submit', runTask);
}

// Event listener for DOM
document.addEventListener('DOMContentLoaded', getTasks);


// Event listener for removing task
taskList.addEventListener('click', removeTask);

// Event listener for clearing all events
clearBtn.addEventListener('click', clearTask);

// Event listener for Filter
filter.addEventListener('keydown', filterTsk); 

// Get task from Local Storage
function getTasks(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  };
  // tasks.push(task);

  // localStorage.setItem('tasks', JSON.stringify(tasks));

  tasks.forEach(function(task){
  //   if(taskInp.value === '' ){
  //     alert('Add some Task');
  //   }
  
    // if the task is inserted create a li
      const li = document.createElement('li');
    
      // add class to li
      li.className = 'collection-item';
    
      // add text node to the li which is user input
      li.appendChild(document.createTextNode(task));
    
      // Create a new link tag for delete icon
      const link = document.createElement('a');
    
      // add class to a
      link.className = 'delete-item secondary-content'; //secondary content shifts the content to the right side
    
      // add <i> tag using inner html
      link.innerHTML = '<i class = "fa fa-remove"></i>';
    
      // Append link to li
      li.appendChild(link);
  
    // console.log(li);
    
    // Append li to ul
    taskList.appendChild(li);
    });
  };

// Adding task
function runTask(e){
  // Check if the task is inserted or not 
  if(taskInp.value === '' ){
    alert('Add some Task');
  }

  // if the task is inserted create a li
  const li = document.createElement('li');

  // add class to li
  li.className = 'collection-item';

  // add text node to the li which is user input
  li.appendChild(document.createTextNode(taskInp.value));

  // Create a new link tag for delete icon
  const link = document.createElement('a');

  // add class to a
  link.className = 'delete-item secondary-content'; //secondary content shifts the content to the right side

  // add <i> tag using inner html
  link.innerHTML = '<i class = "fa fa-remove"></i>';

  // Append link to li
  li.appendChild(link);

  // console.log(li);
  
  // Append li to ul
  taskList.appendChild(li);

  // Call the store to LS function
  storeToLocalStorage(taskInp.value);

  taskInp.value = '';


  e.preventDefault();
};

function storeToLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Removing tasks
function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure ?')){
      e.target.parentElement.parentElement.remove();

      // Also remove from LS
      removeFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
};

// Removing from Local Storage
function removeFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index ){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
};


// Clearing tasks
function clearTask(e){
  if(confirm('Clear All?')){
    // taskList.innerHTML = '';

    while(taskList.firstChild){
      taskList.removeChild(taskList.firstChild); //More efficient way
    }

    // Also clear from Local Storage
    clearFromLocalStorage();
  };
  // Clear LS
  function clearFromLocalStorage(){
    localStorage.clear();
  }
}

// filtering tasks
function filterTsk(e){
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    }else{
      task.style.display = 'none';
    }
  });
};