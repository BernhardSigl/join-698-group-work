let dialog = document.getElementById('dialog');


async function initLogin() {
    activUser = {
        'name': '',
        'color': '',
    };
    saveActivUser();
    startAnimation();
    loadLogIn();
    await loadUserGroup698();
}


function loadLogIn() {
    dialog.innerHTML = loadTempleteLogIn();
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
        activUser['name'] = user[currentUser].name;
        activUser['color'] = user[currentUser].color;
        saveActivUser();
        window.location.href = "./summary.html";
    } else {
        loadRedBorderInput();
        loadWarningTextTamplate();
    }
}

function guestLogin() {
    activUser.name = 'Guest';
    activUser.color = '#29ABE2';
    saveActivUser();
    window.location.href = "./summary.html";
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

function loadTemplateResetPasswort() {
    return /*html*/ `
    <a href="index.html" id="mobileBackArrowId" onclick="closeDialog()">
        <img src="img/arror-left.svg" alt="">
    </a>
    <form action="" class="columnVertical gap-32">
        <span class="fontSize61">I forgot my password</span>
        <span>Don't worry! We will send you an email with instructions to reset your password.</span>

        <div  class="input-field">
            <input type="text" placeholder="Email">
            <img src="./img/letter.svg" class="input-suffix">   
        </div>  
        <button type="button" class="sendNewPasswordBtn" onsubmit>Send new password</button>  
    </form>
    `
}


function loadTempleteLogIn() {
    return /*html*/ `
                <div class="logInTitle">
                    <div class="fontSize61"><b>Log in</b></div>
                    <div class="underline"></div>
                </div>
                <div  class="input-fields fontSize20">
                    <div id="input-email" class="input-field ">
                        <input id="email" type="text" placeholder="Email">
                        <img src="./img/letter.svg" alt="Bild hinten" class="input-suffix">
                    </div>
                    <div class="warning-field">
                    <span id="warning-text-email" class="d-none">
                    Please enter the appropriate email address.
                    </span>
                    </div>
                    <div id="input-passwort" class="input-field">
                        <input id="passwort" type="text" placeholder="Password">
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
                    <div>
                        <a onclick="resetPasswort()" class="checkbox-register" href="javascript:void(0);">Forget my Password</a>
                    </div>
                </div>
                <div class="fontSize21 buttonsUnderLogin">
                    <button onclick="login()" type="button" class="button-log-in">Log in</button>
                    <button onclick='guestLogin()' type="button" class="button-guest-login">Guest log in</button>
                </div>
            </div>
    `
}