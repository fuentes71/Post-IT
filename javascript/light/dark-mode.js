const html = document.querySelector("html");
const darkMode = document.getElementById("darkMode");
const img = document.getElementById("img");
let mode = localStorage.getItem("mode");

darkMode.addEventListener("click", () => {
  if (mode == "false") {
    localStorage.setItem("mode", true);
    mode = "true";
  } else {
    localStorage.setItem("mode", false);
    mode = "false";
  }
  console.log(mode);
  setDarkmode();
});

function setDarkmode() {
  if (mode == "true") {
    html.classList.add("dark-mode");
    img.setAttribute("src", "../Assets/svg/sun.svg");
    img.setAttribute("alt", "Sol");
  }
  if (mode == "false") {
    html.classList.remove("dark-mode");
    img.setAttribute("src", "../Assets/svg/moon.svg");
    img.setAttribute("alt", "Lua");
  }
}
function getMode() {
  if (localStorage.getItem("mode") == null) {
    return localStorage.setItem("mode", false);
  }
}
setTimeout(() => getMode(), setDarkmode());
