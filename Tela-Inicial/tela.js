let userLogado = JSON.parse(localStorage.getItem("userLogado"));
let logado = document.querySelector("#logado");
let tarefa = document.querySelector("#tarefa");
// let detalhe = document.querySelector("#detalhe");
let btnInsert = document.querySelector("#btnInsert");
let btnDeleteAll = document.querySelector("#btnDeleteAll");
let ul = document.querySelector("ul");
const user = userLogado.post;

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
    setItensDB();
  }
});
btnDeleteAll.onclick = () => {
  user.forEach((item) => {
    for (let i = 0; user.length > 0; i++) {
      user.shift(item);
    }
  });
  updateDB();
  console.log(user);
};
btnInsert.onclick = () => {
  if (tarefa.value !== "") {
    setItensDB();
  }
};
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
  loadItens();
}
function loadItens() {
  ul.innerHTML = "";
  userLogado.post.forEach((item, i) => {
    insertItemTela(item.tarefa, item.status, i);
  });
}

function insertItemTela(tarefa, status, i) {
  const li = document.createElement("li");

  li.innerHTML = `<div class="divLi">
      <input type="checkbox" ${status} data-i=${i} onchange="done(this, ${i});" />
      <div>${i + 1}</div>
      <span data-si=${i}> ${tarefa}</span>
      <button onclick="removeItem(${i})" data-i=${i}><i class="fa fa-trash"></i></i></button>
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
    user[i].status = "checked";
  } else {
    user[i].status = "";
  }
  updateDB();
}

function removeItem(i) {
  user.splice(i, 1);
  updateDB();
}

setTimeout(() => {
  loadItens();
});
