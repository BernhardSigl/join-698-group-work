let currentDraggedElement;
let assignedUserDetail;
let taskPriority;
let subtaskHeadline;
let inProgress;
let finished;

/**
 * This function to initializes the active user on the board, the shown tasks for the user and the html for board 
 * 
 */
async function initBoard() {
    loadActivUser();
    await currentUserTaskLoad();
    updateBoardHTML();
}

/**
 * This eventlistener starts the rotation of a dragged card
 * 
 */
document.addEventListener('dragstart', function (e) {
    if (e.target.classList.contains('task')) {
        e.target.classList.add('rotating');
    }
});

/**
 * This eventlistener stops the rotation of a dragged card
 * 
 */
document.addEventListener('dragend', function (e) {
    if (e.target.classList.contains('task')) {
        e.target.classList.remove('rotating');
    }
});

/**
 * This function is used to clear all values of the tasks array
 * 
 */
async function clearArray() {
    tasks.splice(0, tasks.length);
    currentId = ""
    await currentUserTaskSave();
    await currentUserIdSave();
}

/**
 * This function filters the tasks array for title and description  
 * @returns new arrays for every element of the content who matches with the value of the searchInput 
 */
function searchTasks() {
    document.getElementById('contentposition').classList.add('d-none');
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    console.log("searching")
    return tasks.filter(task =>
        task.title.toLowerCase().includes(searchValue) ||
        task.description.toLowerCase().includes(searchValue)
    );
}

/**
 * This function displays the results of the search
 * 
 */
function renderSearchResults() {
    document.getElementById('searchLogo').classList.add('d-none');
    document.getElementById('searchClose').classList.remove('d-none')
    // x d-none weg lupe d-none hin x onclick = reset function to normal board view
    let results = searchTasks();
    let resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = '';
    resultsContainer.innerHTML = /*html*/`
    <div id='searchedTodo'><span class="fontSize20"><b>To do</b></span></div>
    <div id='searchedInProgress'><span class="fontSize20"><b>In progress</b></span></div>
    <div id='searchedAwaitFeedback'> <span class="fontSize20"><b>Await Feedback</b></span></div>
    <div id='searchedDone'><span class="fontSize20"><b>Done</b></span></div>
    `;
    renderSearchedToDo(results);
    renderSearchedInProgress(results);
    renderSearchedAwaitFeedback(results);
    renderSearchedDone(results);
}

function renderSearchedToDo(results) {
    let searchResult = results.filter(t => t['status'] == 'toDo');
    console.log(searchResult)
    if (searchResult.length === 0) {
        document.getElementById('searchedTodo').innerHTML = /*html*/ ` 
        <span class="fontSize20"><b>To do</b></span>
        <div class="status-empty">No tasks To do</div>
        `;
    } else {
        // document.getElementById('searchedTodo').innerHTML = '';
        for (let index = 0; index < searchResult.length; index++) {
            const element = searchResult[index];
            document.getElementById('searchedTodo').innerHTML += generateTaskHTML(element);
        }
    }
}

function renderSearchedInProgress(results) {
    let searchResult = results.filter(t => t['status'] == 'in-progress');
    console.log(searchResult)
    if (searchResult.length === 0) {
        document.getElementById('searchedInProgress').innerHTML = /*html*/ ` 
        <span class="fontSize20"><b>In progress</b></span>
        <div class="status-empty">No tasks In progress</div>
        `;
    } else {
        // document.getElementById('searchedTodo').innerHTML = '';
        for (let index = 0; index < searchResult.length; index++) {
            const element = searchResult[index];
            document.getElementById('searchedInProgress').innerHTML += generateTaskHTML(element);
        }
    }
}

function renderSearchedAwaitFeedback(results) {
    let searchResult = results.filter(t => t['status'] == 'awaiting-feedback');
    console.log(searchResult)
    if (searchResult.length === 0) {
        document.getElementById('searchedAwaitFeedback').innerHTML = /*html*/ ` 
        <span class="fontSize20"><b>Await Feedback</b></span>
        <div class="status-empty">No tasks Await Feedback</div>
        `;
    } else {
        // document.getElementById('searchedTodo').innerHTML = '';
        for (let index = 0; index < searchResult.length; index++) {
            const element = searchResult[index];
            document.getElementById('searchedAwaitFeedback').innerHTML += generateTaskHTML(element);
        }
    }
}

function renderSearchedDone(results) {
    let searchResult = results.filter(t => t['status'] == 'done');
    console.log(searchResult)
    if (searchResult.length === 0) {
        document.getElementById('searchedDone').innerHTML = /*html*/ ` 
        <span class="fontSize20"><b>Done</b></span>
        <div class="status-empty">No tasks Done</div>
        `;
    } else {
        // document.getElementById('searchedTodo').innerHTML = '';
        for (let index = 0; index < searchResult.length; index++) {
            const element = searchResult[index];
            document.getElementById('searchedDone').innerHTML += generateTaskHTML(element);
        }
    }
}

/**
 * This functions clears the searchinput and switchs the x symbol of it back to searchsymbol
 * 
 */
function clearInput() {
    document.getElementById('searchInput').value = '';
    document.getElementById('searchResults').innerHTML = '';
    document.getElementById('searchLogo').classList.remove('d-none');
    document.getElementById('searchClose').classList.add('d-none')
    document.getElementById('contentposition').classList.remove('d-none');
}

/** 
 * This eventlistener is fired when the textbox is focused
 *  
 */
document.getElementById('searchInput').addEventListener("focus", changeDivColor);

/**
 * This function changes the bordercolor of the searchbar
 * 
 */
function changeDivColor() {
    document.getElementById('fake-searchbar').style.borderColor = "#29ABE2";
}

/**
 * This eventlistener removes the focus of the searchbar
 * 
 */
document.getElementById('searchInput').addEventListener("blur", revertDivColor);

/**
 * This function changes the border color of the searchbar back to default
 * 
 */
function revertDivColor() {
    document.getElementById('fake-searchbar').style.borderColor = "#A8A8A8";
}

/**
 * It prevents the default behavior of the browser (which blocks dragging by default)
 * 
 * @param {DragEvent} ev - The drag event object
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * This function sets the new status of the element when it's dropped and updates the BoardHtml
 * 
 * @param {string} status - The status of the selected element
 */
async function moveTo(status) {
    tasks[currentDraggedElement]['status'] = status;
    await currentUserTaskSave();
    updateBoardHTML();
    removeHighlight(status);
}

/**
 * This function highlights the area which the selected element is dragged at or over
 * 
 * @param {string} id - The id of the element to be highlighted
 */
function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

/**
 * This function removes highlight from selected element
 * 
 * @param {string} id - The id of the element to be highlighted 
 */
function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}

/**
 * This function updates the board
 * 
 */
function updateBoardHTML() {
    renderToDo();
    renderInProgress();
    renderAwaitingFeedback();
    renderDone();
}

/**
 * This function renders tasks with the status todo
 * 
 */
function renderToDo() {
    let todo = tasks.filter(t => t['status'] == 'toDo');
    if (todo.length === 0) {
        document.getElementById('toDo').innerHTML = /*html*/ ` 
        <div class="status-empty">No tasks To do</div>
        `;
    } else {
        document.getElementById('toDo').innerHTML = '';
        for (let index = 0; index < todo.length; index++) {
            const element = todo[index];
            document.getElementById('toDo').innerHTML += generateTaskHTML(element);
        }
    }
}

/**
 * This function renders tasks with the status in progress
 * 
 */
function renderInProgress() {
    let inProgress = tasks.filter(t => t['status'] == 'in-progress');
    if (inProgress.length === 0) {
        document.getElementById('in-progress').innerHTML = /*html*/ ` 
        <div class="status-empty">No tasks In progress</div>
        `;
    } else {
        document.getElementById('in-progress').innerHTML = '';
        for (let index = 0; index < inProgress.length; index++) {
            const element = inProgress[index];
            document.getElementById('in-progress').innerHTML += generateTaskHTML(element);
        }
    }
}

/**
 * This function renders tasks with the status awaiting feedback
 * 
 */
function renderAwaitingFeedback() {
    let awaitingFeedback = tasks.filter(t => t['status'] == 'awaiting-feedback');
    if (awaitingFeedback.length === 0) {
        document.getElementById('awaiting-feedback').innerHTML = /*html*/ ` 
        <div class="status-empty">No tasks Await Feedback</div>
        `;
    } else {
        document.getElementById('awaiting-feedback').innerHTML = '';
        for (let index = 0; index < awaitingFeedback.length; index++) {
            const element = awaitingFeedback[index];
            document.getElementById('awaiting-feedback').innerHTML += generateTaskHTML(element);
        }
    }
}

/**
 * This function renders tasks with the status done
 * 
 */
function renderDone() {
    let done = tasks.filter(t => t['status'] == 'done');
    if (done.length === 0) {
        document.getElementById('done').innerHTML = /*html*/ ` 
        <div class="status-empty">No tasks Done</div>
        `;
    } else {
        document.getElementById('done').innerHTML = '';
        for (let index = 0; index < done.length; index++) {
            const element = done[index];
            document.getElementById('done').innerHTML += generateTaskHTML(element);
        }
    }
}


/**
 * This function generates a small task card based on the given element
 * 
 * @param {Object} - The task element 
 * @returns {string} - The generated HTML string representing the task
 */
function generateTaskHTML(element) {
    let i = element['id']
    let users = element['contactAbbreviation']
    let colors = element['contactColor']
    let assignedUser = '';

    for (let j = 0; j < users.length; j++) {
        let user = users[j];
        let color = colors[j]
        assignedUser += /*html*/ ` 
       <div class="profile-picture horicontal-and-vertical fontSize12" style="background-color:${color}">${user}</div>`;
    }
    let mover = /*html*/ `  
    <div class="move">
        <div class="dropup">
            <button class="dropbtn">Move</button>
            <div class="dropup-content">
                <a href="#" onclick="switchStatusToDo(${i})">To Do</a>
                <a href="#" onclick="switchStatusToInProgress(${i})">In Progress</a>
                <a href="#" onclick="switchStatusToAwaitFeedback(${i})">Await Feedback</a>
                <a href="#" onclick="switchStatusToDone(${i})">Done</a>
            </div>
        </div>
    </div>
    `;
    return /*html*/ `
        <div draggable="true" ondragstart="startDragging(${element['id']})"  class="task">
            <div onclick="openTask(${i})"> 
                <div class="task-top fontSize16">
                    <div class="task-category" style="${element['categoryColor']}">${element['category']}</div>
                    <div id="move-container">  </div>
                    <span class="task-title fontSize16">${element['title']}</span>
                    <div class="task-description show-scrollbar"> ${element['description']}</div>
                </div>
                ${updateProgressbar(element)}
                <div class="task-users-prio">
                    <div class="task-users">
                    ${assignedUser}
                    </div>
                    <img src="${element['priority']}">
                </div>
            </div>
            ${mover}
        </div>
    `;
}



async function switchStatusToDo(i) {
    let index = tasks.findIndex(task => task.id === i);
    currentDraggedElement = index;
    tasks[currentDraggedElement]['status'] = "toDo";
    await currentUserTaskSave();
    updateBoardHTML();
}

async function switchStatusToInProgress(i) {
    let index = tasks.findIndex(task => task.id === i);
    currentDraggedElement = index;
    tasks[currentDraggedElement]['status'] = "in-progress";
    await currentUserTaskSave();
    updateBoardHTML();
}
 
async function switchStatusToAwaitFeedback(i) {
    let index = tasks.findIndex(task => task.id === i);
    currentDraggedElement = index;
    tasks[currentDraggedElement]['status'] = "awaiting-feedback";
    await currentUserTaskSave();
    updateBoardHTML();
}

async function switchStatusToDone(i) {
    let index = tasks.findIndex(task => task.id === i);
    currentDraggedElement = index;
    tasks[currentDraggedElement]['status'] = "done";
    await currentUserTaskSave();
    updateBoardHTML();
} 

/**
 *This function updates the progress bar based on the finished subtasks 
 *  
 * @param {Object} - The task element 
 * @returns {string} The generated HTML string representing the progress bar
 */
function updateProgressbar(element) {
    let openSubasks = element['subtasksInProgress'].length
    let finishedSubasks = element['subtasksFinish'].length
    let allSubtasks = openSubasks + finishedSubasks
    let percent = finishedSubasks / allSubtasks;
    percent = Math.round(percent * 100);

    return /*html*/ `  
    <div class="task-progress">
        <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="height: 8px; width: 50%; background-color: #F4F4F4">
            <div class="progress-bar" style="background-color: #4589FF; width:${percent}%">
            </div> 
        </div>
        <span class="fontSize12">${finishedSubasks}/${allSubtasks} Subtasks
        </span>
    </div> `
}


/**
 * This function sets the global variable 'currentDraggedElement' with the index of the task having the specified ID
 * 
 * @param {number} id - The id of the task to find
 */
function startDragging(id) {
    let index = tasks.findIndex(task => task.id === id);
    currentDraggedElement = index;
}


/**
 * This function finds the task by its ID and triggers rendering its detailed view
 * 
 * @param {number} i - The id of the task to open
 */
async function openTask(i) {
    let index = tasks.findIndex(task => task.id === i);
    renderTaskdetailHTML(index)
}


/**
 * This function renders the detail view of the task
 * 
 * @param {number} i - The id of the task to render
 */
function renderTaskdetailHTML(i) {
    findAssignedUnser(i);
    showSubtasksInProgress(i);
    showSubtasksFinished(i);
    renderPriorityText(i)
    createHTML(i)
}


/**
 * This function renders the subtask headline 
 * 
 * @returns - The generated HTML string representing the subtask headline
 */
function renderSubtaskHeadline() {
    return subtaskHeadline = /*html*/ `
    <div class="task-detail-font-color margin-bottom10">
     Subtasks
    </div>`
}


/**
 * This function shows the subtasks in progress, if available
 * 
 * @param {number} i - The id of the task
 */
function showSubtasksInProgress(i) {
    inProgress = '';
    let subtasksProgress = tasks[i]['subtasksInProgress'];

    subtaskHeadline = '';
    for (let k = 0; k < subtasksProgress.length; k++) {
        let subtaskProgress = subtasksProgress[k];
        renderSubtaskHeadline()
        inProgress += /*html*/ ` 
        <div class="task-detail-flex margin-bottom10">
            <img onclick="switchSubtaskStatusToFinished(${i}, ${k})" class="task-box" src="img/addTaskBox.svg" alt="">
            ${subtaskProgress}
        </div>
        `;
    }
    updateBoardHTML();
}


/**
 * This function shows the finished subtasks, if available
 * 
 * @param {number} i - The id of the task 
 */
function showSubtasksFinished(i) {
    finished = '';
    let subtasksDone = tasks[i]['subtasksFinish']
    for (let l = 0; l < subtasksDone.length; l++) {
        let subtaskDone = subtasksDone[l];
        renderSubtaskHeadline()
        finished += /*html*/ ` 
       <div class="task-detail-flex margin-bottom10 text-line-through">
           <img onclick="switchSubtaskStatusToUndone(${i},${l})" class="task-box" src="img/done.svg" alt="">
           ${subtaskDone}
       </div>`
    }
    updateBoardHTML();
}


/**
 * This function renders the priority
 * 
 * @param {number} i - The id of the task 
 */
function renderPriorityText(i) {
    let prioLow = "./img/prioLow.svg"
    let prioMedium = "./img/prioMedium.svg"
    let prioUrgent = "./img/prioUrgent.svg"
    taskPriority = "";
    if (prioLow === tasks[i]['priority']) {
        taskPriority = "Low"
    }
    if (prioMedium === tasks[i]['priority']) {
        taskPriority = "Medium"
    }
    if (prioUrgent === tasks[i]['priority']) {
        taskPriority = "Urgent"
    }
}


/**
 * This function renders the detailed task
 * 
 * @param {number} i - The id of the task
 */
function createHTML(i) {
    document.getElementById('popup-container').classList.remove('d-none');
    document.getElementById('popup-container').innerHTML = /*html*/ `
    <div class="task-detail">
            <div class="task-detail-content-container">
                <div class="task-detail-top">
                    <div class="task-detail-category" style="${tasks[i]['categoryColor']}"> ${tasks[i]['category']}</div>
                    <img onclick="closeTask()" src="img/crossAddTask.svg" alt="close" class="close-hover">
                </div>
                <div class="task-detail-content">
                    <div class="task-detail-title">
                        <h2>${tasks[i]['title']}</h2>
                    </div>
                    <div class="task-description show-scrollbar">
                        ${tasks[i]['description']}
                    </div>
                    <div class="task-detail-flex">
                        <div class="task-detail-font-color">Due date:</div>
                        <div> ${tasks[i]['dueDate']}</div>
                    </div>
                    <div class="task-detail-flex">
                        <div class="task-detail-font-color">Priority:</div>
                        <div class="priority-container">
                            <div>${taskPriority}</div>
                            <img src="${tasks[i]['priority']}">
                        </div>
                    </div>
                    <div>
                        <div class="margin-bottom10 task-detail-font-color">Assigned To:</div>
                        <div class="task-detail-users">                            
                        ${assignedUserDetail}
                        </div>
                    </div>
                    <div class="task-detail-subtasks">                        
                        ${subtaskHeadline}
                        ${inProgress}
                        ${finished}
                    </div>
                </div>
            </div>
            <div class="task-detail-bottom">
                <div onclick="deleteTask(${i})" class="delete-edit-buttons">
                    <img  src="img/subTaskDelete.svg" alt="">Delete
                </div>
                <img src="img/vector_detail_card.svg" alt="">
                <div onclick="editTaskNew(${i})" class="delete-edit-buttons">
                    <img  src="img/PenAddTask 1=edit.svg" alt="">Edit
                </div>
            </div>
        </div>
    `;
}


/**
 * This function shows the assigned user on the detailed task
 * 
 * @param {number} i - The id of the task
 * @returns - The generated HTML string representing the assigned User
 */
function findAssignedUnser(i) {
    let userNames = tasks[i]['contactName'];
    let users = tasks[i]['contactAbbreviation'];
    let colors = tasks[i]['contactColor'];
    assignedUserDetail = '';
    for (let j = 0; j < users.length; j++) {

        let user = users[j];
        let userName = userNames[j]
        let color = colors[j]
        assignedUserDetail += /*html*/ ` 
        <div class="user-details">
            <div class="profile-picture horicontal-and-vertical" style="background-color:${color}">
                ${user}
            </div>
            <div class="user-name">
                ${userName}
            </div>   
        </div>
        `;
    }
    return assignedUserDetail

}


/**
 * This function switches the status ob a subtask to finished
 * @param {number} i - The id of the task
 * @param {number} k - The id of the undone subtask
 */
async function switchSubtaskStatusToFinished(i, k) {
    let splicedSubtask = tasks[i]['subtasksInProgress'].splice(k, 1)
    tasks[i]['subtasksFinish'].push(splicedSubtask)
    await currentUserTaskSave();
    renderTaskdetailHTML(i);
}

/**
 * This function switches the status ob a subtask to undone
 * @param {number} i - The id of the task 
 * @param {number} k - The id of the done subtask
 */
async function switchSubtaskStatusToUndone(i, l) {
    let splicedSubtask = tasks[i]['subtasksFinish'].splice(l, 1)
    tasks[i]['subtasksInProgress'].push(splicedSubtask)
    await currentUserTaskSave();
    renderTaskdetailHTML(i);
}

/**
 * This function closes the detail view of a task
 * 
 */
function closeTask() {
    document.getElementById('popup-container').classList.add('d-none');
}

/**
 * This function deletes a task
 * 
 * @param {number} i - The id of the task
 */
async function deleteTask(i) {
    tasks.splice(i, 1);
    await currentUserTaskSave();
    closeTask();
    updateBoardHTML();
}