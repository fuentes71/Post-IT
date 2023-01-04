let userLogado = JSON.parse(localStorage.getItem("userLogado"));
let listaUser = JSON.parse(localStorage.getItem("listaUser"));
let logado = document.querySelector("#logado");
let tarefa = document.querySelector("#tarefa");
// let detalhe = document.querySelector("#detalhe");
let btnInserir = document.querySelector("#btnInserir");
let btnEdit = document.querySelector("#btnEdit");
let btnDeleteAll = document.querySelector("#btnDeleteAll");
let janelaEdicao = document.querySelector("#janelaEdicao");
let carregando = document.querySelector("#carregando");
let carregado = document.querySelector("#carregado");
let ul = document.querySelector("ul");
let containerList = document.querySelector("#container-list");
let user = userLogado.post;
let index;
logado.innerHTML = `Bem-vindo ${userLogado.nome}`;
if (localStorage.getItem("token") == null) {
  alert("Voce precisa estar logado para acessar está pagina!");
  window.location.href = "../";
}

function sair() {
  localStorage.removeItem("token");
  localStorage.removeItem("userLogado");
  window.location.href = "../";
}

// detalhe.addEventListener("keypress", (e) => {
//   if (e.key == "Enter" && detalhe.value !== "" && tarefa.value !== "") {
//     setItensDB();
//   }
// });

tarefa.addEventListener("keypress", (e) => {
  if (e.key == "Enter" && tarefa.value !== "") {
    e.preventDefault();
    setItensDB();
    tarefa.value = "";
  }
});
btnDeleteAll.onclick = () => {
  let user = userLogado.post;
  if (user.length != 0) {
    let confirmacao = window.confirm("Deseja excluir todas as tarefas?");
    if (confirmacao) {
      user.forEach((item) => {
        for (let i = 0; user.length > 0; i++) {
          user.shift(item);
        }
      });
    }
  }

  updateDB();
};
btnInserir.onclick = () => {
  if (tarefa.value !== "") {
    setItensDB();
    tarefa.value = "";
    tarefa.focus();
  }
};
function display() {
  if (userLogado.post.length > 0)
    containerList.setAttribute("style", "display:grid");
  else containerList.setAttribute("style", "display:none");
}
function setItensDB() {
  if (userLogado.post.length >= 10) {
    alert("Limite máximo de 10 itens atingido!");
    return;
  }
  userLogado.post.push({
    tarefa: tarefa.value,
    status: "",
  });
  updateDB();
}

function updateDB() {
  localStorage.setItem("userLogado", JSON.stringify(userLogado));

  atualizaUsuario();
  loadItens();
}
function loadItens() {
  ul.innerHTML = "";
  listaUser.forEach((user) => {
    if (user.usuario == userLogado.usuario) {
      userLogado.post = user.post;
    }
    display();
  });

  userLogado.post.forEach((item, i) => {
    insertItemTela(item.tarefa, item.status, i);
  });
}

function insertItemTela(tarefa, status, i) {
  const li = document.createElement("li");

  li.innerHTML = `<div class="divLi">
      <input type="checkbox" ${status} data-i=${i} onchange="done(this, ${i});" />
      <span data-si=${i}>${i + 1} | ${tarefa}</span>
      <div class="divButton">
        <button onclick="editar(${i})" data-i=${i}><i class="fa fa-pencil"></i></i></button> |
        <button onclick="removeItem(${i})" data-i=${i}><i class="fa fa-trash"></i></i></button>
      </div>
    </div>`;
  ul.appendChild(li);
  if (status) {
    document.querySelector(`[data-si="${i}"]`).classList.add("line-through");
  } else {
    document.querySelector(`[data-si="${i}"]`).classList.remove("line-through");
  }
  tarefa.value = "";
}

function done(chk, i) {
  if (chk.checked) {
    userLogado.post[i].status = "checked";
  } else {
    userLogado.post[i].status = "";
  }
  updateDB();
}

function editar(i) {
  btnInserir.setAttribute("style", "display:none");
  btnSalvarEditado.setAttribute("style", "display:block");
  tarefa.value = userLogado.post[i].tarefa;
  tarefa.focus();
  index = i;
}
btnSalvarEditado.addEventListener("click", () => {
  userLogado.post[index] = {
    tarefa: tarefa.value,
    status: "",
  };
  updateDB();
  tarefa.value = "";
  btnInserir.setAttribute("style", "display:block");
  btnSalvarEditado.setAttribute("style", "display:none");
});
function removeItem(i) {
  let confirmacao = window.confirm(
    "Tem certeza que deseja excluir está tarefa?"
  );
  if (confirmacao) userLogado.post.splice(i, 1);
  updateDB();
}
function atualizaUsuario() {
  listaUser.forEach((user) => {
    if (user.usuario == userLogado.usuario) {
      user.post = userLogado.post;
      localStorage.setItem("listaUser", JSON.stringify(listaUser));
      console.log(listaUser);
    }
  });
}
function loading() {
  carregando.setAttribute("style", "display:none");
  carregado.setAttribute("style", "display:block");
}
setTimeout(() => {
  loadItens();
});
setTimeout(() => {
  loading();
}, 1000);
