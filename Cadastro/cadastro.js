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
let voltar = document.querySelector("#voltar");

voltar.onclick = () => (window.location.href = "../");

let valid = {
  nome: {
    regex:
      "^(?:[p{Lu}&&[p{IsLatin}]])(?:(?:')?(?:[p{Ll}&&[p{IsLatin}]]))+(?:-(?:[p{Lu}&&[p{IsLatin}]])(?:(?:')?(?:[p{Ll}&&[p{IsLatin}]]))+)*(?: (?:(?:e|y|de(?:(?: la| las| lo| los))?|do|dos|da|das|del|van|von|bin|le) )?(?:(?:(?:d'|D'|O'|Mc|Mac|al-))?(?:[p{Lu}&&[p{IsLatin}]])(?:(?:')?(?:[p{Ll}&&[p{IsLatin}]]))+|(?:[p{Lu}&&[p{IsLatin}]])(?:(?:')?(?:[p{Ll}&&[p{IsLatin}]]))+(?:-(?:[p{Lu}&&[p{IsLatin}]])(?:(?:')?(?:[p{Ll}&&[p{IsLatin}]]))+)*))+(?: (?:Jr.|II|III|IV))?$",
    validNome: false,
  },
  senha: { validSenha: false },
  confirmarSenha: { validConfirmarSenha: false },
  usuario: { validUsuario: false },
};

nome.addEventListener("keyup", () => {
  if (nome.value.length <= 2) {
    valid.nome.validNome = verificacao(
      nome,
      labelNome,
      "Nome *Insira no minimo 3 caracteres",
      "red",
      false
    );
  } else {
    valid.nome.validNome = verificacao(nome, labelNome, "Nome", "green", true);
  }
});
usuario.addEventListener("keyup", () => {
  if (usuario.value.length <= 4) {
    valid.usuario.validUsuario = verificacao(
      usuario,
      labelUsuario,
      "Usuário *Insira no minimo 5 caracteres",
      "red",
      false
    );
  } else {
    valid.usuario.validUsuario = verificacao(
      usuario,
      labelUsuario,
      "Usuário",
      "green",
      true
    );
  }
});
senha.addEventListener("keyup", () => {
  if (senha.value.length <= 5) {
    valid.senha.validSenha = verificacao(
      senha,
      labelSenha,
      "Senha *Insira no minimo 6 caracteres",
      "red",
      false
    );
  } else {
    valid.senha.validSenha = verificacao(
      senha,
      labelSenha,
      "Senha",
      "green",
      true
    );
  }
});
confirmarSenha.addEventListener("keyup", () => {
  if (senha.value !== confirmarSenha.value) {
    valid.confirmarSenha.validConfirmarSenha = verificacao(
      confirmarSenha,
      labelConfirmarSenha,
      "Confirmar Senha *Senhas diferentes!",
      "red",
      false
    );
  } else {
    valid.confirmarSenha.validConfirmarSenha = verificacao(
      confirmarSenha,
      labelConfirmarSenha,
      "Confirmar Senha",
      "green",
      true
    );
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
function verificacao(value, label, html, color, boolean) {
  label.setAttribute("style", "color: " + color);
  label.innerHTML = html;
  value.setAttribute("style", "border-color: " + color);
  return boolean;
}

function cadastrar() {
  if (
    valid.nome.validNome &&
    valid.senha.validSenha &&
    valid.confirmarSenha.validConfirmarSenha &&
    valid.usuario.validUsuario
  ) {
    let listaUser = JSON.parse(localStorage.getItem("listaUser") || "[]");
    let verificar = true;
    listaUser.forEach((user) => {
      if (user.usuario == usuario.value) return (verificar = false);
    });
    if (verificar) {
      sucess(listaUser);
    } else {
      usuarioExiste();
    }
  } else {
    campoVazio();
  }
}

function usuarioExiste() {
  error.setAttribute("style", "display:block");
  sucesso.setAttribute("style", "display:none");
  error.innerHTML = "<strong>Usuario já existente!</strong>";
  sucesso.innerHTML = "";
  setTimeout(() => {
    error.setAttribute("style", "display:none");
    error.innerHTML = "";
  }, 1000);
}
function sucess(listaUser) {
  listaUser.push({
    nome: nome.value,
    usuario: usuario.value,
    senha: senha.value,
    post: [],
  });
  localStorage.setItem("listaUser", JSON.stringify(listaUser));
  sucesso.setAttribute("style", "display:block");
  error.setAttribute("style", "display:none");
  sucesso.innerHTML = "<strong>Cadastrando usuário...</strong>";
  error.innerHTML = "";
  setTimeout(() => {
    window.location.href = "../";
  }, 1000);
}
function campoVazio() {
  error.setAttribute("style", "display:block");
  sucesso.setAttribute("style", "display:none");
  error.innerHTML = "<strong>Preencha todos os campos corretamente!</strong>";
  sucesso.innerHTML = "";
  setTimeout(() => {
    error.setAttribute("style", "display:none");
    error.innerHTML = "";
  }, 1000);
}
