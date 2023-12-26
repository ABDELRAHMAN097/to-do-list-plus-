let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks")

// empty array to store the tasks
let arrayOfTasks = [];
if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}
getDataFromLocalStorage()
//submit added
submit.onclick = function(){
    if(input.value != ""){
        addTasksToArray(input.value);
        input.value = "";
    }
}
tasksDiv.addEventListener("click" , (e) => {
    if (e.target.classList.contains("del")){
        deleteTask(e.target.parentElement.getAttribute("data-id"));
        e.target.parentElement.remove();
    }
    if(e.target.classList.contains("task")){
        toggleState(e.target.getAttribute("data-id"))  
        e.target.classList.toggle("done");
    }
})
function addTasksToArray(taskText){
    //task data
    const task = {
        id: Date.now(),
        title : taskText,
        completed : false,
    };
    //push task to array tasks
    arrayOfTasks.push(task);
    addElementsToPageFrom(arrayOfTasks)
    // add tasks to local storage
    addDataTolocal(arrayOfTasks)
}
function addElementsToPageFrom(arrayOfTasks){
    //empty the tasks div
    tasksDiv.innerHTML = "";
    //looping on array of tasks
    arrayOfTasks.forEach((task) => {
        //create main div
        let div = document.createElement("div");
        div.className = "task";
        //check if task is done
        if(task.completed){
        div.className = "task done";

        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));
        //create delete button
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"));
        //append child to main div
        div.appendChild(span)
        tasksDiv.appendChild(div)
        //delet
        // span.addEventListener("click" , function(){
        //     tasksDiv.removeChild(div)
        // })
    })
}

function addDataTolocal(arrayOfTasks){
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks))
}
function getDataFromLocalStorage(){
    let data = window.localStorage.getItem("tasks");
    if(data){
        let tasks = JSON.parse(data); 
        addElementsToPageFrom(tasks)
    }
}
function deleteTask(taskId){
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addDataTolocal(arrayOfTasks);
}

function  toggleState(taskId){
   for(let i = 0; i < arrayOfTasks.length; i++){
     console.log(`${arrayOfTasks[i].id}`);
     if(arrayOfTasks[i].id == taskId){
        arrayOfTasks[i].completed == false ? arrayOfTasks[i].completed == true : arrayOfTasks[i].completed == false;
     }
     addDataTolocal(arrayOfTasks);
   }
}




 













