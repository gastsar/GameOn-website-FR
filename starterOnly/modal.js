function editNav() {
  let x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const exitModal = document.querySelectorAll(".close");
// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
exitModal.forEach((btn) => btn.addEventListener("click", closeModal));

// launch modal form

function launchModal() {
  modalbg.style.display = "block";
}
function closeModal() {
  modalbg.style.display = "none";
 
}
const btnSend = document.querySelector(".btn-submit");
const form = document.querySelector(".form");
// Écoutez l'événement de soumission du formulaire
btnSend.addEventListener("click", function (event) {
  // Empêche le comportement par défaut de soumission du formulaire
  event.preventDefault();

  // Validez le formulaire
  let testValid = validate();

  if (testValid) {
    showSuccessMessage();
  }
});


// Fonction de validation du formulaire
function validate() {
  // Réinitialiser les erreurs
  resetErrors();
  resetFieldValidity();
  let firstName = document.getElementById("first").value;
  let lastName = document.getElementById("last").value;
  let email = document.getElementById("email").value;
  let birthdate = document.getElementById("birthdate").value;
  let quantity = document.getElementById("quantity").value;
  let location = document.querySelector('input[name="location"]:checked');
  let termsCheckbox = document.getElementById("checkbox1").checked;

  let testValid = true;

  // Vérifiez si le champ prénom a un minimum de 2 caractères ou n'est pas vide
  if (firstName === "") {
    displayError("firstName", "Veuillez saisir votre prénom.");
    testValid = false;
  } else if (firstName.length < 2) {
    displayError("firstName", "Veuillez entrer 2 caractères ou plus pour le champ du nom.");
   console.log("Le prénom doit avoir au moins 2 caractères.");
  testValid = false;
     } else {
    markFieldAsValid("first");
  }

  // Vérifiez si le champ nom de famille a un minimum de 2 caractères ou n'est pas vide
  if (lastName === "") {
    displayError("lastName", "Veuillez saisir votre nom de famille.");
    testValid = false;
  } else if (lastName.length < 2) {
    displayError("lastName", "Veuillez entrer 2 caractères ou plus pour le champ du nom.");
    testValid = false;
  } else {
    markFieldAsValid("last");
  }

  // Vérifiez si l'adresse email est valide ou n'est pas vide

  if (email === "") {
    displayError("email", "Veuillez saisir votre adresse email.");
    testValid = false;
  }
  else if (!testValidEmail(email)) {
    displayError("email", "Veuillez saisir une adresse email valide.");
    testValid = false;
  } else {
    markFieldAsValid("email");
  }

  //birhday verifié
  if (birthdate === "") {
    displayError("birthdate", "Vous devez entrer votre date de naissance.");
    testValid = false;
  } else {
    markFieldAsValid("birthdate");
  }

  // condition d'erreur si le champs est vide
  if (quantity === "") {
    displayError("quantity", "Le champ ne peut pas être vide.");
    testValid = false;
  }
  // condition d'erreur si le chiffre est négatif
  else if (quantity < 0) {
    displayError("quantity", "Veuillez choisir un nombre positif.");
    testValid = false;
  } else {
    markFieldAsValid("quantity");
  }

  // Vérifiez si un bouton radio est sélectionné
  if (!location) {
    displayError("location", "Veuillez sélectionner le ville de votre choix.");
    testValid = false;
  }

  // Vérifiez si la case des conditions générales est cochée
  if (!termsCheckbox) {
    displayError("termsCheckbox", "Vous devez acceptez les termes et conditions.");
    testValid = false;
  }

  return testValid;
}

// Fonction pour afficher une erreur de champ
function displayError(fieldId, errorMessage) {
  let errorElement = document.getElementById(fieldId + "Error");
  errorElement.innerText = errorMessage;
}

function resetErrors() {
  let errorElements = document.getElementsByClassName("error");
  for (let i = 0; i < errorElements.length; i++) {
    errorElements[i].innerHTML = "";
  }
}
function markFieldAsValid(fieldId) {
  let field = document.getElementById(fieldId);
  field.classList.add('valid');
}
// Fonction pour retirer la classe 'valid' des champs d'entrée
function resetFieldValidity() {
  let fields = document.querySelectorAll('.valid');
  fields.forEach(function (field) {
    field.classList.remove('valid');
  });
}  
let successMessageSection = document.querySelector(".modal-body");
const successMessage = document.querySelector(".signUp");
function showSuccessMessage() {

  contentForm.style.display = "none";
  let successParag = document.createElement("p");
  
  successMessage.appendChild(successParag);
 
  successParag.textContent= first.value +" ! Merci pour votre inscription";
  successMessage.style.display="block";
  
   successMessage.style.height="80vh";
}
// Fonction pour réinitialiser le formulaire
function resetForm() {
  form.reset();
  resetFieldValidity();
  resetErrors();
}

const buttonClose = document.querySelector(".btn-close")
const contentForm = document.querySelector(".content_form")
// Écoutez l'événement de clic sur le bouton "Fermer"
buttonClose.addEventListener("click", function() {
  // Réinitialise le formulaire
  location.reload();
  hideSuccessMessage();
  resetForm();
  // Masque le message de succès

});
function hideSuccessMessage() {
  modalbg.style.display = "none";
 
}

// Fonction pour vérifier le format d'une adresse email
function testValidEmail(email) {
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

