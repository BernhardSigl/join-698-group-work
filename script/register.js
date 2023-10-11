let registerBtn = document.getElementById('registerBtn');
let checkbox = document.getElementById("myCheckbox");

async function initRegister() {
    await loadUserGroup698()
}


function signUp() {
    dialog.innerHTML = loadTemplateSignUp();
}


async function registUser() {
    if (!arePasswordsMatching()) {
        alert('Passwords do not match.');
        return;
    }

    if (checkbox.checked) {
        registerBtn.disabled = true;

        user.push({
            name: userName.value,
            email: email.value,
            password: password.value,
        });
        await setItem('userGroup698', JSON.stringify(user));
        resetForm();
        changesSaved('You Signed Up successfully');
        window.location = 'index.html';
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
    registerBtn.disabled = false;
}


async function resetAllBackendUser() {
    await loadUsers();
    users.splice(0, users.length);
    console.log(users);
    await setItem('users', JSON.stringify(users));
}