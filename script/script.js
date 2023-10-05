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