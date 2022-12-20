let usuario = document.querySelector("#usuario");
let senha = document.querySelector("#senha");
let confirmarSenha = document.querySelector("#confirmarSenha");
let labelUsuario = document.querySelector("#labelUsuario");
let labelSenha = document.querySelector("#labelSenha");
let labelConfirmarSenha = document.querySelector("#labelConfirmarSenha");
let btnSenha = document.querySelector("#verSenha");
let btnConfirmarSenha = document.querySelector("#verConfirmarSenha");

usuario.addEventListener("keyup", () => {
  if (usuario.value.length <= 2) {
    labelUsuario.setAttribute("style", "color: red");
    labelUsuario.innerHTML = "Usuario *Insira no minimo 3 caracteres";
    usuario.setAttribute("style", "border-color: red");
  } else {
    labelUsuario.setAttribute("style", "color: green");
    usuario.setAttribute("style", "border-color: green");
    labelUsuario.innerHTML = "Usuario";
  }
});
senha.addEventListener("keyup", () => {
  if (senha.value.length <= 5) {
    labelSenha.setAttribute("style", "color: red");
    labelSenha.innerHTML = "Senha *Insira no minimo 6 caracteres";
    senha.setAttribute("style", "border-color: red");
  } else {
    labelSenha.setAttribute("style", "color: green");
    senha.setAttribute("style", "border-color: green");
    labelSenha.innerHTML = "Senha";
  }
});
confirmarSenha.addEventListener("keyup", () => {
  if (senha.value !== confirmarSenha.value) {
    labelConfirmarSenha.setAttribute("style", "color: red");
    labelConfirmarSenha.innerHTML = "Senha *senhas diferentes";
    confirmarSenha.setAttribute("style", "border-color: red");
  } else {
    labelConfirmarSenha.setAttribute("style", "color: green");
    confirmarSenha.setAttribute("style", "border-color: green");
    labelConfirmarSenha.innerHTML = "Senha igual";
  }
});

btnSenha.addEventListener("click", () => {
  let inputSenha = document.querySelector("#senha");

  if (inputSenha.getAttribute("type") == "password") {
    inputSenha.setAttribute("type", "text");
  } else {
    inputSenha.setAttribute("type", "password");
  }
});
btnConfirmarSenha.addEventListener("click", () => {
  let inputSenha = document.querySelector("#confirmarSenha");

  if (inputSenha.getAttribute("type") == "password") {
    inputSenha.setAttribute("type", "text");
  } else {
    inputSenha.setAttribute("type", "password");
  }
});

function cadastrar() {}
