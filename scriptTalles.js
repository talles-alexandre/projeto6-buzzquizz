let quizzCriado = {
  title: "",
  image: "",
  quantidadePerguntas: 0,
  quantidadeNiveis: 0,
  questions: [],
  levels: [],
};

function criarQuizz() {
  const containerVazio = document.querySelector(".conteudo-tela1");
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
                <input type="text" class="pergunta-${i}-texto" placeholder="Texto da pergunta">
                <input type="text" class="pergunta-${i}-cor" placeholder="Cor de fundo da pergunta">
                <p>Resposta correta</p>
                <input type="text" class="pergunta-${i}-resposta-correta" placeholder="Resposta correta">
                <input type="text" class="pergunta-${i}-url-correta" placeholder="URL da imagem">
                <p>Resposta incorretas</p>
                
                <input type="text" class=" pergunta-${i}-incorreta-0 resposta" placeholder="Resposta incorreta 1">
                <input type="text" class=" pergunta-${i}-incorreta-0 url" placeholder="URL da imagem 1">
                <input type="text" class="pergunta-${i}-incorreta-1 resposta" placeholder="Resposta incorreta 2">
                <input type="text" class="pergunta-${i}-incorreta-1 url" placeholder="URL da imagem 2">
                <input type="text" class="pergunta-${i}-incorreta-2 resposta" placeholder="Resposta incorreta 3">
                <input type="text" class="pergunta-${i}-incorreta-2 url" placeholder="URL da imagem 3">
              </div>
        
        `;
  }
}
function obterPerguntas() {
  quizzCriado.questions = [];
  for (let i = 0; i < quizzCriado.quantidadePerguntas; i++) {
    const pergunta = {};
    pergunta.title = document.querySelector(`.pergunta-${i}-texto`).value;
    pergunta.color = document.querySelector(`.pergunta-${i}-cor`).value;
    pergunta.answers = [];
    const respostaCorreta = {
      text: document.querySelector(`.pergunta-${i}-resposta-correta`).value,
      image: document.querySelector(`.pergunta-${i}-url-correta`).value,
      isCorrectAnswer: true,
    };
    pergunta.answers.push(respostaCorreta);
    for (let j = 0; j < 3; j++) {
      const resposta = {
        text: document.querySelector(`.pergunta-${i}-incorreta-${j}.resposta`)
          .value,
        image: document.querySelector(`.pergunta-${i}-incorreta-${j}.url`)
          .value,
        isCorrectAnswer: false,
      };

      if (resposta.text.length === 0) {
        continue;
      }

      pergunta.answers.push(resposta);
    }
    quizzCriado.questions.push(pergunta);
  }
}
function renderizarNiveis() {
  const valido = validarPerguntas();

  if (!valido) {
    alert("Preencha os dados corretamente!");

    return;
  }

  const classPerguntas = document.querySelector(".perguntas");
  classPerguntas.classList.add("hidden");
  const classNiveis = document.querySelector(".niveis");
  classNiveis.classList.remove("hidden");
  const caixaNiveis = document.querySelector(".caixaNiveis");
  for (let i = 0; i < quizzCriado.quantidadeNiveis; i++) {
    caixaNiveis.innerHTML += `
    <div class="nivel">
    <p>Nível ${i + 1}</p>
    <input type="text" class="nivel-${i}-titulo" placeholder="Título do seu nível">
    <input type="text" class="nivel-${i}-acerto" placeholder="% de acerto mínima">
    <input type="text" class="nivel-${i}-url" placeholder="URL da imagem do nível">
    <input type="text" class="nivel-${i}-descricao" placeholder="Descrição do nível">
    </div>
    
    `;
  }
}

function validarPerguntas() {
  obterPerguntas();

  for (let i = 0; i < quizzCriado.questions.length; i++) {
    const pergunta = quizzCriado.questions[i];

    if (pergunta.title.length < 20) {
      return false;
    }
    if (pergunta.answers.length < 2) {
      return false;
    }
    for (let j = 0; j < pergunta.answers.length; j++) {
      const resposta = pergunta.answers[j];

      if (resposta.text.length === 0) {
        return false;
      }
    }
  }

  return true;
}
function finalizarQuizz() {
  const valido = validarNiveis();
  if (!valido) {
    alert("Preencha os dados corretamente!");
    return;
  }
  salvarQuizz();
}

function validarNiveis() {
  salvarNiveis();
  let temNivel0 = false;
  for (let i = 0; i < quizzCriado.levels.length; i++) {
    const nivel = quizzCriado.levels[i];
    if (nivel.minValue === 0) {
      temNivel0 = true;
    }
    if (nivel.title.length < 10) {
      return false;
    } else if (nivel.minValue < 0 || nivel.minValue > 100) {
      return false;
    } else if (!nivel.image.includes("https:")) {
      return false;
    } else if (nivel.text.length < 30) {
      return false;
    }
  }
  return temNivel0;
}

function salvarNiveis() {
  quizzCriado.levels = [];

  for (let i = 0; i < quizzCriado.quantidadeNiveis; i++) {
    const nivel = {
      title: document.querySelector(`.nivel-${i}-titulo`).value,
      minValue: parseInt(document.querySelector(`.nivel-${i}-acerto`).value),
      image: document.querySelector(`.nivel-${i}-url`).value,
      text: document.querySelector(`.nivel-${i}-descricao`).value,
    };

    quizzCriado.levels.push(nivel);
  }
}

function salvarQuizz() {
  const dados = {
    title: quizzCriado.title,
    image: quizzCriado.image,
    questions: quizzCriado.questions,
    levels: quizzCriado.levels,
  };
  console.log(dados);
  const promise = axios.post(
    "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes",
    dados
  );
  promise.then(salvarNoLocalStorage);
}
function salvarNoLocalStorage(resposta) {
  const quizz = resposta.data;
  dadosLocalStorage = {
    id: quizz.id,
    key: quizz.key,
  };
  console.log(resposta.data);
  localStorage.setItem("quizzes", JSON.stringify(dadosLocalStorage));
  renderizarQuizzSucesso(quizz.id);
}

function renderizarQuizzSucesso(id) {
  const classNiveis = document.querySelector(".niveis");
  classNiveis.classList.add("hidden");
  const quizzSucesso = document.querySelector(".quizzSucesso");

  quizzSucesso.innerHTML = `
  
  <div class="titulo">Seu quizz está pronto!</div>
  <div class="quizz" onclick="renderizarQuizzesusuario(${id})">
    <img src="${quizzCriado.image}">
    <div class="overlay"></div>
    <div class="titulo-quizz">${quizzCriado.title}</div>
  </div>

  <button class="acessar-quizz" onclick="renderizarQuizzesusuario(${id})">Acessar Quizz</button>
  <button class="voltar" onclick="home()">Voltar pra home</button>
  `;
}

function renderizarQuizzesusuario(id) {
  const quizzSucesso = document.querySelector(".quizzSucesso");
  quizzSucesso.classList.add("hidden");
  clickToPlay(`${id}`);
}
