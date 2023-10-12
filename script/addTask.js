
let selectedIndex = null;

let selectedColorIndex = null;

let colorCollection = [
    'background: #006400', 'background: #00008B', 'background: #8B0000', 'background: #800080', 'background: #808080', 'background: #0000CD',
    'background: #008000', 'background: #FF0000', 'background: #8A2BE2', 'background: #FFA500', 'background: #2E8B57', 'background: #9932CC',
    'background: #DC143C', 'background: #228B22', 'background: #20B2AA', 'background: #FF1493', 'background: #D2691E', 'background: #00CED1',
    'background: #008080', 'background: #FF6347'
];

let mainCategorys = [{
    'name': ['Technical Task', 'User Story',],
    'color': ['background: #1FD7C1', 'background: #0038FF',],
}];

let allCategorys = [{
    'name': [],
    'color': [],
}];

let subTaskCollection = [];

let subtasksFinish = [];

let contactCollection = [];

let currentCategorySelected = [{
    'name': '',
    'color': '',
}];

let currentPrioSelected = "";

let currentId = 0;

let taskIdForEdit = '';

let statusEdit = '';

let editTask = '';

let statusGroup = '';

loadTaskElements();
//---------------------------------------------------------------------------------//

//Init functions//
async function initAddTask() {
    loadActivUser();
    userCircle();
    statusSelected('toDo')
    await currentUserTaskLoad();
    await currentUserIdLoad();
    await currentUserCategorysLoad();
    markCategory();
    renderAddTaskContent();
}

function renderAddTaskContent() {
    loadTaskElements();
    document.getElementById("addTaskHeadline").innerHTML = 'Add Task';
    let assignTo1 = document.getElementById('assignedToInputContainer');
    let assignTo2 = document.getElementById('assignedToContactsInputContainer');
    let categoryBox1 = document.getElementById('categoryAreaV1');
    let categoryBox2 = document.getElementById('categoryAreaV2');
    let prioBox = document.getElementById('prioBox');
    let buttonArea = document.getElementById('buttonAreaAddTask');
    buttonArea.innerHTML = returnButtonAreaAddTask();
    assignTo1.innerHTML = returnAssignToBox1();
    assignTo2.innerHTML = returnAssignToBox2();
    categoryBox1.innerHTML = returnCategoryBox1();
    categoryBox2.innerHTML = returnCategoryBox2();
    prioBox.innerHTML = returnPrioBox();
    borderColorCheck();
    renderAllSelectedContacts();
    renderAllContactsForSearch();
    renderSubTaskCollection();
}
//---------------------------------------------------------------------------------//

//SubTaskFunctions//
/**
 * Adds a sub-task to the collection.
 */
function addSubTaskToCollection() {
    let input = document.getElementById('subTaskSelectInput');
    if (input.value === '') {
        return;
    } else {
        subTaskCollection.push(input.value);
        saveTaskElements();
        renderSubTaskCollection();
        input.value = '';
    }
}

/**
 * Renders the sub-task collection to the DOM.
 */
function renderSubTaskCollection() {
    let collection = document.getElementById('selectedSubTaskContainer');
    collection.innerHTML = '';
    hideEditContainer();
    for (let i = 0; i < subTaskCollection.length; i++) {
        const subCollection = subTaskCollection[i];
        collection.innerHTML += returnSubTaskCollection(subCollection, i);
    }
}

/**
 * Deletes a sub-task from the collection.
 * @param {number} i - Index of the sub-task.
 */
function deleteSubtaskCollection(i) {
    subTaskCollection.splice(i, 1);
    saveTaskElements();
    renderSubTaskCollection();
}

/**
 * Edits a sub-task.
 * @param {number} i - Index of the sub-task.
 */
function editSubtask(i) {
    let editSub = subTaskCollection[i];
    let inputContainer = document.getElementById('editContainer');
    showEditContainer();
    inputContainer.innerHTML = '';
    inputContainer.innerHTML += returnEditContainer(i);
    let input = document.getElementById('editInput');
    input.value = editSub;
}

/**
 * Confirms the editing of a sub-task.
 * @param {number} i - Index of the sub-task.
 */
function confirmSubEdit(i) {
    let editedInput = document.getElementById('editInput');
    if (editedInput.value === '') {
        subTaskCollection.splice(i, 1);
    } else {
        subTaskCollection[i] = editedInput.value;
    }
    saveTaskElements();
    renderSubTaskCollection();
}

/**
 * cancel the editing of a sub-task.
 */
function stopSubEdit() {
    let editedInput = document.getElementById('editInput');
    editedInput.value = '';
    hideEditContainer();
}

/**
 * show edit window.
 */
function showEditContainer() {
    let inputContainer = document.getElementById('editContainer');
    inputContainer.classList.remove('d-none');
}

/**
 * hide edit window.
 */
function hideEditContainer() {
    let inputContainer = document.getElementById('editContainer');
    inputContainer.classList.add('d-none');
}
//---------------------------------------------------------------------------------//


//AddTask//
/**
 * Validates the form and adds a task if the form is valid.
 */
function createTask() {
    input1 = document.getElementById('categoryInputV1');
    input2 = document.getElementById('categoryInputV2');
    var form = document.getElementById('myForm');
    if (form.checkValidity()) {
        if (currentCategorySelected[0].name === '') {
            input1.classList.add('inputRed');
            input2.classList.add('inputRed');
            setTimeout(function () {
                input1.classList.remove('inputRed');
                input2.classList.remove('inputRed');
            }, 10000);
        } else {
            saveTaskElements();
            addTask();
        }
    }
}

/**
 * Retrieves data from form elements and adds a new task.
 */
async function addTask() {
    let currentPage = window.location.pathname;
    contactNames = contactCollection.map(contact => contact.name);
    contactColors = contactCollection.map(contact => contact.color);
    contactNamesAbbreviation = contactCollection.map(contact => contact.nameAbbreviation);
    let task = {
        'id': currentId,
        'status': statusGroup,
        'category': currentCategorySelected[0].name,
        'categoryColor': currentCategorySelected[0].color,
        'title': document.getElementById("addTitel").value,
        'description': document.getElementById("addDescription").value,
        'dueDate': document.getElementById("datepicker").value,
        'priority': currentPrioSelected,
        'contactName': contactNames,
        'contactColor': contactColors,
        'contactAbbreviation': contactNamesAbbreviation,
        'subtasksInProgress': subTaskCollection,
        'subtasksFinish': subtasksFinish,
    }
    tasks.push(task);
    currentId++;
    await currentUserTaskSave();
    await currentUserIdSave();
    resetAllAddTaskElements();
    changesSaved('Task added to board');
    if (currentPage === '/board.html') {
        document.getElementById('addTaskPop').classList.add('d-none');
        updateBoardHTML();
    } else {
        setTimeout(function () {
            window.location.href = './board.html';
        }, 3000);
    }
}

function statusSelected(status) {
    statusGroup = status;
}

function clearButton() {
    resetAllAddTaskElements();
}

function resetAllAddTaskElements() {
    currentCategorySelected = [{
        'name': '',
        'color': '',
    }];
    subtasksFinish = [];
    subTaskCollection = [];
    selectedIndex = null;
    selectedColorIndex = null;
    currentPrioSelected = "";
    contactCollection = [];
    taskIdForEdit = '';
    statusEdit = '';
    clearAddTaskInputs();
    resetInputs();
    saveTaskElements();
    renderAddTaskContent();
}

function clearAddTaskInputs() {
    let titleAddTask = document.getElementById('addTitel');
    let descriptionAddTask = document.getElementById('addDescription');
    let dueDateAddTask = document.getElementById('datepicker');
    titleAddTask.value = '';
    descriptionAddTask.value = '';
    dueDateAddTask.value = '';
}
//---------------------------------------------------------------------------------//
//Hide and Show functions//
/**
 * Toggles the visibility of two DOM elements.
 * @param {string} id - ID of the first DOM element.
 * @param {string} id2 - ID of the second DOM element.
 */
function toggleVisibilityAddTask(id, id2) {
    const elementOne = document.getElementById(id);
    const elementTwo = document.getElementById(id2);
    if (id === '') {
        elementTwo.classList.remove('d-none');
    } else {
        if (id2 === '') {
            elementOne.classList.add('d-none');
        } else {

            elementOne.classList.add('d-none');
            elementTwo.classList.remove('d-none');
        }
    }
    renderAllSelectedContacts();
    renderCategorys();
    createCategoryWindow();
    borderColorCheck();
    let editWindow = document.getElementById('selectedContactsDeselect');
    editWindow.classList.add('d-none');
}
//---------------------------------------------------------------------------------//


//Contact functions//
/**
 * Renders all selected contacts to the DOM.
 */
function renderAllSelectedContacts() {
    let contactZone = document.getElementById('selectedContactsContainer');
    contactZone.innerHTML = '';
    for (let index = 0; index < contactCollection.length; index++) {
        contactColors = contactCollection[index].color;
        contactNamesAbbreviation = contactCollection[index].nameAbbreviation;
        contactZone.innerHTML += returnRenderAllSelectedContacts(contactColors, contactNamesAbbreviation, index);
    }
}

async function renderAllContactsForSearch(filterText = '') {
    await currentUserContactsLoad();
    let contactZone = document.getElementById('contactsRenderContainer');
    contactZone.innerHTML = '';
    for (let index = 0; index < contactsArray.length; index++) {
        contactColors = contactsArray[index].color;
        contactNamesAbbreviation = contactsArray[index].nameAbbreviation;
        contactNames = contactsArray[index].name;

        if (filterText && !contacts.name.toLowerCase().includes(filterText)) {
            continue;
        }
        contactZone.innerHTML += returnRenderAllContactsForSearch(contactColors, contactNamesAbbreviation, contactNames, index);
    }
}

/**
 * Selects or deselects a contact based on its current state.
 * @param {number} i - Index of the contact.
 * @param {string} key - Key of the contact in the `allContacts` collection.
 */
async function toggleContactSelection(i) {
    await currentUserContactsLoad();
    const contact = contactsArray[i];
    const el = (suffix) => document.getElementById(`${suffix}${i}`);
    const mainElement = el('assignedContactsBox'),
        firstSecondary = el('assignedBox'),
        secondSecondary = el('assignedBoxChecked');

    if (mainElement.classList.contains('assignedContactsBox')) {
        selectContact(mainElement, firstSecondary, secondSecondary);
        if (!contactCollection.some(c => c.name === contact.name && c.color === contact.color)) contactCollection.push(contact);
    } else {
        deselectContact(mainElement, firstSecondary, secondSecondary);
        const index = contactCollection.findIndex(c => c.name === contact.name && c.color === contact.color);
        if (index > -1) contactCollection.splice(index, 1);
    }
    saveTaskElements();
}

/**
 * Checks if a contact is in the `contactCollection`.
 * @param {Object} contact - The contact object to check.
 * @returns {boolean} - True if contact is in the collection, false otherwise.
 */
function isContactInCollection(contact) {
    return contactCollection.includes(contact);
}

/**
 * Sets styles to visually select a contact.
 * @param {HTMLElement} mainElement - Main contact DOM element.
 * @param {HTMLElement} firstSecondary - First secondary DOM element.
 * @param {HTMLElement} secondSecondary - Second secondary DOM element.
 */
function selectContact(mainElement, firstSecondary, secondSecondary) {
    mainElement.classList.remove('assignedContactsBox');
    mainElement.classList.add('assignedContactsBoxSelected');
    firstSecondary.classList.add('d-none');
    secondSecondary.classList.remove('d-none');
    return;
}

/**
 * Sets styles to visually deselect a contact.
 * @param {HTMLElement} mainElement - Main contact DOM element.
 * @param {HTMLElement} firstSecondary - First secondary DOM element.
 * @param {HTMLElement} secondSecondary - Second secondary DOM element.
 */
function deselectContact(mainElement, firstSecondary, secondSecondary) {
    mainElement.classList.remove('assignedContactsBoxSelected');
    mainElement.classList.add('assignedContactsBox');
    firstSecondary.classList.remove('d-none');
    secondSecondary.classList.add('d-none');
    return;
}

function editSelectedContact(i) {
    let editWindow = document.getElementById('selectedContactsDeselect');
    editWindow.classList.remove('d-none');
    editWindow.innerHTML = returnEditContact(i)
    let input = document.getElementById('editSelectedContact');
    input.value = contactCollection[i].name;
}

function clearSelectedContact(index) {
    contactCollection.splice(index, 1);
    renderAllSelectedContacts();
    renderAllContactsForSearch();
    saveTaskElements();
    let editWindow = document.getElementById('selectedContactsDeselect');
    editWindow.classList.add('d-none');
    let input = document.getElementById('editSelectedContact');
    input.value = '';
}

function stopEditContact() {
    let editWindow = document.getElementById('selectedContactsDeselect');
    editWindow.classList.add('d-none');
    let input = document.getElementById('editSelectedContact');
    input.value = '';


}
//---------------------------------------------------------------------------------//


//Category functions//
function renderCategorys() {
    let container = document.getElementById('categoryRenderContainer');
    container.innerHTML = ''; // Leert den Container bevor er neu gerendert wird
    let all = allCategorys[0];
    let main = mainCategorys[0];
    for (let m = 0; m < main.name.length; m++) {
        const mName = main.name[m];
        const mColor = main.color[m];
        container.innerHTML += returnRenderMainCategorys(mName, mColor, m);
    }
    for (let a = 0; a < all.name.length; a++) {
        const aName = all.name[a];
        const aColor = all.color[a];
        container.innerHTML += returnRenderAllCategorys(aName, aColor, a);
    }
}

async function deleteCategory(i) {
    let allCategory = allCategorys[0];
    allCategory.name.splice(i, 1);
    allCategory.color.splice(i, 1);
    await currentUserCategorysSave();
    saveTaskElements();
}

function selectCategory(type, index) {
    let mainCategory = mainCategorys[0];
    let allCategory = allCategorys[0];
    if (type === 'main') {
        currentCategorySelected[0].name = mainCategory.name[index];
        currentCategorySelected[0].color = mainCategory.color[index];
    }
    if (type === 'all') {
        currentCategorySelected[0].name = allCategory.name[index];
        currentCategorySelected[0].color = allCategory.color[index];
    }
    renderCategorys();
    saveTaskElements();
    borderColorCheck();
}

function borderColorCheck() {
    loadTaskElements();
    if (currentCategorySelected[0].name) {
        updateInputs();
    } else {
        resetInputs();
    }
}

function updateInputs() {
    let inputV1 = document.getElementById('categoryInputV1');
    let inputV2 = document.getElementById('categoryInputV2');
    setInputValueAndColor(inputV1);
    setInputValueAndColor(inputV2);
}

function setInputValueAndColor(inputElem) {
    inputElem.value = currentCategorySelected[0].name;
}

function resetInputs() {
    let inputV1 = document.getElementById('categoryInputV1');
    let inputV2 = document.getElementById('categoryInputV2');
    resetInputValueAndColor(inputV1);
    resetInputValueAndColor(inputV2);
}

function resetInputValueAndColor(inputElem) {
    inputElem.value = 'Select task category';
    inputElem.style.borderColor = '#D1D1D1';
}
//---------------------------------------------------------------------------------//

//Prio Buttons class-change//
/**
 * Updates visual representation of priority buttons.
 * @param {string} btnId - ID of the priority button.
 * @param {string} iconId - ID of the inactive icon.
 * @param {string} activeIconId - ID of the active icon.
 * @param {string} activeClass - CSS class to apply when active.
 * @param {boolean} resetOther - Determines if other buttons should be reset.
 */
function activateButton(btnId, iconId, activeIconId, activeClass, iconSrc) {
    document.getElementById(btnId).classList.add(activeClass);
    document.getElementById(iconId).classList.add('d-none');
    document.getElementById(activeIconId).classList.remove('d-none');
    currentPrioSelected = iconSrc;
    saveTaskElements();
}

function deactivateButton(btnId, iconId, activeIconId, activeClass) {
    document.getElementById(btnId).classList.remove(activeClass);
    document.getElementById(iconId).classList.remove('d-none');
    document.getElementById(activeIconId).classList.add('d-none');
    currentPrioSelected = "";
    saveTaskElements();
}

function prioSelectedToggle(btnId, iconId, activeIconId, activeClass, iconSrc, resetOther) {
    if (currentPrioSelected === iconSrc) {
        deactivateButton(btnId, iconId, activeIconId, activeClass);
    } else {
        if (resetOther) resetAll();
        activateButton(btnId, iconId, activeIconId, activeClass, iconSrc);
    }
}

function initializePrioButtons() {
    if (!currentPrioSelected) return; // Wenn nichts ausgewählt ist, tue nichts.
    let btnId, iconId, activeIconId, activeClass;
    switch (currentPrioSelected) {
        case './img/prioUrgent.svg':
            btnId = 'prioUrgentBtn';
            iconId = 'prioUrgentIcon';
            activeIconId = 'prioUrgentIconActiv';
            activeClass = 'prioBtnActivUrgent';
            break;
        case './img/prioMedium.svg':
            btnId = 'prioMediumBtn';
            iconId = 'prioMediumIcon';
            activeIconId = 'prioMediumIconActiv';
            activeClass = 'prioBtnActivMedium';
            break;
        case './img/prioLow.svg':
            btnId = 'prioLowBtn';
            iconId = 'prioLowIcon';
            activeIconId = 'prioLowIconActiv';
            activeClass = 'prioBtnActivLow';
            break;
        default:
            console.error('Unbekanntes Icon in currentPrioSelected:', currentPrioSelected);
            return;
    }
    activateButton(btnId, iconId, activeIconId, activeClass, currentPrioSelected);
}

/**
 * Resets all priority buttons to their default states.
 */
function resetAll() {
    const buttons = ['prioUrgentBtn', 'prioMediumBtn', 'prioLowBtn'];
    const icons = ['prioUrgentIcon', 'prioMediumIcon', 'prioLowIcon'];
    const activeIcons = ['prioUrgentIconActiv', 'prioMediumIconActiv', 'prioLowIconActiv'];
    const activeClasses = ['prioBtnActivUrgent', 'prioBtnActivMedium', 'prioBtnActivLow'];

    for (let i = 0; i < buttons.length; i++) {
        document.getElementById(buttons[i]).classList.remove(activeClasses[i]);
        document.getElementById(icons[i]).classList.remove('d-none');
        document.getElementById(activeIcons[i]).classList.add('d-none');
    }
    currentPrioSelected = "";
    saveTaskElements();
}
//---------------------------------------------------------------------------------//


