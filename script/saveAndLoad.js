const STORAGE_TOKEN = 'ZAVHTP92CL5GF889UFX5E28M830OR5YMQSFGHRNB';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

let tasks = [];
let user = [];
let activUser = {
    'name': '',
}

//save and load task elements

function saveTaskElements() {
    localStorage.setItem('categoryCollectionAsText', JSON.stringify(currentCategorySelected));
    localStorage.setItem('currentPrioAsText', JSON.stringify(currentPrioSelected));
    localStorage.setItem('subTaskCollectionAsText', JSON.stringify(subTaskCollection));
    localStorage.setItem('contactCollectionAsText', JSON.stringify(contactCollection));
    localStorage.setItem('selectedIndexAsText', JSON.stringify(selectedIndex));
    localStorage.setItem('selectedColorIndexAsText', JSON.stringify(selectedColorIndex));
    localStorage.setItem('subTaskFinishAsText', JSON.stringify(subtasksFinish));
    localStorage.setItem('taskIdAsText', JSON.stringify(taskIdForEdit));
    localStorage.setItem('statusAsText', JSON.stringify(statusEdit));
}

function loadTaskElements() {
    let currentCategoryLoad = localStorage.getItem('categoryCollectionAsText');
    let currentPrioLoad = localStorage.getItem('currentPrioAsText');
    let subTaskCollectionLoad = localStorage.getItem('subTaskCollectionAsText');
    let contactCollectionLoad = localStorage.getItem('contactCollectionAsText');
    let selectedIndexLoad = localStorage.getItem('selectedIndexAsText');
    let selectedColorLoad = localStorage.getItem('selectedColorIndexAsText');
    let subTaskFinishLoad = localStorage.getItem('subTaskFinishAsText');
    let taskIdLoad = localStorage.getItem('taskIdAsText');
    let statusLoad = localStorage.getItem('statusAsText');
    returnLoad(currentCategoryLoad, currentPrioLoad, subTaskCollectionLoad, contactCollectionLoad, selectedIndexLoad, selectedColorLoad, subTaskFinishLoad, taskIdLoad, statusLoad);
}

function returnLoad(currentCategoryLoad, currentPrioLoad, subTaskCollectionLoad, contactCollectionLoad, selectedIndexLoad, selectedColorLoad, subTaskFinishLoad, taskIdLoad, statusLoad) {
    if (currentCategoryLoad && currentPrioLoad && subTaskCollectionLoad && contactCollectionLoad && selectedIndexLoad && selectedColorLoad && subTaskFinishLoad && taskIdLoad && statusLoad) {
        currentCategorySelected = JSON.parse(currentCategoryLoad);
        currentPrioSelected = JSON.parse(currentPrioLoad);
        subTaskCollection = JSON.parse(subTaskCollectionLoad);
        contactCollection = JSON.parse(contactCollectionLoad);
        selectedIndex = JSON.parse(selectedIndexLoad);
        selectedColorIndex = JSON.parse(selectedColorLoad);
        subtasksFinish = JSON.parse(subTaskFinishLoad);
        taskIdForEdit = JSON.parse(taskIdLoad);
        statusEdit = JSON.parse(statusLoad);
    }
}


//------------tasks----------------------
async function initializeStorage(key, initialValue) {
    try {
        await getItem(key);
    } catch (e) {
        console.info(`Key "${key}" not found in storage. Initializing with default value.`);
        await setItem(key, JSON.stringify(initialValue));
    }
}

async function currentUserTaskSave() {
    if (activUser.name === 'Guest698') {
        localStorage.setItem('tasksAsText', JSON.stringify(tasks));
    } else {
        await setItem('tasks', JSON.stringify(tasks));
    }
}

async function currentUserTaskLoad() {
    if (activUser.name === 'Guest698') {
        let tasksLoad = localStorage.getItem('tasksAsText');
        if (tasksLoad) {
            tasks = JSON.parse(tasksLoad);
        }
    } else {
        try {
            tasks = JSON.parse(await getItem('tasks'));
        } catch (e) {
            console.info('Could not load tasks');
        }
    }
}


//current id

async function currentUserIdSave() {
    if (activUser.name === 'Guest698') {
        localStorage.setItem('currentIdAsText', JSON.stringify(currentId));
    } else {
        await setItem('currentId', JSON.stringify(currentId));
    }
}

async function currentUserIdLoad() {
    if (activUser.name === 'Guest698') {
        let currentIdLoad = localStorage.getItem('currentIdAsText');
        if (currentIdLoad) {
            currentId = JSON.parse(currentIdLoad);
        }
    } else {
        try {
            currentId = JSON.parse(await getItem('currentId'));
        } catch (e) {
            console.info('Could not load currentId');
        }
    }
}


//Categorys

async function currentUserCategorysSave() {
    if (activUser.name === 'Guest698') {
        localStorage.setItem('categorysAsText', JSON.stringify(allCategorys));
    } else {
        await setItem('allCategorys', JSON.stringify(allCategorys));
    }
}

async function currentUserCategorysLoad() {
    if (activUser.name === 'Guest698') {
        let categorysLoad = localStorage.getItem('categorysAsText');
        if (categorysLoad) {
            allCategorys = JSON.parse(categorysLoad);
        }
    } else {
        try {
            allCategorys = JSON.parse(await getItem('allCategorys'));
        } catch (e) {
            console.info('Could not load created categorys. created categorys are empty');
        }
    }
}


//Contacts

async function currentUserContactsSave() {
    if (activUser.name === 'Guest698') {
        localStorage.setItem('contactsAsText', JSON.stringify(contactsArray));
        localStorage.setItem('nextColorAsText', JSON.stringify(nextColorIndex));
    } else {
        await setItem('contactsArray', JSON.stringify(contactsArray));
        await setItem('nextColorIndex', JSON.stringify(nextColorIndex));
    }
}

/** * This function is to load contacts or display a error message */
async function currentUserContactsLoad() {
    if (activUser.name === 'Guest698') {
        let contactsLoad = localStorage.getItem('contactsAsText');
        let nextColorLoad = localStorage.getItem('nextColorAsText');
        if (contactsLoad && nextColorLoad) {
            contactsArray = JSON.parse(contactsLoad);
            nextColorIndex = JSON.parse(nextColorLoad);
        }
    } else {
        try {
            contactsArray = JSON.parse(await getItem('contactsArray'));
            nextColorIndex = JSON.parse(await getItem('nextColorIndex'));
        } catch (e) {
            console.info('Could not load contacts');
        }
    }
}


//Activ user

function saveActivUser() {
    localStorage.setItem('activUserAsText', JSON.stringify(activUser));
}

function loadActivUser() {
    let activUserLoad = localStorage.getItem('activUserAsText');
    if (activUserLoad) {
        activUser = JSON.parse(activUserLoad);
    }
}

//save and load remote
async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
        .then(res => res.json());
}

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) {
            return res.data.value;
        }
        throw `Could not find data with key "${key}".`;
    });
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
