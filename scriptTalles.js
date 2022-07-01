let quizzCriado = {
  title: "",
  image: "",
  quantidadePerguntas: 0,
  quantidadeNiveis: 0,
  questions: [],
  levels: [],
};

function criarQuizz() {
  const containerVazio = document.querySelector(".containerVazio");
  const todosQuizzes = document.querySelector(".todosQuizzes");
  const crearTela0 = document.querySelector(".crearQuizz0");
  containerVazio.classList.add("hidden");
  todosQuizzes.classList.add("hidden");
  crearTela0.classList.remove("hidden");
}

function criarPerguntas() {
  tituloQuizz = document.querySelector(".tituloDoQuizz").value;
  urlImagemPrincipal = document.querySelector(".imagemDoQuizz").value;
  quantidadePerguntas = document.querySelector(".qtdPerguntas").value;
  quantidadeNiveis = document.querySelector(".qtdNiveis").value;

  quizzCriado.title = tituloQuizz;
  quizzCriado.image = urlImagemPrincipal;
  quizzCriado.quantidadePerguntas = parseInt(quantidadePerguntas);
  quizzCriado.quantidadeNiveis = parseInt(quantidadeNiveis);
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
  } else if (quizzCriado.title.length < 20 || quizzCriado.title.length > 65) {
    alert("Título inválido");
  } else if (!quizzCriado.image.includes("https:")) {
    alert("Url inválida");
  } else if (quizzCriado.quantidadePerguntas < 3) {
    alert("Quantidade de perguntas inválida");
  } else if (quizzCriado.quantidadeNiveis < 2) {
    alert("Quantidade de níveis inválido");
  } else {
    renderizarPerguntas();
  }
}

function renderizarPerguntas() {
  const crearTela0 = document.querySelector(".crearQuizz0");
  crearTela0.classList.add("hidden");
  const perguntas = document.querySelector(".perguntas");
  perguntas.classList.remove("hidden");

  const caixaperguntas = document.querySelector(".caixa-perguntas");

  for (let i = 0; i < quizzCriado.quantidadePerguntas; i++) {
    caixaperguntas.innerHTML += `
       
              <div class="pergunta">
                <p>Pergunta ${i + 1}</p>
                <input type="text" class="pergunta${
                  i + 1
                }" placeholder="Texto da pergunta">
                <input type="text" class="pergunta${
                  i + 1
                }-cor" placeholder="Cor de fundo da pergunta">

                <p>Resposta correta</p>

                <input type="text" class="pergunta-${
                  i + 1
                }-resposta-correta" placeholder="Resposta correta">
                <input type="text" class="pergunta-${
                  i + 1
                }-url-correta" placeholder="URL da imagem">

                <p>Resposta incorretas</p>

                <input type="text" class="resposta-pergunta-${
                  i + 1
                }-incorreta-1" placeholder="Resposta incorreta 1">
                <input type="text" class="url" placeholder="URL da imagem 1">


                <input type="text" class="resposta-pergunta-${
                  i + 1
                }-incorreta-2" placeholder="Resposta incorreta 2">
                <input type="text" class="url" placeholder="URL da imagem 2">


                <input type="text" class="resposta-pergunta-${
                  i + 1
                }-incorreta-3" placeholder="Resposta incorreta 3">
                <input type="text" class="url-img3" placeholder="URL da imagem 3">
              </div>
        
        `;
  }
}
