
async function initSummary() {
    loadActivUser();
    userCircle();
    await loadTasks();
    loadTimeOfDay();
    loadText();
    markCategory();
    addAnimationOnResize();
    animationAdded = false;
}

function loadText() {
    loadUserName();
    loadNumersToDo();
    loadNumersInProgress();
    loadNumersAwaitFeedback();
    loadNumersDone();
    loadNumbersBoard();
}

//----------------------search function------------------------------
//---Search User name----------------------------
function loadUserName() {
    userName = document.getElementById('name')
    userName.innerText = activUser.name;
}

/**
 * This function is used to load a function if someone resize the page
 * 
 */
function addAnimationOnResize() {
    if (window.innerWidth <= 1070) {
        addAnimation();
        animationAdded = true;
    } else if (window.innerWidth > 1070) {
        const greetingText = document.querySelector('.greeting-text');
        greetingText.classList.remove('fade-out');
        greetingText.classList.remove('hidden');
        animationAdded = false;
    }
}

/**
 * This function is used to create an animation to fade out the greeting message
 * 
 */
function addAnimation() {
    const greetingText = document.querySelector('.greeting-text');
    greetingText.classList.add('fade-out');

    setTimeout(function () {
        greetingText.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 3000);
}
//----------------------search function cards------------------------------
function loadNumbersBoard() {
    let toDos = tasks.filter(t => t['status'] == 'toDo').length;
    let inProgress = tasks.filter(t => t['status'] == 'in-progress').length;
    let awaitFeedback = tasks.filter(t => t['status'] == 'awaiting-feedback').length;
    let done = tasks.filter(t => t['status'] == 'done').length;
    let board = document.getElementById('board');
    board.innerText = (toDos + inProgress + awaitFeedback + done);
}


function loadNumersToDo() {
    let toDos = document.getElementById('to-dos');
    toDos.innerText = tasks.filter(t => t['status'] == 'toDo').length;
}


function loadNumersInProgress() {
    let inProgress = document.getElementById('in-progress');
    inProgress.innerText = tasks.filter(t => t['status'] == 'in-progress').length;
}


function loadNumersAwaitFeedback() {
    let awaitFeedback = document.getElementById('await-feedback');
    awaitFeedback.innerText = tasks.filter(t => t['status'] == 'awaiting-feedback').length;
}


function loadNumersDone() {
    let done = document.getElementById('done');
    done.innerHTML = tasks.filter(t => t['status'] == 'done').length;
}


function searchNumbers(collection) {
    let collectionAsJson = collection;
    let currentNumber = 0;

    if (Array.isArray(collectionAsJson)) {
        for (let i = 0; i < collectionAsJson.length; i++) {
            currentNumber++;
        }
    } else {
        for (let i = 0; i < Object.keys(collectionAsJson).length; i++) {
            currentNumber++;
        }
    }
    console.log(date[0]['dueDate'])
    let todo = tasks.filter(t => t['status'] == 'toDo').length;
    let inProgress = tasks.filter(t => t['status'] == 'in-progress').length;
    let awaitingFeedback = tasks.filter(t => t['status'] == 'awaiting-feedback').length;
    let done = tasks.filter(t => t['status'] == 'done').length;
    let allTasks = tasks.length
    let urgent = tasks.filter(t => t['priority'] == './img/prioUrgent.svg').length;
    myFunction(todo, inProgress, awaitingFeedback, done, allTasks, urgent)
}

function myFunction(todo, inProgress, awaitingFeedback, done, allTasks, urgent) {
    document.getElementById('to-dos').innerHTML = todo;
    document.getElementById('done').innerHTML = done;
    document.getElementById('await-feedback').innerHTML = awaitingFeedback;
    document.getElementById('in-progress').innerHTML = inProgress;
    document.getElementById('board').innerHTML = allTasks;
    document.getElementById('urgent').innerHTML = urgent;
}

//----------------- load Time of Day------------------
function loadTimeOfDay() {
    let HoursOfTheDay = document.getElementById('time-of-day');
    HoursOfTheDay.innerHTML = getTimeOfDay();
}

function getTimeOfDay() {
    const currentHour = new Date().getHours();

    if (currentHour >= 0 && currentHour < 6) {
        return `<span class="time-of-day">Schöne </span><span class="time-of-day">Nacht</span>`;
    } else if (currentHour >= 6 && currentHour < 12) {
        return `<span class="time-of-day">Guten </span> <span class="time-of-day"> Morgen</span>`;

    } else if (currentHour >= 12 && currentHour < 18) {
        return `<span class="time-of-day">Guten</span> <span class="time-of-day">Nachmittag</span>`;
    } else {
        return `<span class="time-of-day">Guten  </span class="time-of-day"><span>Abend</span>`;
    }
}

