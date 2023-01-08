function login() {
  let usuario = document.querySelector("#usuario");
  let labelUser = document.querySelector("#labelUser");

  let senha = document.querySelector("#senha");
  let labelSenha = document.querySelector("#labelSenha");

  let error = document.querySelector("#error");
  let listaUser = [];

  let userValido = {
    nome: "",
    usuario: "",
    senha: "",
  };

  listaUser = JSON.parse(localStorage.getItem("listaUser"));

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
    window.location.href = "./Tela-Inicial/tela.html";
    let token =
      Math.random().toString(16).substring(2) +
      Math.random().toString(16).substring(2);
    localStorage.setItem("token", token);
    localStorage.setItem("userLogado", JSON.stringify(userValido));
  } else {
    labelUser.setAttribute("style", "color:red");
    labelSenha.setAttribute("style", "color:red");
    usuario.setAttribute("style", "border-color: red");
    senha.setAttribute("style", "border-color: red");
    error.setAttribute("style", "display:block");
    error.innerHTML = "Usuario ou senha incorretos";
    usuario.focus();
  }
  console.log(userValido);
}
