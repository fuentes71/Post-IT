let divConfirm = document.getElementById("divConfirm");
let tituloAlert = document.getElementById("tituloAlert");
let textoAlert = document.getElementById("textoAlert");
let confirmar = document.getElementById("confirmar");
let cancelar = document.getElementById("cancelar");
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
let filtro;
if (localStorage.getItem("token") == null) {
  alert("Voce precisa estar logado para acessar está pagina!");
  window.location.href = "../";
}

function sair() {
  alerta("Desconectar", "Voce tem certeza que deseja desconectar da pagina?");
  divConfirm.addEventListener("click", (e) => {
    if (e.target.id == "confirmar") {
      localStorage.removeItem("token");
      localStorage.removeItem("userLogado")((window.location.href = "../"));
    }
  });
}
descricao.addEventListener("keydown", (e) => {
  console.log(e.key);
  if (e.key != "tab" || e.key != "enter") {
    if (descricao.value.length < 50) {
      textoLenght(e, spanDescricao, descricao.value.length, 50);
    }
  }
});

tarefa.addEventListener("keydown", (e) => {
  if (tarefa.value.length < 25) {
    textoLenght(e, spanTarefa, tarefa.value.length, 25);
    // validar();
  }
});
function inserir() {
  if (descricao.value !== "" && tarefa.value !== "") {
    inputTarefa();
    spanTarefa.innerHTML = "0/25";
    spanDescricao.innerHTML = "0/50";
  } else {
    alerta(
      "CAMPOS EM BRANCO!",
      "Necessario preenchimento de todos os Campos!!",
      "none"
    );
  }
}

btnDeleteAll.onclick = () => {
  let user = userLogado.post;
  if (user.length != 0) {
    alerta("EXCLUIR", "Deseja excluir todas as tarefas?");
    divConfirm.addEventListener("click", (e) => {
      if (e.target.id == "confirmar") {
        user.forEach((item) => {
          for (let i = 0; user.length > 0; i++) {
            user.shift(item);
          }
        });
      }
      updateDB();
    });
  } else {
    alerta("#ERROR", "Não há nenhum item na lista!!", "none");
  }
};

// const validar = () => {
//   if (descricao.value == "" && tarefa.value == "") {
//     btnInserir.setAttribute("disabled", "disabled");
//   } else {
//     btnInserir.setAttribute("disabled", "false");
//   }
// };
function itensLista() {
  paginacao.innerHTML = paginate;
  itemLista.innerHTML = `${userLogado.post.length}/30 Tarefas`;
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

function setItensDB() {
  if (userLogado.post.length >= 30) {
    alerta("LIMITE ATINGIDO!", "Limite maximo de 30 tarefas!", "none");
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

  li.innerHTML = `<div id='div-${i}' class="divLi ">
            <div class="divCheck">
             <input type="checkbox"  class="_checkbox" id="${i}" ${status} data-i=${i} onchange="done(this, ${i});"  />
              <label for="${i}">
                <div id="tick_mark"></div>
              </label>
            </div>
            <span data-si=${i}> 
              <h2>${tarefa}</h2> <span id="span-${i}"></span>
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
  btnInserir.setAttribute("class", "btnSalvarEditado");
  btnInserir.innerHTML = "Salvar";
  btnInserir.setAttribute("onclick", `salvarEdicao(${i})`);
  tarefa.value = userLogado.post[i].tarefa;
  descricao.value = userLogado.post[i].descricao;
  spanTarefa.innerHTML = `${userLogado["post"][i].tarefa.length}/25`;
  spanDescricao.innerHTML = `${userLogado["post"][i].descricao.length}/50`;
  tarefa.focus();
}

function salvarEdicao(i) {
  if (tarefa.value !== "" && descricao.value != "") {
    userLogado.post[i] = {
      tarefa: tarefa.value,
      descricao: descricao.value,
      status: "",
    };
    updateDB();
    editarbackground(i);
    tarefa.value = "";
    spanTarefa.innerHTML = "0/25";
    descricao.value = "";
    spanDescricao.innerHTML = "0/50";
    btnInserir.removeAttribute("class", "btnSalvarEditado");
    btnInserir.innerHTML = "+";
    btnInserir.setAttribute("onclick", `inserir()`);
  } else {
    alerta(
      "Preencha todos os campos!",
      "Necessario preenchimento de todos os campos para Salvar a alteração!!",
      "none"
    );
  }
}
function editarbackground(i) {
  let div = document.getElementById(`div-${i}`);
  div.classList.add("active");
  setTimeout(() => {
    div.classList.remove("active");
  }, 100);
  console.log(div);
}
function removeItem(i) {
  alerta("EXCLUIR TAREFA!", "Tem certeza que deseja excluir está tarefa?");
  let index = i;
  divConfirm.addEventListener("click", (e) => {
    console.log(index);
    if (e.target.id == "confirmar") {
      userLogado.post.splice(index, 1);
      updateDB();
    }
  });
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

function alerta(titulo, texto, display) {
  divConfirm.setAttribute("style", "display: flex");
  let div = document.createElement("div");
  div.innerHTML = `
          <h2 id="tituloAlert">${titulo}</h2>
          <span id="textoAlert">${texto}</span>
          <input type="button" id='confirmar' value="Confirmar" >
          <input type="button" style="display:${display}" id='cancelar' value="Cancelar" >
  `;
  div.setAttribute("class", "content-box");
  divConfirm.appendChild(div);
  divConfirm.addEventListener("click", (e) => {
    if (
      e.target.id == "divConfirm" ||
      e.target.id == "cancelar" ||
      e.target.id == "confirmar"
    ) {
      divConfirm.innerHTML = "";
      divConfirm.removeAttribute("style", "display: flex");
    }
  });
}

setTimeout(() => {
  loadItens();
});
setTimeout(() => {
  loading();
}, 1000);
