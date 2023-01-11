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
let retornar = document.querySelector("#retornar");
let retornarTudo = document.querySelector("#retornarTudo");
let avancar = document.querySelector("#avancar");
let user = userLogado.post;
let paginate = 1;
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
  }
});

tarefa.addEventListener("keydown", (e) => {
  if (tarefa.value.length < 25) {
    textoLenght(e, spanTarefa, tarefa.value.length, 25);
  }
});
btnInserir.onclick = () => {
  if (descricao.value == "" && tarefa.value == "") {
  } else {
    inputTarefa();
    // textoLenght(e, spanTarefa, 0, 25);
    // textoLenght(e, spanDescricao, 0, 50);
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
  paginacao.innerHTML = paginate;
  itemLista.innerHTML = `${userLogado.post.length}/30 Itens`;
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
  if (userLogado.post.length >= 30) {
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
function verificarPaginacao() {
  if (userLogado.post.length == 0) {
    userLogado.paginate = 1;
  }
  if (userLogado.paginate == 1) {
    if (userLogado.post.length > 10) userLogado.paginate += 1;
  }
  if (userLogado.paginate == 2) {
    if (userLogado.post.length > 20) userLogado.paginate += 1;
    if (userLogado.post.length < 10) userLogado.paginate -= 1;
  }
  if (userLogado.paginate == 3) {
    if (userLogado.post.length < 20) userLogado.paginate -= 1;
  }
}
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
  verificarPaginacao();
  loadpag();
  ul.innerHTML = "";
  listaUser.forEach((user) => {
    if (user.usuario == userLogado.usuario) {
      userLogado.post = user.post;
    }
    display();
    itensLista();
  });
  userLogado.post.forEach((item, i) => {
    switch (paginate) {
      case 1:
        if (i < 10) {
          switch (filtro) {
            case 1:
              if (item.status === "") {
                insertItemTela(item.tarefa, item.descricao, item.status, i);
              }
              break;
            case 2:
              if (item.status === "checked") {
                insertItemTela(item.tarefa, item.descricao, item.status, i);
              }
              break;
            default:
              insertItemTela(item.tarefa, item.descricao, item.status, i);
              break;
          }
        } else {
          return;
        }
        break;
      case 2:
        if (i > 9 && i < 20) {
          switch (filtro) {
            case 1:
              if (item.status === "") {
                insertItemTela(item.tarefa, item.descricao, item.status, i);
              }
              break;
            case 2:
              if (item.status === "checked") {
                insertItemTela(item.tarefa, item.descricao, item.status, i);
              }
              break;
            default:
              insertItemTela(item.tarefa, item.descricao, item.status, i);
              break;
          }
        } else {
          return;
        }
        break;
      case 3:
        if (i > 19 && i < 30) {
          switch (filtro) {
            case 1:
              if (item.status === "") {
                insertItemTela(item.tarefa, item.descricao, item.status, i);
              }
              break;
            case 2:
              if (item.status === "checked") {
                insertItemTela(item.tarefa, item.descricao, item.status, i);
              }
              break;
            default:
              insertItemTela(item.tarefa, item.descricao, item.status, i);
              break;
          }
        } else {
          return;
        }
        break;

      default:
        break;
    }
  });
}
retornar.onclick = () => {
  paginate -= 1;
  loadpag();
  loadItens();
};
retornarTudo.onclick = () => {
  paginate = 1;
  loadpag();
  loadItens();
};

avancar.onclick = () => {
  paginate += 1;
  loadpag();
  loadItens();
};
avancarTudo.onclick = () => {
  paginate = userLogado.paginate;
  loadpag();
  loadItens();
};

function loadpag() {
  if (userLogado.paginate > 1) {
    if (paginate === 1) {
      retornar.setAttribute("style", "display:none");
      retornarTudo.setAttribute("style", "display:none");
      avancar.setAttribute("style", "display:block");
      avancarTudo.setAttribute("style", "display:block");
    } else if (paginate === userLogado.paginate) {
      retornar.setAttribute("style", "display:block");
      retornarTudo.setAttribute("style", "display:block");
      avancar.setAttribute("style", "display:none");
      avancarTudo.setAttribute("style", "display:none");
    } else {
      avancar.setAttribute("style", "display:block");
      avancarTudo.setAttribute("style", "display:block");
    }
  } else {
    retornar.setAttribute("style", "display:none");
    retornarTudo.setAttribute("style", "display:none");
    avancar.setAttribute("style", "display:none");
    avancarTudo.setAttribute("style", "display:none");
  }
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
        <button onclick="editar(${i})" data-i=${i}><i class="fa fa-pencil"></i></i></button> <span style="color:">|</span>
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

btnSalvarEditado.addEventListener("click", () => {
  userLogado.post[index] = {
    tarefa: tarefa.value,
    descricao: descricao.value,
    status: "",
  };
  updateDB();
  editarbackground();
  tarefa.value = "";
  descricao.value = "";
  btnInserir.setAttribute("style", "display:block");
  btnSalvarEditado.setAttribute("style", "display:none");
});
function editarbackground() {
  let div = document.getElementById(`div-${index}`);
  div.animate();
  div.classList.add("active");
  setTimeout(() => {
    div.classList.remove("active");
  }, 200);
  console.log(div);
}
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
