issummary = false;
isAddTask = false;
isBoard = false;
isContacts = false;
isPolice = false;
isNotice = false;
openMenu = false;

function loadHeaderSidebar(boolian) {
    resetBoolians();
    switchColorSidebar(boolian);
}

function resetBoolians() {
    issummary = false;
    isAddTask = false;
    isBoard = false;
    isContacts = false;
    isPolice = false;
    isNotice = false;
}

function switchColorSidebar(boolian) {
    boolian = true;
    for (let i = 0; i < classCSS.length; i++) {
        const element = classCSS[i];
    }
}

function openHeaderMenu() {
    openMenu = !openMenu; // Das Umschalten des Wertes von openMenu

    let headerMenu = document.getElementById('menu-header-container');
    openMenu ? headerMenu.classList.remove('d-none') : headerMenu.classList.add('d-none');
}

/**
 * This function is used to mark the active .html page
 *
 */
function markCategory() {
    const currentPage = window.location.href.split('/').pop().trim() || 'index.html';
    const links = document.querySelectorAll(`.sidebar-text[href*="${currentPage}"]`);

    links.forEach(link => {
        const categoryElement = link.querySelector('.sidebar-text-sub');
        categoryElement.classList.add('htmlActive');
        categoryElement.style.color = 'white';
        const categoryImage = link.querySelector('img');
        if (categoryImage) {
            const categoryName = categoryElement.textContent.trim().toLowerCase();
            categoryImage.src = `img/${categoryName}ImageWhite.png`;
        }
    });
}

function userCircle() {
    let container = document.getElementById('header-user-img');
    let nameParts = activUser.name.split(' ');
    let firstName = nameParts[0];
    let lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';
    let nameAbbreviation = `<b>${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}</b>`;
    container.innerHTML = nameAbbreviation
}

function goBack() {
    window.history.back();
}

function renderSidebarHeader() {
    renderHeader();
    renderSidebar();
}

function renderSidebar() {
    let container = document.getElementById('sidebarArea');
    container.innerHTML = returnRenderSidebar();
}

function returnRenderSidebar() {
    return /*html*/`
    <div class="sidebar">

<div class="logo-container">
    <img src="img/join.logo-white.svg" alt="">
</div>

<div class="sidebar-text-area">
    <div class="sideBarCategory">
        <a class="sidebar-text" href="./summary.html">
            <div class="sidebar-text-sub">
                <img src="img/SummaryIcon.svg">
                <div class="fontSize16 fontAtMobile">Summary</div>
            </div>
        </a>
    </div>
    <div class="sideBarCategory">
        <a class="sidebar-text" href="./addTask.html">
            <div class="sidebar-text-sub">
                <img src="img/add.task.icons.svg">
                <div class="fontSize16 fontAtMobile">Add Task</div>
            </div>
        </a>
    </div>
    <div class="sideBarCategory">
        <a class="sidebar-text" href="./board.html">
            <div class="sidebar-text-sub">
                <img src="img/board-icon.svg">
                <div class="fontSize16 fontAtMobile">Board</div>
            </div>
        </a>
    </div>
    <div class="sideBarCategory">
        <a class="sidebar-text" href="./contacts.html">
            <div class="sidebar-text-sub">
                <img src="img/contacts-icon.svg">
                <div class="fontSize16 fontAtMobile">Contacts</div>
            </div>
        </a>
    </div>
</div>
<div class="quickLinksSidebar fontSize16">
    <a href="./privacy-police.html" class="sidebar-bottom">Privacy Policy</a>
    <a href="./legalNotice.html" class="sidebar-bottom">Legal notice</a>
</div>

</div>
    `;
}

function renderHeader() {
    let container = document.getElementById('headerArea');
    container.innerHTML = returnRenderHeader();
}

function returnRenderHeader() {
    return /*html*/`
    <div class="header">
    <img class="headImgLeft" src="./img/headIconLeft.svg">
    <div class="headerHeadlineBox fontSize20">Kanban Projekt Managment Tool</div>
    <div id="userCircleHeader" class="headBoxRight">
        <a href="help.html"> <img class="headBoxRightImg" src="./img/helpIcon.svg" alt=""></a>
        <div onclick="openHeaderMenu()" id="header-user-img" class="headBoxRightUserCircle fontSize16"></div>
    </div>
</div>
    `;
}
function closeDialog() {
    document.getElementById('dialog-full').classList.add('d-none');
}

/** * This function is used to create a slide in animation */
function slide(frontId, backgroundId) {
    toggleVisibility(frontId, true);
    toggleVisibility(backgroundId, true);
    slideInAnimation = document.getElementById(frontId);
    slideInAnimation.classList.remove('slide-out', 'slide-in');
    slideInAnimation.offsetHeight;
    slideInAnimation.classList.add('slide-in');
}

/** * This function is used to create a slide out animation */
function slideOut(frontId, backgroundId, time) {
    toggleVisibility(frontId, true);
    toggleVisibility(backgroundId, true);
    setTimeout(function () {
        toggleVisibility(backgroundId, false);
    }, time);
    slideInAnimation = document.getElementById(frontId);
    slideInAnimation.classList.remove('slide-out', 'slide-in');
    slideInAnimation.offsetHeight;
    slideInAnimation.classList.add('slide-out');
}

/** * This function is used to create a slide in animation */
function slideOneObject(frontId) {
    toggleVisibility(frontId, true);
    slideInAnimation = document.getElementById(frontId);
    slideInAnimation.classList.remove('slide-out', 'slide-in');
    slideInAnimation.offsetHeight;
    slideInAnimation.classList.add('slide-in');
}

/** * This function is used to create a slide out animation */
function slideOutOneObject(frontId) {
    toggleVisibility(frontId, true);
    slideInAnimation = document.getElementById(frontId);
    slideInAnimation.classList.remove('slide-out', 'slide-in');
    slideInAnimation.offsetHeight;
    slideInAnimation.classList.add('slide-out');
}

/** * This function is used to prevent the popup from closing when clicked. */
function doNotClose(event) {
    event.stopPropagation();
}

/** * This function is used to the edit and delete menu on the mobile view */
function changesSaved(inputText) {
    document.getElementById('successfullyCreatedId').innerHTML = /* html */ `
    ${inputText}
    `
    toggleVisibility('successfullyCreatedId', true);
    slideOneObject('successfullyCreatedId');
    setTimeout(function () {
        slideOutOneObject('successfullyCreatedId');
    }, 2500);
    setTimeout(function () {
        toggleVisibility('successfullyCreatedId', false);
    }, 2900);
}

/** * This function is used to make div-container unvisible or visible */
function toggleVisibility(id, show) {
    const showHide = document.getElementById(id);
    showHide.classList.toggle('d-none', !show);
}