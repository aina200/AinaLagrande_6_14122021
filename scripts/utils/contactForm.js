// DOM 
const note = document.getElementById("note");
const main = document.getElementById('main');
const close_succes_Btn = document.querySelector(".close_succes");
const modal = document.getElementById("contact_modal");
const modalBtn = document.querySelectorAll(".contact_button");
// INPUTS
const inputFirst = document.querySelector('input[name=first]');
const inputLast = document.querySelector('input[name=last]');
const inputEmail = document.querySelector('input[name=email]');
const inputMessage = document.querySelector('input[name=message]');
// RESULTS 
let resultFirst = document.getElementById("first-validation");
let resultLast = document.getElementById("last-validation");
let resultEmail = document.getElementById("email-validation"); 
let resultMessage = document.getElementById("message-validation");
// REGEX 
let regFirst = /[a-zA-Z]{2,64}/;
let regLast = /[a-zA-Z]{2,64}/;
let regEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// OPEN AND CLOSE MODAL 
function displayModal() {
	modal.style.display = "block";
  main.classList.add('fadeIn');
}
function closeModal() {
  modal.style.display = "none";
  main.classList.remove('fadeIn');
}
// launch modal-succes btn
function close_succes_modal() {
  note.style.display = "none";
  main.classList.remove('fadeIn');
}
function showNotification() {
  note.style.display = "flex";
  close_succes_Btn.style.display = "block";
  main.classList.add('fadeIn');
}
function testConsole(){
  let firstname = document.getElementById("firstname").value;
  let lastname = document.getElementById("lastname").value;
  let email = document.getElementById("email").value;
  let message = document.getElementById("message").value;
  console.log("prenom du formulaire est : "+ firstname);
  console.log("nom du formulaire est :"+ lastname);
  console.log("email du formulaire est : "+ email);
  console.log("message du formulaire est : "+ message);
}
// close modal-succes event
close_succes_Btn.addEventListener("click", close_succes_modal);
// CLOSE ON ESCAPE 
window.addEventListener('keydown', function(e){
  if(e.key === 'Escape' || e.key === 'Esc'){
    closeModal();
    close_succes_modal();
  }
})
//   CONDITIONS 
inputFirst.addEventListener('input', function(e) {
  let value = e.target.value;
  if (value.match(regFirst)) {
    inputFirst.classList.add("js-succes-border");
    resultFirst.style.display = "none";
  } 
  else {
    resultFirst.style.display = "inline-block";
    inputFirst.classList.remove("js-succes-border");
    inputFirst.classList.add("js-error-border");
    resultFirst.innerHTML = "Veuillez entrer 2 caractères minimun.";
  }
});

inputLast.addEventListener('input', function(e) {
  let value = e.target.value;
  if (value.match(regLast)) {
    inputLast.classList.add("js-succes-border");
    resultLast.style.display = "none";
  } else {
    resultLast.style.display = "inline-block";
    inputLast.classList.remove("js-succes-border");
    inputLast.classList.add("js-error-border");
    resultLast.innerHTML = "Veuillez entrer 2 caractères minimun.";
  }
});

inputEmail.addEventListener('input', function(e) {
  let value = e.target.value;
  if (value.match(regEmail)) {
    inputEmail.classList.add("js-succes-border");
    resultEmail.style.display = "none";
  } else {
    resultEmail.style.display = "inline-block";
    inputEmail.classList.remove("js-succes-border");
    inputEmail.classList.add("js-error-border");
    resultEmail.innerHTML = "Choisissez une adresse électronique valide.";
  }
});

inputMessage.addEventListener('input', function(e) {
  let value = e.target.value;
  if (value) {
    inputMessage.classList.add("js-succes-border");
    resultMessage.style.display = "none";
  } else {
    resultEmail.style.display = "inline-block";
    inputMessage.classList.remove("js-succes-border");
    inputMessage.classList.add("js-error-border");
    resultMessage.innerHTML = "Remplissez ce champs.";
  }
});


// launch modal form
function launchModal() {
  modal.style.display = "block";

  inputFirst.classList.remove("js-succes-border");
  inputFirst.classList.remove("js-error-border");

  inputLast.classList.remove("js-succes-border");
  inputLast.classList.remove("js-error-border");

  inputEmail.classList.remove("js-succes-border");
  inputEmail.classList.remove("js-error-border");

  inputMessage.classList.remove("js-succes-border");
  inputMessage.classList.remove("js-error-border");

  document.querySelectorAll('.result').forEach(item => {
    item.style.display = "none";
  });
}
// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

function functionValidation() {
  let inputCount = 0;
  //counter initialization
  if (inputFirst.value.length== 0) {
    resultFirst.style.display = "inline-block";
    resultFirst.innerHTML = "Ce champ doit être rempli.";
    inputFirst.classList.add("js-error-border");
    inputCount++;
  } 
  else if (inputFirst.value.trim()==="") {
    resultFirst.style.display = "inline-block";
    resultFirst.innerHTML = "Aucun espace est accepté";
    inputFirst.classList.add("js-error-border");
    inputCount++;
  } 
  else{
    resultFirst.style.display = "none";
    inputFirst.classList.add("js-succes-border");
  }

  if (inputLast.value.length == 0) {
    resultLast.style.display = "inline-block";
    resultLast.innerHTML = "Ce champ doit être rempli.";
    inputLast.classList.add("js-error-border");
    inputCount++;
  }  
  else  if (inputLast.value.trim()==="") {
    resultLast.style.display = "inline-block";
    resultLast.innerHTML = "Aucun espace est accepté.";
    inputLast.classList.add("js-error-border");
    inputCount++;
  }

  if (inputEmail.value.length == 0) {
    resultEmail.style.display = "inline-block";
    resultEmail.innerHTML = "Le champ email doit être rempli.";
    inputEmail.classList.add("js-error-border");
    inputCount++;
  } 
  else if (inputEmail.value.trim()==="") {
    resultEmail.style.display = "inline-block";
    resultEmail.innerHTML = "Aucun espace est accepté.";
    inputEmail.classList.add("js-error-border");
    inputCount++;
  } 

  if (inputMessage.value.length == 0) {
    resultMessage.style.display = "inline-block";
    resultMessage.innerHTML = "Le champ de date doit être rempli.";
    inputMessage.classList.add("js-error-border");
    inputCount++;
  } 
  // If there is no error
  else if (inputCount === 0) {
    modal.style.display = "none";
    showNotification();
    testConsole();
    document.getElementById("form").reset();
  } 
}
// ONSUBMITT FUCNTION
form.addEventListener("submit", e => {
  e.preventDefault();
  functionValidation();
});
