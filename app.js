// Creating Variables where we getting from HTML some elements
var taskInput = document.getElementById("new-task");//Add a new task.
var addButton = document.getElementsByTagName("button")[0];//first button
var incompleteTaskHolder = document.getElementById("incomplete-tasks");//ul of #incompleteTasks
var completedTasksHolder = document.getElementById("completed-tasks");//completed-tasks

// Creating new task
var createNewTaskElement = function(taskString){
  //Elements we adding
  var listItem = document.createElement("li");
  var checkBox = document.createElement("input");
  var label = document.createElement("label");
  var editInput = document.createElement("input");
  var editButton = document.createElement("button");
  var deleteButton = document.createElement("button");
  var deleteButtonImg = document.createElement("img");

  label.innerText = taskString;
  label.className = "task";

  //Each elements, needs appending
  checkBox.type="checkbox";
  editInput.type="text";
  editInput.className="task";

  editButton.innerText="edit"; //innerText encodes special characters, HTML does not.
  editButton.className="edit";

  deleteButton.className="delete";
  deleteButtonImg.src="image/icon/remove.svg";
  deleteButton.appendChild(deleteButtonImg);

  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

// Function which adds tasks
var addTask = function(){
  console.log("Add Task..."); 

  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  var listItem = createNewTaskElement(taskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value="";
}

//Edit an existing task.
var editTask = function(){
  console.log("Edit Task..."); // Some output about editting
  console.log("Change 'edit' to 'save'");

  var listItem = this.parentNode;
  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");
  var editBtn = listItem.querySelector(".edit");
  var containsClass = listItem.classList.contains("edit-mode");
  
  if(containsClass){
    //switch to .editmode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  }else{
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }
  //toggle .editmode on the parent.
  listItem.classList.toggle("edit-mode");
};

//Function which deletes task
var deleteTask = function(){
  console.log("Delete Task...");

  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  //Removing child (task)
  ul.removeChild(listItem);
}

//Function which marks task as complete
var taskCompleted = function(){
  console.log("Complete Task...");
  
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

//Function which marks task as incomplete
var taskIncomplete = function(){
  console.log("Incomplete Task...");
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}

// Pseudo Ajax request
var ajaxRequest = function(){
  console.log("AJAX Request");
}

//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

// Function is binding events on other functions
var bindTaskEvents = function(taskListItem,checkBoxEventHandler){
  console.log("bind list item events");
  //select ListItems children
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");

  //Bind editTask to edit button.
  editButton.onclick = editTask;
   //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){
  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}
//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}

