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
   modalbg.style.display="block"; 
}
function closeModal() {
    modalbg.style.display="none"; 
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
  resetValidity();
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
    displayError("first", "Veuillez saisir votre prénom.");
    testValid = false;
  } else if (firstName.length < 2) {
    displayError("first", "Veuillez entrer 2 caractères ou plus pour le champ du prénom.");
    testValid = false;
  } else {
    updateValidity("first", true);
  }

  // Vérifiez si le champ nom de famille a un minimum de 2 caractères ou n'est pas vide
  if (lastName === "") {
    displayError("last", "Veuillez saisir votre nom de famille.");
    testValid = false;
  } else if (lastName.length < 2) {
    displayError("last", "Veuillez entrer 2 caractères ou plus pour le champ du nom de famille.");
    testValid = false;
  } else {
    updateValidity("last", true);
  }

  // Vérifiez si l'adresse email est valide ou n'est pas vide
  if (email === "") {
    displayError("email", "Veuillez saisir votre adresse email.");
    testValid = false;
  } else if (!testValidEmail(email)) {
    displayError("email", "Veuillez saisir une adresse email valide.");
    testValid = false;
  } else {
    updateValidity("email", true);
  }

  // Vérifiez si la date de naissance est vide
  if (birthdate === "") {
    displayError("birthdate", "Veuillez entrer votre date de naissance.");
    testValid = false;
  } else {
    updateValidity("birthdate", true);
  }

  // Vérifiez si la quantité est vide ou négative
  if (quantity === "") {
    displayError("quantity", "Le champ ne peut pas être vide.");
    testValid = false;
  } else if (quantity < 0) {
    displayError("quantity", "Veuillez choisir un nombre positif.");
    testValid = false;
  } else {
    updateValidity("quantity", true);
  }

  // Vérifiez si un bouton radio est sélectionné
  if (!validateRadio("location")) {
    testValid = false;
  }

  // Vérifiez si la case des conditions générales est cochée
  if (!termsCheckbox) {
    displayError("checkbox1", "Vous devez accepter les termes et conditions.");
    testValid = false;
  } else {
    updateValidity("checkbox1", true);
  }

  return testValid;
}

// Fonction pour afficher une erreur de champ
function displayError(fieldId, errorMessage) {
  let errorElement = document.getElementById(fieldId + "Error").parentElement;
  errorElement.setAttribute("data-error", errorMessage);
  errorElement.setAttribute("data-error-visible", "true");
}

// Fonction pour mettre à jour la validité d'un champ
function updateValidity(fieldId, testValid) {
  let fieldElement = document.getElementById(fieldId);
  let errorElement = document.getElementById(fieldId + "Error").parentElement;
  
  if (testValid) {
    fieldElement.classList.add("valid");
    errorElement.removeAttribute("data-error");
    errorElement.removeAttribute("data-error-visible");
  } else {
    fieldElement.classList.remove("valid");
  }
}

// Fonction pour réinitialiser la validité des champs
function resetValidity() {
  let validFieldElements = document.querySelectorAll(".valid");
  validFieldElements.forEach(fieldElement => {
    fieldElement.classList.remove("valid");
  });
}

const successMessage = document.querySelector(".signUp");

function showSuccessMessage() {

  contentForm.style.display = "none";
  let successParag = document.createElement("p");
  
  successMessage.appendChild(successParag);
 
  successParag.textContent= first.value +" ! Merci pour votre inscription";
  successMessage.style.display="block";
  
   successMessage.style.height="80vh";
}


const buttonClose = document.querySelector(".btn-close");
const contentForm = document.querySelector(".content_form");

// Écoutez l'événement de clic sur le bouton "Fermer"
buttonClose.addEventListener("click", function() {
  // Réinitialise le formulaire
  location.reload();

  resetForm();
  // Masque le message de succès
  modalbg.classList.add("modal-fade");
 
  // Attendez la fin de l'animation puis masquez le modal
  setTimeout(function () {
    modalbg.classList.add("hide");
  }, 300); // ajustez la durée de l'animation (0.3s dans cet exemple)

});
function resetForm() {
  form.reset();
  resetValidity();
}



//
function testValidEmail(email) {
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}


// Fonction pour valider les boutons radio
function validateRadio(location) {
  let radioButtons = document.querySelectorAll(`input[name="${location}"]`);
  let radioContainer = document.querySelector(`input[name="${location}"]:first-child`).parentNode;

  // Vérifie si au moins un bouton radio est sélectionné
  //ArrayPrototyeSome
  let radioSelect = Array.from(radioButtons).some(button => button.checked);

  if (!radioSelect) {
    radioContainer.setAttribute("data-error", "Veuillez sélectionner une option.");
    radioContainer.setAttribute("data-error-visible", "true");
    return false;
  } else {
    radioContainer.removeAttribute("data-error");
    radioContainer.removeAttribute("data-error-visible");
    return true;
  }
}
