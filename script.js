const cards = document.querySelectorAll(".card, .step, .challenge-box div");

const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
},{
  threshold:0.2
});

cards.forEach(card=>{
  card.style.opacity = "0";
  card.style.transform = "translateY(30px)";
  card.style.transition = "all .6s ease";
  observer.observe(card);
});


/* efecto navbar */
window.addEventListener("scroll", ()=>{
  const header = document.querySelector(".header");

  if(window.scrollY > 40){
    header.style.boxShadow = "0 10px 30px rgba(0,0,0,.08)";
  }else{
    header.style.boxShadow = "none";
  }
});
/* LOGIN MODAL */
const modal = document.getElementById("authModal");
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const closeModal = document.getElementById("closeModal");

loginBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

registerBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
/* CHAT IA */

const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const chatMessages = document.getElementById("chatMessages");

sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keypress", function(e){
  if(e.key === "Enter"){
    sendMessage();
  }
});

function sendMessage(){
  const message = userInput.value.trim();
  if(message === "") return;

  // mensaje usuario
  const userMsg = document.createElement("div");
  userMsg.classList.add("user");
  userMsg.textContent = message;
  chatMessages.appendChild(userMsg);

  // respuesta IA
  const botMsg = document.createElement("div");
  botMsg.classList.add("bot");

  let response = "Intenta organizar mejor tus gastos.";

  if(message.toLowerCase().includes("gasto")){
    response = "Te recomiendo revisar tus gastos diarios y eliminar compras impulsivas.";
  }
  else if(message.toLowerCase().includes("ahorro")){
    response = "Una buena meta es ahorrar al menos el 10% de tus ingresos mensuales.";
  }
  else if(message.toLowerCase().includes("deuda")){
    response = "Prioriza pagar deudas con intereses altos primero.";
  }
  else if(message.toLowerCase().includes("comida")){
    response = "Reduce compras de comida rápida y planifica tus comidas.";
  }

  setTimeout(()=>{
    botMsg.textContent = response;
    chatMessages.appendChild(botMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 500);

  userInput.value = "";
}