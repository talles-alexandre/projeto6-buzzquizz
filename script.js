/* Tela 1 */
let userid =[];
listAllQuizzes();
VerifyUserQuizz();
let questionsInfo;
let questions;
let totalQuestions;
let totalHits = 0;
let count = 0;
let result = 0;
let showCongrats;
let finalButtons;

function listAllQuizzes(){

    const promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");

    promise.then(firstPageQuizzList);
    promise.catch();

}



function firstPageQuizzList(info){
    let quizzList = info.data;
  
    let fileiraQuizz = document.querySelector(".todosQuizzes .fileiraQuizz");

    for(let i = 0; i <quizzList.length; i++){
        fileiraQuizz.innerHTML += `<div class="caixaDoQuizz" onclick="clickToPlay(${quizzList[i].id})">
        <img src="${quizzList[i].image}"/>
        <div class="texto-da-imagem">${quizzList[i].title}</div>
      </div>` 
    }

}




function VerifyUserQuizz(){

  let dados = localStorage.getItem("quizzes");
  let convertedData = [JSON.parse(dados)];

  for(let i = 0; i<convertedData.length; i++){
    
    userid.push(convertedData[i].id);
   
  }

  const promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
  promise.then(displayUserQuizz);
  console.log(promise);
  
}




function displayUserQuizz(userQuizz){
  let showUserQuizz = document.querySelector(".fromUser");
  console.log(showUserQuizz)
  let userQuizzData = userQuizz.data;

  console.log(userid);
  

  let containerVazio = document.querySelector(".containerVazio");
  let displayQuizzesUsuario = document.querySelector(".displayQuizzesUsuario");

  
  containerVazio.classList.add("hidden");
  displayQuizzesUsuario.classList.remove("hidden");
  
  for(let i = 0; i < userQuizzData.length; i++){ 
    for(let j=0; j< userid.length; j++){
      if(userQuizzData[i].id === userid[j]){
        showUserQuizz.innerHTML += `
        <div class="caixaDoQuizz" onclick="clickToPlay(${userQuizzData[i].id})">
          <img src="${userQuizzData[i].image}" />
          <div class="texto-da-imagem">${userQuizzData[i].title}</div>
        </div>`
      }
      
    }
  } 

}




function displayEmptyBox(){
  let containerVazio = document.querySelector(".containerVazio");
  let displayQuizzesUsuario = document.querySelector(".displayQuizzesUsuario");

  
  containerVazio.classList.remove("hidden");
  displayQuizzesUsuario.classList.add("hidden");
}


/* Tela 2  */


function clickToPlay(element){
    let id;
    if(element !== undefined){
        id = `https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${element}`
        const promise = axios.get(id);
        promise.then(displayUniqueQuizz);
    } 

}



function comparador() {
  return Math.random() - 0.5;
}



function displayUniqueQuizz(uniqueQuizz){


    const tela1 = document.querySelector(".conteudo-tela1");
    const tela2 = document.querySelector(".conteudo-tela2");

    tela1.classList.add("hidden");
    tela2.classList.remove("hidden");
    
    let scrollToTop = document.querySelector(".topo");
    scrollToTop.scrollIntoView();

    questionsInfo = uniqueQuizz.data;
    questions = uniqueQuizz.data.questions;

    let quizzUnicoContainer = document.querySelector(".conteudo-tela2");

    quizzUnicoContainer.innerHTML += `<div class="banner">
        <img src="${questionsInfo.image}">
        <div>${questionsInfo.title}</div>
      </div>`
    

    for(let i= 0; i < questions.length; i++){

      quizzUnicoContainer.innerHTML += `
        <div class="quizzContainer">
          <div class="quizzPergunta" style="background-color: ${questions[i].color};">
            <div>${questions[i].title}</div>
          </div>
          <div class="quizzOpcoes">
          </div>
        </div>`

         let quizzOpcoes = document.querySelectorAll(".quizzOpcoes");

         
         let sortAnswers = questions[i].answers;  
         sortAnswers.sort(comparador);

         for(let j = 0; j < sortAnswers.length; j++){
          let lastQuizzOpcoes = quizzOpcoes[quizzOpcoes.length-1];
            lastQuizzOpcoes.innerHTML += `
              <div class="opcao" onclick="selectAnswer(this)"><img src="${sortAnswers[j].image}"/><div class = "option-texto">${sortAnswers[j].text}</div><div class="tof hidden">${sortAnswers[j].isCorrectAnswer}</div></div>
            `
         }

    }    

}





function selectAnswer(element){

  const trueOrFalse = element.querySelector(".tof");  

  count++
  
  let elementFather= element.parentNode;
  let answersList = elementFather.querySelectorAll(".opcao");
  let randomTof = elementFather.querySelectorAll(".opcao .tof");


  if(trueOrFalse.innerHTML === "true"){
    totalHits++
  }

 
  for(let i=0; i < answersList.length;i++){
    if(randomTof[i].innerHTML === "true"){
      answersList[i].style.color = "#009C22";
    }
    else{
      answersList[i].style.color = "#FF4B4B";
    }
    
    if(trueOrFalse.innerHTML === "true"){
      answersList[i].classList.add("layer");
      element.classList.remove("layer");
    }else{
      answersList[i].classList.add("layer");
      element.classList.remove("layer");
    }

    setTimeout(scrollAfterTwoSeconds, 2000, answersList[i]);
  }    

  totalQuestions = questions.length;
  result = Math.round(0 + ((totalHits/totalQuestions)*100));

  if(count === totalQuestions){
    setTimeout(FinishQuizz, 2000, result);
  }

}





function scrollAfterTwoSeconds(answersList){
  answersList.scrollIntoView();
}




function FinishQuizz(result){
let lastPart = document.querySelector(".conteudo-tela2");
let finalLevel;
let finalTitle;
let finalText;
let finalImage;
let levels = questionsInfo.levels;

for(let i = 0; i < levels.length; i++){
  if(result >= levels[i].minValue &&  result <= levels[levels.length-1].minValue){
    finalTitle = levels[i].title;
    finalImage = levels[i].image;
    finalText = levels[i].text;
    finalLevel = levels[i].minValue;
  }

}

lastPart.innerHTML += ` 
<div class="parabensContainer hidden">
  <div class="parabensMensagem">
    <div>${result}% de acerto: ${finalTitle}</div>
  </div>
  <div class="ladoParabens">
      <div class="parabensImagem">
        <img src="${finalImage}"/>
      </div>
      <div class="parabens-texto">
      ${finalText}
      </div>
  </div> 
</div>
<div class="final hidden">
<div class="reiniciarQuizz" onclick="restart()">Reiniciar Quizz</div>
<div class="voltarHome" onclick="home()">Voltar para home</div>
</div> 
`

showCongrats = document.querySelector(".parabensContainer");
finalButtons = document.querySelector(".final")
showCongrats.classList.remove("hidden");
finalButtons.classList.remove("hidden");
showCongrats.scrollIntoView();

}



function restart(){

  let scrollToTheTop = document.querySelector(".banner");
  scrollToTheTop.scrollIntoView();
 
  initialState = document.querySelectorAll(".opcao");

  for(let i = 0; i < initialState.length; i++){
    initialState[i].style.color = "#000000";
    initialState[i].classList.remove("layer");
  }
  showCongrats.classList.add("hidden");
  finalButtons.classList.add("hidden");
  totalHits = 0;
  count = 0;
  result = "";

}



function home(){
  location.reload();
}