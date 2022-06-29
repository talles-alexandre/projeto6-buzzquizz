let tituloQuizz = "";
let urlImagemPrincipal = "";
let quantidadePerguntas = 0;
let quantidadeNiveis = 0;

function criarQuizz() {
  const containerVazio = document.querySelector(".containerVazio");
  const todosQuizzes = document.querySelector(".todosQuizzes");
  const crearTela0 = document.querySelector(".crearQuizz0");
  containerVazio.classList.add("escondido");
  todosQuizzes.classList.add("escondido");
  crearTela0.classList.remove("escondido");
}

function criarPerguntas() {
  tituloQuizz = document.querySelector(".tituloDoQuizz").value;
  urlImagemPrincipal = document.querySelector(".imagemDoQuizz").value;
  quantidadePerguntas = document.querySelector(".qtdPerguntas").value;
  quantidadeNiveis = document.querySelector(".qtdNiveis").value;
  validarInformacoesBasica();
}

function validarInformacoesBasica() {
  if (
    tituloQuizz === "" ||
    urlImagemPrincipal === "" ||
    quantidadePerguntas === "" ||
    quantidadeNiveis === ""
  ) {
    alert("Campo vazio, preencher os dados corretamente.");
  } else if (tituloQuizz.length < 20 || tituloQuizz.length > 65) {
    alert("Título inválido");
  } else if (!urlImagemPrincipal.includes("https:")) {
    alert("Url inválida");
  } else if (quantidadePerguntas < 3) {
    alert("Quantidade de perguntas inválida");
  } else if (quantidadeNiveis < 2) {
    alert("Quantidade de níveis inválido");
  } else {
    renderizarPerguntas();
  }
}

function renderizarPerguntas() {
  alert("Tudo Ok");
}
