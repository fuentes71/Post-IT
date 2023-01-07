let userLogado = JSON.parse(localStorage.getItem("userLogado"));
let listaUser = JSON.parse(localStorage.getItem("listaUser"));
let logado = document.querySelector("#logado");
let tarefa = document.querySelector("#tarefa");
let descricao = document.querySelector("#descricao");
let btnInserir = document.querySelector("#btnInserir");
let btnEdit = document.querySelector("#btnEdit");
let btnDeleteAll = document.querySelector("#btnDeleteAll");
let janelaEdicao = document.querySelector("#janelaEdicao");
let carregando = document.querySelector("#carregando");
let carregado = document.querySelector("#carregado");
let ul = document.querySelector("ul");
let spanTarefa = document.querySelector("#spanTarefa");
let spanDescricao = document.querySelector("#spanDescricao");
let containerList = document.querySelector("#container-list");
let todos = document.querySelector("#todos");
let ativos = document.querySelector("#ativos");
let completos = document.querySelector("#completos");
let divLi = document.querySelector(".divLi");
let itemLista = document.querySelector("#itemLista");
let user = userLogado.post;
let index;
let filtro;
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
descricao.addEventListener("keydown", (e) => {
  if (descricao.value.length < 50) {
    textoLenght(e, spanDescricao, descricao.value.length, 50);

    if (e.key == "Enter" && descricao.value !== "" && tarefa.value !== "") {
      e.preventDefault();
      inputTarefa();
    }
  }
});

tarefa.addEventListener("keydown", (e) => {
  if (tarefa.value.length < 25) {
    textoLenght(e, spanTarefa, tarefa.value.length, 25);
    if (e.key == "Enter" && descricao.value !== "" && tarefa.value !== "") {
      e.preventDefault();
      inputTarefa();
    }
  }
});
btnInserir.onclick = () => {
  if (descricao.value !== "" && tarefa.value !== "") {
    inputTarefa();
  }
};
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

function itensLista() {
  itemLista.innerHTML = `${userLogado.post.length}/10`;
}
function textoLenght(e, span, length, number) {
  if (e.code !== "Backspace") {
    span.innerHTML = `${length + 1}/${number}`;
  } else {
    span.innerHTML = `${length}/${number}`;
  }
}
function inputTarefa() {
  setItensDB();
  descricao.value = "";
  tarefa.value = "";
  tarefa.focus();
}
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
    descricao: descricao.value,
    status: "",
  });
  updateDB();
}
todos.onclick = () => {
  estiloFooter(todos, ativos, completos);
  filtro = 0;
  loadItens();
};
ativos.onclick = () => {
  estiloFooter(ativos, todos, completos);
  filtro = 1;
  loadItens();
};
completos.onclick = () => {
  estiloFooter(completos, ativos, todos);
  filtro = 2;
  loadItens();
};

function estiloFooter(add, remove1, remove2) {
  add.classList.add("on");
  remove1.classList.remove("on");
  remove2.classList.remove("on");
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
    itensLista();
  });

  userLogado.post.forEach((item, i) => {
    switch (filtro) {
      case 1:
        console.log(filtro);
        if (item.status === "") {
          insertItemTela(item.tarefa, item.descricao, item.status, i);
        }
        break;
      case 2:
        console.log(filtro);
        if (item.status === "checked") {
          insertItemTela(item.tarefa, item.descricao, item.status, i);
        }
        break;
      default:
        console.log(filtro);
        insertItemTela(item.tarefa, item.descricao, item.status, i);
        break;
    }
  });
}

function insertItemTela(tarefa, descricao, status, i) {
  const li = document.createElement("li");

  li.innerHTML = `<div id='div-${i}' class="divLi">
            <div class="divCheck">
             <input type="checkbox"  class="_checkbox" id="${i}" ${status} data-i=${i} onchange="done(this, ${i});"  />
              <label for="${i}">
                <div id="tick_mark"></div>
              </label>
            </div>
            <span data-si=${i}> 
              <h2>${tarefa}</h2>
              <p>${descricao}</p>
            </span>
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
  descricao.value = userLogado.post[i].descricao;
  tarefa.focus();
  index = i;
}
btnSalvarEditado.addEventListener("click", (e) => {
  userLogado.post[index] = {
    tarefa: tarefa.value,
    descricao: descricao.value,
    status: "",
  };
  updateDB();
  tarefa.value = "";
  descricao.value = "";
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
