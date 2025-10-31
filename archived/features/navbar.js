var navbar = document.getElementById("navbar");

function update_nav() {
    if (window.scrollY >= 80)
        navbar.classList.add("nav-scrolled");
    else
        navbar.classList.remove("nav-scrolled");
}

window.addEventListener("load", update_nav);
window.addEventListener("scroll", update_nav);