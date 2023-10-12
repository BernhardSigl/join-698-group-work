let registerBtn = document.getElementById('registerBtn');
let checkbox = document.getElementById("myCheckbox");

async function initRegister() {
    await loadUserGroup698()
}


function signUp() {
    dialog.innerHTML = loadTemplateSignUp();
}


async function registUser() {
    let emailControl = document.getElementById('email');
    if (!arePasswordsMatching()) return handlePasswordMismatch();
    if (user.some(u => u.email === emailControl.value)) return handleEmailExists();
    if (checkbox.checked) await handleRegistration();
}

function handlePasswordMismatch() {
    loadRedBorderPassword();
    loadWarningTextTamplate();
}

function handleEmailExists() {
    document.getElementById('inputEmail').classList.add("red-border");
    document.getElementById('warning-email').classList.remove("d-none");
    resetForm();
}

async function handleRegistration() {
    registerBtn.disabled = true;
    user.push({
        name: userName.value,
        email: email.value,
        password: password.value,
    });
    await setItem('userGroup698', JSON.stringify(user));
    changesSaved('You Signed Up successfully');
    setTimeout(() => {
        resetForm();
        window.location = 'index.html';
    }, 3000);
}


function loadRedBorderPassword() {
    let inputIds = ["inputPassword", "inputConfirmPassword"];
    for (let id of inputIds) {
        document.getElementById(id).classList.add("red-border");
    }
}

function loadWarningTextTamplate() {
    let warningIds = ["warning-password", "warning-confirmPassword"];
    for (let id of warningIds) {
        document.getElementById(id).classList.remove("d-none");
    }
}

function arePasswordsMatching() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    return password === confirmPassword;
}


async function loadUserGroup698() {
    try {
        user = JSON.parse(await getItem('userGroup698'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}


function resetForm() {
    email.value = '';
    password.value = '';
    confirmPassword.value = '';
    registerBtn.disabled = false;
}


async function resetAllBackendUser() {
    await loadUsers();
    users.splice(0, users.length);
    console.log(users);
    await setItem('users', JSON.stringify(users));
}