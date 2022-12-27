let btn = document.querySelector(".fa");

btn.addEventListener("click", () => {
  if (btn.classList.contains("fa-eye")) {
    btn.classList.remove("fa-eye");
    btn.classList.add("fa-eye-slash");
  } else if (btn.classList.contains("fa-eye-slash")) {
    btn.classList.remove("fa-eye-slash");
    btn.classList.add("fa-eye");
  }
  let inputSenha = document.querySelector("#senha");

  if (inputSenha.getAttribute("type") == "password") {
    inputSenha.setAttribute("type", "text");
  } else {
    inputSenha.setAttribute("type", "password");
  }
});
