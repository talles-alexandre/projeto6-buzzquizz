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
  const crearTela0 = document.querySelector(".crearQuizz0");
  crearTela0.classList.add("escondido");
  const perguntas = document.querySelector(".perguntas");
  perguntas.classList.remove("escondido");

  const caixaperguntas = document.querySelector(".caixa-perguntas");

  caixaperguntas.innerHTML = `
  <div class="pergunta">
          <p>Pergunta 1</p>
          <input type="text" class="pergunta1" placeholder="Texto da pergunta">
          <input type="text" class="pergunta1-cor" placeholder="Cor de fundo da pergunta">
          <p>Resposta correta</p>
          <input type="text" class="resposta-correta" placeholder="Resposta correta">
          <input type="text" class="url-img" placeholder="URL da imagem">
          <p>Resposta incorretas</p>
          <input type="text" class="resposta-incorreta1" placeholder="Resposta incorreta 1">
          <input type="text" class="url-img1" placeholder="URL da imagem 1">
          <input type="text" class="resposta-incorreta2" placeholder="Resposta incorreta 2">
          <input type="text" class="url-img2" placeholder="URL da imagem 2">
          <input type="text" class="resposta-incorreta3" placeholder="Resposta incorreta 3">
          <input type="text" class="url-img3" placeholder="URL da imagem 3">
        </div>
  
  `;
}
