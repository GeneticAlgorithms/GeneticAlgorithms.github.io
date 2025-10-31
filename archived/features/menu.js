var sidemenu = document.getElementById("side-menu");
var navbar = sidemenu.parentElement;

function clickevent(event) {
    if (!navbar.contains(event.target))
        closemenu();
}

function openmenu() {
    sidemenu.style.right = "0";
    window.addEventListener("click", clickevent);
}

function closemenu() {
    sidemenu.style.right = "-40vw";
    window.removeEventListener("click", clickevent);
}