const input=document.getElementById("input");
const addBtn=document.getElementById("addBtn");
const taskContainer=document.getElementById("task-container");

window.addEventListener("DOMContentLoaded",()=>{
const savedTasks=JSON.parse(localStorage.getItem("tasks"))||[];
savedTasks.forEach(text=>createTask(text));
});

function addTask(){
const taskText=input.value.trim();
if(taskText==="")return;
createTask(taskText);
input.value="";
updateLocalStorage();
}

function createTask(text){
const task=document.createElement("div");
task.className="task-item";
const taskLabel=document.createElement("span");
taskLabel.textContent="📝 "+text;
const deleteBtn=document.createElement("button");
deleteBtn.textContent="Delete";
deleteBtn.onclick=()=>{
task.remove();
updateLocalStorage();
};
task.appendChild(taskLabel);
task.appendChild(deleteBtn);
taskContainer.appendChild(task);
}

function updateLocalStorage(){
const tasks=Array.from(document.querySelectorAll(".task-item span"))
.map(task=>task.textContent.replace("📝 ",""));
localStorage.setItem("tasks",JSON.stringify(tasks));
}

addBtn.addEventListener("click",addTask);
input.addEventListener("keypress",e=>{
if(e.key==="Enter")addTask();
});
