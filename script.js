/* Tela 1 */

listAllQuizzes()

function listAllQuizzes(){

    const promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");

    promise.then(firstPageQuizzList);
    promise.catch();

}

function firstPageQuizzList(info){
    let quizzList = info.data
    let fileiraQuizz = document.querySelector(".todosQuizzes .fileiraQuizz");

    console.log(quizzList[1].id);
    console.log(fileiraQuizz)
    console.log(quizzList);

    for(let i = 0; i <quizzList.length; i++){
        fileiraQuizz.innerHTML += `<div class="caixaDoQuizz" onclick="clickToPlay(${quizzList[i].id})">
        <img src="${quizzList[i].image}"/>
        <div class="texto-da-imagem">${quizzList[i].title}</div>
      </div>` 
    }

}

/* Tela 2  */
clickToPlay();
function clickToPlay(element){
    //Fechar tela1 e abrir tela 2 no quizz que a pessoa clicou.
    let id;
    if(element !== undefined){
        id = `https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${element}`
        console.log(id);
        const promise = axios.get(id);
        promise.then(displayUniqueQuizz);
        console.log(promise)
    } 

}

function displayUniqueQuizz(uniqueQuizz){

    const tela1 = document.querySelector(".conteudo-tela1");
    const tela2 = document.querySelector(".conteudo-tela2");

    tela1.classList.add("hidden");
    tela2.classList.remove("hidden");

    let questionsInfo = uniqueQuizz.data;
    let questions = uniqueQuizz.data.questions;
    let quizzUnicoContainer = document.querySelector(".conteudo-tela2");
    quizzUnicoContainer.innerHTML += `<div class="banner">
        <img src="${questionsInfo.image}">
        <div>${questionsInfo.title}</div>
      </div>`
    

    console.log(questionsInfo);
    console.log(questions);
    console.log(questions.length);
    console.log(quizzUnicoContainer);



    for(let i= 0; i < questions.length; i++){
        quizzUnicoContainer.innerHTML += `<div class="quizzContainer">
        <div class="quizzPergunta" style="background-color: ${questions[i].color};">
          <div>${questions[i].title}</div>
        </div>
        <div class="quizzOpcoes">
          <div class="opcao" onclick=""><img src="img/Rectangle38.png"/><div>The boy who lived</div></div>
          <div class="opcao" onclick=""><img src="img/Rectangle39.png"/><div>O livro monstruoso dos monstros</div></div>
          <div class="opcao" onclick=""><img src="img/Rectangle40.png"/><div>Anel velho</div></div>
          <div class="opcao" onclick=""><img src="img/Rectangle41.png"/><div>Diadema da RavenClaw</div></div>
        </div>
      </div>`


    }

}