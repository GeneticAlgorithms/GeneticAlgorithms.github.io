var pets = document.getElementById("pets");
var vel = 0;

function center_dist(idx) {
    if (idx < 0 || idx >= pets.children.length) return Infinity;
    var rect = pets.children[idx].getBoundingClientRect();
    return window.innerWidth / 2 - (rect.left + rect.right) / 2;
}

function update_pets() {
    var size = pets.firstElementChild.clientWidth;
    var right = pets.firstElementChild.getBoundingClientRect().right;
    if (right <= -size) {
        pets.appendChild(pets.firstElementChild);
        pets.scrollLeft -= size;
    } else if (right >= 0) {
        pets.scrollLeft += pets.lastElementChild.clientWidth;
        pets.insertBefore(pets.lastElementChild, pets.firstElementChild);
    }

    for (image of pets.children) {
        var rect = image.getBoundingClientRect();
        var scale = window.innerWidth / 2 - (rect.right + rect.left) / 2;
        scale = 1 - 0.75 * Math.abs(scale) / window.innerWidth;
        image.style.scale = scale;
    }
}

pets.addEventListener("pointermove", (event) => {
    event.preventDefault();
    if (Math.abs(event.movementX) > 0.5 && getComputedStyle(pets).getPropertyValue("content") == '"dragging"') {
        vel = event.movementX;
        pets.scrollLeft -= vel;
    }
});

pets.addEventListener("scroll", update_pets);
window.addEventListener("resize", update_pets);
setInterval(() => {
    if (vel > 0) vel = Math.max(0, vel - 5);
    else vel = Math.min(0, vel + 5);

    pets.scrollLeft -= vel;
}, 30);