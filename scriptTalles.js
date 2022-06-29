function criarQuizz() {
  const containerVazio = document.querySelector(".containerVazio");
  const todosQuizzes = document.querySelector(".todosQuizzes");
  const crearTela0 = document.querySelector(".crearQuizz0");
  containerVazio.classList.add("escondido");
  todosQuizzes.classList.add("escondido");
  crearTela0.classList.remove("escondido");
}
