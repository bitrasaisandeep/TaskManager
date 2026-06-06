const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks();

function addTask() {

    if(taskInput.value.trim() === ""){
        alert("Enter a task");
        return;
    }

    tasks.push({
        text: taskInput.value,
        completed:false
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskInput.value = "";

    displayTasks();
}

function displayTasks(){

    taskList.innerHTML = "";

    tasks.forEach((task,index)=>{

        let li = document.createElement("li");

        if(task.completed){
            li.classList.add("completed");
        }

        li.innerHTML = `
            <span>${task.text}</span>

            <div class="actions">
                <button onclick="completeTask(${index})">✔</button>
                <button onclick="editTask(${index})">✏</button>
                <button onclick="deleteTask(${index})">🗑</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

function completeTask(index){

    tasks[index].completed =
    !tasks[index].completed;

    localStorage.setItem("tasks",
    JSON.stringify(tasks));

    displayTasks();
}

function editTask(index){

    let updatedTask =
    prompt("Edit Task",
    tasks[index].text);

    if(updatedTask !== null){

        tasks[index].text =
        updatedTask;

        localStorage.setItem("tasks",
        JSON.stringify(tasks));

        displayTasks();
    }
}

function deleteTask(index){

    tasks.splice(index,1);

    localStorage.setItem("tasks",
    JSON.stringify(tasks));

    displayTasks();
}
