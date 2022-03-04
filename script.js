const taskInput = document.querySelector(".task-input input");
let todos = JSON.parse(localStorage.getItem("todo-list"));
let taskBox = document.querySelector(".task-box");
let filters = document.querySelectorAll(".filters span");
let editId;
let isEditedTask = false;

filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector("span.active").classList.remove("active");
    btn.classList.add("active");
    showTodoTasks(btn.id);
  });
});
  //when click on keboard apply this
taskInput.addEventListener("keyup", (e) => {
  // add tasks in local storage
  let userTask = taskInput.value.trim();
  if (e.key === "Enter" && userTask) {
    let todos = JSON.parse(localStorage.getItem("todo-list"));
    if (!isEditedTask) { //if isEditedTask isnt true
      if (!todos) { 
        todos = [];  //if todos isnt exisit pass to array
      }
      let taskInfo = { name: userTask, status: "pending" };
      todos.push(taskInfo); //add new task to todos array
    } else {
      isEditedTask = false;
      todos[editId].name = userTask;
    }

    taskInput.value = "";

    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodoTasks("all");
  }
});
// show task was store in local storage in app page
function showTodoTasks(filter) {
  let todos = JSON.parse(localStorage.getItem("todo-list"));
  let li = " ";
  if (todos) {
    todos.forEach((todo, id) => {
      //if todo status is completed  set status is completed value to checked
      let isCompleted = todo.status == "completed" ? "checked" : " ";
      if (filter == todo.status || filter == "all") {
        li += `<li class="task">
        <label for="${id}">
         <input type="checkbox" id="${id}" onclick = "updateStatus(this)" ${isCompleted}>
         <p class ='${isCompleted}'>${todo.name}</p>
 </label>
     <div class="setting">
        <i class="fa-regular fa-pen-to-square" onclick =" editTasks(${id},'${todo.name}')"></i>
         <i class="fa-regular fa-trash-can" onclick = "deleteTasks(${id})"></i>
    </div>
</li>`;
      }
    });
  }
  taskBox.innerHTML = li;
}
showTodoTasks("all");

// edite tasks function 
function editTasks(taskId, taskName) {
  editId = taskId;
  isEditedTask = true;
  taskInput.value = taskName;
}

//Deleting Function  for tasks
function deleteTasks(deletedId) {
  //remove selected task form array in local storage
  todos.splice(deletedId, 1);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodoTasks();
}

//  update status to show on filters
function updateStatus(selectedTask) {
  //getting paragraph that contains task name
  let taskName = selectedTask.parentElement.lastElementChild;
  if (selectedTask.checked) {
    // updating status to completly
    todos[selectedTask.id].status = "completed";
    taskName.classList.add("checked");
  } else {
    taskName.classList.remove("checked");
    todos[selectedTask.id].status = "pending";
  }
  localStorage.setItem("todo-list", JSON.stringify(todos));
}






