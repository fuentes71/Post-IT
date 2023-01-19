let usuario = document.querySelector("#usuario");
let labelUser = document.querySelector("#labelUser");
let senha = document.querySelector("#senha");
let labelSenha = document.querySelector("#labelSenha");
let error = document.querySelector("#error");
let btn = document.querySelector(".fa");
let inputSenha = document.querySelector("#senha");

btn.addEventListener("click", () => {
  if (btn.classList.contains("fa-eye")) {
    btn.classList.remove("fa-eye");
    btn.classList.add("fa-eye-slash");
  } else if (btn.classList.contains("fa-eye-slash")) {
    btn.classList.remove("fa-eye-slash");
    btn.classList.add("fa-eye");
  }

  if (inputSenha.getAttribute("type") == "password") {
    inputSenha.setAttribute("type", "text");
  } else {
    inputSenha.setAttribute("type", "password");
  }
});

if (localStorage.getItem("token") !== null) {
  window.location.href = "../Tela-Inicial/tela.html";
}

function login() {
  let listaUser = [];
  let userValido = {
    nome: "",
    usuario: "",
    senha: "",
  };

  listaUser = JSON.parse(localStorage.getItem("listaUser"));

  if (!listaUser) {
    return errorStyle();
  }
  listaUser.forEach((item) => {
    if (usuario.value == item.usuario && senha.value == item.senha) {
      userValido = {
        nome: item.nome,
        usuario: item.usuario,
        senha: item.senha,
        paginate: 1,
        post: [],
      };
    }
  });
  if (usuario.value == userValido.usuario && senha.value == userValido.senha) {
    window.location.href = "../Tela-Inicial/tela.html";
    let token =
      Math.random().toString(16).substring(2) +
      Math.random().toString(16).substring(2);
    localStorage.setItem("token", token);
    localStorage.setItem("userLogado", JSON.stringify(userValido));
  } else {
    errorStyle();
    return;
  }
}

const errorStyle = () => {
  labelUser.setAttribute("style", "color:red");
  labelSenha.setAttribute("style", "color:red");
  usuario.setAttribute("style", "border-color: red");
  senha.setAttribute("style", "border-color: red");
  error.setAttribute("style", "display:block");
  if (!usuario.value || !senha.value) {
    usuario.focus();
    error.innerHTML = "Preencha os campos";
  } else {
    error.innerHTML = "Usuario ou senha incorretos";
    usuario.focus();
  }
  setTimeout(() => {
    error.innerHTML = "";
    labelUser.removeAttribute("style", "color:red");
    labelSenha.removeAttribute("style", "color:red");
    usuario.removeAttribute("style", "border-color: red");
    senha.removeAttribute("style", "border-color: red");
    error.removeAttribute("style", "display:block");
    error.removeAttribute("style", "display:none");
  }, 1500);
};
