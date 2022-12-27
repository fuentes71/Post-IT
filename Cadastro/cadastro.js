let usuario = document.querySelector("#usuario");
let nome = document.querySelector("#nome");
let senha = document.querySelector("#senha");
let confirmarSenha = document.querySelector("#confirmarSenha");

let labelUsuario = document.querySelector("#labelUsuario");
let labelNome = document.querySelector("#labelNome");
let labelSenha = document.querySelector("#labelSenha");
let labelConfirmarSenha = document.querySelector("#labelConfirmarSenha");
let btnSenha = document.querySelector("#verSenha");
let btnConfirmarSenha = document.querySelector("#verConfirmarSenha");
let error = document.querySelector("#error");
let sucesso = document.querySelector("#sucesso");
let valid = {
  nome: { validNome: false },
  senha: { validSenha: false },
  confirmarSenha: { validConfirmarSenha: false },
  usuario: { validUsuario: false },
};
nome.addEventListener("keyup", () => {
  if (nome.value.length <= 2) {
    labelNome.setAttribute("style", "color: red");
    labelNome.innerHTML = "Nome *Insira no minimo 3 caracteres";
    nome.setAttribute("style", "border-color: red");
    valid.nome.validNome = false;
  } else {
    labelNome.setAttribute("style", "color: green");
    nome.setAttribute("style", "border-color: green");
    labelNome.innerHTML = "Nome";
    valid.nome.validNome = true;
  }
});
usuario.addEventListener("keyup", () => {
  if (usuario.value.length <= 4) {
    labelUsuario.setAttribute("style", "color: red");
    labelUsuario.innerHTML = "Usuario *Insira no minimo 5 caracteres";
    usuario.setAttribute("style", "border-color: red");
    valid.usuario.validUsuario = false;
  } else {
    labelUsuario.setAttribute("style", "color: green");
    usuario.setAttribute("style", "border-color: green");
    labelUsuario.innerHTML = "Usuario";
    valid.usuario.validUsuario = true;
  }
});
senha.addEventListener("keyup", () => {
  if (senha.value.length <= 5) {
    labelSenha.setAttribute("style", "color: red");
    labelSenha.innerHTML = "Senha *Insira no minimo 6 caracteres";
    senha.setAttribute("style", "border-color: red");
    valid.senha.validSenha = true;
  } else {
    labelSenha.setAttribute("style", "color: green");
    senha.setAttribute("style", "border-color: green");
    labelSenha.innerHTML = "Senha";
    valid.senha.validSenha = true;
  }
});
confirmarSenha.addEventListener("keyup", () => {
  if (senha.value !== confirmarSenha.value) {
    labelConfirmarSenha.setAttribute("style", "color: red");
    labelConfirmarSenha.innerHTML = "Confirmar Senha *As senhas não conferem";
    confirmarSenha.setAttribute("style", "border-color: red");
    valid.confirmarSenha.validConfirmarSenha = false;
    console.log(valid.confirmarSenha.validConfirmarSenha);
  } else {
    labelConfirmarSenha.setAttribute("style", "color: green");
    confirmarSenha.setAttribute("style", "border-color: green");
    labelConfirmarSenha.innerHTML = "Confirmar Senha";
    valid.confirmarSenha.validConfirmarSenha = true;
    console.log(valid.confirmarSenha.validConfirmarSenha);
  }
});

btnSenha.addEventListener("click", () => {
  if (btnSenha.classList.contains("fa-eye")) {
    btnSenha.classList.remove("fa-eye");
    btnSenha.classList.add("fa-eye-slash");
  } else if (btnSenha.classList.contains("fa-eye-slash")) {
    btnSenha.classList.remove("fa-eye-slash");
    btnSenha.classList.add("fa-eye");
  }
  let inputSenha = document.querySelector("#senha");

  if (inputSenha.getAttribute("type") == "password") {
    inputSenha.setAttribute("type", "text");
  } else {
    inputSenha.setAttribute("type", "password");
  }
});
btnConfirmarSenha.addEventListener("click", () => {
  if (btnConfirmarSenha.classList.contains("fa-eye")) {
    btnConfirmarSenha.classList.remove("fa-eye");
    btnConfirmarSenha.classList.add("fa-eye-slash");
  } else if (btnConfirmarSenha.classList.contains("fa-eye-slash")) {
    btnConfirmarSenha.classList.remove("fa-eye-slash");
    btnConfirmarSenha.classList.add("fa-eye");
  }
  let inputSenha = document.querySelector("#confirmarSenha");

  if (inputSenha.getAttribute("type") == "password") {
    inputSenha.setAttribute("type", "text");
  } else {
    inputSenha.setAttribute("type", "password");
  }
});

function cadastrar() {
  if (
    valid.nome.validNome &&
    valid.senha.validSenha &&
    valid.confirmarSenha.validConfirmarSenha &&
    valid.usuario.validUsuario
  ) {
    let listaUser = JSON.parse(localStorage.getItem("listaUser") || "[]");
    listaUser.push({
      nome: nome.value,
      usuario: usuario.value,
      senha: senha.value,
    });

    localStorage.setItem("listaUser", JSON.stringify(listaUser));
    sucesso.setAttribute("style", "display:block");
    error.setAttribute("style", "display:none");
    sucesso.innerHTML = "<strong>Cadastrando usuário...</strong>";
    error.innerHTML = "";
    setTimeout(() => {
      window.location.href = "https://fuentes71.github.io/Post-IT/";
    }, 1000);
  } else {
    error.setAttribute("style", "display:block");
    sucesso.setAttribute("style", "display:none");
    error.innerHTML = "<strong>Preencha todos os campos corretamente!</strong>";
    sucesso.innerHTML = "";
  }
}
