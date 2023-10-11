function editTaskWindow() {
    loadTaskElements();
    let assignTo1 = document.getElementById('assignedToInputContainer');
    let assignTo2 = document.getElementById('assignedToContactsInputContainer');
    let categoryBox1 = document.getElementById('categoryAreaV1');
    let categoryBox2 = document.getElementById('categoryAreaV2');
    let prioBox = document.getElementById('prioBox');
    let buttonArea = document.getElementById('buttonAreaAddTask');
    buttonArea.innerHTML = returnButtonAreaEditTask();
    assignTo1.innerHTML = returnAssignToBox1();
    assignTo2.innerHTML = returnAssignToBox2();
    categoryBox1.innerHTML = returnCategoryBox1();
    categoryBox2.innerHTML = returnCategoryBox2();
    prioBox.innerHTML = returnPrioBox();
    borderColorCheck();
    renderCategorys();
    renderAllSelectedContacts();
    renderAllContactsForSearch();
    renderSubTaskCollection();
    createCategoryWindow();
    initializePrioButtons();
}

async function editTaskNew(i) {
    document.getElementById('addTaskPop').classList.remove('d-none');
    closeTask();
    let taskToEdit = tasks[i];
    editTaskWindow();
    document.getElementById("addTaskHeadline").innerHTML = 'Edit Task';
    document.getElementById("addTitel").value = taskToEdit.title;
    document.getElementById("addDescription").value = taskToEdit.description;
    document.getElementById("datepicker").value = taskToEdit.dueDate;
    for (let contactNumber = 0; contactNumber < taskToEdit.contactName.length; contactNumber++) {
        const cName = taskToEdit.contactName[contactNumber];
        const cColor = taskToEdit.contactColor[contactNumber];
        const cAbbreviation = taskToEdit.contactAbbreviation[contactNumber];

        contactCollection[contactNumber] = {
            'nameAbbreviation': cAbbreviation,
            'color': cColor,
            'name': cName,
        }
    }
    currentCategorySelected[0].color = taskToEdit.categoryColor;
    currentCategorySelected[0].name = taskToEdit.category;
    statusEdit = taskToEdit.status;
    currentPrioSelected = taskToEdit.priority;
    subTaskCollection = taskToEdit.subtasksInProgress;
    subtasksFinish = taskToEdit.subtasksFinish;
    taskIdForEdit = taskToEdit.id;
    saveTaskElements();
    editTaskWindow();
}


async function addEditTask() {
    contactNames = contactCollection.map(contact => contact.name);
    contactColors = contactCollection.map(contact => contact.color);
    contactNamesAbbreviation = contactCollection.map(contact => contact.nameAbbreviation);
    let taskEdit = {
        'id': taskIdForEdit,
        'status': statusEdit,
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
    let index = tasks.findIndex(task => task.id === taskIdForEdit);

    tasks[index] = taskEdit;
    await currentUserTaskSave();
    resetAllAddTaskElementsBoard();
    updateBoardHTML();
}

function resetAllAddTaskElementsBoard() {
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
}

//---------------------------------------------------------------------------------//
async function createContactByPopup() {
    changesSaved();
    let name = document.getElementById('inputNameId').value
    let newContact = {
        "name": name,
        "nameAbbreviation": makeNameAbbreviation(name),
        "email": document.getElementById('inputEmailId').value,
        "phone": document.getElementById('inputPhoneId').value,
        "color": getColor()
    }
    contactsArray.push(newContact);
    await currentUserContactsSave();
    clearContactPopup();
    toggleVisibilityAddTask('contactPopupByAddTask', '');
    renderAllContactsForSearch();
}

function makeNameAbbreviation(name) {
    // split first and last name
    let nameParts = name.split(' ');
    let firstName = nameParts[0];
    let lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';
    // first letter of first and last name combined
    let nameAbbreviation = `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
    return nameAbbreviation;
}

function clearContactPopup() {
    document.getElementById('inputNameId').value = '';
    document.getElementById('inputEmailId').value = '';
    document.getElementById('inputPhoneId').value = '';
    toggleVisibilityAddTask('contactPopupByAddTask', '')
}


//create category//
function createCategoryWindow() {
    loadTaskElements();
    createCategoryColors();
}

function createCategoryColors() {
    let colorContainer = document.getElementById('colorSettingBox');
    colorContainer.innerHTML = '';
    for (let index = 0; index < colorCollection.length; index++) {
        const color = colorCollection[index];
        colorContainer.innerHTML += returnCreateCategoryColors(color, index);
    }
}

function selectColor(color) {
    updateSelectedColorIndex(color);
    createCategoryColors();
}

async function addCategory() {
    let inputElem = document.getElementById('createCategoryInput');
    allCategorys[0].name.push(inputElem.value);
    allCategorys[0].color.push(selectedColorIndex);
    await currentUserCategorysSave();
    toggleVisibilityAddTask('createCategoryPopupByAddTask', '');
    selectedColorIndex = null;
    saveTaskElements();
}

function updateSelectedColorIndex(index) {
    selectedColorIndex = selectedColorIndex === index ? null : index;
    saveTaskElements();
}

function confirmCreateCategory() {
    if (isValidCategoryInput()) {
        addCategory();
        renderCategorys();
    } else {
        alertInvalidInput();
    }
    clearCreateWindow();
}

function clearCreateWindow() {
    let input = document.getElementById('createCategoryInput');
    input.value = '';
    selectedColorIndex = null;
    saveTaskElements();
}

function alertInvalidInput() {
    alert("Bitte geben Sie einen Kategorienamen mit mindestens 2 Buchstaben ein und wählen Sie eine Farbe aus.");
}

function isValidCategoryInput() {
    let inputElem = document.getElementById('createCategoryInput');
    return inputElem.value.length >= 2 && selectedColorIndex !== null;
}

function stopCreateCategory() {
    clearCreateWindow();
    toggleVisibilityAddTask('createCategoryPopupByAddTask', '')
}
//---------------------------------------------------------------------------------//
//only for date-input by addTask.html/ Due date//
document.addEventListener('DOMContentLoaded', function () {
    var dateInput = document.getElementById('datepicker');
    var picker = new Pikaday({
        field: dateInput,
        position: 'top right',
        format: 'DD/MM/YYYY',
        minDate: new Date(), // Das stellt sicher, dass kein Datum vor dem heutigen Datum ausgewählt werden kann.
        onSelect: function (date) {
            const formattedDate = [
                date.getDate().toString().padStart(2, '0'),
                (date.getMonth() + 1).toString().padStart(2, '0'),
                date.getFullYear()
            ].join('/');
            dateInput.value = formattedDate;
        }
    });

    dateInput.addEventListener('focus', function () {
        if (!this.value) {
            const today = new Date();
            const formattedDate = [
                today.getDate().toString().padStart(2, '0'),
                (today.getMonth() + 1).toString().padStart(2, '0'),
                today.getFullYear()
            ].join('/');
            this.value = formattedDate;
            picker.show();
        }
    });
});
//---------------------------------------------------------------------------------//

//category container add d-none by body-click//
document.body.addEventListener('click', function () {
    toggleVisibilityAddTask('categoryAreaV2', 'categoryAreaV1')
});
document.getElementById('categorySection').addEventListener('click', function (event) {
    event.stopPropagation();
});
//---------------------------------------------------------------------------------//

//contact container add d-none by body-click//
document.body.addEventListener('click', function () {
    toggleVisibilityAddTask('assignedToContactsInputContainer', 'assignedToInputContainer')
});
document.getElementById('assignTo').addEventListener('click', function (event) {
    event.stopPropagation();
});
//---------------------------------------------------------------------------------//