var projects = document.getElementsByClassName("project");

for (element of projects) {
  element.addEventListener("mouseenter", (event) => {
      var info = event.target.getElementsByClassName("project-info")[0];
      event.target.style.height = `calc(${info.clientHeight + event.target.firstElementChild.clientHeight}px + 4vh)`;
  });

  element.addEventListener("mouseleave", (event) => {
      event.target.style.height = `calc(${event.target.firstElementChild.clientHeight}px + 2vh)`;
  });
}

function update_projects() {
  for (element of document.getElementsByClassName("project")) {
    if (element.clientHeight > element.firstElementChild.clientHeight * 2) {
      var info = element.getElementsByClassName("project-info")[0];
      element.style.height = `calc(${info.clientHeight + element.firstElementChild.clientHeight}px + 4vh)`;
    } else {
      element.style.height = `calc(${element.firstElementChild.clientHeight}px + 2vh)`;
    }
  }
}

window.addEventListener("resize", update_projects);
window.addEventListener("load", update_projects);