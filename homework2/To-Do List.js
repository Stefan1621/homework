function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskList = document.getElementById("taskList");
  
    if (taskInput.value.trim() === "") {
      alert("Please enter a task.");
      return;
    }
  
    var taskText = taskInput.value;
    var li = document.createElement("li");
    li.innerHTML = '<span onclick="toggleTask(this)">' + taskText + '</span> ' +
                   '<button onclick="editTask(this)">Edit</button> ' +
                   '<button onclick="deleteTask(this)">Delete</button>';
  
    taskList.appendChild(li);
    taskInput.value = "";
  
    saveTasksToLocalStorage();
  }
  
  function toggleTask(span) {
    span.classList.toggle("completed");
    saveTasksToLocalStorage();
  }
  
  function editTask(button) {
    var newTaskText = prompt("Edit task:", button.parentElement.firstChild.textContent);
  
    if (newTaskText !== null) {
      button.parentElement.firstChild.textContent = newTaskText;
      saveTasksToLocalStorage();
    }
  }
  
  function deleteTask(button) {
    if (confirm("Are you sure you want to delete this task?")) {
      button.parentElement.remove();
      saveTasksToLocalStorage();
    }
  }
  
  function saveTasksToLocalStorage() {
    var taskList = document.getElementById("taskList");
    var tasks = [];
  
    for (var i = 0; i < taskList.children.length; i++) {
      var task = {
        text: taskList.children[i].firstChild.textContent,
        completed: taskList.children[i].firstChild.classList.contains("completed")
      };
      tasks.push(task);
    }
  
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  
  function loadTasksFromLocalStorage() {
    var taskList = document.getElementById("taskList");
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
    for (var i = 0; i < tasks.length; i++) {
      var li = document.createElement("li");
      li.innerHTML = '<span onclick="toggleTask(this)"' + (tasks[i].completed ? ' class="completed"' : '') + '>' +
                     tasks[i].text + '</span> ' +
                     '<button onclick="editTask(this)">Edit</button> ' +
                     '<button onclick="deleteTask(this)">Delete</button>';
  
      taskList.appendChild(li);
    }
  }
  
  loadTasksFromLocalStorage();  