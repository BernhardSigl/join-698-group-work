function editTaskWindow() {
    loadTaskElements();

    setInnerHTML("buttonAreaAddTask", returnButtonAreaEditTask);
    setInnerHTML("assignedToInputContainer", returnAssignToBox1);
    setInnerHTML("assignedToContactsInputContainer", returnAssignToBox2);
    setInnerHTML("categoryAreaV1", returnCategoryBox1);
    setInnerHTML("categoryAreaV2", returnCategoryBox2);
    setInnerHTML("prioBox", returnPrioBox);

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

function hideAddTaskDropDowns() {
    toggleVisibilityAddTask('assignedToContactsInputContainer', 'assignedToInputContainer');
    toggleVisibilityAddTask('categoryAreaV2', 'categoryAreaV1');

}

async function addEditTask() {
    const getValue = id => document.getElementById(id).value;
    const getContactInfo = prop => contactCollection.map(contact => contact[prop]);

    let taskEdit = {
        'id': taskIdForEdit, 'status': statusEdit,
        'category': currentCategorySelected[0].name, 'categoryColor': currentCategorySelected[0].color,
        'title': getValue("addTitel"), 'description': getValue("addDescription"), 'dueDate': getValue("datepicker"),
        'priority': currentPrioSelected, 'contactName': getContactInfo('name'), 'contactColor': getContactInfo('color'),
        'contactAbbreviation': getContactInfo('nameAbbreviation'), 'subtasksInProgress': subTaskCollection, 'subtasksFinish': subtasksFinish
    };

    tasks[tasks.findIndex(task => task.id === taskIdForEdit)] = taskEdit;
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
    if (validateForm()) {
        changesSaved('Contact successfully created');
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
    document.getElementById('createCategoryPopupByAddTask').classList.add('d-none');
    selectedColorIndex = null;
    saveTaskElements();
    renderCategorys();
    changesSaved('Category successfully created')
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

function validateForm() {
    var input = document.getElementById('inputPhoneId');

    // Der reguläre Ausdruck überprüft, ob der Eingabewert nur das Plus-Zeichen und Zahlen von 1-9 enthält.
    var regex = /^[+0-9]+$/;

    if (!regex.test(input.value)) {
        input.style.borderColor = 'red';
        document.getElementById('errorMessage').innerText = "Ungültige Eingabe! Nur + und Zahlen von 1-9 sind erlaubt.";
        return false; // Verhindert das Absenden des Formulars
    } else {
        document.getElementById('errorMessage').innerText = "";
        return true; // Ermöglicht das Absenden des Formulars
    }
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

function handleInputChange() {
    let filterText = document.getElementById('assignedToInput').value;
    renderAllContactsForSearch(filterText);
}
