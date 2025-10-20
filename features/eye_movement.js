var header = document.getElementById("header");
var parallax = -3, max_dist = 8;
var mouseX = 0, mouseY = 0;
var scale = Math.max(window.innerWidth / 3840, window.innerHeight / 2880);

function update_eyes() {
    var left_dx = mouseX - (window.innerWidth / 2 + 260 * scale);
    var left_dy = mouseY - (window.innerHeight / 2 - 240 * scale + window.scrollY / parallax);
    var right_dx = mouseX - (window.innerWidth / 2 + 590 * scale);
    var right_dy = mouseY - (window.innerHeight / 2 - 220 * scale + window.scrollY / parallax);

    var left_dist = Math.sqrt(left_dx * left_dx + left_dy * left_dy);
    var right_dist = Math.sqrt(right_dx * right_dx + right_dy * right_dy);

    var left_x = 10, left_y = 3;
    if (left_dist > max_dist * scale) {
        left_x += max_dist * left_dx / left_dist;
        left_y += max_dist * left_dy / left_dist;
    }
    else {
        left_x += left_dx / scale;
        left_y += left_dy / scale;
    }

    var right_x = 14, right_y = 5;
    if (right_dist > max_dist * scale) {
        right_x += max_dist * right_dx / right_dist;
        right_y += max_dist * right_dy / right_dist;
    }
    else {
        right_x += right_dx / scale;
        right_y += right_dy / scale;
    }

    header.style.backgroundPositionX = `50%, calc(50% + ${left_x * scale}px), calc(50% + ${right_x * scale}px), 50%`;
    header.style.backgroundPositionY = `calc(50% + ${window.scrollY / parallax}px), calc(50% + ${left_y * scale + window.scrollY / parallax}px), calc(50% + ${right_y * scale + window.scrollY / parallax}px), calc(50% + ${window.scrollY / parallax}px)`;
}

window.addEventListener("resize", () => {
    scale = Math.max(window.innerWidth / 3840, window.innerHeight / 2880);
    update_eyes();
});
document.addEventListener("pointermove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    update_eyes();
});
document.addEventListener("scroll", update_eyes);