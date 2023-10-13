let dialog = document.getElementById('dialog');

async function initLogin() {
    activUser = {
        'name': '',
    };
    saveActivUser();
    startAnimation();
    loadLogIn();
    await loadUserGroup698();
}


function loadLogIn() {
    dialog.innerHTML = loadTempleteLogIn();
    let rememberedEmail = localStorage.getItem('rememberMe');
    if (rememberedEmail) {
        document.getElementById('email').value = rememberedEmail;
        document.getElementById('myCheckbox').checked = true; // Setzen Sie das "Remember me" Kästchen als angekreuzt
    }
}

function startAnimation() {
    if (!document.referrer) { // Wenn referrer leer ist
        document.querySelector('.join-logo-contain').classList.add('animated');
        document.querySelector('.join-logo-contain').classList.remove('d-none');
        document.querySelector('.join-logo').classList.add('animated');
    }
};

function loadRegister() {
    window.location.href = "./register.html";
}

function resetPasswort() {
    dialog.innerHTML = loadTemplateResetPasswort();
}

function closeDialog() {
    loadLogIn();
}

function login() {
    let email = document.getElementById('email');
    let passwort = document.getElementById('passwort');
    let users = user.find(u => u.email === email.value && u.password === passwort.value);
    let currentUser = user.findIndex(u => u.email === email.value);
    if (users) {
        if (document.getElementById('myCheckbox').checked) {
            localStorage.setItem('rememberMe', email.value);
        } else {
            localStorage.removeItem('rememberMe');
        }
        activUser['name'] = user[currentUser].name;
        saveActivUser();
        window.location.href = "./summary.html";
    } else {
        loadRedBorderInput();
        loadWarningTextTamplate();
    }
}

function guestLogin() {
    activUser.name = 'Guest698';
    saveActivUser();
    fillTestArray();
    window.location.href = "./summary.html";
}

function fillTestArray() {
    contactsArray = [
        {
            "name": "Bernhard Sigl",
            "nameAbbreviation": "BS",
            "email": "B-Test@web.de",
            "phone": "01631234567",
            "color": "#006400"
        },
        {
            "name": "David Peterka",
            "nameAbbreviation": "DP",
            "email": "test@web.de",
            "phone": "123456",
            "color": "#00008B"
        },
        {
            "name": "Lina Wionsek",
            "nameAbbreviation": "LW",
            "email": "test2@web.de",
            "phone": "123456",
            "color": "#8B0000"
        }];

    tasks = [{
        "id": 26,
        "status": "toDo",
        "category": "Technical Task",
        "categoryColor": "background: #1FD7C1",
        "title": "Guest",
        "description": "test text",
        "dueDate": "11/10/2023",
        "priority": "./img/prioUrgent.svg",
        "contactName": [
            "Gast"
        ],
        "contactColor": [
            "#00008B"
        ],
        "contactAbbreviation": [
            "G"
        ],
        "subtasksInProgress": [
            "test",
            "test2"
        ],
        "subtasksFinish": []
    }];

    allCategorys[0] = {
        "name": [
            "New Category"
        ],
        "color": [
            "background: #FF6347"
        ]
    }
    currentUserTaskSave();
    currentUserCategorysSave();
    currentUserContactsSave();
}

function loadRedBorderInput() {
    let inputIds = ["input-email", "input-passwort"];
    for (let id of inputIds) {
        document.getElementById(id).classList.add("red-border");
    }
}

function loadWarningTextTamplate() {
    let warningIds = ["warning-text-passwort", "warning-text-email"];
    for (let id of warningIds) {
        document.getElementById(id).classList.remove("d-none");
    }
}

function loadTempleteLogIn() {
    return /*html*/ `
            <form onsubmit="login(); return false;">
                <div class="logInTitle">
                    <div class="fontSize61"><b>Log in</b></div>
                    <div class="underline"></div>
                </div>
                <div  class="input-fields fontSize20">
                    <div id="input-email" class="input-field ">
                        <input required id="email" type="text" placeholder="Email">
                        <img src="./img/letter.svg" alt="Bild hinten" class="input-suffix">
                    </div>
                    <div class="warning-field">
                    <span id="warning-text-email" class="d-none">
                    Please enter the appropriate email address.
                    </span>
                    </div>
                    <div id="input-passwort" class="input-field">
                        <input required id="passwort" type="password" placeholder="Password">
                        <img src="./img/lock.svg" alt="Bild hinten" class="input-suffix">
                    </div>
                    <div class="warning-field">
                    <span id="warning-text-passwort" class="d-none">
                    Please enter the appropriate password.
                    </span>
                    </div>
                </div>

                <div class="rememberMeForgetMyPasswordContainer">
                    <div class="checkboxRememberMeContainer">
                        <input type="checkbox" name="myCheckbox" id="myCheckbox">
                        <label for=" fontSize16">Remember me</label>
                    </div>

                </div>
                <div class="buttonsUnderLogin">
                    <button type="submit" class="button-log-in fontSize21">Log in</button>
                    <button onclick='guestLogin()' type="button" class="button-guest-login fontSize21">Guest log in</button>
                </div>
</form>
    `
}