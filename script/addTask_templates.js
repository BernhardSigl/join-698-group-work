//categoryReturn//
function returnCreateCategoryColors(color, index) {
    if (color === selectedColorIndex) {
        return /*html*/ `
        <div onclick='selectColor("${color}")' style="${color}" id='colorCircle${index}' class="colorCircle selectedColor"></div>
        `;
    } else {
        return /*html*/ `
        <div onclick='selectColor("${color}")' style="${color}" id='colorCircle${index}' class="colorCircle"></div>
        `;
    }
}

function returnRenderMainCategorys(name, color, i) {
    if (currentCategorySelected[0].name === name &&
        currentCategorySelected[0].color === color) {
        return /*html*/ `
        <div onclick='selectCategory("main", ${i})' id='categoryMainList${i}' class="categoryRow selected">
            <span>${name}</span>
            <div class="colorCircle" style="${color}"></div>
        </div>
        `;
    } else {
        return /*html*/ `
        <div onclick='selectCategory("main", ${i})' id='categoryMainList${i}' class="categoryRow">
            <span>${name}</span>
            <div class="colorCircle" style="${color}"></div>
        </div>
        `;
    }
}

function returnRenderAllCategorys(name, color, i) {
    if (currentCategorySelected[0].name === name &&
        currentCategorySelected[0].color === color) {
        return /*html*/ `
        <div onclick='selectCategory("all", ${i})' id='categoryAllList${i}' class="categoryRow selected">
            <span>${name}</span>
            <div class='categoryRowLeft'>
                <div class="colorCircle" style="${color}"></div>
            </div>
        </div>
        `;
    } else {
        return /*html*/ `
        <div onclick='selectCategory("all", ${i})' id='categoryAllList${i}' class="categoryRow">
            <span>${name}</span>
            <div class='categoryRowLeft'>
                <img onclick='deleteCategory(${i})' src="img/subTaskDelete.svg">
                <div class="colorCircle" style="${color}"></div>
            </div>
        </div>
        `;
    }
}
//---------------------------------------------------------------------------------//


//return render Contacts(all and selected)//
/**
 * Returns an HTML string representing a selected contact.
 * @param {Object} contacts - The contact object to render.
 * @returns {string} - HTML string for the rendered contact.
 */
function returnRenderAllSelectedContacts(contactColors, contactNamesAbbreviation, index) {
    return /*html*/ `
    <div onclick="editSelectedContact(${index})" style="background-color:${contactColors}" class="assignedToContactImg">${contactNamesAbbreviation}</div>
    `;
}

/**
 * Returns an HTML string for the contact search functionality.
 * @param {Object} contacts - The contact object to render.
 * @param {number} i - Index of the contact.
 * @param {string} key - Key of the contact in the `allContacts` collection.
 * @returns {string} - HTML string for the rendered contact.
 */
function returnRenderAllContactsForSearch(contactColor, contactNamesAbbreviation, contactNames, index) {
    let isSelected = '';
    if (contactCollection.some(contact => contact.name === contactNames && contact.color === contactColor)) {
        isSelected = true;
    } else {
        isSelected = false;
    }
    let mainClass = isSelected ? 'assignedContactsBoxSelected' : 'assignedContactsBox';
    let firstSecondaryClass = isSelected ? 'd-none' : '';
    let secondSecondaryClass = isSelected ? '' : 'd-none';
    return /*html*/ `
    <div class="${mainClass}" id="assignedContactsBox${index}" onclick="toggleContactSelection(${index}, '${contactNames}')">
        <div class="contactBoxLeft">
            <div style="background-color:${contactColor}" class="assignedToContactImg">
                ${contactNamesAbbreviation}
            </div>
            <span>${contactNames}</span>
        </div>
        <img src="img/addTaskBox.svg" id="assignedBox${index}" class="${firstSecondaryClass}">
        <img src="img/addTaskCheckBox.svg" class="${secondSecondaryClass}" id="assignedBoxChecked${index}">
    </div>
    `;
}

/**
 * Toggles classes for the main settings element.
 * @param {HTMLElement} mainElement - Main settings DOM element.
 */
function returnSettingsMain(mainElement) {
    if (mainElement.classList.contains('assignedContactsBox')) {
        mainElement.classList.remove('assignedContactsBox');
        mainElement.classList.add('assignedContactsBoxSelected');
    } else {
        mainElement.classList.remove('assignedContactsBoxSelected');
        mainElement.classList.add('assignedContactsBox');
    }
    return
}

/**
 * Toggles visibility for the first settings element.
 * @param {HTMLElement} firstSecondary - First settings DOM element.
 */
function returnSettingsFirst(firstSecondary) {
    if (firstSecondary.classList.contains('d-none')) {
        firstSecondary.classList.remove('d-none');
    } else {
        firstSecondary.classList.add('d-none');
    }
    return
}

/**
 * Toggles visibility for the second settings element.
 * @param {HTMLElement} secondSecondary - Second settings DOM element.
 */
function returnSettingsSecond(secondSecondary) {
    if (secondSecondary.classList.contains('d-none')) {
        secondSecondary.classList.remove('d-none');
    } else {
        secondSecondary.classList.add('d-none');
    }
    return
}

function returnEditContact(i) {
    return /*html*/`
    <input id="editSelectedContact" readonly type="text">
    <img onclick="stopEditContact()" class="editAbsolutCrossContact" src="img/close.svg">
    <img onclick="clearSelectedContact(${i})" class="editAbsolutDelete" src="img/subTaskDelete.svg">
    `;
}
//---------------------------------------------------------------------------------//


//return Subtask//
/**
 * Returns an HTML string representing the subtask editing container.
 * @param {number} i - Index of the subtask.
 * @returns {string} - HTML string for the subtask edit container.
 */
function returnEditContainer(i) {
    return /*html*/ `
    <input id="editInput" type="text">
    <img onclick="stopSubEdit()" class="editAbsolutCross" src="img/close.svg">
    <img onclick="confirmSubEdit(${i})" class="editAbsolutCheck" src="img/SubtasksCheck.svg">
    `;
}

/**
 * Returns an HTML string representing a collection of subtasks.
 * @param {Object} subCollection - The subtask collection to render.
 * @param {number} i - Index of the subtask in the collection.
 * @returns {string} - HTML string for the rendered subtask collection.
 */
function returnSubTaskCollection(subCollection, i) {
    return /*html*/ `
    <ul class="dFlex spaceBtw">
        <li>${subCollection}</li>
        <div>
            <img onclick="editSubtask(${i})" src="img/PenAddTask 1=edit.svg">
            <img onclick="deleteSubtaskCollection(${i})" src="img/subTaskDelete.svg">
        </div>
    </ul>
    `;
}
//---------------------------------------------------------------------------------//


//return render functions//
function returnButtonAreaAddTask() {
    return /*html*/ `
<div class="addTaskBottomArea">
    <div class="fontSize20 requiredText">
    <span class="requiredStar">*<span class="requiredText">This field is required</span></span>
    </div>
</div>
<div class="addTaskBottomBtnArea">
    <button type="reset" onclick="clearButton()" class="clearBtn fontSize20">
        <span class="fontSize20">Clear</span>
        <svg class="clearSvg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12.2496 11.9998L17.4926 17.2428M7.00659 17.2428L12.2496 11.9998L7.00659 17.2428ZM17.4926 6.75684L12.2486 11.9998L17.4926 6.75684ZM12.2486 11.9998L7.00659 6.75684L12.2486 11.9998Z" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </button>
    <button type="submit" id="createTaskButton" onclick="createTask()" class="createBtn blueBtn">Create Task<img class="createImg"
            src="./img/check.svg"></button>
</div>
    `;
}

function returnButtonAreaEditTask() {
    return /*html*/`
    <div class="addTaskBottomArea">
        <div class="fontSize20 requiredText">
        <span class="requiredStar">*<span class="requiredText">This field is required</span></span>
        </div>
    </div>
    <div class="addTaskBottomBtnArea">
        <button onclick="addEditTask(), slideOut('addTaskPopupPositionFront', 'addTaskPop', 200)" class="createBtn blueBtn"><b>Ok</b><img class="createImg"
            src="./img/check.svg"></button>
    </div>
    `;
}

function returnCategoryBox1() {
    return /*html*/ `
    <input onclick="toggleVisibilityAddTask('categoryAreaV1', 'categoryAreaV2')"
        class="click" id="categoryInputV1" type="text" readonly
        value="Select task category">
    <img onclick="toggleVisibilityAddTask('categoryAreaV1', 'categoryAreaV2')"
        class="inputAbsolut" src="img/arrow_drop_downaa.svg">
    `;
}

function returnCategoryBox2() {
    return /*html*/ `
    <input onclick="toggleVisibilityAddTask('categoryAreaV2', 'categoryAreaV1')"
        class="click" id="categoryInputV2" type="text" readonly
        value="Select task category">
    <img onclick="toggleVisibilityAddTask('categoryAreaV2', 'categoryAreaV1')"
        class="inputAbsolut" src="img/arrow_drop_up.svg">
    <div class="selectContactsPositionContainer" id="categoryContainer">
        <div class="categoryRenderContainer show-scrollbar"
            id="categoryRenderContainer">
        </div>
        <div id="createCategoryContainer" class="d-none custom-select">
        </div>
        <div onclick="toggleVisibilityAddTask('', 'createCategoryPopupByAddTask')"
            class="addNewContactBtn blueBtn">
            <span>Add new category</span>
            <img class="addNewContactBtnIcon" src="img/addTaskCategory.svg">
        </div>
    </div>
    `;
}

function returnPrioBox() {
    return /*html*/ `
    <div onclick="prioSelectedToggle('prioUrgentBtn', 'prioUrgentIcon', 'prioUrgentIconActiv', 'prioBtnActivUrgent', './img/prioUrgent.svg', true)"
        id="prioUrgentBtn" class="prioBtn">Urgent
        <img id="prioUrgentIcon" class="prioBtnIcons" src="./img/prioUrgent.svg">
        <img id="prioUrgentIconActiv" class="prioBtnIcons d-none"
            src="./img/PrioUrgentWhite.svg">
    </div>
    <div onclick="prioSelectedToggle('prioMediumBtn', 'prioMediumIcon', 'prioMediumIconActiv', 'prioBtnActivMedium', './img/prioMedium.svg', true)"
        id="prioMediumBtn" class="prioBtn">Medium
        <img id="prioMediumIcon" class="prioBtnIcons" src="./img/prioMedium.svg">
        <img id="prioMediumIconActiv" class="prioBtnIcons d-none"
            src="./img/PrioMediumWhite.svg">
    </div>
    <div onclick="prioSelectedToggle('prioLowBtn', 'prioLowIcon', 'prioLowIconActiv', 'prioBtnActivLow', './img/prioLow.svg', true)"
        id="prioLowBtn" class="prioBtn">Low
        <img id="prioLowIcon" class="prioBtnIcons" src="./img/prioLow.svg">
        <img id="prioLowIconActiv" class="prioBtnIcons d-none"
            src="./img/PrioLowWhite.svg">
    </div>
    `;
}

function returnAssignToBox1() {
    return /*html*/ `
        <input class="click" id="assignedToInputCover"
            onclick="toggleVisibilityAddTask('assignedToInputContainer', 'assignedToContactsInputContainer')"
            type="text" readonly value="Select contacts to assign">
        <img onclick="toggleVisibilityAddTask('assignedToInputContainer', 'assignedToContactsInputContainer')"
            class="inputAbsolut" src="img/arrow_drop_downaa.svg">
        <div id="selectedContactsContainer">
        </div>
        <div class="custom-select d-none" id="selectedContactsDeselect">
        </div>
        `;
}

function returnAssignToBox2() {
    return /*html*/ `
    <input class="click" id="assignedToInput" type="text" placeholder="An:">
    <img class="inputAbsolut"
    onclick="toggleVisibilityAddTask('assignedToContactsInputContainer', 'assignedToInputContainer')"
    src="img/arrow_drop_up.svg">
    <div class="selectContactsPositionContainer">
        <div class="ContactsRenderContainer show-scrollbar"
            id="contactsRenderContainer">
        </div>
        <div onclick="toggleVisibilityAddTask('', 'contactPopupByAddTask')" class="addNewContactBtn blueBtn">
            <span>Add new contact</span>
            <img class="addNewContactBtnIcon" src="img/addTaskperson_add.svg">
        </div>
    </div>
    `;
}
//---------------------------------------------------------------------------------//